import React from "react";
import Button from "./Button";
import { FiTrash } from "react-icons/fi";

const BookmarkCard = ({ book, onRemove }) => {
  if (!book) return null;

  return (
    <div className="bg-white rounded-2xl border-2 shadow-sm p-5 cursor-pointer hover:-translate-y-2 h-full transition-all relative">
      <div className="w-4/5 h-[210px] overflow-hidden mx-auto aspect-w-16 aspect-h-8 mb-4">
        <img
          src={book.cover_link}
          alt={book.title}
          className="h-full w-full object-contain"
          loading="lazy"
          onError={(e) => {
            e.target.src = "/images/placeholder.png";
            e.target.classList.add("p-2");
          }}
        />
      </div>
      <div className="flex flex-col">
        <h3 className="text-lg font-extrabold text-gray-800 line-clamp-2 h-[3.8rem]">
          {book.title}
        </h3>
        <div className="mt-3 pt-3 border-t border-gray-100 flex justify-between items-center">
          <Button className="w-full text-center text-sm text-violet-600 hover:text-violet-800 font-medium">
            View Details
          </Button>
          <button
            onClick={() => onRemove(book.id)}
            className="ml-3 text-red-600 hover:text-red-800 focus:outline-none"
          >
            <FiTrash className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookmarkCard;
