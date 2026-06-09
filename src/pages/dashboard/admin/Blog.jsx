import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {
  CalendarDays,
  ImagePlus,
  PenLine,
  Trash2,
  User,
  X,
} from 'lucide-react';

const BLOG_CATEGORIES = [
  'All',
  'Spiritual Guidance',
  'Consultancy Tips',
  'Platform Updates',
  'Articles',
];

const INITIAL_BLOG_ITEMS = [
  {
    id: 1,
    category: 'Spiritual Guidance',
    title: 'Finding Inner Peace in a Chaotic World',
    description:
      'Discover practical steps to maintain your spiritual balance amidst the daily hustle and bustle of modern life.',
    date: 'Oct 24, 2023',
    author: 'Sarah Jenkins',
    image:
      'https://www.figma.com/api/mcp/asset/4c79d3c9-261a-4ed8-9dfe-5cf588879408',
  },
  {
    id: 2,
    category: 'Consultancy Tips',
    title: '5 Tips for Better Business Consultancy',
    description:
      'Learn the core principles that will help you build trust and deliver exceptional value to your clients.',
    date: 'Oct 24, 2023',
    author: 'Sarah Jenkins',
    image:
      'https://www.figma.com/api/mcp/asset/7c063aa3-f477-4dd5-8818-e5bbd51980eb',
  },
  {
    id: 3,
    category: 'Platform Updates',
    title: 'SoulGuide Platform Update: Version 2.0',
    description:
      'We are excited to announce new features including real-time chat and enhanced spiritual matching algorithms.',
    date: 'Oct 24, 2023',
    author: 'Sarah Jenkins',
    image:
      'https://www.figma.com/api/mcp/asset/1764a59e-6ca6-4456-bbec-f4bffb8f55c4',
  },
  {
    id: 4,
    category: 'Articles',
    title: 'Finding Inner Peace in a Chaotic World',
    description:
      'Discover practical steps to maintain your spiritual balance amidst the daily hustle and bustle of modern life.',
    date: 'Oct 24, 2023',
    author: 'Sarah Jenkins',
    image:
      'https://www.figma.com/api/mcp/asset/77d56286-0319-4293-8d0e-48ca15ff077f',
  },
];

const EMPTY_FORM = {
  name: '',
  title: '',
  category: 'Spiritual Guidance',
  description: '',
  image: '',
};

const MODAL_CLOSE_ANIMATION_MS = 280;

