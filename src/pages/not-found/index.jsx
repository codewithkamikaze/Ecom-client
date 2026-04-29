import { Link } from "react-router-dom";
import { MoveLeft, AlertTriangle } from "lucide-react";

function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#fafafa] text-gray-900 px-4">
      {/* Visual Element */}
      <div className="relative mb-8">
        <h1 className="text-[12rem] font-black leading-none text-gray-100 select-none">
          404
        </h1>
        <div className="absolute inset-0 flex items-center justify-center">
          <AlertTriangle className="w-24 h-24 text-red-500 animate-bounce" />
        </div>
      </div>

      <div className="text-center space-y-4">
        <h2 className="text-4xl font-black tracking-tight text-gray-900">
          Lost in the Workshop?
        </h2>
        <p className="text-gray-500 font-medium max-w-md mx-auto text-lg">
          The tool or page you're looking for isn't here. It might have been
          moved or doesn't exist anymore.
        </p>
      </div>

      <Link
        to="/"
        className="mt-10 flex items-center gap-2 px-8 py-4 bg-gray-900 text-white hover:bg-blue-600 transition-all duration-300 rounded-[1.5rem] font-bold shadow-2xl shadow-gray-200 group"
      >
        <MoveLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
        Back to Home
      </Link>

      <div className="mt-20 opacity-20">
        <img src="/2.jpg" alt="Store Logo" className="h-8 grayscale" />
      </div>
    </div>
  );
}

export default NotFound;
