import { Suspense } from "react";
import { PrismaClient } from "@prisma/client";
import { notFound, redirect } from "next/navigation";
const prisma = new PrismaClient();

async function PaginaGrupo({ params }) {
  const parametros = await params;

  const grupo = await prisma.grupo.findUnique({
    where: {
      id: Number(parametros.id)
    }
  })

  if (!grupo) {
    notFound();
  }

//   console.log(grupo);
  return (
    
    <div className="min-h-screen bg-gradient-to-b from-green-200 to-blue-500 p-5">
      <div className="flex items-center justify-center min-h-screen">
      <Suspense fallback={<div>Loading...</div>}>
      <div className="flex flex-col items-center justify-center p-6 max-w-lg bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 hover:bg-gray-100">
        <h1 className="text-3xl font-extrabold mb-4">Nombre: {grupo.nombre}</h1>
        <div className="text-center">
          <p className="text-xl mb-2">Tutor: <span className="font-semibold">{grupo.tutor}</span></p>
          <p className="text-xl">Aula: <span className="font-semibold">{grupo.aula}</span></p>
        </div>
      </div>
      </Suspense>
      </div>
    </div>

  );
}

export default PaginaGrupo;
