module.exports = {
    PORT: process.env.PORT || 5051,
    TOKEN_MONGOOSE: process.env.TOKEN_MONGOOSE,
    ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET || "access_secret",
    REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET || "refresh_secret",
};
