import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const useUserAuth = () => {
  const { currentUser } = useSelector((state) => state.users);
  const navigate = useNavigate();

  useEffect(() => {
    if (Object.keys(currentUser).length === 0) {
      navigate("/login", { replace: true });
    }
  }, [currentUser, navigate]);

  return currentUser;
};

export default useUserAuth;
