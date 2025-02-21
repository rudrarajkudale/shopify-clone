import { IoCloseCircleOutline } from "react-icons/io5";

const Modal = ({ isOpen, onClose, children }) => {
    return (
        <>
            {isOpen && (
                <div className="fixed inset-32 flex items-center justify-center z-50 left-1/4">
                    <div className="fixed inset-0 bg-black opacity-50"></div>
                    <div className="absolute top-[30%] right-[50%] bg-gray-100 p-4 rounded-lg z-10 text-right">
                        <button
                            onClick={onClose}
                        >
                            <IoCloseCircleOutline size={26} color="red" />
                        </button>
                        {children}
                    </div>
                </div>
            )}
        </>
    )
}

export default Modal;
