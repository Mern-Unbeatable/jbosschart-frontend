import React, { memo, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Check, CircleCheck, Minus, Plus } from "lucide-react";
import CommonAdsSection from "../../components/CommonAdsSection";

const ProductDetail = memo(() => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);

  const products = [
    {
      id: 1,
      name: "Healing Crystal Set",
      subTitle: "Premium crystal set for energy balance & stress relief",
      description:
        "Healing Crystal Set is carefully designed to help you attract positive energy, reduce stress, and restore emotional and spiritual balance. Each crystal is selected for its unique healing properties and hand-polished to perfection.",
      price: 29.99,
      image:
        "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800&q=80",
      features: [
        "Hand-selected natural crystals",
        "Energy balancing effect",
        "Stress & anxiety reduction",
        "Spiritual healing support",
      ],
      whatsInside: [
        "Amethyst Cluster",
        "Clear Quartz Point",
        "Selenite Wand",
        "Rose Quartz",
        "Black Tourmaline",
      ],
      benefits: [
        "Mental peace",
        "Emotional stability",
        "Positive energy flow",
        "Meditation support",
      ],
      gallery: [
        "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=200&q=80",
        "https://images.unsplash.com/photo-1614362945898-7622673d3284?w=200&q=80",
        "https://images.unsplash.com/photo-1551269901-5c5e14c25df7?w=200&q=80",
        "https://images.unsplash.com/photo-1605101101291-b9c02fd4fba9?w=200&q=80",
        "https://images.unsplash.com/photo-1523301343968-6a6ebf63c672?w=200&q=80",
        "https://images.unsplash.com/photo-1635773103310-86367803450c?w=200&q=80",
      ],
    },
  ];

  const product = products.find((p) => p.id === parseInt(id)) || products[0];

  return (
    <div className="min-h-screen bg-white pt-8 md:pt-12 pb-14 mb:pb-20">
      <div className="container mx-auto px-4 lg:px-6 ">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left: Image & Thumbnails */}
          <div>
            <div className="rounded-2xl overflow-hidden border border-gray-100 shadow-sm mb-4">
              <img
                src={product.gallery[selectedImage]}
                alt={product.name}
                className="w-full h-120 "
              />
            </div>
            <div className="grid grid-cols-6 gap-2">
              {product.gallery.map((img, idx) => (
                <div
                  key={idx}
                  className={`aspect-square rounded-lg overflow-hidden border-2 cursor-pointer hover:border-[#D9A108] transition-all ${selectedImage === idx ? "border-[#D9A108]" : "border-gray-200"}`}
                  onClick={() => setSelectedImage(idx)}
                >
                  <img
                    src={img}
                    alt="gallery"
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Right: Product Info */}
          <div className="flex flex-col">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-1 ">
              {product.name}
            </h1>
            <p className="text-lg text-gray-500 mb-4">{product.subTitle}</p>

            <div className="text-3xl font-bold text-[#E2AB0B] mb-2 ">
              €{product.price.toFixed(2)}
            </div>

            <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2 ">
              Product Description
            </h3>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              {product.description}
            </p>

            <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4 ">
              Features
            </h3>
            <ul className="space-y-3 mb-10">
              {product.features.map((feature, idx) => (
                <li
                  key={idx}
                  className="flex items-center gap-3 text-lg text-gray-600"
                >
                  <div className="text-green-500">
                    <CircleCheck size={18} strokeWidth={2} />
                  </div>
                  {feature}
                </li>
              ))}
            </ul>

            {/* Quantity and Buy Button Row */}
            <div className="flex items-center gap-4">
              <div className="flex items-center border border-gray-300 rounded-md h-12">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="px-3 text-gray-500 hover:text-black"
                >
                  <Minus size={16} />
                </button>
                <span className="px-4 font-bold text-gray-700">{quantity}</span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="px-3 text-gray-500 hover:text-black"
                >
                  <Plus size={16} />
                </button>
              </div>
              <button 
                onClick={() => navigate('/checkout', { state: { product, quantity } })}
                className="flex-1 bg-[#E2AB0B] text-white font-bold h-12 rounded-md shadow-sm transition-all text-base hover:bg-[#d99a00]"
              >
                Buy Now
              </button>
            </div>
          </div>
        </div>

        {/* What's Inside & Benefits Horizontal Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-20">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6 ">
              What's Inside
            </h2>
            <div className="flex flex-wrap gap-2">
              {product.whatsInside.map((item, idx) => (
                <span
                  key={idx}
                  className="px-5 py-2.5 bg-[#F2F2F2] text-gray-600 rounded-lg text-base font-medium"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6 ">
              Benefits
            </h2>
            <div className="flex flex-wrap gap-2">
              {product.benefits.map((benefit, idx) => (
                <span
                  key={idx}
                  className="px-5 py-2.5 bg-[#F2F2F2] text-gray-600 rounded-lg text-base font-medium"
                >
                  {benefit}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Ads Placeholder - Match the dashed look from image */}
        <CommonAdsSection
          wrapperClassName='mt-24'
          containerClassName='px-0'
          boxClassName='w-full h-44 md:h-56 lg:h-72 bg-[#F1F5F9] rounded-xl border border-dashed border-gray-300 flex items-center justify-center group'
          title='Advertisement Area'
          titleClassName='text-black font-bold text-2xl tracking-widest uppercase'
        />
        {/* <div className="w-full mt-24 h-44 bg-[#F8FAFC] rounded-2xl border border-dashed border-gray-300 flex items-center justify-center">
          <span className="text-gray-400 font-bold text-2xl tracking-widest">
            Ads
          </span>
        </div> */}
      </div>
    </div>
  );
});

ProductDetail.displayName = "ProductDetail";

export default ProductDetail;
