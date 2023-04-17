import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import BookCard from "../BookCard/BookCard.js";
import axios from "axios";
import ChatGPT from "../ChatGPT/ChatGPT.js";
import "./Main.css";
import BookDetailModal from "../BookDetailModal/BookDetailModal.js";

const API_KEY = process.env.REACT_APP_API_KEY;

export default function Main() {
  const [search, setSearch] = useState("");
  const [bookData, setBookData] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);

  const getBookData = () => {
    if (search.trim()) {
      axios
        .get(
          "https://www.googleapis.com/books/v1/volumes?q= " +
            search +
            `&key=${API_KEY}` +
            "&maxResults=40"
        )
        .then((res) => setBookData(res.data.items))
        .catch((err) => console.log(err.response.data));
    }
  };

  const handleSubmitSearch = () => {
    getBookData();
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
            selectedBook={selectedBook}
            onClose={handleCloseBookDetailModal}
          />
        )}
      </div>
    </>
  );
}
