import React from "react";
import Button from "./Button";

const BookCard = ({ book }) => {
  return (
    <div className="bg-white rounded-2xl border-2 shadow-sm p-5 cursor-pointer hover:-translate-y-2 h-full transition-all relative">
      <div className="w-4/5 h-[210px] overflow-hidden mx-auto aspect-w-16 aspect-h-8 mb-4">
        <img
          src={book.cover}
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
        <div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Similarity:</span>
            <span className="text-sm font-medium text-gray-800">
              {book.average_similarity
                ? (book.average_similarity * 100).toFixed(2) + "%"
                : "-"}
            </span>
          </div>
        </div>
        <div className="mt-3 pt-3 border-t border-gray-100">
          <Button className="w-full text-center text-sm text-violet-600 hover:text-violet-800 font-medium">
            View Details
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BookCard;
