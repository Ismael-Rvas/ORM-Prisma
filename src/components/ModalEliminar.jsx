'use client'

import { useRef } from "react";

function ModalEliminar({ texto, children }) {

    const refModal = useRef();

    const openModal = () => refModal.current?.showModal();
    const cerrarModal = () =>refModal.current?.close();

    return ( 
        <div className=" flex items-center justify-center mb-6">
        <button onClick={openModal} className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors duration-300">
            {texto}
        </button>

        <dialog ref={refModal}>
            <div className="p-10 bg-gray-300 flex flex-col justify-center ">
            {children}
            <button onClick={cerrarModal} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors duration-300">
                Cancelar
            </button>
            </div>
        </dialog>
        </div>
     );
}

export default ModalEliminar;