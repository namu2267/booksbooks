import axios from "axios";

const API_KEY = process.env.REACT_APP_API_KEY;

export const instance = axios.create({
  baseURL: "https://www.googleapis.com/books/v1/volumes",
  params: {
    key: API_KEY,
    // maxResults: 40,
  },
});

export const getBookData = (search) => {
  const response = instance.get(`?q=${search}&key=${API_KEY}`);
  return response;
};

// export const registerBook = (id, header, blah) => {
//   const response = instance
//     .post("url", {})
//     .then((res) => {
//       return res;
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// };
