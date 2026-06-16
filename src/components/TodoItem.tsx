import { useState } from 'react';
import { Trash2, Pencil, Check, X } from 'lucide-react';
import { Todo, Priority } from '@/types';
import clsx from 'clsx';

type TodoItemProps = {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, text: string) => void;
};

const PRIORITY_STYLES: Record<Priority, string> = {
  low: 'bg-green-100 text-green-700 border-green-200',
  medium: 'bg-yellow-100 text-yellow-700 border-yellow-200',
  high: 'bg-red-100 text-red-700 border-red-200',
};

const PRIORITY_DOTS: Record<Priority, string> = {
  low: 'bg-green-500',
  medium: 'bg-yellow-500',
  high: 'bg-red-500',
};

export default function TodoItem({ todo, onToggle, onDelete, onEdit }: TodoItemProps) {
  const [editing, setEditing] = useState<boolean>(false);
  const [editText, setEditText] = useState<string>(todo.text);

  function handleSave(): void {
    if (editText.trim()) {
      onEdit(todo.id, editText);
    }
    setEditing(false);
  }

  function handleCancel(): void {
    setEditText(todo.text);
    setEditing(false);
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>): void {
    if (e.key === 'Enter') handleSave();
    if (e.key === 'Escape') handleCancel();
  }

  return (
    <li
      className={clsx(
        'group flex items-start gap-3 bg-white rounded-2xl border px-4 py-3.5 shadow-sm transition-all duration-200',
        todo.completed ? 'border-gray-100 opacity-70' : 'border-gray-100 hover:border-indigo-200 hover:shadow-md'
      )}
    >
      {/* Checkbox */}
      <button
        onClick={() => onToggle(todo.id)}
        className={clsx(
          'mt-0.5 flex-shrink-0 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all duration-200',
          todo.completed
            ? 'bg-brand border-brand'
            : 'border-gray-300 hover:border-brand'
        )}
        aria-label="Toggle complete"
      >
        {todo.completed && <Check className="w-3 h-3 text-white" strokeWidth={3} />}
      </button>

      {/* Content */}
      <div className="flex-1 min-w-0">
        {editing ? (
          <input
            autoFocus
            type="text"
            value={editText}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEditText(e.target.value)}
            onKeyDown={handleKeyDown}
            className="w-full text-gray-800 bg-indigo-50 rounded-lg px-2 py-0.5 border border-brand focus:outline-none text-sm"
          />
        ) : (
          <span
            className={clsx(
              'block text-gray-800 text-sm leading-relaxed break-words',
              todo.completed && 'line-through text-gray-400'
            )}
          >
            {todo.text}
          </span>
        )}
        <div className="flex items-center gap-2 mt-1.5 flex-wrap">
          <span
            className={clsx(
              'inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full border font-medium',
              PRIORITY_STYLES[todo.priority]
            )}
          >
            <span className={clsx('w-1.5 h-1.5 rounded-full', PRIORITY_DOTS[todo.priority])} />
            {todo.priority}
          </span>
          <span className="text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">
            {todo.category}
          </span>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-1 flex-shrink-0">
        {editing ? (
          <>
            <button
              onClick={handleSave}
              className="p-1.5 rounded-lg text-green-600 hover:bg-green-50 transition"
              aria-label="Save"
            >
              <Check className="w-4 h-4" />
            </button>
            <button
              onClick={handleCancel}
              className="p-1.5 rounded-lg text-gray-400 hover:bg-gray-100 transition"
              aria-label="Cancel"
            >
              <X className="w-4 h-4" />
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => setEditing(true)}
              className="p-1.5 rounded-lg text-gray-400 hover:text-brand hover:bg-indigo-50 opacity-0 group-hover:opacity-100 transition"
              aria-label="Edit"
            >
              <Pencil className="w-4 h-4" />
            </button>
            <button
              onClick={() => onDelete(todo.id)}
              className="p-1.5 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 opacity-0 group-hover:opacity-100 transition"
              aria-label="Delete"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </>
        )}
      </div>
    </li>
  );
}
