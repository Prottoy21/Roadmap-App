import { useState } from "react";
import { useUser } from "../context/UserContext";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signup } = useUser();

  const handleSignup = async (e) => {
    e.preventDefault();
    await signup(email, password);
    setEmail("");
    setPassword("");
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-md max-w-sm mx-auto border border-gray-200 mt-6">
      <form onSubmit={handleSignup}>
        <h2 className="text-2xl font-bold mb-4 text-gray-700 text-center">
          Signup
        </h2>
        <div className="mb-3">
          <input
            type="email"
            placeholder="Email"
            className="block w-full p-2 border rounded box-border"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <input
            type="password"
            placeholder="Password"
            className="block w-full p-2 border rounded box-border"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition"
        >
          Signup
        </button>
      </form>
    </div>
  );
}

export default Signup;
