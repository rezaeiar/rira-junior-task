import React, { createContext, useReducer, ReactNode } from 'react';
import { NotesType, NoteType } from '../../types/NotesTypes';

export interface NotesState {
    notes: NotesType;
}

export type NotesAction =
    | { type: 'ADD_NOTE'; payload: NoteType }
    | { type: 'ADD_NOTES'; payload: NotesType }
    | { type: 'REMOVE_NOTE'; payload: String }
    | { type: 'EDIT_NOTE'; payload: NoteType }


const initialState: NotesState = {
    notes: [
        // Default notes
        // You can delete these notes
        {
            created_at: new Date("1971-10-10T19:27:26.831Z"),
            deadline: 7,
            id: "b09b2002-26f6-4d93-b9c2-e4db236dacd6",
            note: "پیشرفت روزانه کوچک، در طولانی مدت منجر به نتایج خیره‌ کننده خواهد شد."
        },
        {
            created_at: new Date("2001-10-10T19:27:26.831Z"),
            deadline: 1,
            id: "811ae87b-acf0-41c3-8048-f4a4aca42302",
            note: "تنها در فرهنگ لغت می‌توانید پیروزی را پیش از عمل ببینید."
        },
        {
            created_at: new Date("2023-10-10T19:27:26.831Z"),
            deadline: 600,
            id: "787d8496-2039-400f-a41e-bd51a46509d3",
            note: "شجاعت، مقابله با ترس و سلطه بر آن است نه فقدانِ ترس."
        },
        {
            created_at: new Date("2024-10-10T19:27:26.831Z"),
            deadline: 27,
            id: "557d8496-2039-400f-a41e-bd51a46509d3",
            note: "موفقیت، مجموعه‌ای از تلاش‌های کوچک است که هر روز و هر روز تکرار شده‌اند."
        },
        {
            created_at: new Date("2024-10-10T19:27:26.831Z"),
            deadline: 30,
            id: "557d8296-2039-400f-a41e-bd51a46509d3",
            note: "خدا همیشه دقیقا همان جایی به فریاد هایتان پاسخ میدهد که انتظارش را نداشتید."
        },
    ],
};


const notesReducer = (state: NotesState, action: NotesAction): NotesState => {
    switch (action.type) {
        case 'ADD_NOTE':
            return { ...state, notes: [...state.notes, action.payload] };

        case 'ADD_NOTES':
            return { ...state, notes: action.payload };

        case 'REMOVE_NOTE':
            return { ...state, notes: state.notes.filter(note => String(note.id) !== String(action.payload)) }

        case 'EDIT_NOTE':
            return {
                ...state, notes: state.notes.map(note => {
                    if (note.id == action.payload.id) {
                        note.note = action.payload.note,
                            note.deadline = action.payload.deadline
                    }
                    return note
                })
            }
        default:
            return state;
    }
};

export const NotesContext = createContext<{
    state: NotesState;
    dispatch: React.Dispatch<NotesAction>;
} | undefined>(undefined);

// Context provider
export const NotesProvider = ({ children }: { children: ReactNode }) => {
    const [state, dispatch] = useReducer(notesReducer, initialState);

    return (
        <NotesContext.Provider value={{ state, dispatch }}>
            {children}
        </NotesContext.Provider>
    );
};