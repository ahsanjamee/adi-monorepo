import React, { useState } from "react";
import { ImFacebook, ImGoogle } from "react-icons/im";

//internal import
import useAsync from "@hooks/useAsync";
import Login from "@component/login/Login";
import { notifyError } from "@utils/toast";
import useLoginSubmit from "@hooks/useLoginSubmit";
import Register from "@component/login/Register";
import ResetPassword from "@component/login/ResetPassword";
import SettingServices from "@services/SettingServices";
import OtpInputForm from "./OtpInputForm";
import ResetPassForm from "./ResetPasswordForm";

const Common = ({ setModalOpen }) => {
  const initRegister = {
    name: "",
    email: "",
    phone: "",
  };

  const [registerData, setRegisterData] = useState(initRegister);
  const [verifiedPhone, setVerifiedPhone] = useState("");
  const [showRegister, setShowRegister] = useState(false);
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [showResetPassword, setShowResetPassword] = useState(false);
  const [resetPassForm, setResetPassForm] = useState(false);

  const { handleGoogleSignIn, GoogleLogin } = useLoginSubmit(setModalOpen);
  const { data: storeSetting } = useAsync(SettingServices.getStoreSetting);

  const handleModal = () => {
    setShowRegister(!showRegister);
    setShowResetPassword(false);
  };

  const renderComponent = () => {
    switch (true) {
      case resetPassForm:
        return (
          <ResetPassForm
            setModalOpen={setModalOpen}
            setShowResetPassword={setShowResetPassword}
            setVerifiedPhone={setVerifiedPhone}
            verifiedPhone={verifiedPhone}
          />
        );
      case showOtpInput:
        return (
          <OtpInputForm
            setShowOtpInput={setShowOtpInput}
            setModalOpen={setModalOpen}
            registerData={registerData}
            setVerifiedPhone={setVerifiedPhone}
            verifiedPhone={verifiedPhone}
            setRegisterData={setRegisterData}
            setResetPassForm={setResetPassForm}
          />
        );
      // Uncomment this case if you need to include the ResetPassword component:
      // case showResetPassword:
      //   return (
      //     <ResetPassword
      //       setShowResetPassword={setShowResetPassword}
      //       setShowOtpInput={setShowOtpInput}
      //       setVerifiedPhone={setVerifiedPhone}
      //       setModalOpen={setModalOpen}
      //     />
      //   );
      case showRegister:
        return (
          <Register
            setShowOtpInput={setShowOtpInput}
            setModalOpen={setModalOpen}
            setRegisterData={setRegisterData}
          />
        );
      default:
        return (
          <Login
            setShowResetPassword={setShowResetPassword}
            setModalOpen={setModalOpen}
            setShowOtpInput={setShowOtpInput}
            setVerifiedPhone={setVerifiedPhone}
          />
        );
    }
  };

  return (
    <>
      <div className="overflow-hidden bg-white mx-auto">
        {renderComponent()}
        {storeSetting?.google_login_status && (
          <div className="my-8 after:bg-gray-100 before:bg-gray-100 fo10t-sans text-center font-medium">
            OR
          </div>
        )}

        <div className="flex justify-between flex-col lg:flex-row">
          {storeSetting?.google_login_status && (
            <GoogleLogin
              // clientId={`${process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}`}
              render={(renderProps) => (
                <button
                  className="text-sm inline-flex items-center cursor-pointer transition ease-in-out duration-300 font-semibold font-serif text-center justify-center rounded-md focus:outline-none text-gray-600 bg-gray-100 shadow-sm md:px-2 my-1 sm:my-1 md:my-1 lg:my-0 lg:px-3 py-4 md:py-3.5 lg:py-4 hover:text-white hover:bg-emerald-500 h-11 md:h-12 w-full"
                  onClick={renderProps.onClick}
                  disabled={renderProps.disabled}
                >
                  <ImGoogle /> <span className="ml-2">Login With Google</span>
                </button>
              )}
              onSuccess={handleGoogleSignIn}
              onFailure={(err) =>
                notifyError(
                  err?.message || "Something wrong on your auth setup!"
                )
              }
              cookiePolicy={"single_host_origin"}
            />
          )}
        </div>
        <div className="text-center text-sm text-gray-900 mt-4">
          <div className="text-gray-500 mt-2.5">
            {showRegister ? "Already have a account ?" : "Not have a account ?"}
            <button
              onClick={handleModal}
              className="text-gray-800 hover:text-emerald-500 font-bold mx-2"
            >
              {showRegister ? "Login" : "Register"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Common;
