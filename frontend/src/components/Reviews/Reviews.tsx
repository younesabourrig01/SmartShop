import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Send, User, Calendar, Loader2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { getProductReviews, addReview } from '../../api/reviews';
import toast from 'react-hot-toast';

interface Review {
  id: number;
  user: {
    name: string;
  };
  rating: number;
  review: string;
  created_at: string;
}

interface ReviewsProps {
  productId: string | number | undefined;
}

const Reviews: React.FC<ReviewsProps> = ({ productId }) => {
  const { t } = useTranslation();
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [review, setReview] = useState("");
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchReviews = async () => {
    if (!productId) return;
    try {
      const res = await getProductReviews(productId);
      setReviews(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, [productId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!productId || rating === 0 || review.trim() === "") return;

    setIsSubmitting(true);
    try {
      const res = await addReview(productId, { review, rating });
      if (res.data.status === 'success') {
        toast.success(t('reviews.success_message') || 'Review added successfully!');
        setRating(0);
        setReview("");
        fetchReviews(); // Refresh list
      }
    } catch (err: any) {
      console.error(err);
      toast.error(err.response?.data?.message || 'Failed to add review. Make sure you are logged in and haven\'t already reviewed this product.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const averageRating = reviews.length > 0 
    ? (reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length).toFixed(1)
    : "0.0";

  return (
    <div className="mt-16 space-y-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="text-3xl font-black text-slate-900 dark:text-white">{t('reviews.title')}</h2>
          <p className="text-slate-500 dark:text-slate-400 font-medium mt-2">{t('reviews.subtitle')}</p>
        </div>
        
        <div className="flex items-center gap-4 bg-white dark:bg-slate-900 px-6 py-4 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-700">
          <div className="flex items-center gap-1 text-amber-400">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star key={star} fill={parseFloat(averageRating) >= star ? "currentColor" : "none"} size={20} />
            ))}
          </div>
          <span className="text-xl font-black text-slate-900 dark:text-white">{averageRating} / 5</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Review Form */}
        <div className="lg:col-span-1">
          <form 
            onSubmit={handleSubmit}
            className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] shadow-xl border border-slate-50 space-y-6 sticky top-28"
          >
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">{t('reviews.write_review')}</h3>
            
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
                value={review}
                onChange={(e) => setReview(e.target.value)}
                placeholder={t('reviews.placeholder')}
                className="w-full h-32 p-4 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium text-slate-700 dark:text-slate-200 resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={rating === 0 || review.trim() === "" || isSubmitting}
              className={`w-full py-4 rounded-2xl font-black text-lg flex items-center justify-center gap-3 transition-all active:scale-95 ${
                rating > 0 && review.trim() !== "" && !isSubmitting
                ? "bg-blue-600 text-white shadow-lg shadow-blue-500/30 dark:shadow-none hover:bg-blue-700"
                : "bg-slate-100 dark:bg-slate-800/50 text-slate-400 cursor-not-allowed"
              }`}
            >
              {isSubmitting ? <Loader2 size={24} className="animate-spin text-blue-400" /> : <Send size={20} />}
              {t('reviews.submit')}
            </button>
          </form>
        </div>

        {/* Reviews List */}
        <div className="lg:col-span-2 space-y-6">
          {loading ? (
             <div className="flex justify-center py-20">
               <Loader2 size={48} className="animate-spin text-blue-600 opacity-20" />
             </div>
          ) : (
            <AnimatePresence initial={false}>
              {!reviews || reviews.length === 0 ? (
                <div className="text-center py-20 bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-slate-700 italic text-slate-400">
                  No reviews yet. Be the first to share your thoughts!
                </div>
              ) : (
                reviews.map((rev, index) => (
                  <motion.div
                    key={rev.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] shadow-sm border border-slate-100 dark:border-slate-700 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600 font-black">
                          {rev.user?.name ? rev.user.name.charAt(0).toUpperCase() : <User size={24} />}
                        </div>
                        <div>
                          <h4 className="font-bold text-slate-900 dark:text-white">{rev.user?.name || "User"}</h4>
                          <div className="flex items-center gap-1 text-amber-400 mt-1">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star key={star} fill={rev.rating >= star ? "currentColor" : "transparent"} size={14} className={rev.rating >= star ? "" : "text-slate-200"} />
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 text-slate-400 text-sm font-medium">
                        <Calendar size={14} />
                        {new Date(rev.created_at).toLocaleDateString()}
                      </div>
                    </div>
                    <p className="text-slate-600 dark:text-slate-300 font-medium leading-relaxed">
                      {rev.review}
                    </p>
                  </motion.div>
                ))
              )}
            </AnimatePresence>
          )}
        </div>
      </div>
    </div>
  );
};

export default Reviews;
