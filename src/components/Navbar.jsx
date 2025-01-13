import React from "react";
import Modal from "./Modal";
import Dropdown from "./Dropdown";
import Button from "./Button";
import InputField from "./InputField";

const Navbar = ({
  isAuthenticated,
  currentUser,
  isSignInModalOpen,
  isSignUpModalOpen,
  toggleSignInModal,
  toggleSignUpModal,
  isDropdownMenuOpen,
  toggleDropdownMenu,
  signInForm,
  handleAuthChange,
  handleSignIn,
  handleSignUp,
  authError,
  handleLogout,
  isShowAuth = true,
}) => {
  return (
    <nav className="bg-white py-4 px-6 shadow-sm">
      <div className="max-w-screen-xl flex items-center justify-between mx-auto p-2 gap-3">
        <a href="/" className="flex items-center space-x-3">
          <img
            className="w-8 h-8"
            src="/images/book.png"
            alt="logo"
            width="32"
            height="32"
          />
          <span className="text-2xl font-semibold">Revelare</span>
        </a>

        {isAuthenticated && currentUser ? (
          <div className="relative inline-block">
            <Button
              onClick={toggleDropdownMenu}
              className="flex items-center text-sm pe-1 font-medium text-gray-900 rounded-full"
            >
              <img
                className="w-8 h-8 me-2 rounded-full"
                src={currentUser.avatar}
                alt={currentUser.name}
              />
              {currentUser.name || "User"}
              <svg
                className="w-2.5 h-2.5 ms-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 10 6"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 4 4 4-4"
                />
              </svg>
            </Button>
            {isDropdownMenuOpen && <Dropdown onSignOut={handleLogout} />}
          </div>
        ) : isShowAuth ? (
          <div className="space-x-4">
            <Button
              onClick={toggleSignUpModal}
              className="bg-transparent text-violet-700 px-4 py-2 hover:text-violet-800"
            >
              Sign Up
            </Button>
            <Button
              onClick={toggleSignInModal}
              className="bg-violet-600 text-white px-6 py-2 rounded-lg hover:bg-violet-700"
            >
              Sign In
            </Button>
          </div>
        ) : null}

        {!isAuthenticated && isShowAuth && (
          <>
            {toggleSignUpModal && isSignUpModalOpen !== undefined && (
              <Modal
                isOpen={isSignUpModalOpen}
                toggleModal={toggleSignUpModal}
                title="Sign Up for an Account"
              >
                <div className="p-4 md:p-5">
                  <form className="space-y-4" onSubmit={handleSignUp}>
                    <InputField
                      label="Name"
                      name="name"
                      type="text"
                      value={signInForm.name}
                      onChange={handleAuthChange}
                      required
                    />
                    <InputField
                      label="Email"
                      name="email"
                      type="email"
                      value={signInForm.email}
                      onChange={handleAuthChange}
                      required
                    />
                    <InputField
                      label="Password"
                      name="password"
                      type="password"
                      value={signInForm.password}
                      onChange={handleAuthChange}
                      required
                    />
                    {authError && (
                      <p className="text-red-500 text-sm">{authError}</p>
                    )}
                    <Button className="w-full py-2.5 px-5 bg-violet-700 text-white rounded-lg hover:bg-violet-800">
                      Sign Up
                    </Button>
                  </form>
                </div>
              </Modal>
            )}
            {toggleSignInModal && isSignInModalOpen !== undefined && (
              <Modal
                isOpen={isSignInModalOpen}
                toggleModal={toggleSignInModal}
                title="Sign In to Your Account"
              >
                <div className="p-4 md:p-5">
                  <form className="space-y-4" onSubmit={handleSignIn}>
                    <InputField
                      label="Email"
                      name="email"
                      type="email"
                      value={signInForm.email}
                      onChange={handleAuthChange}
                      required
                    />
                    <InputField
                      label="Password"
                      name="password"
                      type="password"
                      value={signInForm.password}
                      onChange={handleAuthChange}
                      required
                    />
                    {authError && (
                      <p className="text-red-500 text-sm">{authError}</p>
                    )}
                    <Button className="w-full py-2.5 px-5 bg-violet-700 text-white rounded-lg hover:bg-violet-800">
                      Sign In
                    </Button>
                  </form>
                </div>
              </Modal>
            )}
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
