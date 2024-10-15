import { useState } from "react";
import AddNewNoteModal from "../AddNewNoteModal/AddNewNoteModal";
import Button from "../Button/Button";


export default function Header() {

    const [showAddNoteModal, setShowAddNoteModal] = useState(false)
    const addNoteModalHandler = (show : boolean) => setShowAddNoteModal(show)
    return (
        <>
            <section>
                <div className="container">
                    <div className="flex justify-between py-5 sm:py-6 items-center mb-3 sm:mb-6">
                        <h1 className='font-bold text-sm sm:text-base text-gray-800'>
                            یادداشت های شما
                        </h1>
                        <Button handler={addNoteModalHandler}>
                            اضافه کردن یادداشت
                        </Button>
                    </div>
                </div>
            </section>
            <AddNewNoteModal display={showAddNoteModal} changeDisplayHandler={addNoteModalHandler} />
        </>
    )
}
