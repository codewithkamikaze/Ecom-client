import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

function UnauthPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
      <div className="max-w-md space-y-4">
        <h1 className="text-4xl font-extrabold text-red-500">
          Access Denied 🚫
        </h1>

        <p className="text-muted-foreground text-lg">
          You don't have permission to view this page. Please contact the
          administrator if you think this is a mistake.
        </p>

        <Button onClick={() => navigate("/shop/home")} className="mt-4">
          Go Back Home
        </Button>
      </div>
    </div>
  );
}

export default UnauthPage;
