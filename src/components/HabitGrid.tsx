import React, { useRef, useEffect, useState } from 'react';
import { Trash2, Check, Pencil } from 'lucide-react';
import confetti from 'canvas-confetti';
import clsx from 'clsx';
import type { Habit } from '../types';
import { formatDateKey, getCurrentMonthDates, isSameDay } from '../utils/dateUtils';

interface HabitGridProps {
    habits: Habit[];
    onToggle: (id: string, date: Date) => void;
    onDelete: (id: string) => void;
    onEdit: (id: string, name: string) => void;
}

export const HabitGrid: React.FC<HabitGridProps> = ({ habits, onToggle, onDelete, onEdit }) => {
    const dates = getCurrentMonthDates();
    const today = new Date();
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    // Scroll to today on mount
    useEffect(() => {
        if (scrollContainerRef.current) {
            // Simple offset calculation: (Day of month - 3) * cell width approx
            const dayIndex = dates.findIndex(d => isSameDay(d, today));
            if (dayIndex > 3) {
                // Assuming ~40px per cell
                scrollContainerRef.current.scrollLeft = (dayIndex - 3) * 50;
            }
        }
    }, []);

    const handleToggle = (id: string, date: Date, isCompleted: boolean) => {
        onToggle(id, date);
        if (!isCompleted && isSameDay(date, today)) {
            confetti({
                particleCount: 100,
                spread: 70,
                origin: { y: 0.6 },
                colors: ['#8b5cf6', '#10b981', '#3b82f6', '#ec4899'] // Purple, Emerald, Blue, Pink
            });
        }
    };



    const [editingId, setEditingId] = useState<string | null>(null);
    const [editName, setEditName] = useState('');

    const startEdit = (habit: Habit) => {
        setEditingId(habit.id);
        setEditName(habit.name);
    };

    const saveEdit = (id: string) => {
        if (editName.trim()) {
            onEdit(id, editName.trim());
        }
        setEditingId(null);
    };

    const cancelEdit = () => {
        setEditingId(null);
        setEditName('');
    };

    if (habits.length === 0) {
        return (
            <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden p-12 text-center">
                <p className="text-slate-400 text-lg">No habits yet. Start tracking by adding one above! 🎯</p>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
            <div className="overflow-x-auto" ref={scrollContainerRef}>
                <table className="w-full border-collapse">
                    <thead>
                        <tr className="border-b border-slate-100">
                            <th className="p-4 text-left min-w-[200px] sticky left-0 bg-white z-20 font-semibold text-slate-600 shadow-[2px_0_5px_-2px_rgba(0,0,0,0.05)]">Habit</th>
                            {dates.map(date => {
                                const isToday = isSameDay(date, today);
                                return (
                                    <th key={date.toISOString()} className={clsx(
                                        "p-2 min-w-[50px] text-center text-sm font-medium",
                                        isToday ? "text-primary" : "text-slate-400"
                                    )}>
                                        <div className="flex flex-col items-center gap-1">
                                            <span className="text-xs uppercase font-semibold">{date.toLocaleDateString('en-US', { weekday: 'narrow' })}</span>
                                            <span className={clsx(
                                                "w-8 h-8 flex items-center justify-center rounded-full font-semibold transition-all",
                                                isToday && "bg-primary text-white shadow-md"
                                            )}>{date.getDate()}</span>
                                        </div>
                                    </th>
                                );
                            })}
                            <th className="p-4 min-w-[100px] font-semibold text-slate-600 text-center">Total</th>
                            <th className="p-4 min-w-[100px] text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {habits.map(habit => (
                            <tr key={habit.id} className="group hover:bg-slate-50/50 transition-colors border-b border-slate-50 last:border-0">
                                <td className="p-4 sticky left-0 bg-white group-hover:bg-slate-50/50 z-20 shadow-[2px_0_5px_-2px_rgba(0,0,0,0.05)]">
                                    <div className="flex items-center gap-3">
                                        <span className="text-2xl">{habit.emoji}</span>
                                        {editingId === habit.id ? (
                                            <input
                                                autoFocus
                                                type="text"
                                                value={editName}
                                                onChange={(e) => setEditName(e.target.value)}
                                                onBlur={() => saveEdit(habit.id)}
                                                onKeyDown={(e) => {
                                                    if (e.key === 'Enter') saveEdit(habit.id);
                                                    if (e.key === 'Escape') cancelEdit();
                                                }}
                                                className="font-medium text-slate-700 bg-slate-100 px-2 py-1 rounded w-full focus:outline-none focus:ring-2 focus:ring-accent/50"
                                            />
                                        ) : (
                                            <span
                                                className="font-medium text-slate-700 cursor-pointer hover:text-accent transition-colors"
                                                onClick={() => startEdit(habit)}
                                                title="Click to edit name"
                                            >
                                                {habit.name}
                                            </span>
                                        )}
                                    </div>
                                </td>
                                {dates.map(date => {
                                    const dateKey = formatDateKey(date);
                                    const isCompleted = habit.completedDates.includes(dateKey);
                                    return (
                                        <td key={dateKey} className="p-2 text-center">
                                            <button
                                                onClick={() => handleToggle(habit.id, date, isCompleted)}
                                                className={clsx(
                                                    "w-8 h-8 rounded-full transition-all duration-300 flex items-center justify-center",
                                                    isCompleted
                                                        ? "bg-success text-white scale-100 shadow-md hover:shadow-lg hover:scale-105"
                                                        : "bg-slate-100/50 text-transparent hover:bg-primary/20 hover:text-primary/50 scale-90 hover:scale-100"
                                                )}
                                            >
                                                <Check className="w-5 h-5" strokeWidth={3} />
                                            </button>
                                        </td>
                                    );
                                })}
                                <td className="p-4 text-center">
                                    <div className="flex items-center justify-center gap-1 text-success font-bold">
                                        <Check className="w-5 h-5" strokeWidth={2.5} />
                                        <span className="text-lg">{habit.completedDates.length}</span>
                                    </div>
                                </td>
                                <td className="p-4 text-center">
                                    <div className="flex items-center justify-center gap-1 opacity-100 sm:opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button
                                            onClick={() => startEdit(habit)}
                                            className="p-2 text-slate-300 hover:text-secondary hover:bg-secondary/10 rounded-lg transition-all"
                                            title="Edit"
                                        >
                                            <Pencil className="w-4 h-4" />
                                        </button>
                                        <button
                                            onClick={() => onDelete(habit.id)}
                                            className="p-2 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                                            title="Delete"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
