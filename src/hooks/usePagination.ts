import { useState, useMemo } from 'react';

export interface UsePaginationOptions {
   initialPage?: number;
   itemsPerPage?: number;
}

export interface PaginationData<T> {
   currentPage: number;
   totalPages: number;
   totalItems: number;
   itemsPerPage: number;
   paginatedItems: T[];
   hasNextPage: boolean;
   hasPreviousPage: boolean;
   startIndex: number;
   endIndex: number;
}

export interface PaginationActions {
   goToPage: (page: number) => void;
   goToNextPage: () => void;
   goToPreviousPage: () => void;
   goToFirstPage: () => void;
   goToLastPage: () => void;
   setItemsPerPage: (items: number) => void;
}

export function usePagination<T>(
   items: T[],
   options: UsePaginationOptions = {}
): [PaginationData<T>, PaginationActions] {
   const { initialPage = 1, itemsPerPage: initialItemsPerPage = 36 } = options;

   const [currentPage, setCurrentPage] = useState(initialPage);
   const [itemsPerPage, setItemsPerPageState] = useState(initialItemsPerPage);

   const paginationData = useMemo<PaginationData<T>>(() => {
      const totalItems = items.length;
      const totalPages = Math.ceil(totalItems / itemsPerPage);

      const validCurrentPage = Math.min(Math.max(1, currentPage), totalPages || 1);

      const startIndex = (validCurrentPage - 1) * itemsPerPage;
      const endIndex = Math.min(startIndex + itemsPerPage, totalItems);
      const paginatedItems = items.slice(startIndex, endIndex);

      return {
         currentPage: validCurrentPage,
         totalPages,
         totalItems,
         itemsPerPage,
         paginatedItems,
         hasNextPage: validCurrentPage < totalPages,
         hasPreviousPage: validCurrentPage > 1,
         startIndex: startIndex + 1,
         endIndex,
      };
   }, [items, currentPage, itemsPerPage]);

   const scrollToTop = () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
   };

   const actions = useMemo<PaginationActions>(() => ({
      goToPage: (page: number) => {
         const validPage = Math.min(Math.max(1, page), paginationData.totalPages || 1);
         if (validPage !== paginationData.currentPage) {
            setCurrentPage(validPage);
            scrollToTop();
         }
      },

      goToNextPage: () => {
         if (paginationData.hasNextPage) {
            setCurrentPage(prev => prev + 1);
            scrollToTop();
         }
      },

      goToPreviousPage: () => {
         if (paginationData.hasPreviousPage) {
            setCurrentPage(prev => prev - 1);
            scrollToTop();
         }
      },

      goToFirstPage: () => {
         if (paginationData.currentPage !== 1) {
            setCurrentPage(1);
            scrollToTop();
         }
      },

      goToLastPage: () => {
         const lastPage = paginationData.totalPages || 1;
         if (paginationData.currentPage !== lastPage) {
            setCurrentPage(lastPage);
            scrollToTop();
         }
      },

      setItemsPerPage: (items: number) => {
         setItemsPerPageState(items);
         setCurrentPage(1);
         scrollToTop();
      },
   }), [paginationData.hasNextPage, paginationData.hasPreviousPage, paginationData.totalPages, paginationData.currentPage]);

   useMemo(() => {
      if (paginationData.totalPages > 0 && currentPage > paginationData.totalPages) {
         setCurrentPage(paginationData.totalPages);
      }
   }, [paginationData.totalPages, currentPage]);

   return [paginationData, actions];
}
