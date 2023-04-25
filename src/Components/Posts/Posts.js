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
  const limit = 8;
  const [page, setPage] = useState(1);
  const offset = (page - 1) * limit;

  const formattedData = bookData
    ?.filter(
      (item) =>
        item.volumeInfo?.imageLinks?.smallThumbnail &&
        item.volumeInfo?.title &&
        item.saleInfo?.listPrice?.amount
    )
    .slice(offset, offset + limit);

  const getApi = async () => {
    try {
      const response = await getBookData();

      // const { data, config } = response;
      const { data } = response;
      console.log(data);

      setPosts(data.items);
    } catch (e) {
      console.error(e);
    }
  };

  // async await으로 바꾸기
  useEffect(() => {
    // getBookData()
    //   .then((res) => setPosts(res.data.items))
    //   .catch((err) => console.log(err));
    getApi();
  }, []);

  useEffect(() => {
    console.log("bookData", bookData);
    console.log("offset", offset);
    // console.log(bookData.slice(0, 5));
  });
  return (
    <div className="content-box">
      <header>
        <h1>게시물 목록</h1>
      </header>
      {/* <label>
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
      </label> */}
      <main>
        <div className="container">
          {formattedData?.map((books) => {
            return (
              <BookCard
                key={books.id}
                books={books}
                setSelectedBook={setSelectedBook}
              />
            );
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
