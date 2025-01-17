import React from "react";
import SearchBar from "./SearchBar";
import Modal from "./Modal";
import Button from "./Button";
import InputField from "./InputField";
import Dropdown from "./Dropdown";

const NavbarWithSearch = ({
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
  onSearch,
  searchQuery,
  setSearchQuery,
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
        <SearchBar
          onSearch={onSearch}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />
        {isAuthenticated ? (
          <div className="relative inline-block">
            <button
              onClick={toggleDropdownMenu}
              className="flex items-center text-sm pe-1 font-medium text-gray-900 rounded-full"
            >
              <img
                className="w-8 h-8 me-2 rounded-full"
                src={currentUser.avatar}
                alt={currentUser.name}
              />
              {currentUser.name}
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
            </button>
            {isDropdownMenuOpen && <Dropdown onSignOut={handleLogout} />}
          </div>
        ) : (
          <div className="space-x-4">
            <Button
              onClick={toggleSignUpModal}
              text="Sign Up"
              className="bg-transparent text-violet-700 px-4 py-2 hover:text-violet-800"
            />

            <Button
              onClick={toggleSignInModal}
              text="Sign In"
              className="bg-violet-600 text-white px-6 py-2 rounded-lg hover:bg-violet-700"
            />
          </div>
        )}

        {/* Modal Sign In */}
        {!isAuthenticated && (
          <>
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
                  <Button
                    text="Sign Up"
                    className="w-full py-2.5 px-5 bg-violet-700 text-white rounded-lg hover:bg-violet-800"
                  />
                </form>
              </div>
            </Modal>
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
                  <Button
                    text="Sign In"
                    className="w-full py-2.5 px-5 bg-violet-700 text-white rounded-lg hover:bg-violet-800"
                  />
                </form>
              </div>
            </Modal>
          </>
        )}
      </div>
    </nav>
  );
};

export default NavbarWithSearch;
