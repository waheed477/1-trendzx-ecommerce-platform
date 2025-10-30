import { useLocation } from "wouter";
import LoginForm from "@/components/auth/LoginForm";

export default function LoginPage() {
  const [, setLocation] = useLocation();

  const handleLogin = (email: string, password: string) => {
    console.log('Login attempt:', email, password);
    // todo: remove mock functionality - redirect to home after successful login
    setLocation('/');
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-muted/30">
      <LoginForm onLogin={handleLogin} />
    </div>
  );
}
