const databaseError = {
    "22P02": {
        code: 400,
        message: "Invalid params value",
    },
    23502: {
        code: 400,
        message: "Bad request",
    },
    23505: {
        code: 400,
        message: "User already exists",
    },
};

export const getDatabaseError = (code) => {
    return databaseError[code] || {
        code: 500, message: "Internal server error" };
};
