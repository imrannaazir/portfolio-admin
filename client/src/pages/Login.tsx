import LoginForm from "@/components/forms/LoginForms";
import Container from "@/components/ui/container";

const LoginPage = () => {
  return (
    <Container>
      <div className="flex items-center justify-center bg-gray-100 min-h-screen">
        {/* log in form */}
        <section className="max-w-md flex-1 flex justify-center items-center ">
          <div className="flex-1 bg-background p-6 rounded-md shadow-md">
            <h1 className="text-3xl mb-6">Login</h1>
            <LoginForm />
          </div>
        </section>
      </div>
    </Container>
  );
};

export default LoginPage;
