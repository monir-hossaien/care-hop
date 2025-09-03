export const refreshCookieOptions = {
    httpOnly: false,
    secure: process.env.NODE_ENV === "production", // false on localhost
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000,
    path: "/",
};


export const accessCookieOptions = {
    httpOnly: false,
    secure: process.env.NODE_ENV === "production", // false on localhost
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    maxAge: 24 * 60 * 60 * 1000,
    path: "/",
};