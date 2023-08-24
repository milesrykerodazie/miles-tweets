export default function NotFound() {
  return (
    <div className="h-screen flex items-center justify-center">
      <div className="max-w-md p-8 bg-white shadow-lg rounded-lg">
        <h1 className="text-4xl font-bold mb-4">Page Not Found</h1>
        <p className="text-gray-600 mb-6">
          The page you're looking for does not exist.
        </p>
        <a href="/" className="text-blue-500 hover:underline">
          Go back to the homepage
        </a>
      </div>
    </div>
  );
}
