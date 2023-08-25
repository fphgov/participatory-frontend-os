import LoginForm from "./login-form";

export default function LoginPage() {
  return (
    <main className="page page-login page-full-dark">
      <div className="page-login-section">
        <div className="container">
          <div className="row">
            <div className="col-xs-12 col-sm-10 offset-sm-1 col-md-8 offset-md-2 col-lg-6 offset-lg-3">
              <LoginForm />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}