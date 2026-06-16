import { CheckSquare } from 'lucide-react';

export default function Header() {
  return (
    <div className="text-center mb-8">
      <div className="flex items-center justify-center gap-3 mb-2">
        <div className="bg-brand rounded-xl p-2 shadow-lg">
          <CheckSquare className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-4xl font-bold text-gray-800 tracking-tight">My To-Dos</h1>
      </div>
      <p className="text-gray-500 text-sm">Stay organized, stay productive.</p>
    </div>
  );
}
