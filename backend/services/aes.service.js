const crypto = require("crypto");

const encrypt = (password, key, iv) => {
    const cipher = crypto.createCipheriv(
        "aes-256-cbc",
        Buffer.from(key, "hex"),
        Buffer.from(iv, "hex")
    );
    let encrypted = cipher.update(password, "utf-8", "hex");
    encrypted += cipher.final("hex");
    return encrypted;
};

const decrypt = (password, key, iv) => {
    const decipher = crypto.createDecipheriv(
        "aes-256-cbc",
        Buffer.from(key, "hex"),
        Buffer.from(iv, "hex")
    );
    let decrypted = decipher.update(password, "hex", "utf-8");
    decrypted += decipher.final("utf-8");
    return decrypted;
};

module.exports = {
    encrypt,
    decrypt,
};
