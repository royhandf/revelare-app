import React from "react";
import SearchBar from "./SearchBar";
import Modal from "./Modal";
import Button from "./Button";
import InputField from "./InputField";
import Dropdown from "./Dropdown";
import { useAuth } from "../context/AuthContext";

const NavbarWithSearch = ({
  onSearch,
  searchQuery,
  setSearchQuery,
  selectedScenario,
  setSelectedScenario,
}) => {
  const {
    isAuthenticated,
    currentUser,
    isDropdownMenuOpen,
    toggleDropdownMenu,
    handleLogout,
    isSignInModalOpen,
    isSignUpModalOpen,
    toggleSignInModal,
    toggleSignUpModal,
    authForm,
    handleAuthInputChange,
    handleSignInSubmit,
    handleSignUpSubmit,
  } = useAuth();

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
          selectedScenario={selectedScenario}
          setSelectedScenario={setSelectedScenario}
        />
        {isAuthenticated ? (
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
            </Button>
            {isDropdownMenuOpen && <Dropdown onSignOut={handleLogout} />}
          </div>
        ) : (
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
        )}

        {!isAuthenticated && (
          <>
            <Modal
              isOpen={isSignUpModalOpen}
              toggleModal={toggleSignUpModal}
              title="Sign Up for an Account"
            >
              <div className="p-4 md:p-5">
                <form className="space-y-4" onSubmit={handleSignUpSubmit}>
                  <InputField
                    label="Name"
                    name="name"
                    type="text"
                    value={authForm.name}
                    onChange={handleAuthInputChange}
                    required
                  />
                  <InputField
                    label="Email"
                    name="email"
                    type="email"
                    value={authForm.email}
                    onChange={handleAuthInputChange}
                    required
                  />
                  <InputField
                    label="Password"
                    name="password"
                    type="password"
                    value={authForm.password}
                    onChange={handleAuthInputChange}
                    required
                  />

                  <Button className="w-full py-2.5 px-5 bg-violet-700 text-white rounded-lg hover:bg-violet-800">
                    Sign Up
                  </Button>
                </form>
              </div>
            </Modal>
            <Modal
              isOpen={isSignInModalOpen}
              toggleModal={toggleSignInModal}
              title="Sign In to Your Account"
            >
              <div className="p-4 md:p-5">
                <form className="space-y-4" onSubmit={handleSignInSubmit}>
                  <InputField
                    label="Email"
                    name="email"
                    type="email"
                    value={authForm.email}
                    onChange={handleAuthInputChange}
                    required
                  />
                  <InputField
                    label="Password"
                    name="password"
                    type="password"
                    value={authForm.password}
                    onChange={handleAuthInputChange}
                    required
                  />

                  <Button className="w-full py-2.5 px-5 bg-violet-700 text-white rounded-lg hover:bg-violet-800">
                    Sign In
                  </Button>
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
