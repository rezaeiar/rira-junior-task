import { useState } from "react";
import Button from "../Button/Button";
import { useNotes } from "../../../hooks/useNotes";

type AddNewNoteModalProps = {
    display: boolean,
    changeDisplayHandler: (show: boolean) => void
}

export default function AddNewNoteModal({ display, changeDisplayHandler }: AddNewNoteModalProps) {
    
    const { dispatch } = useNotes();
    const [note, setNote] = useState("")
    const [deadline, setDeadline] = useState(1)

    const addNewNoteHandler = () => {

        const newNote = {
            id: crypto.randomUUID(),
            note,
            created_at: new Date(),
            deadline
        }
        
        dispatch({ type: 'ADD_NOTE', payload: newNote });
        changeDisplayHandler(false)
    }
    return (
        <div className={`flex items-center justify-center w-full h-screen absolute top-0 left-0 transition-all ${display ? 'opacity-100 visible': 'opacity-0 invisible'}`}>
            <div className="h-full w-full backdrop-blur-sm absolute right-0 top-0 bg-gray-600/30" onClick={() => changeDisplayHandler(false)}></div>
            <div className="p-6 bg-white z-10 h-full sm:h-auto w-full sm:w-3/5 lg:w-2/5 sm:rounded-lg">
                <h4 className="font-bold text-gray-800 mb-3">
                    اضافه کردن یادداشت جدید
                </h4>
                <div className="">
                    <div className="flex flex-col gap-1 mb-3">
                        <label htmlFor="" className="text-gray-700">
                            متن یادداشت:
                        </label>
                        <textarea id="" value={note} onChange={(event) => setNote(event.target.value)} className="w-full text-sm text-gray-700 outline-none border-2 border-gray-200 resize-none p-2 rounded-md aspect-[5/2]"></textarea>
                    </div>
                    <div className="flex flex-col gap-1 mb-3">
                        <label htmlFor="" className="text-gray-700">
                            تاریخ ددلاین:
                        </label>
                        <input id="" type="number" value={deadline} onChange={(event) => setDeadline(+event.target.value)} className="w-full text-sm text-gray-700 outline-none border-2 border-gray-200 resize-none p-2 rounded-md" placeholder="براساس تعداد روز" />
                    </div>
                    <div className="*:w-full *:justify-center">
                        <Button handler={addNewNoteHandler}>
                            اضافه کردن یادداشت
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

