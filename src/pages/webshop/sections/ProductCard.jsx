import React, { memo } from "react";
import { useNavigate } from 'react-router-dom';

const ProductCard = memo(({ product }) => {
  const navigate = useNavigate();
  const handleDetailsClick = (e) => {
    e.stopPropagation();
    navigate(`/webshop/${product.id}`);
  };
  return (
    <div className="bg-white rounded-xl overflow-hidden border border-[#E2AB0B] shadow-sm p-3 flex flex-col h-full">
      {/* Image Container with Inset padding and border */}
      <div className="relative aspect-square mb-4 rounded-lg overflow-hidden border border-gray-100">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        />
      </div>

      {/* Product Details */}
      <div className="flex flex-col grow px-1">
        <h3 className="text-2xl font-semibold text-gray-800 mb-2  leading-tight">
          {product.name}
        </h3>

        <p className="text-base h-12 text-gray-600 mb-4 line-clamp-3 leading-relaxed">
          {product.description}
        </p>

        <div className="text-2xl font-semibold text-gray-900 mb-4 ">
          €{product.price.toFixed(2)}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 mt-auto pb-1">
          <button className="flex-1 bg-[#E2AB0B]  text-white text-base  py-2.5 rounded-lg">
            Buy Now
          </button>

          <button className="flex-1 border border-[#6E35AE]  text-[#6E35AE] text-base  py-2.5 rounded-lg" onClick={handleDetailsClick}>
            Details
          </button>
        </div>
      </div>
    </div>
  );
});

ProductCard.displayName = "ProductCard";

export default ProductCard;
