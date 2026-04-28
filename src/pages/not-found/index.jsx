function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white px-4">
      <h1 className="text-8xl font-extrabold tracking-widest text-red-500">
        404
      </h1>

      <div className="mt-4 text-center">
        <p className="text-2xl font-semibold">Oops! Page not found</p>
        <p className="text-gray-400 mt-2">
          The page you’re looking for doesn’t exist or has been moved.
        </p>
      </div>

      <a
        href="/"
        className="mt-8 px-6 py-3 bg-red-500 hover:bg-red-600 transition rounded-full font-medium shadow-lg"
      >
        Go Back Home
      </a>
    </div>
  );
}

export default NotFound;
