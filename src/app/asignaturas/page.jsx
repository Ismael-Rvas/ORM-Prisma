import Modal from "@/components/Modal";
import {
  eliminarAsignatura,
  insertarAsignatura,
  modificarAsignatura,
} from "@/lib/actions";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import { Suspense } from "react";

async function PaginaAsignatura() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-green-200 to-blue-500 p-5">
      <h1 className="text-6xl font-bold mb-20">Asignaturas</h1>
      <Suspense fallback={<div>Loading...</div>}>
        <Modal
          texto="Insertar Asignatura"
          className={
            "px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors duration-300"
          }
        >
          <div className="flex flex-col space-y-4 bg-white p-6 rounded-lg shadow-lg mb-10 ">
            <form
              action={insertarAsignatura}
              className="flex flex-col justify-center align-middle text-center"
            >
              <div className="flex flex-col space-y-2 ">
                <label className="text-lg font-bold">Nombre asignatura:</label>
                <input
                  className="border-2 border-gray-300 rounded-lg p-2"
                  type="text"
                  name="nombre"
                  placeholder="Nombre"
                  required
                />
              </div>
              <div className="flex flex-col space-y-2">
                <label className="text-lg font-bold">Profesor/a:</label>
                <input
                  className="border-2 border-gray-300 rounded-lg p-2"
                  type="text"
                  name="profesor"
                  placeholder="Profesor/a"
                  required
                />
              </div>
              <div className="flex flex-col space-y-2">
                <label className="text-lg font-bold">Num Horas:</label>
                <input
                  className="border-2 border-gray-300 rounded-lg p-2"
                  type="number"
                  name="num_horas"
                  placeholder="Num Horas"
                  required
                />
              </div>
              <button
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg mt-8"
                type="submit"
              >
                Insertar Asignatura
              </button>
            </form>
          </div>
        </Modal>
        <Asignaturas />
      </Suspense>
    </div>
  );
}
export default PaginaAsignatura;

async function Asignaturas() {
  const asignaturas = await prisma.asignatura.findMany();

  return (
    <div className="grid grid-cols-5 gap-6">
      {asignaturas.map((asignatura) => (
        <div
          key={asignatura.id}
          className="flex flex-col items-center justify-center p-6 max-w-lg bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 hover:bg-gray-100"
        >
          <div className="text-center cursor-pointer">
            <p className="text-xl font-extrabold text-gray-800">
              Nombre: {asignatura.nombre}
            </p>
            <p className="text-md text-gray-600">
              Profesor: {asignatura.profesor}
            </p>
          </div>
          <div className="text-center">
            <p className="text-lg font-semibold text-gray-700">
              Num Horas: {String(asignatura.num_horas)}
            </p>
          </div>

          <Modal
            texto="Modificar Asignatura"
            className={
              "px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors duration-300"
            }
          >
            <div className="flex flex-col space-y-4 bg-white p-6 rounded-lg shadow-lg ">
              <form action={modificarAsignatura} className="flex flex-col space-y-2">
                <input type="hidden" name="id" defaultValue={asignatura.id} />
                <div className="flex flex-col space-y-1">
                  <label className="text-lg font-bold">Nombre asignatura:</label>
                  <input
                    className="border-2 border-gray-300 rounded-lg p-2"
                    type="text"
                    name="nombre"
                    defaultValue={asignatura.nombre}
                    required
                  />
                </div>
                <div className="flex flex-col space-y-1">
                  <label className="text-lg font-bold">Profesor/a:</label>
                  <input
                    className="border-2 border-gray-300 rounded-lg p-2"
                    type="text"
                    name="profesor"
                    defaultValue={asignatura.profesor}
                    required
                  />
                </div>
                <div className="flex flex-col space-y-1">
                  <label className="text-lg font-bold">Num Horas:</label>
                  <input
                    className="border-2 border-gray-300 rounded-lg p-2"
                    type="number"
                    name="num_horas"
                    defaultValue={String(asignatura.num_horas)}
                    required
                  />
                </div>
                <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors duration-300">
                  Modificar Asignatura
                </button>
              </form>
            </div>
          </Modal>

          <Modal
            texto="Eliminar Asignatura"
            className={
              "px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors duration-300 mb-3 mt-3"
            }
          >
            <form action={eliminarAsignatura}>
              <input type="hidden" name="id" value={asignatura.id} />
              <h1>
                Esta seguro de que desea eliminar la asignatura {asignatura.nombre}?
              </h1>
              <button
                type="submit"
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors duration-300 mb-3 mt-3"
              >
                Eliminar Asignatura
              </button>
            </form>
          </Modal>
        </div>
      ))}
    </div>
  );
}
