import React, { useState } from "react";
import { Configuration, OpenAIApi } from "openai";

export default function Chat() {
  const [inputValue, setInputValue] = useState("");
  const [outputValue, setOutputValue] = useState("");

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const result = await generateText(inputValue);
    setOutputValue(result);
    setInputValue("");
  };

  const generateText = async (input) => {
    const configuration = new Configuration({
      apiKey: process.env.REACT_APP_CHAT_API_KEY,
    });
    const openai = new OpenAIApi(configuration);

    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: input,
      temperature: 0.7,
      max_tokens: 256,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    });

    return response.data.choices[0].text;
  };

  return (
    <div>
      <form onSubmit={handleFormSubmit}>
        <input type="text" value={inputValue} onChange={handleInputChange} />
        <button type="submit">Send</button>
      </form>
      <div>{outputValue}</div>
    </div>
  );
}

// import React, { useState } from "react";
// import axios from "axios";

// // const { Configuration, OpenAIApi } = require("openai");
// const CHAT_API_KEY = process.env.REACT_APP_CHAT_API_KEY;

// // const configuration = new Configuration({
// //   apiKey: CHAT_API_KEY,
// // });
// // const openai = new OpenAIApi(configuration);

// // const response = await openai.createCompletion({
// //   model: "text-davinci-003",
// //   prompt: "",
// //   temperature: 0.7,
// //   max_tokens: 256,
// //   top_p: 1,
// //   frequency_penalty: 0,
// //   presence_penalty: 0,
// // });

// async function generateText(prompt) {
//   try {
//     const response = await axios({
//       method: "post",
//       url: "https://api.openai.com/v1/engines/davinci-codex/completions",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${CHAT_API_KEY}`,
//       },
//       data: {
//         prompt,
//         max_tokens: 50,
//         temperature: 0.7,
//       },
//     });

//     return response.data.choices[0].text;
//   } catch (error) {
//     console.error(error);
//     return "Sorry, something went wrong. Please try again later.";
//   }
// }
// export default function Chat() {
//   const [inputValue, setInputValue] = useState("");
//   const [outputValue, setOutputValue] = useState("");

//   const handleInputChange = (event) => {
//     setInputValue(event.target.value);
//   };

//   const handleFormSubmit = async (event) => {
//     event.preventDefault();
//     const response = await generateText(inputValue);
//     setOutputValue(response);
//     setInputValue("");
//   };

//   return (
//     <div>
//       <form onSubmit={handleFormSubmit}>
//         <input type="text" value={inputValue} onChange={handleInputChange} />
//         <button type="submit">Send</button>
//       </form>
//       <div>{outputValue}</div>
//     </div>
//   );
// }
