import React, { useMemo, useState, useRef, useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, CircleCheck } from 'lucide-react';
import { gsap } from 'gsap';
import { ROUTES } from '../../../config';

const IMG_MAIN =
  'https://www.figma.com/api/mcp/asset/a210cb64-a86e-4731-a765-c53d8334de62';
const IMG_GALLERY_1 =
  'https://www.figma.com/api/mcp/asset/3d506a90-1c78-420d-962b-cf327cd4e3f3';
const IMG_GALLERY_2 =
  'https://www.figma.com/api/mcp/asset/218166e0-2ffd-4a06-b268-90054d4e8bc9';
const IMG_GALLERY_3 =
  'https://www.figma.com/api/mcp/asset/42432986-5679-4541-8b61-c1c9fc6885fb';
const IMG_GALLERY_4 =
  'https://www.figma.com/api/mcp/asset/511976b4-66fa-4dc3-b299-c22140a1869d';
const IMG_GALLERY_5 =
  'https://www.figma.com/api/mcp/asset/b0dab1e1-944c-4e88-9892-d7947c222aa4';
const IMG_GALLERY_6 =
  'https://www.figma.com/api/mcp/asset/a7cf43a1-71d4-45ba-92d8-22250dad4877';

const BASE_FEATURES = [
  'Hand-selected natural crystals',
  'Energy balancing effect',
  'Stress & anxiety reduction',
  'Spiritual healing support',
];

const WHATS_INSIDE = [
  'Amethyst Cluster',
  'Clear Quartz Point',
  'Selenite Wand',
  'Rose Quartz',
  'Black Tourmaline',
];

const BENEFITS = [
  'Mental peace',
  'Emotional stability',
  'Positive energy flow',
  'Meditation support',
];

const GALLERY = [
  IMG_GALLERY_1,
  IMG_GALLERY_2,
  IMG_GALLERY_3,
  IMG_GALLERY_4,
  IMG_GALLERY_5,
  IMG_GALLERY_6,
];

