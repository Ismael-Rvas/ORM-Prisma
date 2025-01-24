import { Suspense } from "react";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function PaginaAlumno({ params }) {
  const parametros = await params;

  const alumno = await prisma.alumno.findUnique({
    where: {
      id: Number(parametros.id)
    }
  })

//   console.log(grupo);
  return (
    
    <div className="min-h-screen bg-gradient-to-b from-green-200 to-blue-500 p-5">
      <div className="flex items-center justify-center min-h-screen">
      <Suspense fallback={<div className="text-center text-black"><h1 className="">Loading...</h1></div>}>
      <div className="flex flex-col items-center justify-center p-6 max-w-lg bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 hover:bg-gray-100">
        <h1 className="text-3xl font-extrabold mb-4">Nombre: {alumno.nombre}</h1>
        <div className="text-center">
          <p className="text-xl mb-2">{alumno.nombre}</p>
          <p className="text-md text-gray-600">{alumno.fecha_nacimiento}</p>
        </div>
        <div className="text-center">
          <img src={alumno.foto} alt={`Foto de ${alumno.nombre}`} className="w-32 h-32 rounded-full mb-2 border-2 border-gray-200" />
          <p className="text-lg font-semibold text-gray-700">Tutor Legal: {alumno.tutor_legal}</p>
        </div>
      </div>
      </Suspense>
      </div>
    </div>

  );
}

export default PaginaAlumno;
