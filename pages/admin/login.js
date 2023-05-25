import { useState } from "react";
import { useCookies } from "react-cookie";
import axios from "axios";
import { useRouter } from "next/router";

const Login = (props) => {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [cookie, setCookie] = useCookies(["token"]);

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log("sending req with = ", process.env.LOGIN_ADMIN_URL);
    try {
      const response = await axios.post(process.env.LOGIN_ADMIN_URL, {
        phone: "+977" + phone,
        password,
      });
      // console.log("response.data = ", response.data);
      if (response.data.success) {
        setCookie("token", response.data.message.token, {
          path: "/",
          maxAge: 3600,
          sameSite: true,
        });

        router.push({ pathname: "/admin" });
      } else {
        setError(response.data.message);
      }
    } catch (error) {
      setError(Error?.message || "Error while logging in!");
    }
  };

  return (
    <div className="bg-gray-800 h-screen flex items-center justify-center">
      <form
        className="bg-white p-6 rounded-lg shadow-md"
        onSubmit={(e) => handleSubmit(e)}
      >
        <h2 className="text-lg font-medium mb-4 text-center text-pink-600">
          Admin Login
        </h2>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Phone</label>
          <input
            className="border border-gray-400 p-2 rounded-lg w-full"
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">
            Password
          </label>
          <input
            className="border border-gray-400 p-2 rounded-lg w-full"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {error && <p className="text-red-500">{error}</p>}
        <button className="bg-green-600 text-white p-2 rounded-lg hover:bg-green-500">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