const ProductView = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { productId } = useParams();

  const stateProduct = location.state?.product;

  const product = useMemo(() => {
    if (stateProduct) return stateProduct;
    return {
      id: Number(productId) || 1,
      name: 'Healing Crystal Set',
      description: 'Premium crystal set for energy balance & stress relief',
      price: 29.99,
      image: IMG_MAIN,
      category: 'Spiritual Items',
    };
  }, [productId, stateProduct]);

  const [activeImage, setActiveImage] = useState(product.image || IMG_MAIN);
  const wrapRef = useRef(null);

  useEffect(() => {
    if (!wrapRef.current) return;
    const cards = wrapRef.current.querySelectorAll('.anim-card');
    gsap.fromTo(
      cards,
      { opacity: 0, y: 18 },
      { opacity: 1, y: 0, stagger: 0.07, duration: 0.35, ease: 'power2.out' },
    );
  }, [product.id]);

  return (
    <div ref={wrapRef} className='flex flex-col gap-6'>
      <button
        type='button'
        onClick={() => navigate(ROUTES.ADMIN_WEBSHOP)}
        className='inline-flex items-center gap-2 text-sm font-medium text-[#E2AB0B] w-fit hover:opacity-80 transition-opacity'
      >
        <ArrowLeft size={16} />
        Back
      </button>

      <div className='anim-card grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-6 lg:gap-10'>
        <div className='flex flex-col gap-3'>
          <div className='w-full aspect-[4/3] rounded-lg overflow-hidden bg-gray-50 border border-gray-100'>
            <img
              src={activeImage}
              alt={product.name}
              className='w-full h-full object-contain'
            />
          </div>

          <div className='grid grid-cols-6 gap-2'>
            {[product.image || IMG_MAIN, ...GALLERY.slice(0, 5)].map(
              (img, i) => (
                <button
                  key={`${img}-${i}`}
                  type='button'
                  onClick={() => setActiveImage(img)}
                  className={`aspect-square rounded overflow-hidden border transition-colors ${
                    activeImage === img
                      ? 'border-[#E2AB0B]'
                      : 'border-transparent hover:border-gray-200'
                  }`}
                  aria-label={`Preview image ${i + 1}`}
                >
                  <img
                    src={img}
                    alt={`${product.name} preview ${i + 1}`}
                    className='w-full h-full object-cover'
                  />
                </button>
              ),
            )}
          </div>
        </div>

        <div className='flex flex-col gap-6 justify-center'>
          <div className='flex flex-col gap-2'>
            <h1
              className='text-3xl md:text-4xl font-medium text-[#333] leading-tight'
              style={{ fontFamily: "'Crimson Pro', Georgia, serif" }}
            >
              {product.name}
            </h1>
            <p className='text-base md:text-lg text-[#545454]'>
              {product.description}
            </p>
            <p
              className='text-3xl md:text-4xl font-medium text-[#E2AB0B]'
              style={{ fontFamily: "'Crimson Pro', Georgia, serif" }}
            >
              {'\u20AC'}
              {Number(product.price || 0).toFixed(2)}
            </p>
          </div>

          <div className='flex flex-col gap-3'>
            <h2
              className='text-2xl md:text-3xl font-medium text-[#333]'
              style={{ fontFamily: "'Crimson Pro', Georgia, serif" }}
            >
              Product Description
            </h2>
            <div className='h-px bg-[#d4d4d4]' />
            <p className='text-base md:text-lg text-[#545454] leading-relaxed'>
              Healing Crystal Set is carefully designed to help you attract
              positive energy, reduce stress, and restore emotional and
              spiritual balance. Each crystal is selected for its unique healing
              properties and hand-polished to perfection.
            </p>
          </div>

          <div className='flex flex-col gap-3'>
            <h2
              className='text-2xl md:text-3xl font-medium text-[#333]'
              style={{ fontFamily: "'Crimson Pro', Georgia, serif" }}
            >
              Features
            </h2>
            <div className='flex flex-col gap-2'>
              {BASE_FEATURES.map((item) => (
                <div key={item} className='flex items-center gap-2.5'>
                  <CircleCheck size={20} className='text-[#22C55E]' />
                  <p className='text-base md:text-lg text-[#545454]'>{item}</p>
                </div>
              ))}
            </div>
          </div>

          <button
            type='button'
            onClick={() =>
              navigate(ROUTES.ADMIN_WEBSHOP_ADD_PRODUCT, {
                state: {
                  mode: 'edit',
                  product: {
                    ...product,
                    longDescription:
                      'Healing Crystal Set is carefully designed to help you attract positive energy, reduce stress, and restore emotional and spiritual balance. Each crystal is selected for its unique healing properties and hand-polished to perfection.',
                    features: BASE_FEATURES,
                    inside: WHATS_INSIDE,
                    benefits: BENEFITS,
                  },
                },
              })
            }
            className='w-fit bg-[#E2AB0B] text-white px-6 py-2.5 rounded text-base font-medium hover:bg-[#c99809] transition-colors'
          >
            Edit Product
          </button>
        </div>
      </div>

      <div className='anim-card grid grid-cols-1 xl:grid-cols-2 gap-6'>
        <div className='flex flex-col gap-4'>
          <h3
            className='text-2xl md:text-3xl font-medium text-[#333]'
            style={{ fontFamily: "'Crimson Pro', Georgia, serif" }}
          >
            What's Inside
          </h3>
          <div className='flex flex-wrap gap-3'>
            {WHATS_INSIDE.map((item) => (
              <span
                key={item}
                className='px-5 py-2.5 rounded-lg bg-[#f2f2f2] text-[#545454] text-base'
              >
                {item}
              </span>
            ))}
          </div>
        </div>

        <div className='flex flex-col gap-4'>
          <h3
            className='text-2xl md:text-3xl font-medium text-[#333]'
            style={{ fontFamily: "'Crimson Pro', Georgia, serif" }}
          >
            Benefits
          </h3>
          <div className='flex flex-wrap gap-3'>
            {BENEFITS.map((item) => (
              <span
                key={item}
                className='px-5 py-2.5 rounded-lg bg-[#f2f2f2] text-[#545454] text-base'
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductView;
