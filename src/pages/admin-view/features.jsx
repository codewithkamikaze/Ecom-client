import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Sparkles, Settings2, ShieldCheck, Zap } from "lucide-react";

function AdminFeatures() {
  const featureModules = [
    {
      title: "Global Promotions",
      description: "Manage sitewide discounts and seasonal sales events.",
      icon: <Zap className="w-6 h-6 text-yellow-500" />,
      status: "Active",
    },
    {
      title: "Security Settings",
      description: "Configure multi-factor authentication and session limits.",
      icon: <ShieldCheck className="w-6 h-6 text-green-500" />,
      status: "Secure",
    },
    {
      title: "Advanced Configuration",
      description: "Fine-tune API limits and third-party integrations.",
      icon: <Settings2 className="w-6 h-6 text-blue-500" />,
      status: "Optimized",
    },
  ];

  return (
    <div className="flex flex-col gap-8 p-6">
      {/* Header Section */}
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-black text-gray-900 flex items-center gap-3">
          <Sparkles className="w-8 h-8 text-purple-600" />
          Admin Features
        </h1>
        <p className="text-gray-500 font-medium">
          Control advanced store modules and system configurations.
        </p>
      </div>

      {/* Feature Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {featureModules.map((module, index) => (
          <Card
            key={index}
            className="border-none shadow-lg bg-white rounded-[2rem] hover:shadow-2xl transition-all cursor-pointer group"
          >
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <div className="p-3 bg-gray-50 rounded-2xl group-hover:bg-gray-100 transition-colors">
                {module.icon}
              </div>
              <span className="text-xs font-bold px-3 py-1 bg-gray-100 rounded-full text-gray-600">
                {module.status}
              </span>
            </CardHeader>
            <CardContent className="pt-4">
              <CardTitle className="text-xl font-black mb-2">
                {module.title}
              </CardTitle>
              <p className="text-gray-500 text-sm leading-relaxed font-medium">
                {module.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Future Content Placeholder */}
      <div className="mt-4 p-12 border-2 border-dashed border-gray-200 rounded-[3rem] flex flex-col items-center justify-center text-center">
        <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
          <Settings2 className="w-8 h-8 text-gray-300" />
        </div>
        <h3 className="text-lg font-bold text-gray-400">
          Additional modules coming soon
        </h3>
        <p className="text-gray-400 text-sm max-w-xs">
          New administrative tools will be automatically populated here as they
          are developed.
        </p>
      </div>
    </div>
  );
}

export default AdminFeatures;
