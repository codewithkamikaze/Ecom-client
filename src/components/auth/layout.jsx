import { Outlet } from "react-router-dom";

function AuthLayout() {
  return (
    <div className="flex min-h-screen w-full bg-white">
      {/* LEFT SIDE: Branding & Features 
          Visible only on Large screens (Desktop)
      */}
      <section className="relative hidden lg:flex w-1/2 items-center justify-center overflow-hidden bg-slate-950 px-12">
        {/* Decorative Background Glow for a premium feel */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-transparent" />

        {/* Subtle grid pattern for texture */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150" />

        <div className="relative z-10 max-w-lg text-center text-white space-y-8">
          <div className="space-y-4">
            <h1 className="text-4xl xl:text-6xl font-black tracking-tighter leading-none">
              SHOPPER <br />
              <span className="text-blue-500">CONTROL.</span>
            </h1>
            <p className="text-gray-400 text-lg font-medium">
              The ultimate platform for modern commerce.
            </p>
          </div>

          {/* Quick value propositions */}
          <div className="flex flex-col gap-4 items-center pt-8 border-t border-white/10">
            <div className="flex items-center gap-3 text-sm font-semibold bg-white/5 px-4 py-2 rounded-full border border-white/10">
              <span className="text-blue-400">01</span>
              <span>Cloud Management</span>
            </div>
            <div className="flex items-center gap-3 text-sm font-semibold bg-white/5 px-4 py-2 rounded-full border border-white/10">
              <span className="text-blue-400">02</span>
              <span>Real-time Analytics</span>
            </div>
            <div className="flex items-center gap-3 text-sm font-semibold bg-white/5 px-4 py-2 rounded-full border border-white/10">
              <span className="text-blue-400">03</span>
              <span>Secure Payments</span>
            </div>
          </div>
        </div>
      </section>

      {/* RIGHT SIDE: Authentication Forms
          Contains the Login/Register components via Outlet
      */}
      <main className="flex flex-1 flex-col items-center justify-center bg-white px-6 py-12 lg:px-12">
        {/* Mobile Logo: Shown only when the left branding section is hidden */}
        <div className="lg:hidden mb-12 text-center group">
          <div className="inline-flex items-center justify-center bg-blue-600 w-12 h-12 rounded-2xl mb-4 shadow-xl shadow-blue-200">
            <span className="text-white font-black text-xl">S</span>
          </div>
          <h1 className="text-2xl font-black tracking-tighter text-slate-900">
            SHOPPER
          </h1>
        </div>

        {/* Dynamic content (Login / Register forms) */}
        <div className="w-full max-w-md">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

export default AuthLayout;
