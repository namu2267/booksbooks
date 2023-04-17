import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import "./BookDetailModal.css";

export default function BookDetailModal({ selectedBook, onClose }) {
  let thumbnail =
    selectedBook.volumeInfo.imageLinks &&
    selectedBook.volumeInfo.imageLinks.smallThumbnail;
  return (
    <div className="overlay">
      <div className="overlay-inner">
        <button className="close" onClick={onClose}>
          <FontAwesomeIcon icon={faXmark} />
        </button>
        <div className="inner-box">
          <img src={thumbnail} alt="thumbnail" />
          <div className="info">
            <h1>{selectedBook.volumeInfo.title}</h1>
            <h3> {selectedBook.volumeInfo.authors}</h3>

            <h4>
              {selectedBook.volumeInfo.publisher}{" "}
              <span>{selectedBook.volumeInfo.publishedDate}</span>
            </h4>
            <br />
            <a href={selectedBook.volumeInfo.previewLink}>
              <button>More</button>
            </a>
          </div>
        </div>
        <h4 className="description">{selectedBook.volumeInfo.description}</h4>
      </div>
    </div>
  );
}
