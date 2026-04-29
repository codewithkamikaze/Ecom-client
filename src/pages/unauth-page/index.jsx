import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ShieldAlert, Home, LockKeyhole } from "lucide-react";

function UnauthPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#fafafa] text-center px-4">
      <div className="max-w-md w-full bg-white p-10 rounded-[3rem] shadow-2xl shadow-gray-200/50 border border-gray-50 flex flex-col items-center">
        <div className="relative mb-6">
          <div className="absolute inset-0 bg-red-100 rounded-full blur-2xl opacity-50 animate-pulse"></div>
          <div className="relative w-20 h-20 bg-red-50 rounded-3xl flex items-center justify-center">
            <LockKeyhole className="w-10 h-10 text-red-500" />
          </div>
        </div>

        <h1 className="text-3xl font-black text-gray-900 tracking-tight mb-4">
          Restricted Access
        </h1>

        <p className="text-gray-500 font-medium text-lg leading-relaxed mb-8">
          Oops! It looks like you don't have the necessary permissions to access
          this area. If you believe this is an error, please reach out to
          support.
        </p>

        <div className="flex flex-col w-full gap-3">
          <Button
            onClick={() => navigate("/shop/home")}
            className="h-14 rounded-2xl bg-gray-900 hover:bg-blue-600 font-bold text-lg flex items-center justify-center gap-2 transition-all shadow-lg shadow-gray-200"
          >
            <Home className="w-5 h-5" />
            Return to Store
          </Button>

          <Button
            variant="ghost"
            onClick={() => navigate(-1)}
            className="font-bold text-gray-400 hover:text-gray-900"
          >
            Go Back
          </Button>
        </div>
      </div>

      <div className="mt-8 flex items-center gap-2 text-gray-400 opacity-50 select-none">
        <ShieldAlert className="w-4 h-4" />
        <span className="text-xs font-bold tracking-widest uppercase">
          Security Protocol Active
        </span>
      </div>
    </div>
  );
}

export default UnauthPage;
