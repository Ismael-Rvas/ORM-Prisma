import Modal from "@/components/Modal";
import {
  eliminarAlumno,
  insertarAlumno,
  modificarAlumno,
} from "@/lib/actions";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import { Suspense } from "react";

async function PaginaAlumno() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-green-200 to-blue-500 p-5">
      <h1 className="text-6xl font-bold mb-20">Alumnos</h1>
      <Suspense fallback={<div>Loading...</div>}>
      <Modal
          texto="Insertar Alumno"
          className={
            "px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors duration-300"
          }
        >
          <div className="flex flex-col space-y-4 bg-white p-6 rounded-lg shadow-lg mb-10 ">
            <form
              action={insertarAlumno}
              className="flex flex-col justify-center align-middle text-center"
            >
              <div className="flex flex-col space-y-2 ">
                <label className="text-lg font-bold">Nombre Alumno:</label>
                <input
                  className="border-2 border-gray-300 rounded-lg p-2"
                  type="text"
                  name="nombre"
                  placeholder="Nombre"
                  required
                />
              </div>
              <div className="flex flex-col space-y-2">
                <label className="text-lg font-bold">Fecha Nacimiento:</label>
                <input
                  className="border-2 border-gray-300 rounded-lg p-2"
                  type="date"
                  name="fecha_nacimiento"
                  placeholder="Fecha Nacimiento"
                  required
                />
              </div>
              {/* <div className="flex flex-col space-y-2">
                <label className="text-lg font-bold">Foto:</label>
                <input
                  className="border-2 border-gray-300 rounded-lg p-2"
                  type="file"
                  name="foto"
                  required
                />
              </div> */}
              <div className="flex flex-col space-y-2">
                <label className="text-lg font-bold">Tutor/a Legal:</label>
                <input
                  className="border-2 border-gray-300 rounded-lg p-2"
                  type="text"
                  name="tutor_legal"
                  placeholder="Tutor/a Legal"
                  required
                />
              </div>
              <button
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg mt-8"
                type="submit"
              >
                Insertar Alumno
              </button>
            </form>
          </div>
        </Modal>
        <Alumnos />
      </Suspense>
    </div>
  );
}
export default PaginaAlumno;

async function Alumnos() {
  const alumnos = await prisma.alumno.findMany();

  return (
    <div className="grid grid-cols-5 gap-6">
      {alumnos.map((alumno) => (
        <div
          key={alumno.id}
          className="flex flex-col items-center justify-center p-6 max-w-lg bg-white rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 hover:bg-gray-100 hover:scale-105"
        >
          <div className="text-center cursor-pointer">
            <p className="text-2xl font-extrabold text-gray-800">
              {alumno.nombre}
            </p>
            <p className="text-md text-gray-600">
              {alumno.fecha_nacimiento}
            </p>
          </div>
          <div className="text-center">
            <img src={alumno.foto} alt={`Foto de ${alumno.nombre}`} className="w-32 h-32 rounded-full mb-2 border-2 border-gray-200" />
            <p className="text-lg font-semibold text-gray-700">
              Tutor Legal: {alumno.tutor_legal}
            </p>
          </div>

          <Modal
            texto="Modificar Alumno"
            className={
              "px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors duration-300"
            }
          >
            <div className="flex flex-col space-y-4 bg-white p-6 rounded-lg shadow-lg ">
              <form action={modificarAlumno} className="flex flex-col space-y-2">
                <input type="hidden" name="id" defaultValue={alumno.id} />
                <div className="flex flex-col space-y-1">
                  <label className="text-lg font-bold">Nombre alumno:</label>
                  <input
                    className="border-2 border-gray-300 rounded-lg p-2"
                    type="text"
                    name="nombre"
                    defaultValue={alumno.nombre}
                    required
                  />
                </div>
                <div className="flex flex-col space-y-1">
                  <label className="text-lg font-bold">Fecha Nacimiento:</label>
                  <input
                    className="border-2 border-gray-300 rounded-lg p-2"
                    type="date"
                    name="fecha_nacimiento"
                    defaultValue={alumno.fecha_nacimiento}
                    required
                  />
                </div>
                {/* <div className="flex flex-col space-y-1">
                  <label className="text-lg font-bold">Foto:</label>
                  <input
                    className="border-2 border-gray-300 rounded-lg p-2"
                    type="input"
                    name="foto"
                    defaultValue={alumno.foto}
                    required
                  />
                </div> */}
                <div className="flex flex-col space-y-1">
                  <label className="text-lg font-bold">Tutor/a Legal:</label>
                  <input
                    className="border-2 border-gray-300 rounded-lg p-2"
                    type="text"
                    name="tutor_legal"
                    defaultValue={alumno.tutor_legal}
                    required
                  />
                </div>
                <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors duration-300">
                  Modificar Alumno
                </button>
              </form>
            </div>
          </Modal>

          <Modal
            texto="Eliminar Alumno"
            className={
              "px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors duration-300 mb-3"
            }
          >
            <form action={eliminarAlumno}>
              <input type="hidden" name="id" value={alumno.id} />
              <h1>
                Esta seguro de que desea eliminar el alumno {alumno.nombre}?
              </h1>
              <button
                type="submit"
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors duration-300 mb-3 mt-3"
              >
                Eliminar Alumno
              </button>
            </form>
          </Modal>
        </div>
      ))}
    </div>
  );
}
