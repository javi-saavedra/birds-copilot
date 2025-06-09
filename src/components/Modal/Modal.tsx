import { ReactNode } from "react";

type ModalProps = {
    children: ReactNode;
}

const Modal = ({ children }: ModalProps) => {
    return (
        <div className="absolute inset-0 bg-white/60 flex justify-center items-start z-50 pt-[12vh]">
            <div className="bg-white shadow-lg rounded-lg min-w-md max-w-lg min-h-sm max-h-lg flex flex-col gap-4">
                {children}
            </div>
        </div>
    );
};

export default Modal;