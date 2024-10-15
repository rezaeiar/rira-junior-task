import { NotesType } from "../types/NotesTypes"

export const useSetNotes = (notes: NotesType) => {
    localStorage.setItem("notes", JSON.stringify(notes))
}