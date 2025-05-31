import { useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useCart } from "react-use-cart";
import { IoSearchOutline } from "react-icons/io5";
import { FiShoppingCart, FiUser, FiBell } from "react-icons/fi";
import useTranslation from "next-translate/useTranslation";

//internal import
import NavbarPromo from "@layout/navbar/NavbarPromo";
import { UserContext } from "@context/UserContext";
import LoginModal from "@component/modal/LoginModal";
import CartDrawer from "@component/drawer/CartDrawer";
import { SidebarContext } from "@context/SidebarContext";
import useGetSetting from "@hooks/useGetSetting";
import { handleLogEvent } from "@utils/analytics";
import SearchBar from "./SearchBar";

const Navbar = () => {
  const { t } = useTranslation();
  const [imageUrl, setImageUrl] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const { toggleCartDrawer } = useContext(SidebarContext);
  const { totalItems } = useCart();
  const router = useRouter();

  const { storeCustomizationSetting } = useGetSetting();

  const {
    state: { userInfo },
  } = useContext(UserContext);

  useEffect(() => {
    if (Cookies.get("userInfo")) {
      const user = JSON.parse(Cookies.get("userInfo"));
      setImageUrl(user.image);
    }
  }, []);

  return (
    <>
      <CartDrawer />
      {modalOpen && (
        <LoginModal modalOpen={modalOpen} setModalOpen={setModalOpen} />
      )}

      <div className="bg-[#E9F7E9] sticky top-0 z-20">
        <div className="max-w-screen-2xl mx-auto px-3 sm:px-10">
          <div className="top-bar h-16 lg:h-auto flex items-center justify-between py-4 mx-auto">
            <div className="flex items-center">
              <Link
                href="/"
                className="mr-3 lg:mr-4 xl:mr-4 hidden md:hidden lg:flex items-center gap-4"
              >
                <Image
                  width={80}
                  height={28}
                  minWidth={80}
                  minHeight={28}
                  src={
                    storeCustomizationSetting?.navbar?.logo || "/logo/logo.png"
                  }
                  alt="logo"
                  className="object-contain"
                />
                <div className=" text-lg text-emerald-500 font-bold">
                  <span>ADI BAZAR</span>
                  <br />
                  Agriculture and Dairy Improvement, since 2014
                </div>
              </Link>
            </div>
            <SearchBar />
            <div className="md:hidden bg-green-700 font-serif ml-4 py-3 px-4 rounded text-sm font-bold text-white hover:bg-blue-600">
              <Link
                href="#"
                >
                {'Registration'}
              </Link>        
            </div>      
            <div className="hidden md:hidden md:items-center lg:flex xl:block absolute inset-y-0 right-0 pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
              <button
                className="p-2 rounded-full bg-emerald-500 text-white text-2xl font-bold"
                aria-label="Alert"
              >
                <FiBell className="w-6 h-6 drop-shadow-xl" />
              </button>
              <button
                aria-label="Total"
                onClick={toggleCartDrawer}
                className="relative p-2 rounded-full bg-emerald-500 mx-5 text-white text-2xl font-bold"
              >
                <span className="absolute z-10 top-0 left-9 inline-flex items-center justify-center p-1 h-6 w-6 text-xs font-medium leading-none text-red-100 transform -translate-x-1/2 -translate-y-1/2 bg-red-500 rounded-full">
                  {totalItems}
                </span>
                <FiShoppingCart className="w-6 h-6 drop-shadow-xl" />
              </button>
              {/* Profile dropdown */}

              <button
                className="p-2 rounded-full bg-emerald-500 text-white text-2xl font-bold"
                aria-label="Login"
              >
                {imageUrl || userInfo?.image ? (
                  <Link
                    href="/user/dashboard"
                    className="relative top-1 w-6 h-6"
                  >
                    <Image
                      width={29}
                      height={29}
                      src={imageUrl || userInfo?.image}
                      alt="user"
                      className="bg-white rounded-full"
                    />
                  </Link>
                ) : userInfo?.name ? (
                  <Link
                    href="/user/dashboard"
                    className="leading-none font-bold font-serif block"
                  >
                    {userInfo?.name[0]}
                  </Link>
                ) : (
                  <span onClick={() => setModalOpen(!modalOpen)}>
                    <FiUser className="w-6 h-6 drop-shadow-xl" />
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* second header */}
        <NavbarPromo />
      </div>
    </>
  );
};
export default dynamic(() => Promise.resolve(Navbar), { ssr: false });
