import React from "react";
import "./Card.css";

export default function Card({ book, onCardClick }) {
  const { volumeInfo, saleInfo } = book;
  const thumbnail = volumeInfo?.imageLinks?.smallThumbnail;
  const amount = saleInfo?.listPrice?.amount;
  const title = volumeInfo?.title;

  const handleClick = () => {
    onCardClick(book);
  };

  return (
    <div className="card" onClick={handleClick}>
      <img src={thumbnail} alt={title} />
      <div className="bottom">
        <h3 className="title">{title}</h3>
        <p className="amount"> {amount}원 </p>
      </div>
    </div>
  );
}
