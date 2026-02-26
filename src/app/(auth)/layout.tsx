import { Heart } from "lucide-react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-muted/30 p-4">
      <div className="mb-8 flex flex-col items-center gap-2">
        <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-primary">
          <Heart className="w-6 h-6 text-primary-foreground" />
        </div>
        <span className="text-2xl font-bold">HealthTrack</span>
        <span className="text-sm text-muted-foreground">
          Your personal AI-powered health companion
        </span>
      </div>
      {children}
    </div>
  );
}
