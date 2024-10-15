import { useState } from "react";
import { NoteType } from "../../../types/NotesTypes";
import { useNotes } from "../../../hooks/useNotes";
import { useSortable } from "@dnd-kit/sortable";
import { calcCreatedDate, calcDeadlineDate, calcNoteDeadline } from "../../../utils/date";
import { CSS } from '@dnd-kit/utilities'
import EditNoteModal from "../EditNoteModal/EditNoteModal";
import EditIcon from "../../../assets/icons/Edit";
import TrashIcon from "../../../assets/icons/Trash";

export default function NoteCard({ id, note, created_at, deadline }: NoteType) {

    const { dispatch } = useNotes();

    // DND-KIT
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id })
    const style = {
        transition,
        transform: CSS.Transform.toString(transform),
    }

    const isAvalableNoteDeadline = calcNoteDeadline(created_at, deadline)

    const [showEditNoteModal, setShowEditNoteModal] = useState(false)

    const removeNoteHandler = (id: string) => dispatch({ type: 'REMOVE_NOTE', payload: String(id) })
    const addNoteModalHandler = (show : boolean) => setShowEditNoteModal(show)

    return (
        <>
            <div
                ref={setNodeRef}
                {...attributes}
                style={style}
                className={`p-4 rounded-lg shadow-normal bg-white cursor-default border-2 transition-colors flex flex-col justify-between ${isAvalableNoteDeadline ? "bg-white border-white hover:border-blue-600" : "bg-red-200 border-red-200 hover:border-red-600"}`}>
                <div className="">
                    <div className="mb-4 flex justify-between items-center">
                        <div className="flex items-center gap-2">
                            <div className="cursor-move" {...listeners}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5 text-gray-600">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21 3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
                                </svg>
                            </div>
                            {
                                isAvalableNoteDeadline ? (
                                    <div className="text-xs bg-blue-600 rounded-full text-white px-2 py-0.5">
                                        فرصت باقی مانده
                                    </div>
                                ) : (
                                    <div className="text-xs bg-red-600 rounded-full text-white px-2 py-0.5">
                                        زمانی باقی نمانده است
                                    </div>
                                )
                            }
                        </div>
                        <div className="flex gap-3 text-gray-600">
                            <div className="text-gray-600 cursor-pointer hover:scale-110 transition-transform p-1" onClick={() => setShowEditNoteModal(true)}>
                                <EditIcon />
                            </div>
                            <div className="text-red-600 cursor-pointer hover:scale-110 transition-transform p-1" onClick={() => removeNoteHandler(id)}>
                                <TrashIcon />
                            </div>
                        </div>
                    </div>
                    <p className='font-normal mb-6'>
                        {note}
                    </p>
                </div>
                <div className="flex flex-col gap-0">
                    <div className="space-x-1 space-x-reverse text-gray-600 text-sm">
                        <span className=''>
                            تاریخ ثبت:
                        </span>
                        <span>
                            {calcCreatedDate(created_at)}
                        </span>
                    </div>
                    <div className="space-x-1 space-x-reverse text-gray-600 text-sm">
                        <span className=''>
                            تاریخ ددلاین:
                        </span>
                        <span>
                            {calcDeadlineDate(created_at, deadline)}
                        </span>
                    </div>
                </div>
            </div>
            <EditNoteModal id={id} note={note} deadline={deadline} created_at={created_at} display={showEditNoteModal} changeDisplayHandler={addNoteModalHandler} />
        </>
    )
}
