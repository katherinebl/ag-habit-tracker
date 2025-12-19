
import { useHabits } from './hooks/useHabits';
import { HabitForm } from './components/HabitForm';
import { HabitGrid } from './components/HabitGrid';

function App() {
  const { habits, addHabit, toggleHabitDate, deleteHabit, editHabit } = useHabits();

  return (
    <div className="min-h-screen bg-background p-4 sm:p-8 flex justify-center">
      <div className="w-full max-w-6xl">
        <header className="mb-8 sm:mb-12 text-center">
          <h1 className="text-3xl sm:text-4xl font-extrabold bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent mb-2 tracking-tight">Habit Tracker</h1>
          <p className="text-slate-500 text-base sm:text-lg">Build the life you want, one day at a time.</p>
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
