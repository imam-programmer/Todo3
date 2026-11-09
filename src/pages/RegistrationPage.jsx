import { useState } from "react";
import { Link, useNavigate } from "react-router";

const inputClass = (hasError) =>
  `w-full rounded-lg border bg-white px-3.5 py-2.5 text-slate-900 placeholder-slate-400 shadow-sm outline-none transition focus:ring-2
     border-slate-300 focus:border-indigo-600 focus:ring-indigo-200
  `;

export default function RegistrationPage() {
  const [name, setname] = useState("");
  const [errors, setErrors] = useState({});
  const [email, setemail] = useState("")
  const [showPassword, setShowPassword] = useState(false);
  const [password, setpassword] = useState("")
  const navigate=useNavigate()

  function registrationSubmit(){

if(!name && !email && !password){
  alert("all fill are required")
  
}else if(name && email && password){
  if(!email.includes("@") && email.includes(".")){
    alert("email must have @ and .")
  }else if(!email.includes(".")){
    alert("email must have . and @")
  }
  else{
    navigate("/todo")
  }
}
  }

  return (
    <div className="flex min-h-screen bg-slate-50 text-slate-900">

      {/* Form panel */}
      <main className="flex flex-1 items-center justify-center px-6 py-12">
        <div className="w-full max-w-md">

          <>
            <h1 className="text-3xl font-semibold tracking-tight">Create your account</h1>
            <p className="mt-2 text-slate-600">
              Already registered?{" "}
              <Link to="/login" className="font-medium text-indigo-700 hover:text-indigo-900 hover:underline">
                Log in
              </Link>

            </p>

            <div  className="mt-8 space-y-5">
              <label>Enter fullName</label>
              <input
                id="fullName"
                name="fullName"
                type="text"
                autoComplete="name"
                value={name}
                onChange={(e) => setname(e.target.value)}
                placeholder="Md.Imam Hassan"
                className={inputClass()}
              />


              <label>Enter Email</label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setemail(e.target.value)}
                placeholder="name@example.com"
                className={inputClass()}
              />



              <label>Password</label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="new-password"
                  value={password}
                  onChange={(e) => setpassword(e.target.value)}
                  placeholder="At least 8 characters"
                  aria-invalid={!!errors.password}
                  aria-describedby={errors.password ? "password-error" : undefined}
                  className={`${inputClass()} pr-16`}
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


              <button
              onClick={registrationSubmit}

                className="flex w-full items-center justify-center rounded-lg bg-indigo-950 px-4 py-3 font-semibold text-white shadow-sm transition hover:bg-indigo-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60 cursor-pointer"
              >
                Creating account
              </button>
            </div>
          </>

        </div>
      </main>
    </div>
  );
}