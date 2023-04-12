import React, { useState } from "react";
import { Configuration, OpenAIApi } from "openai";
import "./Chat.css";

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
      max_tokens: 512,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    });

    return response.data.choices[0].text;
  };

  return (
    <div className="chat-container">
      <form onSubmit={handleFormSubmit}>
        <input type="text" value={inputValue} onChange={handleInputChange} />
        <button type="submit">Send</button>
      </form>
      <div className="chat-output">{outputValue}</div>
    </div>
  );
}
