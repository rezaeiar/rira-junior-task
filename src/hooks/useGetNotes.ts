export const useGetNotes = () => {
    const notes = localStorage.getItem("notes")
    return notes ? notes : null
}