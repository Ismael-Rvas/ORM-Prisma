import { eliminarGrupo, insertarGrupo } from "@/lib/actions";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import { Suspense } from "react";

async function PaginaGrupo() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-green-200 to-blue-500 p-5">
      <h1 className="text-6xl font-bold mb-20">Grupos</h1>
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
      <div>
      <form action={insertarGrupo}>
        <input name="nombre" placeholder="Nombre"/>
        <input name="tutor" placeholder="Tutor/a"/>
        <input name="aula" placeholder="Aula"/>
        <button>Insertar Grupo</button>
      </form>
      </div>

      {grupos.map((grupo) => (
        <div
          key={grupo.id}
          className="flex flex-col items-center justify-center p-6 max-w-lg bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 hover:bg-gray-100"
        >
          <div className="text-center cursor-pointer">
            <p className="text-xl font-extrabold text-gray-800">{grupo.nombre}</p>
            <p className="text-md text-gray-600">Tutor:{grupo.tutor}</p>
          </div>
          <div className="text-center">
            <p className="text-lg font-semibold text-gray-700">Aula: {grupo.aula}</p>
          </div>

          <form action={eliminarGrupo}>
            <input type="hidden" name="id" value={grupo.id} />
            <button type="submit" className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors duration-300">Eliminar Grupo</button>
          </form>

          
        </div>
      ))}
    </div>
  );
}
