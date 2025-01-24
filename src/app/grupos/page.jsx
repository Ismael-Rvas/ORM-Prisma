import Modal from "@/components/Modal";
import ModalEliminar from "@/components/ModalEliminar";
import { eliminarGrupo, insertarGrupo, modificarGrupo } from "@/lib/actions";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import { Suspense } from "react";

async function PaginaGrupo() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-green-200 to-blue-500 p-5">
      <h1 className="text-6xl font-bold mb-7">Grupos</h1>
      <Modal texto="Insertar Grupo">
        <div className="flex flex-col space-y-4 bg-white p-6 rounded-lg shadow-lg mb-10 ">
          <form
            action={insertarGrupo}
            className="flex flex-col justify-center align-middle text-center"
          >
            <div className="flex flex-col space-y-2 ">
              <label className="text-lg font-bold">Nombre grupo:</label>
              <input
                className="border-2 border-gray-300 rounded-lg p-2"
                type="text"
                name="nombre"
                placeholder="Nombre"
                required
              />
            </div>
            <div className="flex flex-col space-y-2">
              <label className="text-lg font-bold">Tutor/a:</label>
              <input
                className="border-2 border-gray-300 rounded-lg p-2"
                type="text"
                name="tutor"
                placeholder="Tutor/a"
                required
              />
            </div>
            <div className="flex flex-col space-y-2">
              <label className="text-lg font-bold">Aula:</label>
              <input
                className="border-2 border-gray-300 rounded-lg p-2"
                type="text"
                name="aula"
                placeholder="Aula"
                required
              />
            </div>
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg mt-8"
              type="submit"
            >
              Insertar Grupo
            </button>
          </form>
        </div>
      </Modal>
      <Suspense fallback={<div>Loading...</div>}>
        <Productos />
      </Suspense>
    </div>
  );
}
export default PaginaGrupo;

async function Productos() {
  const grupos = await prisma.grupo.findMany();
  console.log(grupos);

  return (
    <div className="grid grid-cols-5 gap-6">
      {grupos.map((grupo) => (
        <div
          key={grupo.id}
          className="flex flex-col items-center justify-center p-6 max-w-lg bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 hover:bg-gray-100"
        >
          <div className="text-center cursor-pointer">
            <p className="text-xl font-extrabold text-gray-800">
              {grupo.nombre}
            </p>
            <p className="text-md text-gray-600">Tutor:{grupo.tutor}</p>
          </div>
          <div className="text-center">
            <p className="text-lg font-semibold text-gray-700 mb-5">
              Aula: {grupo.aula}
            </p>
          </div>

          <Modal texto="Modificar Grupo">
            <div className="flex flex-col space-y-4 bg-white p-6 rounded-lg shadow-lg ">
              <form action={modificarGrupo} className="flex flex-col space-y-2">
                <input type="hidden" name="id" defaultValue={grupo.id} />
                <div className="flex flex-col space-y-1">
                  <label className="text-lg font-bold">Nombre grupo:</label>
                  <input
                    className="border-2 border-gray-300 rounded-lg p-2"
                    type="text"
                    name="nombre"
                    defaultValue={grupo.nombre}
                    required
                  />
                </div>
                <div className="flex flex-col space-y-1">
                  <label className="text-lg font-bold">Tutor/a:</label>
                  <input
                    className="border-2 border-gray-300 rounded-lg p-2"
                    type="text"
                    name="tutor"
                    defaultValue={grupo.tutor}
                    required
                  />
                </div>
                <div className="flex flex-col space-y-1">
                  <label className="text-lg font-bold">Aula:</label>
                  <input
                    className="border-2 border-gray-300 rounded-lg p-2"
                    type="text"
                    name="aula"
                    defaultValue={grupo.aula}
                    required
                  />
                </div>
                <button
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors duration-300"
                >
                  Modificar Grupo
                </button>
              </form>
            </div>
          </Modal>
          
          <ModalEliminar texto="Eliminar Grupo">
          <form action={eliminarGrupo}>
            <input type="hidden" name="id" value={grupo.id} />
            <h1>Esta seguro de que desea eliminar el grupo {grupo.nombre}?</h1>
            <button
              type="submit"
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors duration-300 mb-3 mt-3"
            >
              Eliminar Grupo
            </button>
          </form>
        </ModalEliminar>
        </div>
      ))}
    </div>
  );
}