const Blog = () => {
  const [blogs, setBlogs] = useState(INITIAL_BLOG_ITEMS);
  const [activeCategory, setActiveCategory] = useState('All');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalClosing, setIsModalClosing] = useState(false);
  const [editingBlogId, setEditingBlogId] = useState(null);
  const [formData, setFormData] = useState(EMPTY_FORM);
  const [pendingReset, setPendingReset] = useState(false);
  const fileInputRef = useRef(null);
  const closeTimerRef = useRef(null);

  const filteredBlogs = useMemo(() => {
    if (activeCategory === 'All') return blogs;
    return blogs.filter((blog) => blog.category === activeCategory);
  }, [activeCategory, blogs]);

  const handleCloseModal = useCallback(() => {
    if (!isModalOpen || isModalClosing) return;

    setIsModalClosing(true);

    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
    }

    closeTimerRef.current = setTimeout(() => {
      setIsModalOpen(false);
      setIsModalClosing(false);
      if (pendingReset) {
        setEditingBlogId(null);
        setFormData(EMPTY_FORM);
        setPendingReset(false);
      }
      closeTimerRef.current = null;
    }, MODAL_CLOSE_ANIMATION_MS);
  }, [isModalClosing, isModalOpen, pendingReset]);

  useEffect(() => {
    if (!isModalOpen) return undefined;

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        handleCloseModal();
      }
    };

    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleCloseModal, isModalOpen]);

  useEffect(
    () => () => {
      if (closeTimerRef.current) {
        clearTimeout(closeTimerRef.current);
      }
    },
    [],
  );

  const handleOpenCreate = () => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
    setIsModalClosing(false);
    setPendingReset(false);
    setEditingBlogId(null);
    setFormData(EMPTY_FORM);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (blog) => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
    setIsModalClosing(false);
    setPendingReset(false);
    setEditingBlogId(blog.id);
    setFormData({
      name: blog.author,
      title: blog.title,
      category: blog.category,
      description: blog.description,
      image: blog.image,
    });
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    setBlogs((prevBlogs) => prevBlogs.filter((blog) => blog.id !== id));
  };

  const handleFieldChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleImageChange = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      setFormData((prev) => ({ ...prev, image: String(reader.result || '') }));
    };
    reader.readAsDataURL(file);
  };

  const handleSave = (event) => {
    event.preventDefault();

    const preparedTitle = formData.title.trim();
    const preparedDescription = formData.description.trim();
    const preparedAuthor = formData.name.trim() || 'Admin';

    if (!preparedTitle || !preparedDescription) return;

    if (editingBlogId) {
      setBlogs((prevBlogs) =>
        prevBlogs.map((blog) =>
          blog.id === editingBlogId
            ? {
                ...blog,
                author: preparedAuthor,
                title: preparedTitle,
                category: formData.category,
                description: preparedDescription,
                image: formData.image || blog.image,
              }
            : blog,
        ),
      );
    } else {
      const nextId = blogs.length
        ? Math.max(...blogs.map((blog) => blog.id)) + 1
        : 1;

      setBlogs((prevBlogs) => [
        {
          id: nextId,
          author: preparedAuthor,
          title: preparedTitle,
          category: formData.category,
          description: preparedDescription,
          image:
            formData.image ||
            'https://www.figma.com/api/mcp/asset/4c79d3c9-261a-4ed8-9dfe-5cf588879408',
          date: new Date().toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
          }),
        },
        ...prevBlogs,
      ]);
    }

    setPendingReset(true);
    handleCloseModal();
  };

  const isEditMode = Boolean(editingBlogId);

  return (
    <section className='space-y-8'>
      <header className='flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between'>
        <div className='space-y-2'>
          <h1 className='dashboard-page-title'>Blog</h1>
          <p className='max-w-3xl text-base text-[#464646] leading-6'>
            Create, manage, and publish articles to engage your audience and
            share valuable insights.
          </p>
        </div>

        <button
          type='button'
          onClick={handleOpenCreate}
          className='self-start rounded-md bg-[#E2AB0B] px-6 py-3 text-base font-medium text-white transition hover:brightness-95'
        >
          Add New Blog
        </button>
      </header>

      <div className='flex flex-wrap gap-3'>
        {BLOG_CATEGORIES.map((category) => {
          const isActive = activeCategory === category;
          return (
            <button
              key={category}
              type='button'
              onClick={() => setActiveCategory(category)}
              className={`rounded-full border px-3 py-1.5 text-base font-normal leading-6 transition-colors ${
                isActive
                  ? 'border-[#333333] bg-[#333333] text-white'
                  : 'border-black/12 bg-white text-[#333333] hover:bg-gray-50'
              }`}
            >
              {category}
            </button>
          );
        })}
      </div>

      <div className='grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4'>
        {filteredBlogs.map((blog) => (
          <article
            key={blog.id}
            className='flex h-full flex-col rounded-2xl border border-[#e2ab0b]/30 bg-white p-4'
          >
            <img
              src={blog.image}
              alt={blog.title}
              className='h-48 w-full rounded-lg object-cover sm:h-56 lg:h-64'
              loading='lazy'
            />

            <div className='flex flex-1 flex-col pt-4'>
              <div className='flex flex-wrap items-center gap-3 text-sm text-[#545454]'>
                <span className='inline-flex items-center gap-1'>
                  <CalendarDays size={14} aria-hidden='true' />
                  {blog.date}
                </span>
                <span className='inline-flex items-center gap-1'>
                  <User size={14} aria-hidden='true' />
                  {blog.author}
                </span>
              </div>

              <h2
                className='mt-3 text-xl font-medium leading-tight text-[#333333]'
                style={{ fontFamily: "'Crimson Pro', Georgia, serif" }}
              >
                {blog.title}
              </h2>

              <p className='mt-2 text-sm leading-relaxed text-[#545454] line-clamp-3'>
                {blog.description}
              </p>

              <div className='mt-5 grid grid-cols-2 gap-3'>
                <button
                  type='button'
                  onClick={() => handleOpenEdit(blog)}
                  className='inline-flex items-center justify-center gap-2 rounded border border-[#E2AB0B] bg-[#E2AB0B] px-4 py-2.5 text-base text-white transition hover:brightness-95'
                >
                  <PenLine size={16} aria-hidden='true' />
                  Edit
                </button>

                <button
                  type='button'
                  onClick={() => handleDelete(blog.id)}
                  className='inline-flex items-center justify-center gap-2 rounded border border-[#6E35AE] bg-white px-4 py-2.5 text-base text-[#6E35AE] transition hover:bg-[#F8F4FD]'
                >
                  <Trash2 size={16} aria-hidden='true' />
                  Delete
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>

      {isModalOpen && (
        <div
          className={`fixed inset-0 z-40 flex items-center justify-center bg-black/55 px-4 ${
            isModalClosing
              ? 'animate-modal-overlay-out'
              : 'animate-modal-overlay'
          } ${isModalClosing ? 'pointer-events-none' : ''}`}
          aria-modal='true'
          role='dialog'
        >
          <div
            className={`w-full max-w-160 rounded-lg bg-white p-4 sm:p-5 shadow-2xl ${
              isModalClosing ? 'animate-modal-panel-out' : 'animate-modal-panel'
            }`}
          >
            <div className='mb-4 flex items-center justify-between'>
              <h2 className='text-[32px] leading-9 font-medium text-[#333333]'>
                {isEditMode ? 'Edit Blog' : 'Add Blog'}
              </h2>
              <button
                type='button'
                onClick={handleCloseModal}
                className='inline-flex h-8 w-8 items-center justify-center rounded-full bg-white text-[#545454] transition hover:bg-gray-100'
                aria-label='Close form'
              >
                <X size={16} aria-hidden='true' />
              </button>
            </div>

            <form className='space-y-3' onSubmit={handleSave}>
              <label className='block'>
                <span className='mb-1 block text-base text-[#333333]'>
                  Name
                </span>
                <input
                  type='text'
                  value={formData.name}
                  onChange={(e) => handleFieldChange('name', e.target.value)}
                  placeholder='Enter your name'
                  className='w-full rounded bg-[#E8E8E8] px-3 py-2.5 text-base text-[#333333] outline-none ring-1 ring-transparent placeholder:text-[#8A8A8A] focus:ring-[#E2AB0B]'
                />
              </label>

              <label className='block'>
                <span className='mb-1 block text-base text-[#333333]'>
                  Title
                </span>
                <input
                  type='text'
                  value={formData.title}
                  onChange={(e) => handleFieldChange('title', e.target.value)}
                  placeholder='Enter membership title here'
                  className='w-full rounded bg-[#E8E8E8] px-3 py-2.5 text-base text-[#333333] outline-none ring-1 ring-transparent placeholder:text-[#8A8A8A] focus:ring-[#E2AB0B]'
                  required
                />
              </label>

              <label className='block'>
                <span className='mb-1 block text-base text-[#333333]'>
                  Category
                </span>
                <select
                  value={formData.category}
                  onChange={(e) =>
                    handleFieldChange('category', e.target.value)
                  }
                  className='w-full rounded bg-[#E8E8E8] px-3 py-2.5 text-base text-[#333333] outline-none ring-1 ring-transparent focus:ring-[#E2AB0B]'
                >
                  {BLOG_CATEGORIES.filter((item) => item !== 'All').map(
                    (category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ),
                  )}
                </select>
              </label>

              <label className='block'>
                <span className='mb-1 block text-base text-[#333333]'>
                  Description
                </span>
                <textarea
                  value={formData.description}
                  onChange={(e) =>
                    handleFieldChange('description', e.target.value)
                  }
                  rows={4}
                  placeholder='Write detailed product description'
                  className='w-full resize-none rounded bg-[#E8E8E8] px-3 py-2.5 text-base text-[#333333] outline-none ring-1 ring-transparent placeholder:text-[#8A8A8A] focus:ring-[#E2AB0B]'
                  required
                />
              </label>

              <div>
                <span className='mb-1 block text-base text-[#333333]'>
                  Upload Image
                </span>
                <input
                  ref={fileInputRef}
                  type='file'
                  accept='image/*'
                  onChange={handleImageChange}
                  className='hidden'
                />
                <button
                  type='button'
                  onClick={() => fileInputRef.current?.click()}
                  className='relative flex h-24 w-full items-center justify-center rounded bg-[#E0E0E0] text-[#8A8A8A] transition hover:bg-[#D6D6D6]'
                >
                  {formData.image ? (
                    <img
                      src={formData.image}
                      alt='Blog preview'
                      className='h-full w-full rounded object-cover'
                    />
                  ) : (
                    <ImagePlus size={20} aria-hidden='true' />
                  )}
                </button>
              </div>

              <button
                type='submit'
                className='rounded bg-[#E2AB0B] px-5 py-2 text-base font-medium text-white transition hover:brightness-95'
              >
                Save
              </button>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};

export default Blog;
