/**
 * function that will check if the current user is admin or not
 * @params current-user object that comes from redux
 * @return boolean value
 */
export const checkCurrentUserIsAdmin = (currentUser) => {
    if (!Object.keys(currentUser).length > 0 || Array.isArray(currentUser?.userRoles)) return false;

    const { userRoles } = currentUser;


    if (userRoles.includes("admin")) return true;

    return false;
};