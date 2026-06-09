import React, { memo, useMemo } from 'react';
import ProductCard from './ProductCard';
import Pagination from '../../../components/Pagination';

const WebshopGrid = memo(({ products, selectedCategory }) => {
  const itemsPerPage = 8;
  const [currentPage, setCurrentPage] = React.useState(1);

  // Filter products based on category
  const filteredProducts = useMemo(() => {
    if (selectedCategory === 'All') {
      return products;
    }
    return products.filter((p) => p.category === selectedCategory);
  }, [products, selectedCategory]);

  // Pagination
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedProducts = filteredProducts.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className='container mx-auto px-4 py-10'>
      {/* Products Grid */}
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12'>
        {paginatedProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
});

WebshopGrid.displayName = 'WebshopGrid';

export default WebshopGrid;
