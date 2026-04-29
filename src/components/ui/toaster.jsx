import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";

/**
 * Toaster Component
 * This component acts as the global container for all toast notifications.
 * Place it at the root of your application (e.g., in App.jsx or Layout.jsx).
 */
export function Toaster() {
  const { toasts } = useToast();

  return (
    <ToastProvider>
      {toasts.map(({ id, title, description, action, ...props }) => (
        <Toast key={id} {...props} className="group">
          <div className="grid gap-1.5">
            {title && (
              <ToastTitle className="text-sm font-black leading-tight">
                {title}
              </ToastTitle>
            )}
            {description && (
              <ToastDescription className="text-xs font-medium leading-relaxed opacity-90">
                {description}
              </ToastDescription>
            )}
          </div>

          {/* Action button (like 'Undo' or 'Retry') */}
          <div className="flex shrink-0 items-center gap-2">{action}</div>

          <ToastClose />
        </Toast>
      ))}

      <ToastViewport />
    </ToastProvider>
  );
}
