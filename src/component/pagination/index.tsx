import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: any) => void;
};
const Pagination = (props: PaginationProps) => {
  const { currentPage, totalPages, onPageChange } = props;
  const pageNumbers = [];

  // Logic for displaying pages with ellipsis
  if (totalPages <= 5) {
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }
  } else {
    if (currentPage <= 3) {
      pageNumbers.push(1, 2, 3, "...", totalPages);
    } else if (currentPage >= totalPages - 2) {
      pageNumbers.push(1, "...", totalPages - 2, totalPages - 1, totalPages);
    } else {
      pageNumbers.push(1, "...", currentPage, "...", totalPages);
    }
  }

  return (
    <div className="sm:fixed bottom-1 right-20 pt-2 mr-4">
      <div className="flex  px-2 py-1 space-x-1">
        {/* Previous */}
        <button
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
          className={`px-2 py-1 rounded ${
            currentPage === 1
              ? "text-gray-400 bg-gray-200"
              : "text-gray-600 bg-white"
          }`}
        >
          <IoIosArrowBack />
        </button>

        {/* Page Numbers */}
        {pageNumbers.map((num, index) => (
          <button
            key={index}
            onClick={() => num !== "..." && onPageChange(num)}
            className={`px-3 py-1 rounded-lg ${
              num === currentPage
                ? "bg-[#448ef7] text-white"
                : num === "..."
                ? "text-gray-500 cursor-default bg-white"
                : "text-gray-600 bg-white"
            }`}
            disabled={num === "..."}
          >
            {num}
          </button>
        ))}

        {/* Next */}
        <button
          disabled={currentPage === totalPages}
          onClick={() => onPageChange(currentPage + 1)}
          className={`px-2 py-1 rounded ${
            currentPage === totalPages
              ? "text-gray-400 bg-gray-200"
              : "text-gray-600 bg-white"
          }`}
        >
          <IoIosArrowForward />
        </button>
      </div>
    </div>
  );
};

export default Pagination;
