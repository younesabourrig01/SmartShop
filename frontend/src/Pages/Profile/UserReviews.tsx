import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { 
  ArrowLeft, 
  MessageSquare, 
  Star as StarIcon, 
  Trash2, 
  Calendar,
  ShoppingBag
} from "lucide-react";
import toast from "react-hot-toast";
import { getReviewsByUser, deleteReview } from "../../api/reviews";
import PageLoader from "../../components/Loader/PageLoader";
import { API_BASE_URL } from "../../api/client";
import { motion, AnimatePresence } from "framer-motion";
import DeleteConfirm from "../../components/Dashboard/DeleteConfirm";

interface Product {
  id: number;
  name: string;
  images: { url: string }[];
}

interface UserReview {
  id: number;
  product_id: number;
  review: string;
  rating: number;
  created_at: string;
  product: Product;
}

const UserReviews: React.FC = () => {
  const { t } = useTranslation();
  const [reviews, setReviews] = useState<UserReview[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deletingReview, setDeletingReview] = useState<UserReview | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchReviews = async () => {
    try {
      const res = await getReviewsByUser();
      setReviews(res.data.reviews || []);
    } catch (error) {
      console.error("Error fetching reviews:", error);
      toast.error("Failed to load your reviews");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const handleDeleteClick = (review: UserReview) => {
    setDeletingReview(review);
    setIsModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!deletingReview) return;
    
    setIsDeleting(true);
    try {
      const res = await deleteReview(deletingReview.product_id);
      if (res.data.status === 'success') {
        toast.success(res.data.message || "Review deleted successfully");
        setReviews(reviews.filter(r => r.id !== deletingReview.id));
        setIsModalOpen(false);
      }
    } catch (error) {
      console.error("Error deleting review:", error);
      toast.error("Failed to delete review");
    } finally {
      setIsDeleting(false);
      setDeletingReview(null);
    }
  };

  return (
    <div className="min-h-screen bg-[#f3f4f6] dark:bg-slate-950 pb-20 pt-24 text-slate-800 dark:text-slate-100">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div className="flex items-center gap-6">
            <Link 
              to="/profile" 
              className="p-3 bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 hover:bg-blue-50 hover:text-blue-600 transition-all hover:-translate-x-1 group"
            >
              <ArrowLeft size={24} />
            </Link>
            <div>
              <h1 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight flex items-center gap-4">
                <MessageSquare className="text-blue-600" size={32} />
                {t('profile.reviews.title', 'Your Reviews')}
              </h1>
              <p className="text-slate-400 font-bold mt-1">Manage and track all your feedback in one place.</p>
            </div>
          </div>
          <div className="bg-white dark:bg-slate-900 px-6 py-3 rounded-2xl border border-white dark:border-slate-800 shadow-sm font-black text-slate-900 dark:text-white">
            <span className="text-blue-600">{reviews.length}</span> {t('profile.reviews.count', 'Reviews Total')}
          </div>
        </div>

        {/* Reviews List */}
        <div className="space-y-6 relative min-h-[400px]">
          {isLoading ? (
            <div className="absolute inset-0 flex items-center justify-center">
              <PageLoader />
            </div>
          ) : reviews.length > 0 ? (
            <AnimatePresence mode="popLayout">
              {reviews.map((rev, index) => (
                <motion.div
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ delay: index * 0.05 }}
                  key={rev.id} 
                  className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-white dark:border-slate-800 shadow-xl shadow-slate-200/40 dark:shadow-none overflow-hidden group hover:shadow-2xl hover:shadow-slate-300/50 dark:shadow-none transition-all duration-500"
                >
                  <div className="p-8 md:p-10">
                    <div className="flex flex-col sm:flex-row gap-8 items-start">
                      {/* Product Thumbnail */}
                      <div className="w-24 h-24 rounded-3xl overflow-hidden bg-slate-50 dark:bg-slate-800 shadow-inner border border-slate-100 dark:border-slate-700 shrink-0 relative group-hover:scale-110 transition-transform duration-500">
                        <img 
                          src={rev.product?.images?.[0]?.url?.startsWith('http') 
                            ? rev.product.images[0].url 
                            : `${API_BASE_URL}${rev.product?.images?.[0]?.url || ""}`}
                          alt={rev.product?.name}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                          <div>
                            <h3 className="text-xl font-black text-slate-900 dark:text-white tracking-tight group-hover:text-blue-600 transition-colors uppercase">
                              {rev.product?.name || "Product Name"}
                            </h3>
                            <div className="flex items-center gap-3 mt-2">
                              <div className="flex items-center gap-1 text-amber-400 bg-amber-50 px-3 py-1 rounded-full border border-amber-100">
                                {[1, 2, 3, 4, 5].map((star) => (
                                  <StarIcon key={star} size={14} fill={rev.rating >= star ? "currentColor" : "none"} className={rev.rating >= star ? "" : "text-slate-200"} />
                                ))}
                              </div>
                              <span className="h-1 w-1 bg-slate-200 rounded-full" />
                              <div className="flex items-center gap-2 text-slate-400 text-xs font-black uppercase tracking-widest">
                                <Calendar size={12} />
                                {new Date(rev.created_at).toLocaleDateString()}
                              </div>
                            </div>
                          </div>

                          <button
                            onClick={() => handleDeleteClick(rev)}
                            className="p-4 bg-rose-50 text-rose-500 hover:bg-rose-600 hover:text-white rounded-2xl transition-all shadow-sm border border-rose-100 active:scale-95 transition-colors"
                          >
                            <Trash2 size={20} />
                          </button>
                        </div>

                        <div className="relative">
                          <div className="absolute -left-6 top-0 text-slate-100 font-serif text-6xl leading-none">“</div>
                          <p className="text-slate-600 dark:text-slate-300 font-medium text-lg leading-relaxed relative z-10 pl-2">
                            {rev.review}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Decorative bar */}
                  <div className="h-1.5 w-full bg-slate-50 dark:bg-slate-800 group-hover:bg-blue-600 transition-colors" />
                </motion.div>
              ))}
            </AnimatePresence>
          ) : (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-white dark:border-slate-800 shadow-sm p-20 text-center"
            >
              <div className="w-24 h-24 bg-slate-50 dark:bg-slate-800 rounded-full flex items-center justify-center text-slate-200 mx-auto mb-8">
                <ShoppingBag size={48} />
              </div>
              <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-2">{t('profile.reviews.no_reviews', 'No feedback yet')}</h2>
              <p className="text-slate-400 font-bold mb-8">You haven't written any reviews for the items you've purchased.</p>
              <Link to="/products" className="inline-flex items-center gap-2 px-8 py-4 bg-slate-900 text-white rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-blue-600 transition-all shadow-lg shadow-slate-200 dark:shadow-none">
                Explore Products <ArrowLeft size={18} className="rotate-180" />
              </Link>
            </motion.div>
          )}
        </div>
      </div>

      <DeleteConfirm 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirmDelete}
        title="Delete Review"
        message={`Are you sure you want to delete your review for "${deletingReview?.product?.name}"? This action cannot be undone.`}
        isLoading={isDeleting}
      />
    </div>
  );
};

export default UserReviews;
