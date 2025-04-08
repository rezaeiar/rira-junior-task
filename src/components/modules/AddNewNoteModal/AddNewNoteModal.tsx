import Button from "../Button/Button";
import { useNotes } from "../../../hooks/useNotes";
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

type AddNewNoteModalProps = {
    display: boolean,
    changeDisplayHandler: (show: boolean) => void
}

const schema = yup.object().shape({
    note: yup
        .string()
        .required('توضیحات الزامی است')
        .min(3, 'حداقل ۳ کاراکتر وارد کنید'),
    deadline: yup
        .number()
        .typeError('تعداد روز باید عدد باشد')
        .required('تعداد روز الزامی است')
        .moreThan(0, 'تعداد روز باید بیشتر از صفر باشد')
})

type FormValues = {
    note: string
    deadline: number
}

export default function AddNewNoteModal({ display, changeDisplayHandler }: AddNewNoteModalProps) {

    const { dispatch } = useNotes();

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm<FormValues>({
        resolver: yupResolver(schema)
    })

    const onSubmit = (data: FormValues) => {
        const { deadline, note } = data
        const newNote = {
            id: crypto.randomUUID(),
            note,
            created_at: new Date(),
            deadline
        }

        dispatch({ type: 'ADD_NOTE', payload: newNote });
        changeDisplayHandler(false)
        reset()
    }

    return (
        <div className={`flex items-center justify-center w-full h-screen fixed top-0 left-0 transition-all ${display ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
            <div className="h-full w-full backdrop-blur-sm absolute right-0 top-0 bg-gray-600/30" onClick={() => changeDisplayHandler(false)}></div>
            <div className="p-6 bg-white z-10 h-full sm:h-auto w-full sm:w-3/5 lg:w-2/5 sm:rounded-lg">
                <h4 className="font-bold text-gray-800 mb-3">
                    اضافه کردن یادداشت جدید
                </h4>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="flex flex-col gap-1 mb-3">
                        <label htmlFor="" className="text-gray-700">
                            متن یادداشت:
                        </label>
                        <textarea id="" {...register('note')} className="w-full text-sm text-gray-700 outline-none border-2 border-gray-200 resize-none p-2 rounded-md aspect-[5/2]"></textarea>
                        {errors.note && <p className="text-red-500 text-sm">{errors.note.message}</p>}
                    </div>
                    <div className="flex flex-col gap-1 mb-3">
                        <label htmlFor="" className="text-gray-700">
                            تاریخ ددلاین: (براساس روز)
                        </label>
                        <input id="" type="number" {...register('deadline')} className="w-full text-sm text-gray-700 outline-none border-2 border-gray-200 resize-none p-2 rounded-md" placeholder="براساس تعداد روز" />
                        {errors.deadline && <p className="text-red-500 text-sm">{errors.deadline.message}</p>}
                    </div>
                    <div className="*:w-full *:justify-center">
                        <Button>
                            اضافه کردن یادداشت
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    )
}

