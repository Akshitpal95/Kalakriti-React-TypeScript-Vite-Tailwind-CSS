import React, { useState } from 'react';
import { X, Star, CheckCircle2 } from 'lucide-react';
import { Product, Language, Review } from '../../types';
import { storageService } from '../../services/storageService';

interface StarRatingModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  language: Language;
  onReviewAdded: () => void;
}

export const StarRatingModal: React.FC<StarRatingModalProps> = ({
  product,
  isOpen,
  onClose,
  language,
  onReviewAdded
}) => {
  const [rating, setRating] = useState<number>(5);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [reviewerName, setReviewerName] = useState<string>('');
  const [comment, setComment] = useState<string>('');
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  if (!isOpen || !product) return null;

  const isHindi = language === 'hi';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment.trim() || !reviewerName.trim()) return;

    const newReview: Review = {
      id: `rev-${Date.now()}`,
      productId: product.id,
      reviewerName: reviewerName.trim(),
      rating,
      comment: comment.trim(),
      date: new Date().toISOString().split('T')[0],
      verifiedPurchase: true
    };

    storageService.addReview(newReview);
    setIsSubmitted(true);
    onReviewAdded();

    setTimeout(() => {
      setIsSubmitted(false);
      setComment('');
      setReviewerName('');
      onClose();
    }, 1800);
  };

  return (
    <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
      <div className="bg-[#FAF6EF] rounded-3xl max-w-md w-full p-6 sm:p-7 border-2 border-gold-500/50 shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 text-[#7d6869] hover:text-maroon-950 rounded-full cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {isSubmitted ? (
          <div className="py-8 text-center space-y-3">
            <div className="w-14 h-14 rounded-full bg-gold-100 text-maroon-800 mx-auto flex items-center justify-center border border-gold-400">
              <CheckCircle2 className="w-8 h-8 text-gold-600" />
            </div>
            <h4 className="font-serif text-xl font-bold text-maroon-950">
              {isHindi ? 'आपकी रेटिंग दर्ज हो गई है!' : 'Rating Submitted!'}
            </h4>
            <p className="text-xs text-[#5e4a4b]">
              {isHindi
                ? 'कारीगर को प्रोत्साहित करने के लिए धन्यवाद।'
                : 'Thank you for supporting traditional craftsmanship.'}
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1">
              <span className="text-[10px] font-extrabold text-gold-700 uppercase tracking-wider">
                {isHindi ? 'सत्यापित समीक्षा' : 'Artisan Review'}
              </span>
              <h3 className="font-serif text-xl font-bold text-maroon-950">
                {isHindi ? 'कलाकृति का मूल्यांकन करें' : 'Rate this Craftwork'}
              </h3>
              <p className="text-xs text-[#5e4a4b] truncate">
                {product.title}
              </p>
            </div>

            {/* Interactive Stars in Warm Gold */}
            <div className="flex items-center justify-center gap-2 py-3 bg-white rounded-2xl border border-gold-500/30 shadow-xs">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  className="p-1 transition-transform hover:scale-125 focus:outline-none cursor-pointer"
                >
                  <Star
                    className={`w-7 h-7 transition-colors ${
                      star <= (hoverRating || rating)
                        ? 'fill-[#C9A15A] text-[#C9A15A]'
                        : 'text-cream-300'
                    }`}
                  />
                </button>
              ))}
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-maroon-950">
                {isHindi ? 'आपका नाम' : 'Your Name & City'}
              </label>
              <input
                type="text"
                value={reviewerName}
                onChange={(e) => setReviewerName(e.target.value)}
                placeholder="e.g. Meera Sharma (Delhi)"
                className="w-full text-xs font-medium p-3 rounded-xl border border-gold-500/40 bg-white outline-none focus:border-maroon-800"
                required
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-maroon-950">
                {isHindi ? 'आपकी टिप्पणी / अनुभव' : 'Your Review & Craft Feedback'}
              </label>
              <textarea
                rows={3}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder={isHindi ? 'कारीगरी, रंग या कपड़े की गुणवत्ता के बारे में लिखें...' : 'Share your impressions on texture, weave, durability...'}
                className="w-full text-xs font-medium p-3 rounded-xl border border-gold-500/40 bg-white outline-none focus:border-maroon-800"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-gradient-to-r from-gold-500 via-gold-400 to-gold-500 hover:from-gold-400 hover:to-gold-300 text-maroon-950 font-bold text-xs rounded-xl transition-all shadow-md active:scale-95 cursor-pointer border border-gold-300"
            >
              {isHindi ? 'रेटिंग प्रकाशित करें' : 'Publish Star Rating'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
