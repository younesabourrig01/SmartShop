import React from "react";
import { logout } from "../../api/auth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Profile: React.FC = () => {
  const navigate = useNavigate();
  const handlLogout = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await logout();
      localStorage.removeItem("token");
      toast.success(res.data.message);
      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div>
      <h1>Admin logged in</h1>
      <button onClick={handlLogout}>Log out</button>
    </div>
  );
};

export default Profile;
