import { useState, useEffect } from 'react';
import type { Habit } from '../types';
import { formatDateKey } from '../utils/dateUtils';

const STORAGE_KEY = 'ag-habit-tracker-data';

// Simple emoji suggestion based on keywords
const suggestEmoji = (name: string): string => {
    const lower = name.toLowerCase();
    if (lower.includes('water') || lower.includes('drink')) return '💧';
    if (lower.includes('run') || lower.includes('jog')) return '🏃';
    if (lower.includes('read') || lower.includes('book')) return '📚';
    if (lower.includes('gym') || lower.includes('workout') || lower.includes('exercise')) return '💪';
    if (lower.includes('sleep') || lower.includes('bed')) return '😴';
    if (lower.includes('meditate')) return '🧘';
    if (lower.includes('code') || lower.includes('program')) return '💻';
    if (lower.includes('walk')) return '🚶';
    return '✨'; // Default
};

export const useHabits = () => {
    const [habits, setHabits] = useState<Habit[]>(() => {
        const stored = localStorage.getItem(STORAGE_KEY);
        return stored ? JSON.parse(stored) : [];
    });

    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(habits));
    }, [habits]);

    const addHabit = (name: string) => {
        if (!name.trim()) return;
        const newHabit: Habit = {
            id: crypto.randomUUID(),
            name: name.trim(),
            emoji: suggestEmoji(name),
            createdDay: formatDateKey(new Date()),
            completedDates: [],
        };
        setHabits(prev => [...prev, newHabit]);
    };

    const toggleHabitDate = (habitId: string, date: Date) => {
        const dateKey = formatDateKey(date);
        setHabits(prev => prev.map(habit => {
            if (habit.id === habitId) {
                const isCompleted = habit.completedDates.includes(dateKey);
                const newCompletedDates = isCompleted
                    ? habit.completedDates.filter(d => d !== dateKey)
                    : [...habit.completedDates, dateKey];
                return { ...habit, completedDates: newCompletedDates };
            }
            return habit;
        }));
    };

    const deleteHabit = (id: string) => {
        setHabits(prev => prev.filter(h => h.id !== id));
    };

    const editHabit = (id: string, name: string) => {
        setHabits(prev => prev.map(h => {
            if (h.id === id) {
                return { ...h, name };
            }
            return h;
        }));
    };

    return { habits, addHabit, toggleHabitDate, deleteHabit, editHabit };
};
