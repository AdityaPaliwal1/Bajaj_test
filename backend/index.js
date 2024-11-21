const express = require("express");
const bodyParser = require("body-parser");
const atob = require("atob");
const app = express();

app.use(bodyParser.json());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});

// Helper functions
const isPrime = (num) => {
  if (num <= 1) return false;
  for (let i = 2; i < Math.sqrt(num) + 1; i++) {
    if (num % i === 0) return false;
  }
  return true;
};

const getFileDetails = (base64String) => {
  try {
    if (!base64String) return { file_valid: false };
    const buffer = Buffer.from(base64String, "base64");
    const mimeType = base64String
      .substring(0, base64String.indexOf(";"))
      .split(":")[1];
    const sizeKB = Math.ceil(buffer.length / 1024);
    return { file_valid: true, file_mime_type: mimeType, file_size_kb: sizeKB };
  } catch (err) {
    return { file_valid: false };
  }
};

// Endpoints
app.get("/bfhl", (req, res) => {
  res.status(200).json({ operation_code: 1 });
});

app.post("/bfhl", (req, res) => {
  try {
    const { data, file_b64 } = req.body;

    if (!data || !Array.isArray(data)) {
      return res.status(400).json({
        is_success: false,
        error:
          'Invalid input: "data" field is required and should be an array.',
      });
    }

    const userId = "Aditya_Paliwal_09062004";
    const email = "adityapaliwal243@gmail.com";
    const rollNumber = "0827CI211012";

    const numbers = data.filter((item) => !isNaN(item));
    const alphabets = data.filter((item) => isNaN(item));
    const lowercaseAlphabets = alphabets.filter((c) => c >= "a" && c <= "z");
    const highestLowercase = lowercaseAlphabets.length
      ? [lowercaseAlphabets.sort().reverse()[0]]
      : [];

    const isPrimeFound = numbers.some((num) => isPrime(parseInt(num)));

    const fileDetails = getFileDetails(file_b64);

    res.status(200).json({
      is_success: true,
      user_id: userId,
      email,
      roll_number: rollNumber,
      numbers,
      alphabets,
      highest_lowercase_alphabet: highestLowercase,
      is_prime_found: isPrimeFound,
      ...fileDetails,
    });
  } catch (err) {
    res.status(500).json({ is_success: false, error: err.message });
  }
});


// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
