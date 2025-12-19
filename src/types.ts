export interface Habit {
    id: string;
    name: string;
    emoji: string;
    createdDay: string; // ISO Date YYYY-MM-DD
    completedDates: string[]; // Array of YYYY-MM-DD
}
