import React, { memo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Clock, User, ArrowLeft, Facebook, Linkedin, Twitter } from 'lucide-react';
import AdsSection from './sections/AdsSection';

const BlogDetail = memo(() => {
  const { blogId } = useParams();
  const navigate = useNavigate();


  const blogs = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=1200&auto=format&fit=crop",
      date: "Oct 20, 2023",
      author: "David Chen",
      title: "5 Tips for Better Business Consultancy",
      readTime: "1 min read",
    }
  ];

  const blog = blogs.find(b => b.id === parseInt(blogId)) || blogs[0];

  return (
    <div className='bg-white min-h-screen py-14 md:py-20'>
      <div className='container mx-auto px-4 max-w-5xl'>
        
        {/* Back Button */}
        <button 
          onClick={() => navigate(-1)}
          className='flex items-center gap-2 text-gray-400 hover:text-[#EAB308] mb-10 transition-colors text-base font-medium'
        >
          <ArrowLeft size={18} />
          Back to Blog
        </button>

        {/* 1. Blog Title -  */}
        <h1 className='text-3xl md:text-4xl lg:text-5xl  text-gray-800 mb-6 leading-tight'>
          {blog.title}
        </h1>

        {/* 2. Meta Information */}
        <div className='flex flex-wrap items-center gap-6 mb-8 text-gray-500'>
          <div className='flex items-center gap-2'>
            <User size={16} className='text-gray-400' />
            <span className='text-base'>{blog.author}</span>
          </div>
          <div className='flex items-center gap-2'>
            <Clock size={16} className='text-gray-400' />
            <span className='text-base'>{blog.readTime}</span>
          </div>
          <div className='text-base'>
            {blog.date}
          </div>
        </div>

        {/* 3. Featured Image -  */}
        <div className='rounded-xl overflow-hidden mb-10'>
          <img 
            src={blog.image} 
            alt={blog.title}
            className='w-full h-auto md:h-150 '
          />
        </div>

        {/* 4. Social Share Icons */}
        <div className='flex items-center gap-4 mb-6'>
          <Facebook size={20} className='text-gray-400 hover:text-[#EAB308] cursor-pointer transition-colors' />
          <Linkedin size={20} className='text-gray-400 hover:text-[#EAB308] cursor-pointer transition-colors' />
          <Twitter size={20} className='text-gray-400 hover:text-[#EAB308] cursor-pointer transition-colors' />
        </div>
        <hr className='border-gray-100 mb-10' />

        {/* 5. Blog Content Area */}
        <div className='max-w-none'>
          {/* Key Takeaways Section */}
          <div className='mb-12'>
            <h2 className='text-2xl  text-gray-800 mb-6'>Key Takeaways</h2>
            <ul className='space-y-4 text-gray-600 text-base list-disc ml-5'>
              <li>Understanding the core principles of consultancy tips.</li>
              <li>Practical steps to implement these insights in your daily life.</li>
              <li>Expert advice from David Chen on navigating modern challenges.</li>
            </ul>
          </div>

          {/* Detailed Content */}
          <div className='text-gray-600 space-y-8 leading-relaxed'>
            <h3 className='text-lg font-bold text-gray-800'># 5 Tips for Better Business Consultancy</h3>
            
            <p className='text-base'>
              Consultancy is more than just giving advice; it's about solving problems and building relationships. 
              When you approach consultancy with integrity and a genuine desire to help your clients succeed, 
              you create lasting value.
            </p>

            {/* Implementation List */}
            <div className='space-y-4 text-base'>
              <p>1. **Listen More Than You Talk**: Understand the client's pain points deeply.</p>
              <p>2. **Be Data-Driven**: Back your recommendations with solid evidence.</p>
              <p>3. **Set Clear Expectations**: Avoid scope creep by defining goals early.</p>
              <p>4. **Focus on Implementation**: A strategy is only as good as its execution.</p>
              <p>5. **Build Long-Term Trust**: Honesty is your most valuable asset.</p>
            </div>
          </div>
        </div>

  
  
      </div>
            {/* 6. Ads Section */}

          <AdsSection />
    </div>
  );
});

BlogDetail.displayName = 'BlogDetail';

export default BlogDetail;