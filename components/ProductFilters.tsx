'use client';

import SearchInput from '@/components/ui/SearchInput';
import Select from '@/components/ui/Select';
import Button from '@/components/ui/Button';

type SortOption = 'price-low' | 'price-high' | 'recent';

interface ProductFiltersProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  sortBy: SortOption;
  onSortChange: (sort: SortOption) => void;
  onReset: () => void;
  totalResults: number;
  filteredCount: number;
}

export default function ProductFilters({
  searchTerm,
  onSearchChange,
  sortBy,
  onSortChange,
  onReset,
  totalResults,
  filteredCount
}: ProductFiltersProps) {
  return (
    <div className="mb-6 bg-secondary p-4 rounded-lg">
      <div className="flex flex-col md:flex-row gap-4 items-center">
        {/* Search */}
        <div className="flex-1">
          <SearchInput
            placeholder="Search products or vendors..."
            value={searchTerm}
            onSearchChange={onSearchChange}
          />
        </div>

        {/* Sort */}
        <div className="flex items-center gap-2">
          <label className="text-sm font-medium text-gray-700">Sort by:</label>
          <Select
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value as SortOption)}
            options={[
              { value: 'recent', label: 'Most Recent' },
              { value: 'price-low', label: 'Price: Low to High' },
              { value: 'price-high', label: 'Price: High to Low' }
            ]}
          />
        </div>

        {/* Reset Filters */}
        <Button
          variant="secondary"
          onClick={onReset}
        >
          Reset
        </Button>
      </div>

      {/* Results count */}
      <div className="mt-4 text-sm text-gray-600">
        Showing {filteredCount} of {totalResults} products
        {searchTerm && ` for "${searchTerm}"`}
      </div>
    </div>
  );
}