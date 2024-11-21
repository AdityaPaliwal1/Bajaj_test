const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const atob = require("atob"); // For decoding Base64 strings

const app = express();
app.use(cors());
app.use(bodyParser.json());

const isPrime = (num) => {
  if (num < 2) return false;
  for (let i = 2; i <= Math.sqrt(num); i++) {
    if (num % i === 0) return false;
  }
  return true;
};

const validateFile = (base64String) => {
  try {
    if (!base64String) return { file_valid: false };

    // Decode the Base64 string
    const buffer = Buffer.from(base64String, "base64");

    // Detect MIME type

    if (!mimeInfo) {
      return {
        file_valid: false,
        file_size_kb: null,
      };
    }

    // Calculate file size in KB
    const fileSizeKB = (buffer.length / 1024).toFixed(2);

    return {
      file_valid: true,
      file_size_kb: parseFloat(fileSizeKB),
    };
  } catch (error) {
    return { file_valid: false, file_mime_type: null, file_size_kb: null };
  }
};

app.post("/bfhl", (req, res) => {
  const { data, file_b64 } = req.body;
  const user_id = "Aditya_Paliwal_09062004";
  const email = "adityapaliwal243@gmail.com";
  const roll_number = "0827CI211012";

  const numbers = data.filter((item) => !isNaN(item));
  const alphabets = data.filter((item) => isNaN(item));

  const lowercaseAlphabets = alphabets.filter(
    (char) => char === char.toLowerCase()
  );
  const highestLowercaseAlphabet = lowercaseAlphabets.sort().slice(-1);

  const isPrimeFound = numbers.some((num) => isPrime(parseInt(num, 10)));

  const fileValidation = validateFile(file_b64);

  // Response
  const response = {
    is_success: true,
    user_id,
    email,
    roll_number,
    numbers,
    alphabets,
    highest_lowercase_alphabet: highestLowercaseAlphabet,
    is_prime_found: isPrimeFound,
    ...fileValidation,
  };

  res.status(200).json(response);
});

// GET Route: /bfhl
app.get("/bfhl", (req, res) => {
  res.status(200).json({ operation_code: 1 });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
