// It calculates whether there is a deadline left to do the work or not
export function calcNoteDeadline(created_at: Date, deadline: number): boolean {
    const createdAtDate = new Date(created_at);
    const deadlineDate = new Date(createdAtDate);
    
    deadlineDate.setDate(deadlineDate.getDate() + deadline);

    return  deadlineDate.getTime() > new Date().getTime();
}

// Converts the registration date of the note to Jalali date
export const calcCreatedDate = (created_at: Date) => {
    return new Date(created_at).toLocaleDateString('fa-IR')
}

// The date of the deadline changes the note to Jalali date
export const calcDeadlineDate = (created_at: Date, deadline: number) => {
    return new Date(new Date(created_at).setDate(new Date(created_at).getDate() + deadline)).toLocaleDateString('fa-IR')
}