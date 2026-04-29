import CommonForm from "@/components/common/form";
import { useToast } from "@/components/ui/use-toast";
import { registerFormControls } from "@/config";
import { registerUser } from "@/store/auth-slice";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { UserPlus } from "lucide-react";

const initialState = {
  userName: "",
  email: "",
  password: "",
};

function AuthRegister() {
  const [formData, setFormData] = useState(initialState);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { toast } = useToast();

  function onSubmit(event) {
    event.preventDefault();
    dispatch(registerUser(formData)).then((data) => {
      if (data?.payload?.success) {
        toast({
          title: "Account created!",
          description: data?.payload?.message,
          variant: "success",
        });
        navigate("/auth/login");
      } else {
        toast({
          title: "Registration Failed",
          description: data?.payload?.message,
          variant: "destructive",
        });
      }
    });
  }

  return (
    <div className="mx-auto w-full max-w-md space-y-8 bg-white p-8 sm:p-10 rounded-[2.5rem] shadow-xl shadow-gray-100/50 border border-gray-50">
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-3xl bg-blue-50 mb-6">
          <UserPlus className="w-8 h-8 text-blue-600" />
        </div>

        <h1 className="text-4xl font-black tracking-tight text-gray-900">
          Create Account
        </h1>

        <p className="mt-3 text-gray-500 font-medium">
          Already have an account?
          <Link
            className="font-bold ml-2 text-blue-600 hover:text-blue-700 transition-colors underline-offset-4 hover:underline"
            to="/auth/login"
          >
            Sign In
          </Link>
        </p>
      </div>

      <div className="mt-8">
        <CommonForm
          formControls={registerFormControls}
          buttonText={"Create Account"}
          formData={formData}
          setFormData={setFormData}
          onSubmit={onSubmit}
        />
      </div>

      <div className="text-center mt-6">
        <p className="text-xs text-gray-400 font-medium">
          By signing up, you agree to our Terms of Service.
        </p>
      </div>
    </div>
  );
}

export default AuthRegister;
