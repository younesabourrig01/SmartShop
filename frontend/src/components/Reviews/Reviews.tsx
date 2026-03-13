import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Send, User, Calendar } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface Review {
  id: number;
  userName: string;
  rating: number;
  comment: string;
  date: string;
}

const Reviews: React.FC = () => {
  const { t } = useTranslation();
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState("");
  const [reviews, setReviews] = useState<Review[]>([
    {
      id: 1,
      userName: "Younes",
      rating: 5,
      comment: "This product changed my life! The build quality is exceptional.",
      date: "2024-03-10"
    },
    {
      id: 2,
      userName: "Amine",
      rating: 4,
      comment: "Great performance, although the price is a bit high. Still worth it.",
      date: "2024-03-08"
    }
  ]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === 0 || comment.trim() === "") return;

    const newReview: Review = {
      id: Date.now(),
      userName: "Guest User",
      rating,
      comment,
      date: new Date().toISOString().split('T')[0]
    };

    setReviews([newReview, ...reviews]);
    setRating(0);
    setComment("");
  };

  return (
    <div className="mt-16 space-y-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="text-3xl font-black text-slate-900">{t('reviews.title')}</h2>
          <p className="text-slate-500 font-medium mt-2">{t('reviews.subtitle')}</p>
        </div>
        
        <div className="flex items-center gap-4 bg-white px-6 py-4 rounded-3xl shadow-sm border border-slate-100">
          <div className="flex items-center gap-1 text-amber-400">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star key={star} fill="currentColor" size={20} />
            ))}
          </div>
          <span className="text-xl font-black text-slate-900">4.5 / 5</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Review Form */}
        <div className="lg:col-span-1">
          <form 
            onSubmit={handleSubmit}
            className="bg-white p-8 rounded-[2.5rem] shadow-xl border border-slate-50 space-y-6 sticky top-28"
          >
            <h3 className="text-xl font-bold text-slate-900 mb-4">{t('reviews.write_review')}</h3>
            
            <div className="space-y-3">
              <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">{t('reviews.rating')}</p>
              <div className="flex items-center gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    onClick={() => setRating(star)}
                    className="transition-transform active:scale-90"
                  >
                    <Star 
                      size={32} 
                      fill={(hoverRating || rating) >= star ? "#fbbf24" : "transparent"} 
                      className={(hoverRating || rating) >= star ? "text-amber-400" : "text-slate-200"}
                      strokeWidth={2}
                    />
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">{t('reviews.comment')}</p>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder={t('reviews.placeholder')}
                className="w-full h-32 p-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium text-slate-700 resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={rating === 0 || comment.trim() === ""}
              className={`w-full py-4 rounded-2xl font-black text-lg flex items-center justify-center gap-3 transition-all active:scale-95 ${
                rating > 0 && comment.trim() !== ""
                ? "bg-blue-600 text-white shadow-lg shadow-blue-500/30 hover:bg-blue-700"
                : "bg-slate-100 text-slate-400 cursor-not-allowed"
              }`}
            >
              <Send size={20} />
              {t('reviews.submit')}
            </button>
          </form>
        </div>

        {/* Reviews List */}
        <div className="lg:col-span-2 space-y-6">
          <AnimatePresence initial={false}>
            {reviews.map((review, index) => (
              <motion.div
                key={review.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600">
                      <User size={24} />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900">{review.userName}</h4>
                      <div className="flex items-center gap-1 text-amber-400 mt-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star key={star} fill={review.rating >= star ? "currentColor" : "transparent"} size={14} className={review.rating >= star ? "" : "text-slate-200"} />
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-slate-400 text-sm font-medium">
                    <Calendar size={14} />
                    {review.date}
                  </div>
                </div>
                <p className="text-slate-600 font-medium leading-relaxed">
                  {review.comment}
                </p>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default Reviews;
