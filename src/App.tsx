import { useState, useEffect } from 'react'
import { useGetNotes } from './hooks/useGetNotes';
import { useNotes } from './hooks/useNotes';
import { NotesType, NoteType } from './types/NotesTypes';
import { closestCorners, DndContext, DragEndEvent } from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable'
import { useSetNotes } from './hooks/useSetNotes';
import Header from './components/modules/Header/Header'
import NotesContainer from './components/templates/home/NotesContainer/NotesContainer'
import './App.css'

function App() {

    // localeStorageValue is a variable that checks whether a note is stored in local storage or not
    const localeStorageValue = useGetNotes()

    // Context is used to access notes in all pages without sending props.
    // Here, the useNotes custom hook is used to store and change notes
    const { state, dispatch } = useNotes();

    // notes Saves notes to display in state
    const [notes, setNotes] = useState<NotesType>([])

    // This section is for changing the location of boxes using DND-KIT
    const getNotePossition = (id: string) => notes.findIndex((note: NoteType) => note.id === id);
    const handleDragEnd = async (event: DragEndEvent) => {
        const { active, over } = event;

        if (active.id === over?.id) return;

        setNotes((notes) => {
            const originalPos = getNotePossition(active.id as string)
            const newPos = getNotePossition(over?.id as string)

            return arrayMove(notes, originalPos, newPos)
        })
    }

    // Here, if there is a note in the local storage, it is stored in the context
    useEffect(() => {
        if (localeStorageValue) dispatch({ type: 'ADD_NOTES', payload: JSON.parse(localeStorageValue) })
        else useSetNotes(state.notes)
    }, [])

    // Here, in case of changes in the notes, they are saved in local storage
    useEffect(() => useSetNotes(notes), [notes])

    // Here, if the notes are changed, they are stored in the state for display and save in local storage
    useEffect(() => {
        setNotes(state.notes)
        useSetNotes(state.notes)
    }, [state.notes.length, state.notes])

    return (
        <>
            <DndContext collisionDetection={closestCorners} onDragEnd={(event => handleDragEnd(event))}>
                <Header />
                <NotesContainer notes={notes} />
            </DndContext>
        </>
    )
}

export default App

