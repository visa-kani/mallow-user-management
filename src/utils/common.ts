export const getUserData = () => {
    const data = localStorage.getItem("userData");
    return data ? JSON.parse(data) : null;
}

export const setUserData = (data: any) => {
    console.log(data, "ls-store");
    localStorage.setItem("userData", JSON.stringify(data));
    return data;
}

export const removeUserData = () => {
    localStorage.removeItem("userData");
}