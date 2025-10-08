import {
   MdChevronLeft,
   MdChevronRight
} from 'react-icons/md';
import type { PaginationData, PaginationActions } from '../../hooks/usePagination';

interface PaginationProps<T> {
   paginationData: PaginationData<T>;
   paginationActions: PaginationActions;
   maxVisiblePages?: number;
}

const Pagination = <T,>({
   paginationData,
   paginationActions,
   maxVisiblePages = 3
}: PaginationProps<T>) => {
   const {
      currentPage,
      totalPages,
      hasNextPage,
      hasPreviousPage
   } = paginationData;

   const {
      goToPage,
      goToNextPage,
      goToPreviousPage
   } = paginationActions;

   // Calcular quais páginas mostrar
   const getVisiblePages = () => {
      if (totalPages <= maxVisiblePages) {
         return Array.from({ length: totalPages }, (_, i) => i + 1);
      }

      const halfVisible = Math.floor(maxVisiblePages / 2);
      let startPage = Math.max(1, currentPage - halfVisible);
      const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

      // Ajustar se estivermos próximo do início ou fim
      if (endPage - startPage + 1 < maxVisiblePages) {
         startPage = Math.max(1, endPage - maxVisiblePages + 1);
      }

      return Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
   };

   const visiblePages = getVisiblePages();

   if (totalPages <= 1) {
      return null;
   }

   return (
      <div className="flex justify-center mt-6 sm:mt-8 px-2 sm:px-4">
         {/* Controles de paginação */}
         <div className="flex items-center gap-1 sm:gap-2">
            {/* Página anterior */}
            <button
               onClick={goToPreviousPage}
               disabled={!hasPreviousPage}
               className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center border border-neutral-800 bg-neutral-950 text-neutral-300 hover:border-neutral-700 hover:bg-neutral-900 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
               title="Página anterior"
            >
               <MdChevronLeft size={14} className="sm:w-4 sm:h-4" />
            </button>

            {/* Números das páginas */}
            <div className="flex items-center gap-1 sm:gap-2">
               {visiblePages.map((page) => (
                  <button
                     key={page}
                     onClick={() => goToPage(page)}
                     className={`flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center border text-xs sm:text-sm transition-all duration-300 ${page === currentPage
                        ? 'border-blue-500 bg-blue-600 text-white hover:border-blue-400 hover:bg-blue-500'
                        : 'border-neutral-800 bg-neutral-950 text-neutral-300 hover:border-neutral-700 hover:bg-neutral-900'
                        }`}
                  >
                     {page}
                  </button>
               ))}
            </div>

            {/* Próxima página */}
            <button
               onClick={goToNextPage}
               disabled={!hasNextPage}
               className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center border border-neutral-800 bg-neutral-950 text-neutral-300 hover:border-neutral-700 hover:bg-neutral-900 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
               title="Próxima página"
            >
               <MdChevronRight size={14} className="sm:w-4 sm:h-4" />
            </button>
         </div>


      </div>
   );
};

export default Pagination;
