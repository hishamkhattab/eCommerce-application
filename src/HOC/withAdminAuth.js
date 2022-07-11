import useAdminAuth from "../hooks/useAdminAuth";

const WithAdminAuth = (props) => useAdminAuth(props) && props.children;

export default WithAdminAuth;