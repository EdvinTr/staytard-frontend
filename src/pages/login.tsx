import { NextPage } from "next";

const inputClassNames =
  "w-full text-xs placeholder-black placeholder-opacity-60 placeholder:font-normal focus:text-sm font-bold ring-black h-[50px] ring-1 ring-opacity-25 focus:ring-1 focus:ring-black focus:ring-opacity-60 border-none focus:border-none ";
const LoginPage: NextPage = () => {
  return (
    <div className="sm:max-w-md lg:max-w-lg 2xl:max-w-4xl mx-auto px-8">
      <div className="pt-24 text-center">
        {/* page titles */}
        <div className="space-y-6">
          <h1 className="text-2xl">Log in to Staytard.com</h1>
          <h2 className="text-13 font-light">
            Log in by filling in your e-mail address and password
          </h2>
        </div>
        {/* form */}
        <form name="LoginUserForm" className="pt-6">
          <div className="space-y-3">
            <div>
              {/* email input */}
              <input
                type="email"
                required
                className={`${inputClassNames}`}
                name="email-input"
                placeholder="E-mail"
              />
            </div>
            <div>
              {/* password input */}
              <input
                type="password"
                required
                className={`${inputClassNames}`}
                name="password-input"
                placeholder="Password"
              />
            </div>
          </div>
          {/* //TODO should be link */}
          <div className="text-13 pt-4 font-light hover:underline cursor-pointer">
            Do you miss or have forgotten your password?
          </div>
          <button
            type="submit"
            name="login"
            className="w-full p-4 mt-5 uppercase text-sm font-bold tracking-wider bg-staytard-yellow hover:bg-black hover:text-white transition-all duration-300 ease-out"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
