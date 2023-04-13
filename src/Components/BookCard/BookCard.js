import React from "react";
import "./BookCard.css";

export default function BookCard({ book, onBookCardClick }) {
  const { volumeInfo, saleInfo } = book;
  const thumbnail = volumeInfo?.imageLinks?.smallThumbnail;
  const amount = saleInfo?.listPrice?.amount;
  const title = volumeInfo?.title;

  const handleClick = () => {
    onBookCardClick(book);
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