import CommonForm from "@/components/common/form";
import { useToast } from "@/components/ui/use-toast";
import { loginFormControls } from "@/config";
import { loginUser } from "@/store/auth-slice";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { User } from "lucide-react";

const initialState = {
  email: "",
  password: "",
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
          description: data?.payload?.message || "Invalid email or password",
          variant: "destructive",
        });
      }
    });
  }

  return (
    <div className="mx-auto w-full max-w-md space-y-8 bg-white p-8 sm:p-10 rounded-[2.5rem] shadow-xl shadow-gray-100/50 border border-gray-50">
      <div className="text-center">
        {/* Visual Anchor */}
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

      <div className="mt-8">
        <CommonForm
          formControls={loginFormControls}
          buttonText={"Sign In"}
          formData={formData}
          setFormData={setFormData}
          onSubmit={onSubmit}
        />
      </div>

      <div className="text-center mt-6">
        <p className="text-xs text-gray-400 font-medium">
          Your data is encrypted and secure.
        </p>
      </div>
    </div>
  );
}

export default AuthLogin;
