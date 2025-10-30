import { useLocation } from "wouter";
import RegisterForm from "@/components/auth/RegisterForm";

export default function RegisterPage() {
  const [, setLocation] = useLocation();

  const handleRegister = (name: string, email: string, password: string) => {
    console.log('Register attempt:', name, email, password);
    // todo: remove mock functionality - redirect to home after successful registration
    setLocation('/');
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-muted/30">
      <RegisterForm onRegister={handleRegister} />
    </div>
  );
}
