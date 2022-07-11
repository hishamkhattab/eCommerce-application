import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { checkCurrentUserIsAdmin} from "../utils/index";
const useAdminAuth = () => {
    const { currentUser } = useSelector(state => state.users);
    const navigate = useNavigate();

    useEffect(() => {
        if (!checkCurrentUserIsAdmin(currentUser)) {
            navigate("/login", {replace: true});
        }

    }, [currentUser,navigate]);

    return currentUser;
};

export default useAdminAuth;