import { useNavigate } from "react-router";

const SignIn = () => {
  const navigate = useNavigate();
  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <img
          className="w-24 h-24 mr-2 mb-6"
          src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg"
          alt="logo"
        />
        <a
          href="/"
          className="flex items-center mb-6 text-6xl font-bold text-gray-900 dark:text-white"
        >
          KikCatToe
        </a>
        <div className="w-full dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <form className="space-y-4 md:space-y-6" action="#">
              <button
                onClick={() => navigate("/game")}
                type="submit"
                className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                Play!
              </button>
              <div className="flex flex-row justify-between">
                <button
                  id="Edit Profile"
                  onClick={() => navigate("/editprofile")}
                  className="w-1/3 text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                >
                  Edit Profile
                </button>
                <button
                  id="LogOut"
                  onClick={() => navigate("/")}
                  className="w-1/3 bg-gray-50 border border-gray-300 text-gray-900 rounded-lg hover:bg-red-600 hover:text-white"
                >
                  Log Out
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignIn;
