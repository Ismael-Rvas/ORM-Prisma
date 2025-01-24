import { Suspense } from "react";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function PaginaAsignatura({ params }) {
  const parametros = await params;

  const asignatura = await prisma.asignatura.findUnique({
    where: {
      id: Number(parametros.id)
    }
  })

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-200 to-blue-500 p-5">
      <div className="flex items-center justify-center min-h-screen">
      <Suspense fallback={<div className="text-center text-black"><h1 className="">Loading...</h1></div>}>
      <div className="flex flex-col items-center justify-center p-6 max-w-lg bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 hover:bg-gray-100">
        <h1 className="text-3xl font-extrabold mb-4">Nombre: {asignatura.nombre}</h1>
        <div className="text-center">
          <p className="text-xl mb-2">Profesor: <span className="font-semibold">{asignatura.profesor}</span></p>
          <p className="text-xl">Num Horas: <span className="font-semibold">{String(asignatura.num_horas)}</span></p>
        </div>
      </div>
      </Suspense>
      </div>
    </div>
  );
}

export default PaginaAsignatura;
