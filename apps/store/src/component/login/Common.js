import { useState } from "react";
import { ImGoogle } from "react-icons/im";

//internal import
import Login from "@component/login/Login";
import useAsync from "@hooks/useAsync";
import useLoginSubmit from "@hooks/useLoginSubmit";
import SettingServices from "@services/SettingServices";
import { notifyError } from "@utils/toast";
import OtpInputForm from "./OtpInputForm";

const Common = ({ setModalOpen }) => {
  const [verifiedPhone, setVerifiedPhone] = useState("");
  const [showOtpInput, setShowOtpInput] = useState(false);

  const { handleGoogleSignIn, GoogleLogin } = useLoginSubmit(setModalOpen);
  const { data: storeSetting } = useAsync(SettingServices.getStoreSetting);

  const renderComponent = () => {
    return true === showOtpInput ? (
      <OtpInputForm
        setShowOtpInput={setShowOtpInput}
        setModalOpen={setModalOpen}
        setVerifiedPhone={setVerifiedPhone}
        verifiedPhone={verifiedPhone}
      />
    ) : (
      <Login
        setModalOpen={setModalOpen}
        setShowOtpInput={setShowOtpInput}
        setVerifiedPhone={setVerifiedPhone}
      />
    );
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
      </div>
    </>
  );
};

export default Common;
