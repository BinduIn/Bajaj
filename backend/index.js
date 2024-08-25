const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// User information constants
const USER_ID = "john_doe_17091999";
const EMAIL = "john@xyz.com";
const ROLL_NUMBER = "ABCD123";

// Helper function to process input data
function processData(inputData) {
  const numbers = inputData.filter(item => !isNaN(item));
  const alphabets = inputData.filter(item => /^[a-zA-Z]+$/.test(item));
  const lowerCaseAlphabets = alphabets.filter(item => item === item.toLowerCase());

  let highestLowercaseAlphabet = [];
  if (lowerCaseAlphabets.length > 0) {
    highestLowercaseAlphabet.push(lowerCaseAlphabets.sort().reverse()[0]);
  }

  return {
    is_success: true,
    numbers: numbers,
    alphabets: alphabets,
    highest_lowercase_alphabet: highestLowercaseAlphabet,
  };
}

// POST endpoint to handle data
app.post('/bfhl', (req, res) => {
  const inputData = req.body.data;
  if (!inputData) {
    return res.status(400).json({ is_success: false, error: 'Invalid input data' });
  }

  const processedData = processData(inputData);

  return res.json({
    is_success: processedData.is_success,
    user_id: USER_ID,
    email: EMAIL,
    roll_number: ROLL_NUMBER,
    numbers: processedData.numbers,
    alphabets: processedData.alphabets,
    highest_lowercase_alphabet: processedData.highest_lowercase_alphabet,
  });
});

// GET endpoint to return operation code
app.get('/bfhl', (req, res) => {
  return res.json({ operation_code: 1 });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
