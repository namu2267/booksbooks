import React, { useState } from "react";
import "./BookCard.css";

export default function BookCard({ books, setSelectedBook }) {
  const thumbnail = books.volumeInfo?.imageLinks?.smallThumbnail;
  const amount = books.saleInfo?.listPrice?.amount;
  const title = books.volumeInfo?.title;

  // const [thumbnail, setThumbnail] = useState(
  //   books.volumeInfo?.imageLinks?.smallThumbnail
  // );
  // const [amount, setAmount] = useState(
  //   books.saleInfo?.listPrice?.amount || "정보 없음"
  // );
  // const [title, setTitle] = useState(books.volumeInfo?.title);

  const handleClick = () => {
    setSelectedBook(books);
  };

  return (
    <div className="card" onClick={handleClick}>
      <div className="thumb">
        <img src={thumbnail} alt={title} />
      </div>
      <div className="bottom">
        <h3 className="title">{title}</h3>
        <p className="amount"> {amount}원 </p>
      </div>
    </div>
  );
}
