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
        <form onSubmit={handleSubmit} className="mb-8 flex gap-4">
            <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter a new habit..."
                className="flex-1 px-6 py-4 rounded-xl shadow-sm border border-slate-200 focus:outline-none focus:ring-2 focus:ring-secondary/50 text-slate-700 placeholder-slate-400 bg-white"
            />
            <button
                type="submit"
                className="px-8 py-4 bg-primary text-white rounded-xl shadow-lg hover:bg-slate-700 transition-all font-semibold flex items-center gap-2 hover:translate-y-[-1px]"
            >
                <Plus className="w-5 h-5" />
                Add
            </button>
        </form>
    );
};
