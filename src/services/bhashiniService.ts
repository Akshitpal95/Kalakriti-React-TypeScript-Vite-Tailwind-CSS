import { AIServiceConfig } from '../types';

export interface BhashiniPipelineRequest {
  pipelineTasks: Array<{
    taskType: 'asr' | 'translation' | 'tts';
    config: {
      language: {
        sourceLanguage: string;
        targetLanguage?: string;
      };
    };
  }>;
  pipelineRequestConfig: {
    pipelineId: string;
  };
}

export interface BhashiniASRResponse {
  pipelineResponse: Array<{
    taskType: string;
    output: Array<{
      source: string;
      target?: string;
    }>;
  }>;
}

export class BhashiniService {
  private config: AIServiceConfig = {
    sttProvider: 'bhashini',
    preferredLanguage: 'hi-IN'
  };

  public setConfig(newConfig: Partial<AIServiceConfig>): void {
    this.config = { ...this.config, ...newConfig };
  }

  public getConfig(): AIServiceConfig {
    return this.config;
  }

  /**
   * Process speech audio blob through Bhashini ULCA Pipeline or Whisper
   */
  public async transcribeAudio(
    audioBlob: Blob,
    sourceLanguage: string = 'hi'
  ): Promise<{ transcript: string; providerUsed: string }> {
    // If real Bhashini API Key and UserId are configured, make the live ULCA call:
    if (this.config.bhashiniApiKey && this.config.bhashiniUserId) {
      try {
        const base64Audio = await this.blobToBase64(audioBlob);
        const response = await fetch('https://dhruva-api.bhashini.gov.in/services/inference/pipeline', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': this.config.bhashiniApiKey,
            'userID': this.config.bhashiniUserId,
          },
          body: JSON.stringify({
            pipelineTasks: [
              {
                taskType: 'asr',
                config: {
                  language: { sourceLanguage }
                }
              }
            ],
            inputData: {
              audio: [{ audioContent: base64Audio }]
            }
          })
        });

        if (response.ok) {
          const data: BhashiniASRResponse = await response.json();
          const transcript = data.pipelineResponse[0]?.output[0]?.source || '';
          return { transcript, providerUsed: 'Bhashini (National Language Translation Mission)' };
        }
      } catch (err) {
        console.warn('Bhashini live API failed, falling back to local voice engine', err);
      }
    }

    // If OpenAI API key is provided, use Whisper:
    if (this.config.openaiApiKey) {
      try {
        const formData = new FormData();
        formData.append('file', audioBlob, 'audio.wav');
        formData.append('model', 'whisper-1');
        formData.append('language', sourceLanguage.slice(0, 2));
        formData.append('prompt', 'Indian handicraft, Banarasi silk saree, zari border, pit loom, handloom weaving, terracotta pottery, Madhubani painting, Bastar Dhokra metalcraft.');

        const res = await fetch('https://api.openai.com/v1/audio/transcriptions', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${this.config.openaiApiKey}`
          },
          body: formData
        });

        if (res.ok) {
          const data = await res.json();
          return { transcript: data.text, providerUsed: 'OpenAI Whisper API' };
        }
      } catch (err) {
        console.warn('Whisper API call failed, falling back to native engine', err);
      }
    }

    // Fallback notification
    return {
      transcript: '',
      providerUsed: 'Native WebSpeech Engine (Browser Default)'
    };
  }

  private blobToBase64(blob: Blob): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        // Strip data:audio/wav;base64, prefix
        const base64 = result.split(',')[1] || result;
        resolve(base64);
      };
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  }
}

export const bhashiniService = new BhashiniService();
