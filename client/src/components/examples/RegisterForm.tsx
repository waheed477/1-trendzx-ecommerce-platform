import RegisterForm from '../auth/RegisterForm';

export default function RegisterFormExample() {
  return (
    <RegisterForm 
      onRegister={(name, email, password) => console.log('Register:', name, email, password)} 
    />
  );
}

