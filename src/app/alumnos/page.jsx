import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import { Suspense } from "react";

async function PaginaAlumno() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-green-200 to-blue-500 p-5">
      <h1 className="text-6xl font-bold mb-20">Alumnos</h1>
      <Suspense fallback={<div>Loading...</div>}>
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
        </div>
      ))}
    </div>
  );
}
