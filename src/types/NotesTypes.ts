export type NoteType = {
    id: string,
    note: string,
    created_at: Date,
    deadline: number
}

export type NotesType = NoteType[]