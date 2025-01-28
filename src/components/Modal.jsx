'use client'

import { useRef } from "react";

function Modal({ texto, children, className }) {

    const refModal = useRef();

    const openModal = () => refModal.current?.showModal();
    const cerrarModal = () =>refModal.current?.close();

    return ( 
        <div className=" flex items-center justify-center mb-6">
        <button onClick={openModal} className={className}>
            {texto}
        </button>

        <dialog ref={refModal}>
            <div className="p-10 bg-gray-300 flex flex-col justify-center ">
            {children}
            <button onClick={cerrarModal}>
                 ❌
            </button>
            </div>
        </dialog>
        </div>
     );
}

export default Modal;

