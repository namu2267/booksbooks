import React, { useEffect, useState } from "react";
import "./Main.css";
import BookDetailModal from "../BookDetailModal/BookDetailModal.js";
import Posts from "../Posts/Posts.js";
import Search from "../Search/Search.js";

export default function Main() {
  // const [search, setSearch] = useState("");
  const [bookData, setBookData] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);

  const handleCloseBookDetailModal = () => {
    setSelectedBook(null);
  };

  useEffect(() => {
    console.log("bookData", bookData);
  });

  return (
    <>
      <Search setBookData={setBookData} />
      {/* <div className="header">
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
      </div> */}
      {/* 
       <div className="container">
        {bookData.map((books) => {
          if (
            books.volumeInfo?.imageLinks?.smallThumbnail &&
            books.saleInfo?.listPrice?.amount &&
            books.volumeInfo?.title
          ) {
            return <BookCard books={books} setSelectedBook={setSelectedBook} />;
          }
        })}
        {selectedBook && (
          <BookDetailModal
            selectedBook={selectedBook}
            onClose={handleCloseBookDetailModal}
          />
        )}
      </div>  */}
      <Posts
        bookData={bookData}
        selectedBook={selectedBook}
        setSelectedBook={setSelectedBook}
        BookDetailModal={BookDetailModal}
        handleCloseBookDetailModal={handleCloseBookDetailModal}
      />
    </>
  );
}
