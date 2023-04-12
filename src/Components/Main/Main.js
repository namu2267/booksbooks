import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import Card from "../Card/Card.js";
import axios from "axios";
import Chat from "../Chat/Chat.js";
import "./Main.css";

export default function Main() {
  const [search, setSearch] = useState("");
  const [bookData, setData] = useState([]);
  const API_KEY = process.env.REACT_APP_API_KEY;

  const searchBook = () => {
    axios
      .get(
        "https://www.googleapis.com/books/v1/volumes?q= " +
          search +
          `&key=${API_KEY}` +
          "&maxResults=40"
      )
      .then((res) => setData(res.data.items))
      .catch((err) => console.log(err.response.data));
    console.log(API_KEY);
  };

  const handleSearch = (e) => {
    if (e.key === "Enter") {
      searchBook();
    }
  };

  const handleButtonClick = () => {
    searchBook();
  };

  return (
    <>
      <div className="header">
        <div className="row1">
          <h1>BooksBooks</h1>
        </div>
        <div className="row2">
          <h2>"오늘 뭐읽지?"</h2>
          <h3>"What book should I read today?"</h3>
          <div className="search">
            <input
              type="text"
              placeholder="책이름을 입력하세요"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyPress={handleSearch}
            />
            <button onClick={handleButtonClick}>
              <FontAwesomeIcon icon={faMagnifyingGlass} />
            </button>
          </div>
        </div>
        <Chat />
      </div>
      <div className="container">
        <Card book={bookData} />
      </div>
    </>
  );
}
