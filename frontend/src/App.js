import React, { useState } from "react";
import axios from "axios";
import Select from "react-select";

const App = () => {
  const [jsonInput, setJsonInput] = useState("");
  const [response, setResponse] = useState(null);
  const [options, setOptions] = useState([]);

  const dropdownOptions = [
    { value: "numbers", label: "Numbers" },
    { value: "alphabets", label: "Alphabets" },
    {
      value: "highest_lowercase_alphabet",
      label: "Highest Lowercase Alphabet",
    },
    { value: "is_prime_found", label: "Is Prime Found" },
  ];

  const handleSubmit = async () => {
    try {
      const parsedInput = JSON.parse(jsonInput);
      const res = await axios.post("http://localhost:5000/bfhl", parsedInput, {
        headers: { "Content-Type": "application/json" },
      });
      setResponse(res.data);
    } catch (err) {
      alert("Invalid JSON or API Error: " + err.message);
    }
  };

  const renderDetails = () => {
    if (!response) return null;

    return (
      <div> 
       

        <h2>Filtered Response</h2>
        {options.length === 0 ? (
          <pre>{JSON.stringify(response, null, 2)}</pre>
        ) : (
          <pre>
            {JSON.stringify(
              options.reduce((acc, opt) => {
                acc[opt.label] = response[opt.value];
                return acc;
              }, {}),
              null,
              2
            )}
          </pre>
        )}
      </div>
    );
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>API Input</h1>
      <textarea
        style={{ width: "100%", height: "100px" }}
        placeholder="Enter JSON here..."
        onChange={(e) => setJsonInput(e.target.value)}
      />
      <button onClick={handleSubmit} style={{ margin: "10px 0", width:"100%",padding:"20px" }}>
        Submit
      </button>
      <Select
        isMulti
        options={dropdownOptions}
        onChange={(selected) => setOptions(selected || [])}
      />
      {renderDetails()}
    </div>
  );
};

export default App;
