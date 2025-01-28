import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-12 bg-gradient-to-r from-indigo-500 to-pink-500 shadow-lg">
      <div className="mb-4">
        <Link href="/grupos" className="text-white text-2xl font-bold hover:underline">
            GRUPOS
        </Link>
      </div>
      <div className="mb-4">
        <Link href="/alumnos" className="text-white text-2xl font-bold hover:underline">
            ALUMNOS
        </Link>
      </div>
      <div>
        <Link href="/asignaturas" className="text-white text-2xl font-bold hover:underline">
            ASIGNATURAS
        </Link>
      </div>
    </div>
  );
}
