import { useState } from "react";

const initialValues = {
  fullName: "",
  email: "",
  password: "",
  confirmPassword: "",
  terms: false,
};

function getPasswordStrength(password) {
  let score = 0;
  if (password.length >= 8) score++;
  if (/[A-Z]/.test(password) && /[a-z]/.test(password)) score++;
  if (/\d/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;
  return score; // 0 - 4
}

const strengthLabels = ["Too short", "Weak", "Fair", "Good", "Strong"];
const strengthColors = [
  "bg-slate-300",
  "bg-red-500",
  "bg-amber-500",
  "bg-lime-500",
  "bg-emerald-600",
];

function validate(values) {
  const errors = {};

  if (!values.fullName.trim()) {
    errors.fullName = "Enter your full name.";
  }

  if (!values.email.trim()) {
    errors.email = "Enter your email address.";
  } else if (!/^\S+@\S+\.\S+$/.test(values.email)) {
    errors.email = "Enter a valid email, like name@example.com.";
  }

  if (!values.password) {
    errors.password = "Create a password.";
  } else if (values.password.length < 8) {
    errors.password = "Use at least 8 characters.";
  }

  if (!values.confirmPassword) {
    errors.confirmPassword = "Re-enter your password.";
  } else if (values.confirmPassword !== values.password) {
    errors.confirmPassword = "Passwords don't match.";
  }

  if (!values.terms) {
    errors.terms = "Accept the terms to create your account.";
  }

  return errors;
}

function Field({ id, label, error, children }) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-slate-700">
        {label}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} role="alert" className="mt-1.5 text-sm text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}

const inputClass = (hasError) =>
  `w-full rounded-lg border bg-white px-3.5 py-2.5 text-slate-900 placeholder-slate-400 shadow-sm outline-none transition focus:ring-2 ${
    hasError
      ? "border-red-400 focus:border-red-500 focus:ring-red-200"
      : "border-slate-300 focus:border-indigo-600 focus:ring-indigo-200"
  }`;

export default function RegistrationPage() {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);


  const strength = getPasswordStrength(values.password);


  //   e.preventDefault();
  //   const validationErrors = validate(values);
  //   setErrors(validationErrors);
  //   if (Object.keys(validationErrors).length > 0) return;

  //   setSubmitting(true);
  //   try {
  //     // Replace this with your real API call, e.g.:
  //     // await fetch("/api/register", { method: "POST", body: JSON.stringify(values) });
  //     await new Promise((resolve) => setTimeout(resolve, 900));
  //     setSuccess(true);
  //   } finally {
  //     setSubmitting(false);
  //   }
  // };

  return (
    <div className="flex min-h-screen bg-slate-50 text-slate-900">
    

      {/* Form panel */}
      <main className="flex flex-1 items-center justify-center px-6 py-12">
        <div className="w-full max-w-md">
         
            <>
              <h1 className="text-3xl font-semibold tracking-tight">Create your account</h1>
              <p className="mt-2 text-slate-600">
                Already registered?{" "}
                <a href="/login" className="font-medium text-indigo-700 hover:text-indigo-900 hover:underline">
                  Log in
                </a>
              </p>

              <form  noValidate className="mt-8 space-y-5">
                <Field id="fullName" label="Full name" error={errors.fullName}>
                  <input
                    id="fullName"
                    name="fullName"
                    type="text"
                    autoComplete="name"
                    value={values.fullName}
                   
                    placeholder="Md.Imam Hassan"
                    className={`w-full rounded-lg border bg-white px-3.5 py-2.5 text-slate-900 placeholder-slate-400 shadow-sm outline-none transition focus:ring-2`}
                  />
                </Field>

                <Field id="email" label="Email address" error={errors.email}>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    value={values.email}
                  
                    placeholder="name@example.com"
                    aria-invalid={!!errors.email}
                    aria-describedby={errors.email ? "email-error" : undefined}
                    className={inputClass(errors.email)}
                  />
                </Field>

                <Field id="password" label="Password" error={errors.password}>
                  <div className="relative">
                    <input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      autoComplete="new-password"
                      value={values.password}
                    
                      placeholder="At least 8 characters"
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

                  {values.password && (
                    <div className="mt-2.5" aria-live="polite">
                      <div className="flex gap-1.5">
                        {[1, 2, 3, 4].map((i) => (
                          <span
                            key={i}
                            className={`h-1.5 flex-1 rounded-full transition-colors ${
                              i <= strength ? strengthColors[strength] : "bg-slate-200"
                            }`}
                          />
                        ))}
                      </div>
                      <p className="mt-1.5 text-xs text-slate-500">
                        Password strength: {strengthLabels[strength]}
                      </p>
                    </div>
                  )}
                </Field>

                <Field id="confirmPassword" label="Confirm password" error={errors.confirmPassword}>
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showPassword ? "text" : "password"}
                    autoComplete="new-password"
                    value={values.confirmPassword}
                    
                    placeholder="Re-enter your password"
                    aria-invalid={!!errors.confirmPassword}
                    aria-describedby={errors.confirmPassword ? "confirmPassword-error" : undefined}
                    className={inputClass(errors.confirmPassword)}
                  />
                </Field>

                <div>
                  <label className="flex cursor-pointer items-start gap-3 text-sm text-slate-600">
                    <input
                      type="checkbox"
                      name="terms"
                      checked={values.terms}
                  
                      aria-invalid={!!errors.terms}
                      aria-describedby={errors.terms ? "terms-error" : undefined}
                      className="mt-0.5 h-4 w-4 rounded border-slate-300 text-indigo-700 focus:ring-indigo-300"
                    />
                    <span>
                      I agree to the{" "}
                      <a href="/terms" className="font-medium text-indigo-700 hover:underline">
                        Terms of Service
                      </a>{" "}
                      and{" "}
                      <a href="/privacy" className="font-medium text-indigo-700 hover:underline">
                        Privacy Policy
                      </a>
                      .
                    </span>
                  </label>
                  {errors.terms && (
                    <p id="terms-error" role="alert" className="mt-1.5 text-sm text-red-600">
                      {errors.terms}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="flex w-full items-center justify-center rounded-lg bg-indigo-950 px-4 py-3 font-semibold text-white shadow-sm transition hover:bg-indigo-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {submitting ? "Creating account…" : "Create account"}
                </button>
              </form>
            </>
        
        </div>
      </main>
    </div>
  );
}