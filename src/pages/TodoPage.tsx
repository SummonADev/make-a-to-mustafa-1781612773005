import { useTodos } from '@/hooks/useTodos';
import Header from '@/components/Header';
import AddTodoForm from '@/components/AddTodoForm';
import FilterBar from '@/components/FilterBar';
import TodoList from '@/components/TodoList';
import StatsBar from '@/components/StatsBar';

export default function TodoPage() {
  const todoState = useTodos();

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <div className="max-w-2xl mx-auto px-4 py-10">
        <Header />
        <StatsBar
          activeCount={todoState.activeCount}
          completedCount={todoState.completedCount}
          total={todoState.todos.length}
        />
        <AddTodoForm onAdd={todoState.addTodo} />
        <FilterBar
          filter={todoState.filter}
          setFilter={todoState.setFilter}
          categoryFilter={todoState.categoryFilter}
          setCategoryFilter={todoState.setCategoryFilter}
          categories={todoState.categories}
          searchQuery={todoState.searchQuery}
          setSearchQuery={todoState.setSearchQuery}
          clearCompleted={todoState.clearCompleted}
          completedCount={todoState.completedCount}
        />
        <TodoList
          todos={todoState.filteredTodos}
          onToggle={todoState.toggleTodo}
          onDelete={todoState.deleteTodo}
          onEdit={todoState.editTodo}
        />
      </div>
    </div>
  );
}
