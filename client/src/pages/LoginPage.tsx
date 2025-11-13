import { useLocation } from "wouter";
import { useAuth } from "../context/AuthContext";
import LoginForm from "../components/auth/LoginForm";
import { useEffect, useState } from "react";

export default function LoginPage() {
  const [, setLocation] = useLocation();
  const { login } = useAuth();
  const [successMessage, setSuccessMessage] = useState("");

  // Check for success message in URL
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const message = urlParams.get('message');
    if (message) {
      setSuccessMessage(message);
      // Clear the URL parameter
      window.history.replaceState({}, '', '/login');
    }
  }, []);

  const handleLogin = async (email: string, password: string) => {
    try {
      console.log('Login attempt:', email, password);
      await login(email, password);
      setLocation('/');
    } catch (error) {
      console.error('Login failed:', error);
      alert('Login failed: ' + (error as Error).message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-muted/30">
      <LoginForm onLogin={handleLogin} successMessage={successMessage} />
    </div>
  );
}