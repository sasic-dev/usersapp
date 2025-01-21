export enum TaskStatus {
    PENDING = 0,
    IN_PROGRESS = 1,
    COMPLETED = 2
}

export const addDaysToCurrentDate = (value: number) => {
    const currentDate = new Date();
    const newDate = new Date(currentDate);
    newDate.setDate(currentDate.getDate() + value)

    return newDate;
}