import useUserAuth from "../hooks/useUserAuth";

const WithUserAuth = (props) => useUserAuth(props) && props.children;

export default WithUserAuth;
