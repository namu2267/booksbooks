import React, { useState } from "react";
import { getBookData } from "../../API/Api.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import ChatGPT from "../ChatGPT/ChatGPT.js";
import bookicon from "../../assets/bookicon.png";

export default function Search({ setBookData }) {
  const [search, setSearch] = useState("");

  const handleSubmitSearch = () => {
    getBookData(search).then((res) => {
      console.log("res ===>>>>", res);
      setBookData(res.data.items);
    });
  };

  const onChangeInput = (e) => {
    const { value } = e.target;
    console.log(value);
    setSearch(value);
  };

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
          <input
            type="text"
            placeholder="책이름을 입력하세요"
            value={search}
            onChange={onChangeInput}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                handleSubmitSearch();
              }
            }}
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
