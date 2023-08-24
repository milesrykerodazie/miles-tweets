import Link from "next/link";

export default function NotFound() {
  return (
    <main className="h-screen flex items-center justify-center">
      <div className="max-w-md p-8 bg-white shadow-lg rounded-lg">
        <h1 className="text-2xl font-bold text-black mb-4">Page Not Found</h1>
        <p className="text-gray-700 mb-6">
          The page you're looking for does not exist.
        </p>
        <Link href="/home" className="text-blue-500 hover:underline">
          Go back to the homepage
        </Link>
      </div>
    </main>
  );
}
