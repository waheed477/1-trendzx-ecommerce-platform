import { useLocation } from "wouter";
import { useAuth } from "../context/AuthContext";
import RegisterForm from "../components/auth/RegisterForm";

export default function RegisterPage() {
  const [, setLocation] = useLocation();
  const { register } = useAuth();

  const handleRegister = async (name: string, email: string, password: string, phone: string) => {
    try {
      console.log('Register attempt:', name, email, password, phone);
      await register(name, email, password, phone);
      // ✅ FIXED: Redirect to login page with success message
      setLocation('/login?message=Registration successful! Please login.');
    } catch (error) {
      console.error('Registration failed:', error);
      alert('Registration failed: ' + (error as Error).message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-muted/30">
      <RegisterForm onRegister={handleRegister} />
    </div>
  );
}