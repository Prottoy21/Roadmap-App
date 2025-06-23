import { useUser } from "../context/UserContext";

function Logout() {
  const { logout, user } = useUser();

  return (
    <div className="flex justify-between items-center bg-gray-50 p-4 rounded mb-4">
      <p className="text-gray-700">
        Logged in as <span className="font-semibold">{user.email}</span>
      </p>
      <button
        onClick={logout}
        className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600 transition"
      >
        Logout
      </button>
    </div>
  );
}

export default Logout;
