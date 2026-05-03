import React from 'react';
import type { PaginationProps } from '../types/components';

function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps): JSX.Element | null {
  if (totalPages <= 1) return null;
  return (
    <div className="flex justify-between items-center mt-6">
      <div className="body-sm">{currentPage} / {totalPages} 페이지</div>
      <div className="flex gap-sm">
        <button className="btn btn-outline btn-sm" disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}>이전</button>
        {Array.from({ length: totalPages }).map((_, i) => (
          <button key={i}
            className={'btn btn-sm ' + (currentPage === i + 1 ? 'btn-primary' : 'btn-outline')}
            onClick={() => onPageChange(i + 1)}>{i + 1}</button>
        ))}
        <button className="btn btn-outline btn-sm" disabled={currentPage === totalPages}
          onClick={() => onPageChange(currentPage + 1)}>다음</button>
      </div>
    </div>
  );
}

export default Pagination;
