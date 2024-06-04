import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import {ToastContainer,  toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function BookSearch() {
  const [search, setSearch] = useState("all");
  const [searchResult, setSearchResult] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const ApiCall = async () => {
    try {
      const encodedSearch = encodeURIComponent(search.toLowerCase());
      setIsLoading(true);
      const resp = await axios.get(
        `https://openlibrary.org/search.json?q=${encodedSearch}&limit=10&page=1`
      );
      setSearchResult(resp.data.docs);
    } catch (error) {
      setError("Error fetching books. Please try again later.");
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddToBookshelf = (book) => {
    const storedBooks = localStorage.getItem("bookshelf");
    let bookshelf = [];
    if (storedBooks) {
      bookshelf = JSON.parse(storedBooks);
    }
    const isDuplicate = bookshelf.some(
      (existingBook) => existingBook.key === book.key
    );
    if (!isDuplicate) {
      bookshelf.push(book);
      localStorage.setItem("bookshelf", JSON.stringify(bookshelf));
      toast.success("Book added to your bookshelf!");
    } else {
        toast.warning("This book is already in your bookshelf!");
        
    }
  };

  useEffect(() => {
    ApiCall();
  }, []);

  return (
    <>
    <ToastContainer />
      <header className="bg-gray-300 py-4 sm:py-6 lg:py-8 flex justify-between">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold">
            Search by Book Name:
          </h1>
          <input
            type="text"
            id="bookSearch"
            placeholder="Enter book title"
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                ApiCall(search);
              } else {
                setSearch(e.target.value);
              }
            }}
            className="mt-4 sm:mt-6 lg:mt-8 py-2 px-4 sm:py-3 sm:px-6 lg:py-4 lg:px-8 block w-full rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <Link
          to="/bookshelf"
          className="px-3 py-1 mx-3 h-14 text-center hover:bg-blue-500 bg-blue-700 text-white font-semibold rounded-md focus:outline-none"
        >
          My Bookshelf
        </Link>
      </header>
      <main className="container mx-auto px-4 sm:px-6 lg:px-8">
        <section id="bookshelf" className="mt-8 sm:mt-12 lg:mt-16">
          <div className="container mt-4 sm:mt-6 md:mt-7 lg:mt-8">
            {isLoading ? (
              <p className="text-center text-gray-700">
                Searching for books...
              </p>
            ) : (
              <>
                {searchResult.length > 0 && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {searchResult.map((book, index) => (
                      <div
                        key={index}
                        className="card bg-white rounded-md shadow-md p-4 sm:p-6 lg:p-8"
                      >
                        <h3 className="text-lg sm:text-xl lg:text-2xl font-semibold text-gray-900">
                          Book Title: {book.title}
                        </h3>
                        <p className="mt-2 sm:mt-3 lg:mt-4 text-gray-700">
                          Edition Count: {book.edition_count}
                        </p>
                        <button
                          onClick={(e) => handleAddToBookshelf(book)}
                          className="mt-4 sm:mt-6 lg:mt-8 p-2 hover:bg-green-400 bg-green-600 text-white font-semibold rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                        >
                          Add to Bookshelf
                        </button>
                      </div>
                    ))}
                  </div>
                )}
                {searchResult.length === 0 && (
                  <p className="text-center text-gray-700">
                    No results found for your search.
                  </p>
                )}
              </>
            )}
          </div>
        </section>
      </main>
    </>
  );
}

export default BookSearch;
