import { Search, Trash2 } from 'lucide-react';
import { FilterType } from '@/types';
import clsx from 'clsx';

type FilterBarProps = {
  filter: FilterType;
  setFilter: (f: FilterType) => void;
  categoryFilter: string;
  setCategoryFilter: (c: string) => void;
  categories: string[];
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  clearCompleted: () => void;
  completedCount: number;
};

const FILTERS: { value: FilterType; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'active', label: 'Active' },
  { value: 'completed', label: 'Completed' },
];

export default function FilterBar({
  filter,
  setFilter,
  categoryFilter,
  setCategoryFilter,
  categories,
  searchQuery,
  setSearchQuery,
  clearCompleted,
  completedCount,
}: FilterBarProps) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 mb-5 flex flex-col gap-3">
      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
            placeholder="Search tasks..."
            className="w-full bg-gray-50 rounded-xl pl-9 pr-3 py-2 text-sm text-gray-800 placeholder-gray-400 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent transition"
          />
        </div>
        {completedCount > 0 && (
          <button
            onClick={clearCompleted}
            className="flex items-center gap-1.5 text-sm text-red-500 hover:text-red-700 border border-red-200 hover:border-red-400 rounded-xl px-3 py-2 transition"
          >
            <Trash2 className="w-4 h-4" />
            Clear done
          </button>
        )}
      </div>

      <div className="flex gap-2 flex-wrap">
        {FILTERS.map(f => (
          <button
            key={f.value}
            onClick={() => setFilter(f.value)}
            className={clsx(
              'px-4 py-1.5 rounded-full text-sm font-medium transition',
              filter === f.value
                ? 'bg-brand text-white shadow-sm'
                : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
            )}
          >
            {f.label}
          </button>
        ))}

        <div className="border-l border-gray-200 mx-1" />

        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setCategoryFilter(cat)}
            className={clsx(
              'px-4 py-1.5 rounded-full text-sm font-medium transition capitalize',
              categoryFilter === cat
                ? 'bg-indigo-100 text-brand font-semibold'
                : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
            )}
          >
            {cat}
          </button>
        ))}
      </div>
    </div>
  );
}
