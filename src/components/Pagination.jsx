import ReactPaginate from "react-paginate";

export default function Pagination({
  totalPages,
  currentPage,
  handlePageClick,
}) {
  return (
    <ReactPaginate
      previousLabel={"<"}
      nextLabel={">"}
      breakLabel={"..."}
      pageCount={totalPages}
      onPageChange={handlePageClick}
      forcePage={currentPage - 1}
      containerClassName="flex justify-center -space-x-px h-8 text-sm"
      pageClassName="flex items-center px-3 h-8 leading-tight text-gray-500 border border-gray-300 hover:bg-gray-100"
      activeClassName="z-10 text-violet-700 border border-violet-400 bg-violet-100 hover:bg-violet-100"
      previousClassName="flex items-center px-3 h-8 leading-tight text-gray-500 border border-gray-300 hover:bg-gray-100"
      nextClassName="flex items-center px-3 h-8 leading-tight text-gray-500 border border-gray-300 hover:bg-gray-100"
      breakClassName="flex items-center px-3 h-8 leading-tight text-gray-500 border border-gray-300 hover:bg-gray-100"
      disabledClassName="opacity-50 cursor-not-allowed"
      previousLinkClassName="w-full h-full flex items-center justify-center"
      nextLinkClassName="w-full h-full flex items-center justify-center"
      pageLinkClassName="w-full h-full flex items-center justify-center"
      breakLinkClassName="w-full h-full flex items-center justify-center"
    />
  );
}
