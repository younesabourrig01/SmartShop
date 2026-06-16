import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { Loader2, ShoppingCart } from 'lucide-react';
import { useAppSelector } from '../../store/hooks';
import { useAddToCartMutation } from '../../store/api/cartApi';
import { getImageUrl } from '../../api/client';

interface ProductCardProps {
  id: string | number;
  image: string;
  title: string;
  price: string | number;
}

const ProductCard: React.FC<ProductCardProps> = ({ id, image, title, price }) => {
  const [isAdding, setIsAdding] = useState(false);
  const token = useAppSelector((state) => state.auth.token);
  const navigate = useNavigate();
  const [addToCart] = useAddToCartMutation();

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!token) {
      toast.error('Please log in to add items to cart');
      navigate('/login');
      return;
    }

    setIsAdding(true);
    try {
      await addToCart({ productId: id, quantity: 1 }).unwrap();
      toast.success('Product added to cart!');
    } catch (error: any) {
      console.error(error);
      toast.error(error?.data?.message || 'An error occurred while adding to cart');
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <Link to={`/product/${id}`} className="block h-full">
      <div className="group bg-white dark:bg-slate-900 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 border border-slate-100 dark:border-slate-700 flex flex-col cursor-pointer active:scale-95 h-full">
        {/* Image Container */}
        <div className="relative aspect-square overflow-hidden bg-slate-50 dark:bg-slate-800">
          <img 
            src={getImageUrl(image)} 
            alt={title} 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </div>

        {/* Content */}
        <div className="p-3 md:p-6 flex flex-col flex-grow bg-white dark:bg-slate-900">
          <h3 className="text-sm md:text-lg font-bold text-slate-900 dark:text-white group-hover:text-blue-600 transition-colors duration-300 line-clamp-2 mb-2">
            {title}
          </h3>
          
          <div className="mt-auto flex items-center justify-between gap-1">
            <span className="text-sm md:text-xl font-black text-slate-900 dark:text-white">
              {price} MAD
            </span>
            <button 
              disabled={isAdding}
              onClick={handleAddToCart}
              className="p-2 md:p-3 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition-all duration-300 disabled:opacity-50 shadow-md transform hover:scale-110 active:scale-95 shrink-0"
            >
              {isAdding ? (
                <Loader2 size={15} className="animate-spin" />
              ) : (
                <ShoppingCart size={15} />
              )}
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
