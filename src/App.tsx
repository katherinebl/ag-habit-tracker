
import { useHabits } from './hooks/useHabits';
import { HabitForm } from './components/HabitForm';
import { HabitGrid } from './components/HabitGrid';

function App() {
  const { habits, addHabit, toggleHabitDate, deleteHabit, editHabit } = useHabits();

  return (
    <div className="min-h-screen bg-background p-8 flex justify-center">
      <div className="w-full max-w-6xl">
        <header className="mb-12 text-center">
          <h1 className="text-4xl font-extrabold text-slate-800 mb-2 tracking-tight">Habit Tracker</h1>
          <p className="text-slate-500 text-lg">Build the life you want, one day at a time.</p>
        </header>

        <div className="space-y-8">
          <HabitForm onAdd={addHabit} />

          <HabitGrid
            habits={habits}
            onToggle={toggleHabitDate}
            onDelete={deleteHabit}
            onEdit={editHabit}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
