import { useState } from 'react';
import { Plus, ChevronDown } from 'lucide-react';
import { Priority } from '@/types';
import clsx from 'clsx';

type AddTodoFormProps = {
  onAdd: (text: string, priority: Priority, category: string) => void;
};

const PRIORITY_OPTIONS: { value: Priority; label: string; color: string }[] = [
  { value: 'low', label: 'Low', color: 'text-green-600' },
  { value: 'medium', label: 'Medium', color: 'text-yellow-600' },
  { value: 'high', label: 'High', color: 'text-red-600' },
];

export default function AddTodoForm({ onAdd }: AddTodoFormProps) {
  const [text, setText] = useState<string>('');
  const [priority, setPriority] = useState<Priority>('medium');
  const [category, setCategory] = useState<string>('General');
  const [expanded, setExpanded] = useState<boolean>(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>): void {
    e.preventDefault();
    if (!text.trim()) return;
    onAdd(text, priority, category);
    setText('');
    setPriority('medium');
    setCategory('General');
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 mb-5"
    >
      <div className="flex gap-2">
        <input
          type="text"
          value={text}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setText(e.target.value)}
          placeholder="Add a new task..."
          className="flex-1 bg-gray-50 rounded-xl px-4 py-2.5 text-gray-800 placeholder-gray-400 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent transition"
        />
        <button
          type="button"
          onClick={() => setExpanded(v => !v)}
          className="px-3 py-2.5 rounded-xl border border-gray-200 text-gray-500 hover:bg-gray-50 transition flex items-center gap-1 text-sm"
        >
          Options <ChevronDown className={clsx('w-4 h-4 transition-transform', expanded && 'rotate-180')} />
        </button>
        <button
          type="submit"
          className="bg-brand hover:bg-brand-dark text-white px-4 py-2.5 rounded-xl flex items-center gap-1.5 font-semibold transition shadow-sm"
        >
          <Plus className="w-5 h-5" />
          Add
        </button>
      </div>

      {expanded && (
        <div className="mt-3 flex flex-col sm:flex-row gap-3">
          <div className="flex-1">
            <label className="block text-xs font-medium text-gray-500 mb-1">Priority</label>
            <div className="flex gap-2">
              {PRIORITY_OPTIONS.map(opt => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => setPriority(opt.value)}
                  className={clsx(
                    'flex-1 py-1.5 rounded-lg border text-sm font-medium transition',
                    priority === opt.value
                      ? 'border-brand bg-brand-light text-brand font-semibold'
                      : 'border-gray-200 text-gray-500 hover:bg-gray-50'
                  )}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
          <div className="flex-1">
            <label className="block text-xs font-medium text-gray-500 mb-1">Category</label>
            <input
              type="text"
              value={category}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCategory(e.target.value)}
              placeholder="e.g. Work, Home..."
              className="w-full bg-gray-50 rounded-lg px-3 py-1.5 text-gray-800 placeholder-gray-400 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent text-sm transition"
            />
          </div>
        </div>
      )}
    </form>
  );
}
