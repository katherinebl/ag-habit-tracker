import React, { useState } from 'react';
import { Plus } from 'lucide-react';

interface HabitFormProps {
    onAdd: (name: string) => void;
}

export const HabitForm: React.FC<HabitFormProps> = ({ onAdd }) => {
    const [name, setName] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (name.trim()) {
            onAdd(name);
            setName('');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="mb-6 flex flex-col sm:flex-row gap-3">
            <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter a new habit..."
                className="flex-1 px-4 py-3 rounded-xl shadow-sm border border-slate-200 focus:outline-none focus:ring-2 focus:ring-secondary/50 text-slate-700 placeholder-slate-400 bg-white text-base"
            />
            <button
                type="submit"
                className="px-5 py-3 bg-primary text-white rounded-xl shadow-lg hover:bg-purple-600 transition-all font-semibold flex items-center justify-center gap-1.5 hover:translate-y-[-1px] hover:shadow-xl sm:w-auto w-full"
            >
                <Plus className="w-4 h-4" />
                <span>Add</span>
            </button>
        </form>
    );
};
