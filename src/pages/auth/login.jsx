import CommonForm from "@/components/common/form";
import { useToast } from "@/components/ui/use-toast";
import { loginFormControls } from "@/config";
import { loginUser } from "@/store/auth-slice";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { User } from "lucide-react";

const initialState = {
  email: "samer1234@gmail.com",
  password: "samer112",
};

function AuthLogin() {
  const [formData, setFormData] = useState(initialState);
  const dispatch = useDispatch();
  const { toast } = useToast();

  function onSubmit(event) {
    event.preventDefault();

    dispatch(loginUser(formData)).then((data) => {
      if (data?.payload?.success) {
        toast({
          title: "Welcome Back!",
          description: "Logged in successfully",
          variant: "success",
        });
      } else {
        toast({
          title: "Login Failed",
          description:
            data?.payload?.message || "Invalid email or password",
          variant: "destructive",
        });
      }
    });
  }

  function handleDemoLogin() {
    setFormData({
      email: "samer1234@gmail.com",
      password: "samer112",
    });
  }

  return (
    <div className="mx-auto w-full max-w-md space-y-8 bg-white p-8 sm:p-10 rounded-[2.5rem] shadow-xl shadow-gray-100/50 border border-gray-50">
      
      {/* Header */}
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-3xl bg-blue-50 mb-6">
          <User className="w-8 h-8 text-blue-600" />
        </div>

        <h1 className="text-4xl font-black tracking-tight text-gray-900">
          Sign In
        </h1>

        <p className="mt-3 text-gray-500 font-medium">
          New customer?
          <Link
            className="font-bold ml-2 text-blue-600 hover:text-blue-700 transition-colors underline-offset-4 hover:underline"
            to="/auth/register"
          >
            Create an account
          </Link>
        </p>
      </div>

      {/* Demo Login Button */}
      <div>
        <button
          type="button"
          onClick={handleDemoLogin}
          className="w-full rounded-2xl bg-gray-100 p-3 font-semibold text-gray-700 hover:bg-gray-200 transition-all"
        >
          Use Demo Account
        </button>

        <p className="text-sm text-gray-500 text-center mt-3">
          Demo Account: <span className="font-semibold">samer1234@gmail.com</span> /
          <span className="font-semibold">samer112</span>
        </p>
      </div>

      {/* Login Form */}
      <div className="mt-4">
        <CommonForm
          formControls={loginFormControls}
          buttonText={"Sign In"}
          formData={formData}
          setFormData={setFormData}
          onSubmit={onSubmit}
        />
      </div>

      {/* Footer */}
      <div className="text-center mt-6">
        <p className="text-xs text-gray-400 font-medium">
          Your data is encrypted and secure.
        </p>
      </div>
    </div>
  );
}

export default AuthLogin;