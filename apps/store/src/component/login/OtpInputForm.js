//internal  import
import CountdownTimer from "@component/common/CountdownTimer";
import Error from "@component/form/Error";
import Loading from "@component/preloader/Loading";
import useLoginSubmit from "@hooks/useLoginSubmit";
import CustomerServices from "@services/CustomerServices";
import { notifyError, notifySuccess } from "@utils/toast";
import { useState } from "react";
import { Controller } from "react-hook-form";
import OtpInput from "react-otp-input";
const OtpInputForm = ({
  setShowOtpInput,
  setModalOpen,
  verifiedPhone,
  setVerifiedPhone,
}) => {
  const { handleSubmit, submitHandler, control, errors, loading } =
    useLoginSubmit({
      setShowOtpInput,
      setModalOpen,
      verifiedPhone,
      setVerifiedPhone,
    });

  const [loadingOtp, setLoadingOtp] = useState(false);
  const [timeLeft, setTimeLeft] = useState(180); // 3 minutes in seconds

  const isMobile = window.innerWidth <= 500;

  const handleResendOtp = () => {
    setLoadingOtp(true);
    CustomerServices.verifyPhoneForLogin({
      phone: verifiedPhone,
    })
      .then((res) => {
        setLoadingOtp(false);
        notifySuccess(res.message);
      })
      .catch((err) => {
        setLoadingOtp(false);
        notifyError(err ? err?.response?.data?.message : err?.message);
      });
  };

  return (
    <>
      <div className="text-center mb-6">
        <h2 className="text-3xl font-bold font-serif">Verify your number</h2>
        <p className="text-sm md:text-base text-gray-500 mt-2 mb-8 sm:mb-10">
          An OTP has been sent to your phone number
        </p>
      </div>
      <form
        onSubmit={handleSubmit(submitHandler)}
        className="flex flex-col justify-center w-full"
      >
        <div className="grid grid-cols-1 gap-5">
          <Controller
            name="otp"
            control={control}
            defaultValue=""
            rules={{
              required: "OTP is required",
              minLength: { value: 6, message: "OTP must be 6 digits" },
            }}
            render={({ field: { onChange, value } }) => (
              <OtpInput
                value={value}
                onChange={onChange}
                numInputs={6}
                renderSeparator={<span className="mx-2"></span>}
                renderInput={(props) => (
                  <input
                    {...props}
                    className={`w-full h-16 border-1 ${
                      errors.otp ? "border-red-500" : "border-gray-300"
                    } text-center text-xl font-bold rounded-md focus:outline-none focus:ring-1 ${
                      errors.otp
                        ? "focus:ring-red-500"
                        : "focus:ring-emerald-500"
                    }`}
                  />
                )}
                inputStyle={{
                  width: isMobile ? "30px" : "50px",
                  height: isMobile ? "40px" : "50px",
                }}
                containerStyle={{
                  display: "flex",
                  margin: "0 2px",
                  justifyContent: "space-between",
                }}
              />
            )}
          />

          <Error errorName={errors.otp} />

          <div className="w-fit">
            {loadingOtp ? (
              <Loading />
            ) : timeLeft === 0 ? (
              <p
                className="text-sm text-emerald-500 cursor-pointer"
                onClick={() => handleResendOtp()}
              >
                Resend{" "}
              </p>
            ) : (
              <div className="flex">
                <p className="pr-1 text-sm">Resend OTP in</p>
                <CountdownTimer timeLeft={timeLeft} setTimeLeft={setTimeLeft} />
              </div>
            )}
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
              className="w-full text-center py-3 rounded bg-emerald-500 text-white hover:bg-emerald-600 transition-all focus:outline-none my-1"
            >
              Verify Phone
            </button>
          )}
        </div>
      </form>
    </>
  );
};

export default OtpInputForm;
