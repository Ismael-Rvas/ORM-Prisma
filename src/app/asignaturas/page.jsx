import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import { Suspense } from "react";

async function PaginaAsignatura() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-green-200 to-blue-500 p-5">
      <h1 className="text-6xl font-bold mb-20">Asignaturas</h1>
      <Suspense fallback={<div>Loading...</div>}>
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
        </div>
      ))}
    </div>
  );
}
