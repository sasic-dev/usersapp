
export const addDaysToCurrentDate = (value: number) => {
    const currentDate = new Date();
    const newDate = new Date(currentDate);
    newDate.setDate(currentDate.getDate() + value)

    return newDate;
}
