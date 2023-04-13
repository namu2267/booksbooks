import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import BookCard from "../BookCard/BookCard.js";
import axios from "axios";
import ChatGPT from "../ChatGPT/ChatGPT.js";
import "./Main.css";
import BookDetailModal from "../BookDetailModal/BookDetailModal.js";

export default function Main() {
  const [search, setSearch] = useState("");
  const [bookData, setBookData] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const API_KEY = process.env.REACT_APP_API_KEY;

  const searchBook = () => {
    axios
      .get(
        "https://www.googleapis.com/books/v1/volumes?q= " +
          search +
          `&key=${API_KEY}` +
          "&maxResults=40"
      )
      .then((res) => setBookData(res.data.items))
      .catch((err) => console.log(err.response.data));
  };

  const handleSearch = (e) => {
    if (e.key === "Enter") {
      searchBook();
    }
  };

  const handleButtonClick = () => {
    searchBook();
  };

  const handleBookCardClick = (book) => {
    setSelectedBook(book);
  };

  const handleCloseBookDetailModal = () => {
    setSelectedBook(null);
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
          <div className="chat-box">
            <ChatGPT />
          </div>
        </div>
      </div>
      <div className="container">
        {bookData.map((book) => {
          const { volumeInfo, saleInfo } = book;
          const thumbnail = volumeInfo?.imageLinks?.smallThumbnail;
          const amount = saleInfo?.listPrice?.amount;
          const title = volumeInfo?.title;
          if (thumbnail && amount && title) {
            return (
              <BookCard book={book} onBookCardClick={handleBookCardClick} />
            );
          }
        })}
        {selectedBook && (
          <BookDetailModal
            item={selectedBook}
            onClose={handleCloseBookDetailModal}
          />
        )}
      </div>
    </>
  );
}
