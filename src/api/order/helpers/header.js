require("dotenv").config();

const generateToken = () => {
  const xendit_api_key = process.env.XENDIT_API_KEY;
  const encodeToBase64 = Buffer.from(xendit_api_key).toString("base64");
  return encodeToBase64;
};

exports.xenditHeaders = {
  Authorization: `Basic ${generateToken()}`,
  "Content-Type": "application/json",
};
