require("dotenv").config();
const crypto = require("crypto");

const randomString = crypto
  .randomBytes(32) // generating a random sequence of 16 bytes (128 bits)
  .toString("hex"); // converting it into a string

const {
  JWT_SECRET = "CAT_FISH",
  DB_URL = "mongodb://127.0.0.1:27017/wtwr_db",
  PORT = 3001,
} = process.env;

module.exports = {
  JWT_SECRET,
  DB_URL,
  PORT,
};
