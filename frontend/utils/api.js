export const apiFetch = async (url, options = {}) => {
    const token = localStorage.getItem("token");

    const res = await fetch(url, {
        ...options,
        headers: {
            ...options.headers,
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
    });

    // 🔴 TOKEN EXPIRED OR INVALID
    if (res.status === 401) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");

        window.location.href = "/login";
        return;
    }

    return res.json();
};
