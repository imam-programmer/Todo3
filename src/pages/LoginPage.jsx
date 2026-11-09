import { useState } from "react";
import { Link } from "react-router";

function validate(values) {
  const errors = {};

  if (!values.email.trim()) {
    errors.email = "Enter your email address.";
  } else if (!/^\S+@\S+\.\S+$/.test(values.email)) {
    errors.email = "Enter a valid email, like name@example.com.";
  }

  if (!values.password) {
    errors.password = "Enter your password.";
  }

  return errors;
}

const inputClass = (hasError) =>
  `w-full rounded-lg border bg-white px-3.5 py-2.5 text-slate-900 placeholder-slate-400 shadow-sm outline-none transition focus:ring-2 ${
    hasError
      ? "border-red-400 focus:border-red-500 focus:ring-red-200"
      : "border-slate-300 focus:border-indigo-600 focus:ring-indigo-200"
  }`;

export default function LoginPage() {
  const [values, setValues] = useState({ email: "", password: "", remember: false });
  const [errors, setErrors] = useState({});
  const [formError, setFormError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setValues((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: undefined }));
    if (formError) setFormError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate(values);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    setSubmitting(true);
    setFormError("");
    try {

      await new Promise((resolve) => setTimeout(resolve, 900));
      console.log("Logged in as", values.email);

    } catch (err) {
      setFormError("That email and password don't match. Check them and try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-50 text-slate-900">


      {/* Form panel */}
      <main className="flex flex-1 items-center justify-center px-6 py-12">
        <div className="w-full max-w-md">
          <h1 className="text-3xl font-semibold tracking-tight">Log in to your account</h1>
          <p className="mt-2 text-slate-600">
            New here?{" "}
            <Link to="/" className="font-medium text-indigo-700 hover:text-indigo-900 hover:underline">
              Create an account
            </Link>
           
          </p>

          {formError && (
            <div
              role="alert"
              className="mt-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
            >
              {formError}
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate className="mt-8 space-y-5">
            <div>
              <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-slate-700">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                value={values.email}
                onChange={handleChange}
                placeholder="name@example.com"
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? "email-error" : undefined}
                className={inputClass(errors.email)}
              />
              {errors.email && (
                <p id="email-error" role="alert" className="mt-1.5 text-sm text-red-600">
                  {errors.email}
                </p>
              )}
            </div>

            <div>
              <div className="mb-1.5 flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium text-slate-700">
                  Password
                </label>
              </div>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  value={values.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  aria-invalid={!!errors.password}
                  aria-describedby={errors.password ? "password-error" : undefined}
                  className={`${inputClass(errors.password)} pr-16`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((s) => !s)}
                  className="absolute inset-y-0 right-0 rounded-r-lg px-3.5 text-sm font-medium text-slate-500 hover:text-slate-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-300"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
              {errors.password && (
                <p id="password-error" role="alert" className="mt-1.5 text-sm text-red-600">
                  {errors.password}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="flex w-full items-center justify-center rounded-lg bg-indigo-950 px-4 py-3 font-semibold text-white shadow-sm transition hover:bg-indigo-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {submitting ? "Logging in…" : "Log in"}
            </button>
          </form>

       


        </div>
      </main>
    </div>
  );
}