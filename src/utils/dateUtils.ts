export const getDaysInMonth = (year: number, month: number): Date[] => {
    const date = new Date(year, month, 1);
    const days: Date[] = [];
    while (date.getMonth() === month) {
        days.push(new Date(date));
        date.setDate(date.getDate() + 1);
    }
    return days;
};

export const formatDateKey = (date: Date): string => {
    return date.toISOString().split('T')[0];
};

export const isSameDay = (d1: Date, d2: Date): boolean => {
    return (
        d1.getFullYear() === d2.getFullYear() &&
        d1.getMonth() === d2.getMonth() &&
        d1.getDate() === d2.getDate()
    );
};

export const getCurrentMonthDates = (): Date[] => {
    const now = new Date();
    const allDates = getDaysInMonth(now.getFullYear(), now.getMonth());
    // Filter to only include dates up to today
    return allDates.filter(date => date <= now);
};
