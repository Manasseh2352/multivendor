'use client';

import { useEffect, useState, useMemo } from 'react';
import ProductCard from '@/components/ui/ProductCard';
import Button from '@/components/ui/Button';
import ProductFilters from '@/components/ProductFilters';
import Loading from '@/components/ui/Loading';

interface Product {
  id: number;
  name: string;
  price: number;
}

interface Vendor {
  id: string;
  name: string;
  slug: string;
  description: string;
  category: string;
  products: Product[];
  rating: number;
  totalProducts: number;
}

type SortOption = 'price-low' | 'price-high' | 'recent';

export default function Products() {
  const [allProducts, setAllProducts] = useState<Array<{product: Product, vendorName: string}>>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<SortOption>('recent');
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 6;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/api/vendors');
        const data = await response.json();

        if (data.success) {
          // Flatten all products from all vendors with vendor info
          const allProducts = data.data.flatMap((vendor: Vendor) =>
            vendor.products.map(product => ({
              product,
              vendorName: vendor.name
            }))
          );
          setAllProducts(allProducts);
        } else {
          setError(data.message || 'Failed to fetch products');
        }
      } catch (err) {
        setError('Failed to fetch products');
        console.error('Error fetching products:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Filter and sort products
  const filteredAndSortedProducts = useMemo(() => {
    let filtered = allProducts.filter(item =>
      item.product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.vendorName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.product.price - b.product.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.product.price - a.product.price);
        break;
      case 'recent':
        // For demo purposes, sort by ID (assuming higher ID = more recent)
        filtered.sort((a, b) => b.product.id - a.product.id);
        break;
    }

    return filtered;
  }, [allProducts, searchTerm, sortBy]);

  // Pagination
  const totalPages = Math.ceil(filteredAndSortedProducts.length / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const paginatedProducts = filteredAndSortedProducts.slice(startIndex, startIndex + productsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const resetFilters = () => {
    setSearchTerm('');
    setSortBy('recent');
    setCurrentPage(1);
  };

  if (loading) {
    return (
      <Loading
        size="lg"
        text="Loading products..."
        className="min-h-[400px]"
      />
    );
  }

  if (error) {
    return (
      <div className="container mx-auto p-8">
        <div className="text-center text-red-600">
          <p>Error: {error}</p>
          <Button
            onClick={() => window.location.reload()}
            className="mt-4"
          >
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-8">
      <h2 className="text-2xl font-bold mb-6">All Products</h2>

      <ProductFilters
        searchTerm={searchTerm}
        onSearchChange={(value) => {
          setSearchTerm(value);
          setCurrentPage(1); // Reset to first page when searching
        }}
        sortBy={sortBy}
        onSortChange={setSortBy}
        onReset={resetFilters}
        totalResults={allProducts.length}
        filteredCount={filteredAndSortedProducts.length}
      />

      {/* Products Grid */}
      {paginatedProducts.length > 0 ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {paginatedProducts.map((item) => (
              <ProductCard
                key={item.product.id}
                product={item.product}
                vendorName={item.vendorName}
              />
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex flex-wrap justify-center items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="hidden sm:flex"
              >
                Previous
              </Button>

              {/* Mobile Previous */}
              <Button
                variant="outline"
                size="sm"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="sm:hidden"
              >
                ‹
              </Button>

              {Array.from({ length: totalPages }, (_, i) => i + 1)
                .filter((page) => {
                  // On mobile, show only current page and adjacent pages
                  const isMobile = typeof window !== 'undefined' && window.innerWidth < 640;
                  if (isMobile) {
                    return Math.abs(page - currentPage) <= 1 || page === 1 || page === totalPages;
                  }
                  return true;
                })
                .map((page, index, array) => (
                  <div key={page} className="flex items-center">
                    {/* Add ellipsis for mobile */}
                    {typeof window !== 'undefined' && window.innerWidth < 640 &&
                     index > 0 && array[index - 1] !== page - 1 && (
                      <span className="px-2 text-gray-400">...</span>
                    )}
                    <Button
                      variant={currentPage === page ? 'primary' : 'outline'}
                      size="sm"
                      onClick={() => handlePageChange(page)}
                    >
                      {page}
                    </Button>
                  </div>
                ))}

              <Button
                variant="outline"
                size="sm"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="hidden sm:flex"
              >
                Next
              </Button>

              {/* Mobile Next */}
              <Button
                variant="outline"
                size="sm"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="sm:hidden"
              >
                ›
              </Button>
            </div>
          )}
        </>
      ) : (
        <div className="text-center text-gray-500 mt-8">
          <p className="text-lg mb-2">No products found</p>
          <p className="text-sm">Try adjusting your search or filters</p>
          {(searchTerm || sortBy !== 'recent') && (
            <Button
              onClick={resetFilters}
              className="mt-4"
            >
              Clear Filters
            </Button>
          )}
        </div>
      )}
    </div>
  );
}