// Web Speech API interfaces
interface IWindow extends Window {
  webkitSpeechRecognition?: any;
  SpeechRecognition?: any;
}

export class SpeechService {
  private recognition: any = null;
  private isListening: boolean = false;
  private synth: SpeechSynthesis | null = null;
  private currentUtterance: SpeechSynthesisUtterance | null = null;
  private voicesLoaded: boolean = false;

  constructor() {
    if (typeof window !== 'undefined') {
      if ('speechSynthesis' in window) {
        this.synth = window.speechSynthesis;
        const loadVoices = () => {
          if (this.synth) {
            this.synth.getVoices();
            this.voicesLoaded = true;
          }
        };
        loadVoices();
        if (typeof window.speechSynthesis.onvoiceschanged !== 'undefined') {
          window.speechSynthesis.onvoiceschanged = loadVoices;
        }
      }
    }
  }

  private getRecognitionInstance(): any {
    if (typeof window === 'undefined') return null;
    const win = window as unknown as IWindow;
    const SpeechRecognitionClass = win.SpeechRecognition || win.webkitSpeechRecognition;
    if (!SpeechRecognitionClass) return null;

    try {
      const rec = new SpeechRecognitionClass();
      rec.continuous = true;
      rec.interimResults = true;
      rec.maxAlternatives = 1;
      return rec;
    } catch (e) {
      console.warn('Could not construct SpeechRecognition', e);
      return null;
    }
  }

  public isSupported(): boolean {
    if (typeof window === 'undefined') return false;
    const win = window as unknown as IWindow;
    return Boolean(win.SpeechRecognition || win.webkitSpeechRecognition);
  }

  public isTTSSupported(): boolean {
    return Boolean(typeof window !== 'undefined' && 'speechSynthesis' in window);
  }

  /**
   * Start listening in specified language (e.g. 'hi-IN' or 'en-IN')
   */
  public startListening(
    lang: string = 'hi-IN',
    onResult: (transcript: string, isFinal: boolean) => void,
    onError: (error: string) => void,
    onEnd: () => void
  ): boolean {
    this.stopListening();

    const rec = this.getRecognitionInstance();
    if (!rec) {
      onError('Speech recognition is not supported in this browser. Please use Google Chrome or Microsoft Edge.');
      return false;
    }

    try {
      this.recognition = rec;
      rec.lang = lang;
      this.isListening = true;

      let accumulatedFinal = '';

      rec.onresult = (event: any) => {
        let interimTranscript = '';

        for (let i = event.resultIndex; i < event.results.length; ++i) {
          const item = event.results[i];
          if (item.isFinal) {
            accumulatedFinal += item[0].transcript + ' ';
          } else {
            interimTranscript += item[0].transcript;
          }
        }

        const fullText = (accumulatedFinal + interimTranscript).trim();
        if (fullText) {
          // Pass full running transcript to caller without terminating prematurely
          onResult(fullText, false);
        }
      };

      rec.onerror = (event: any) => {
        console.warn('Speech recognition error event:', event.error);
        if (event.error === 'no-speech') {
          // Don't kill session on quiet moments, user is pausing
          return;
        }

        this.isListening = false;
        if (event.error === 'not-allowed' || event.error === 'service-not-allowed') {
          onError('Microphone permission was denied. Please allow microphone access in your browser.');
        } else if (event.error === 'network') {
          onError('Speech service network error. Check your connection or use sample voice prompts.');
        } else {
          onError(`Speech recognition notice: ${event.error}`);
        }
      };

      rec.onend = () => {
        this.isListening = false;
        onEnd();
      };

      rec.start();
      return true;
    } catch (e: any) {
      this.isListening = false;
      onError(e?.message || 'Could not access microphone.');
      return false;
    }
  }

  public stopListening(): void {
    if (this.recognition) {
      try {
        this.recognition.stop();
      } catch (e) {
        // ignore
      }
      this.recognition = null;
    }
    this.isListening = false;
  }

  /**
   * Speak text out loud in Hindi or English using natural SpeechSynthesis
   */
  public speak(
    text: string,
    lang: 'hi-IN' | 'en-IN' = 'hi-IN',
    onEnd?: () => void
  ): void {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    const synth = window.speechSynthesis;

    try {
      if (synth.paused) {
        synth.resume();
      }
      synth.cancel();

      const cleanText = text.replace(/[*#_`~]/g, '').trim();
      if (!cleanText) return;

      const utterance = new SpeechSynthesisUtterance(cleanText);
      utterance.lang = lang;
      utterance.rate = 0.95;
      utterance.pitch = 1.0;

      // Select best voice
      const voices = synth.getVoices();
      const langPrefix = lang.substring(0, 2).toLowerCase();
      const matchingVoice = 
        voices.find(v => v.lang.toLowerCase() === lang.toLowerCase()) ||
        voices.find(v => v.lang.toLowerCase().startsWith(langPrefix)) ||
        voices.find(v => v.name.toLowerCase().includes('india') || v.name.toLowerCase().includes('hindi'));

      if (matchingVoice) {
        utterance.voice = matchingVoice;
      }

      utterance.onend = () => {
        this.currentUtterance = null;
        if (onEnd) onEnd();
      };

      utterance.onerror = (e) => {
        console.warn('Speech synthesis error', e);
        this.currentUtterance = null;
        if (onEnd) onEnd();
      };

      this.currentUtterance = utterance;
      // Prevent browser garbage collection bug in Chromium
      (window as any).__loomDeskLastUtterance = utterance;

      setTimeout(() => {
        synth.speak(utterance);
      }, 50);
    } catch (err) {
      console.warn('TTS speak failed', err);
    }
  }

  public stopSpeaking(): void {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      try {
        window.speechSynthesis.cancel();
      } catch (e) {}
      this.currentUtterance = null;
    }
  }

  public isSpeaking(): boolean {
    return Boolean(typeof window !== 'undefined' && 'speechSynthesis' in window && window.speechSynthesis.speaking);
  }
}

export const speechService = new SpeechService();
