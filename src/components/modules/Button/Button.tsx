import PlusIcon from "../../../assets/icons/Plus"

type ButtonProps = {
    handler?: (show: boolean) => void,
    children: React.ReactNode
}

export default function Button({ handler, children }: ButtonProps) {
    return (
        <button type="submit" className='text-white bg-blue-600 px-4 sm:px-5 py-2 sm:py-2.5 rounded-lg text-xs sm:text-sm flex items-center gap-1 hover:bg-blue-700 group transition-colors' onClick={() => handler && handler(true)}>
            <PlusIcon />
            <span>
                {children}
            </span>
        </button>
    )
}