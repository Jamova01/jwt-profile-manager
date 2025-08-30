import { LoginForm } from "@/components/organisms/LoginForm";

export default function Page() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-sm p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-semibold mb-4 text-center">
          Iniciar sesión
        </h1>
        <LoginForm />
      </div>
    </div>
  );
}
