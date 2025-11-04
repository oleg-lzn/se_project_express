require("dotenv").config();
const crypto = require("crypto");

const randomString = crypto
  .randomBytes(32) // generating a random sequence of 16 bytes (128 bits)
  .toString("hex"); // converting it into a string

const { JWT_SECRET, DB_URL, PORT } = process.env;

module.exports = {
  JWT_SECRET,
  DB_URL,
  PORT,
};
