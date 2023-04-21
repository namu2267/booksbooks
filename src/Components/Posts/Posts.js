import { useState, useEffect } from "react";
import { getBookData } from "../../API/Api.js";
import BookCard from "../BookCard/BookCard.js";
import Pagination from "../Pagination/Pagination.js";
import "./Posts.css";

export default function Posts({
  bookData,
  selectedBook,
  setSelectedBook,
  BookDetailModal,
  handleCloseBookDetailModal,
}) {
  const [posts, setPosts] = useState([]);
  const [limit, setLimit] = useState(5);
  const [page, setPage] = useState(1);
  const offset = (page - 1) * limit;

  useEffect(() => {
    getBookData()
      .then((res) => setPosts(res.data.items))
      .catch((err) => console.log(err));
  }, []);

  // console.log(posts);
  return (
    <div className="content-box">
      <header>
        <h1>게시물 목록</h1>
      </header>
      <label>
        페이지 당 표시할 게시물 수:&nbsp;
        <select
          type="number"
          value={limit}
          onChange={({ target: { value } }) => setLimit(Number(value))}
        >
          <option value="10">10</option>
          <option value="12">12</option>
          <option value="20">20</option>
          <option value="50">50</option>
          <option value="100">100</option>
        </select>
      </label>
      <main>
        <div className="container">
          {bookData?.slice(offset, offset + limit).map((books) => {
            if (
              books.volumeInfo?.imageLinks?.smallThumbnail &&
              books.saleInfo?.listPrice?.amount &&
              books.volumeInfo?.title
            ) {
              return (
                <BookCard books={books} setSelectedBook={setSelectedBook} />
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
      </main>

      <footer>
        <Pagination
          total={posts.length}
          limit={limit}
          page={page}
          setPage={setPage}
        />
      </footer>
    </div>
  );
}

{
  /* <BookCard
              books={books}
              setSelectedBook={setSelectedBook}
              key={books.id}
            /> */
}

// {
//   /* <article key={id}>
// <h3>
//   {id}. {volumeInfo.title}
// </h3>
// <p>{volumeInfo.description}</p>
// </article> */
// }

// fetch("https://jsonplaceholder.typicode.com/posts")
// .then((res) => res.json())
// .then((data) => setPosts(data));
