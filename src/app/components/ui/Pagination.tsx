import { ChevronDoubleRight, ChevronLeft } from "react-bootstrap-icons"

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

export const Pagination = ({currentPage, totalPages, onPageChange}: PaginationProps) => {

    const getPageNumbers = () => {
        const pages : (number | string)[] = [];
        if(totalPages <= 5) {
            for (let i = 1; i <= totalPages; i++) pages.push(i);
        } else {
            if (currentPage <= 3) {
                pages.push(1, 2, 3, '...', totalPages)
            } else if (currentPage >= totalPages - 2) {
                pages.push(1, '...', totalPages - 2, totalPages - 1, totalPages);
            } else {
                pages.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages);
            }
        }

        return pages;
    }

    return (
        <div className="flex items-center gap-1">
            <button onClick={() => onPageChange(Math.max(1, currentPage - 1))} disabled={currentPage === 1} className="w-9 h-9 flex items-center justify-center rounded border border-gray-200 bg-white text-gray-500 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors">
                <ChevronLeft size={14} />
            </button>
            { getPageNumbers().map((page, index) => page === '...' ? (
                    <span key={`ellipsis-${index}`} className="w-9 h-9 flex items-center justify-center text-gray-400 text-sm">
                        ...
                    </span>
                ) : (
                    <button key={page} onClick={() => onPageChange(page as number)}
                            className={`w-9 h-9 flex items-center justify-center rounded text-sm font-medium transition-colors ${currentPage === page ? 'bg-blue-600 text-white border border-blue-600' : 'border border-gray-200 bg-white text-gray-600 hover:bg-gray-50'}`}>
                                {page}
                            </button>
            ))}
            <button onClick={() => onPageChange(totalPages)}
                disabled={currentPage === totalPages}
                className="w-9 h-9 flex items-center justify-center rounded border border-gray-200 bg-white text-gray-500 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors">
                    <ChevronDoubleRight size={14} />
            </button>
        </div>
    )
}