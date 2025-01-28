import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-red-500 to-pink-500 p-5">
      <div className="text-center bg-white p-10 rounded-lg shadow-lg">
        <h1 className="text-6xl font-extrabold text-red-600 mb-4">ERROR 404</h1>
        <p className="text-2xl text-gray-700 mb-6">Parece que no encontramos lo que buscabas</p>
        <Link href="/" className="text-blue-500 text-xl font-semibold hover:underline">Ir al inicio</Link>
      </div>
    </div>
  );
}
