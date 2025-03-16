import "../App.css";
import FormControl from "../components/FormControl";
import Button from "../components/Button";
import Divider from "../components/Divider";

const Signup = () => {
  return (
    <div className="grid grid-cols-[57%_43%] min-h-screen">
      <div className="flex items-center justify-center px-[100px] py-[120px]">
        <div className="w-full">
          <div className="mb-[20px]">
            <h2 className="font-medium text-[28px]">IASQ</h2>
            <p className="text-[#B9B9B9] text-[19px]">
              Let's start the era of success and productivity
            </p>
          </div>
          <form>
            <FormControl
              label="Email address"
              id="email"
              type="email"
              placeholder="Name@gmail.com"
              required
            />
            <div className="grid grid-cols-2 gap-4">
              <FormControl
                label="First Name"
                id="first-name"
                type="text"
                placeholder="First Name"
                required
              />
              <FormControl
                label="Last Name"
                id="last-name"
                type="text"
                placeholder="Last Name"
                required
              />
            </div>
            <FormControl
              label="Password"
              id="password"
              type="password"
              placeholder="Password"
              required
            />
            <Button
              type="submit"
              className="bg-[#1B39E9] text-white hover:bg-[#1A2EB9]"
            >
              Sign Up Now
            </Button>
          </form>
          <Divider />
          <Button
            className="text-[#3B4043] border-[0.5px] border-solid border-[#D4D4D4] hover:bg-gray-100"
            icon="/img/flat-color-icons_google.svg"
          >
            Continue with Google
          </Button>
          <div className="mt-4 text-center">
            <span className="text-[#B9B9B9]">Already have an account? </span>
            <a href="#" className="text-[#1B39E9] hover:underline">
              Log In
            </a>
          </div>
        </div>
      </div>

      <div className="relative">
        <img
          src="/img/signup.png"
          alt="Signup"
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>
    </div>
  );
};

export default Signup;
