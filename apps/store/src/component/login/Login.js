import { FiLock, FiMail, FiPhone } from "react-icons/fi";

//internal  import
import Error from "@component/form/Error";
import useLoginSubmit from "@hooks/useLoginSubmit";
import InputArea from "@component/form/InputArea";

const Login = ({ setModalOpen, setShowOtpInput, setVerifiedPhone }) => {
  const { handleSubmit, submitHandler, register, errors, loading } =
    useLoginSubmit({ setModalOpen, setShowOtpInput, setVerifiedPhone });

  return (
    <>
      <div className="text-center mb-6">
        <h2 className="text-3xl font-bold font-serif">Login</h2>
        <p className="text-sm md:text-base text-gray-500 mt-2 mb-8 sm:mb-10">
          Login with your phone number
        </p>
      </div>
      <form
        onSubmit={handleSubmit(submitHandler)}
        className="flex flex-col justify-center"
      >
        <div className="grid grid-cols-1 gap-5">
          <div className="form-group">
            <InputArea
              register={register}
              isRequired={true}
              label="Phone Number"
              name="registeredPhone"
              type="text"
              placeholder="Phone no."
              validation={{
                pattern: {
                  value: /^01\d{9}$/,
                  message: "Phone number is invalid",
                },
              }}
              Icon={FiPhone}
            />
            <Error errorName={errors.registeredPhone} />
          </div>

          {loading ? (
            <button
              disabled={loading}
              type="submit"
              className="md:text-sm leading-5 inline-flex items-center cursor-pointer transition ease-in-out duration-300 font-medium text-center justify-center border-0 border-transparent rounded-md placeholder-white focus-visible:outline-none focus:outline-none bg-emerald-500 text-white px-5 md:px-6 lg:px-8 py-2 md:py-3 lg:py-3 hover:text-white hover:bg-emerald-600 h-12 mt-1 text-sm lg:text-sm w-full sm:w-auto"
            >
              <img
                src="/loader/spinner.gif"
                alt="Loading"
                width={20}
                height={10}
              />
              <span className="font-serif ml-2 font-light">Processing</span>
            </button>
          ) : (
            <button
              disabled={loading}
              type="submit"
              className="w-full font-bold text-center py-3 rounded bg-emerald-500 text-white hover:bg-emerald-600 transition-all focus:outline-none my-1"
            >
              Login / Register
            </button>
          )}
        </div>
      </form>
    </>
  );
};

export default Login;
