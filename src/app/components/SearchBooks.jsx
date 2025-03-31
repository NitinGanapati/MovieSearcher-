import { useState } from "react";

export default function SearchBooks() {
  const [query, setQuery] = useState("");
  const [books, setBooks] = useState([]);

  const searchBooks = async () => {
    const res = await fetch(
      `https://www.googleapis.com/books/v1/volumes?q=${query}&key=${process.env.NEXT_PUBLIC_GOOGLE_BOOKS_API_KEY}`
    );
    const data = await res.json();
    setBooks(data.items || []);
  };

  return (
    <div className="p-4">
      <input
        type="text"
        placeholder="Search for books..."
        onChange={(e) => setQuery(e.target.value)}
        className="border p-2 rounded"
      />
      <button onClick={searchBooks} className="ml-2 bg-blue-500 text-white p-2 rounded">
        Search
      </button>

      <ul className="mt-4">
        {books.map((book) => (
          <li key={book.id} className="border-b p-2">
            {book.volumeInfo.title}
          </li>
        ))}
      </ul>
    </div>
  );
}
