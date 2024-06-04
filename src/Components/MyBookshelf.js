import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {ToastContainer,  toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function MyBookshelf() {
  const [bookshelf, setBookshelf] = useState([]);

  const handleRemove = (bookKey) => {
    const storedBooks = localStorage.getItem("bookshelf");
    if (!storedBooks) return;
    toast.success("Book Removed!");
    let bookshelf = JSON.parse(storedBooks);
    const filteredBookshelf = bookshelf.filter((book) => book.key !== bookKey);
    localStorage.setItem("bookshelf", JSON.stringify(filteredBookshelf));
    setBookshelf(filteredBookshelf);
  };

  useEffect(() => {
    const storedBooks = localStorage.getItem("bookshelf");
    if (storedBooks) {
      setBookshelf(JSON.parse(storedBooks));
    }
  }, []);

  return (
    <>
    <ToastContainer />
      <main className="container mx-auto px-4 sm:px-6 lg:px-8">
        <section id="bookshelf" className="mt-8 sm:mt-12 lg:mt-16">
          <div className="flex justify-between">
            <h1 className="inline-block text-2xl sm:text-3xl lg:text-4xl font-bold">
              My BookShelf:
            </h1>
            <Link
              to="/"
              className=" inline-block p-2 text-center hover:bg-blue-500 bg-blue-700 text-white font-semibold rounded-md focus:outline-none"
            >
              Home
            </Link>
          </div>
          <div className="container mt-4 sm:mt-6 md:mt-7 lg:mt-8">
            {bookshelf.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {bookshelf.map((book, index) => (
                  <div
                    key={index}
                    className="card bg-white rounded-md shadow-md p-4"
                  >
                    <button
                      onClick={(e) => handleRemove(book.key)}
                      className="float-end p-2 outline-none text-red-600 font-bold"
                    >
                      <svg
                        className="h-6 w-6"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M6 18L18 6M6 6l12 12"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>
                    <h3 className="text-lg sm:text-xl lg:text-2xl font-semibold text-gray-900">
                      Book Title: {book.title}
                    </h3>
                    <p className="mt-2 sm:mt-3 lg:mt-4 text-gray-700">
                      Edition Count: {book.edition_count}
                    </p>
                    <p className="mt-2 sm:mt-3 lg:mt-4 text-gray-700">
                      Ebook Access: {book.ebook_access}
                    </p>
                    <p className="mt-2 sm:mt-3 lg:mt-4 text-gray-700">
                      Publish Year: {book.first_publish_year}
                    </p>
                    <p className="mt-2 sm:mt-3 lg:mt-4 text-gray-700">
                      Auther: {book.author_name}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center text-gray-700">
                No books in your bookshelf yet.
              </p>
            )}
          </div>
        </section>
      </main>
    </>
  );
}

export default MyBookshelf;
