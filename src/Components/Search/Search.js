import React, { useState } from "react";
import { getBookData, getBooksName } from "../../API/Api.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import ChatGPT from "../ChatGPT/ChatGPT.js";
import bookicon from "../../assets/bookicon.png";
import "./Search.css";

export default function Search({ setBookData }) {
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState("");

  const handleSubmitSearch = async () => {
    try {
      const response = await getBookData(search, selected);
      console.log("res ===>>>>", response);
      setBookData(response.data.items);
    } catch (error) {
      console.error(error);
    }
  };

  const onChangeInput = (e) => {
    const { value } = e.target;
    console.log(value);
    setSearch(value);
  };

  const handleSelect = (e) => {
    setSelected(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSubmitSearch();
    }
  };

  console.log(selected);

  return (
    <div className="header">
      <div className="row1">
        <h1>BooksBooks</h1>
      </div>
      <div className="row2">
        <img className="book-icon" src={bookicon} alt="book-icon" />
        <h2>TodayBook</h2>
        <h3>"What book should I read today?"</h3>
        <div className="search">
          <select onChange={handleSelect} value={selected}>
            <option value="intitle">책이름</option>
            <option value="inauthor">저자</option>
          </select>
          <input
            type="text"
            placeholder="책이름을 입력하세요"
            value={search}
            onChange={onChangeInput}
            onKeyPress={handleKeyPress}
          />
          <button onClick={handleSubmitSearch}>
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </button>
        </div>
        <div className="chat-title">
          <h3>책에 대해 궁금한거 물어보세요!!</h3>
        </div>
        <div className="chat-box">
          <ChatGPT />
        </div>
      </div>
    </div>
  );
}
