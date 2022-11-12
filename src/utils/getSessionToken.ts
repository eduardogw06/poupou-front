interface config {
    headers: { Authorization: string }
}

export const getSessionTokenHeader = (): config => {
    const sessionToken = localStorage.getItem("sessionToken");
    const config = {
        headers: { Authorization: `Bearer ${sessionToken}` }
    };

    return config;
}