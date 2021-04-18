export const postUserData = "postUserData";
export const logoutAction = "logoutAction";

export function storeUserData(
    data
) {
    return {
        type: postUserData,
        email: data.email,
        fname: data.fname,
        lname: data.lname,
        id: data.id,
    };
}

export function logout(
    data
) {
    return {
        type: logoutAction
    };
}
