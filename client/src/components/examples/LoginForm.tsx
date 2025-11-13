import LoginForm from '../auth/LoginForm';

export default function LoginFormExample() {
  return <LoginForm onLogin={(email, password) => console.log('Login:', email, password)} />;
}

