import { useAuth } from "../../context/AuthContext";

const Index = () => {
  const { currentUser } = useAuth();
  return (
    <div className="p-6 flex items-center justify-center">
      <div className="max-w-screen-lg w-full">
        <h1 className="text-3xl font-semibold mb-4">
          Welcome back, {currentUser.name || "User"}!
        </h1>
        <p className="text-lg text-gray-600">This is a dashboard page.</p>
      </div>
    </div>
  );
};

export default Index;
