import React from 'react';
import { MdKeyboardArrowRight } from "react-icons/md";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const handlePrevPage = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    // A API do TMDb limita o total de páginas a 500
    if (currentPage < totalPages && currentPage < 500) {
      onPageChange(currentPage + 1);
    }
  };
  

  if (totalPages <= 1) {
    return null;
  }

  return (
    <div className="pagination-controls">
      <button onClick={handlePrevPage} disabled={currentPage === 1}>
       <MdOutlineKeyboardArrowLeft /> Anterior
      </button>
      <span>
        Página {currentPage} de {totalPages > 500 ? 500 : totalPages}
      </span>
      <button onClick={handleNextPage} disabled={currentPage >= totalPages || currentPage >= 500}>
        Próxima <MdKeyboardArrowRight />
      </button>
    </div>
  );
};

export default Pagination;