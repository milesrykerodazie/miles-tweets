import Image from "next/image";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";

const AuthPage = () => {
  return (
    <div className=" bg-primary w-full flex items-center justify-center h-screen">
      <main className="w-full mx-auto md:max-w-6xl flex flex-col md:flex-row p-6 xl:p-0 md:justify-between md:space-x-2 lg:space-x-20">
        {/* side one */}
        <div className="flex justify-center items-center w-full">
          <div className="h-72 w-72  lg:h-[500px] md:w-[500px] relative trans">
            <Image
              fill
              src="/images/tweet.png"
              alt="logo"
              className="object-cover"
            />
          </div>
        </div>

        {/* side two */}
        <div className="w-full">
          <div className="text-3xl md:text-5xl xl:text-6xl font-bold text-white mb-12 trans">
            Happening now
          </div>
          <div className="text-3xl font-bold text-white pb-5">Join today.</div>

          <div className="">
            <button className="w-full bg-white border border-gray-300 p-2 rounded-md flex items-center justify-center space-x-3">
              <FcGoogle />
              <span className="text-gray-700 font-medium">
                Sign up with Google
              </span>
            </button>
          </div>

          {/* the divider */}
          <div className="flex items-center text-gray-600 w-full whitespace-nowrap py-6 justify-center">
            <span>-----------</span>
            <span className="text-gray-400 px-2">or</span>
            <span>-----------</span>
          </div>
          <div className="mb-6">
            <Link href="/auth/register">
              <button className="w-full bg-blue-500 text-white border border-transparent p-2 rounded-md flex items-center justify-center">
                Create account
              </button>
            </Link>

            <div className="text-sm text-gray-500 mt-2">
              By signing up, you agree to the{" "}
              <span className="text-blue-500">Terms of Service</span> and{" "}
              <span className="text-blue-500">Privacy Policy</span>, including{" "}
              <span className="text-blue-500">Cookie Use</span>.
            </div>
          </div>
          <div className="w-full">
            <p className="text-white pb-5">Already have an account?</p>
            <Link href="/auth/login">
              <button className="text-blue-500 border rounded-full w-full py-3 border-gray-600">
                Sign in
              </button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AuthPage;
