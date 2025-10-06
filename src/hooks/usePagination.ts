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
   const { initialPage = 1, itemsPerPage: initialItemsPerPage = 24 } = options;

   const [currentPage, setCurrentPage] = useState(initialPage);
   const [itemsPerPage, setItemsPerPageState] = useState(initialItemsPerPage);

   const paginationData = useMemo<PaginationData<T>>(() => {
      const totalItems = items.length;
      const totalPages = Math.ceil(totalItems / itemsPerPage);

      // Garantir que a página atual seja válida
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
         startIndex: startIndex + 1, // +1 para exibição humana (1-based)
         endIndex,
      };
   }, [items, currentPage, itemsPerPage]);

   const actions = useMemo<PaginationActions>(() => ({
      goToPage: (page: number) => {
         const validPage = Math.min(Math.max(1, page), paginationData.totalPages || 1);
         setCurrentPage(validPage);
      },

      goToNextPage: () => {
         if (paginationData.hasNextPage) {
            setCurrentPage(prev => prev + 1);
         }
      },

      goToPreviousPage: () => {
         if (paginationData.hasPreviousPage) {
            setCurrentPage(prev => prev - 1);
         }
      },

      goToFirstPage: () => {
         setCurrentPage(1);
      },

      goToLastPage: () => {
         setCurrentPage(paginationData.totalPages || 1);
      },

      setItemsPerPage: (items: number) => {
         setItemsPerPageState(items);
         setCurrentPage(1); // Reset para primeira página ao mudar itens por página
      },
   }), [paginationData.hasNextPage, paginationData.hasPreviousPage, paginationData.totalPages]);

   // Ajustar página atual se ela for inválida após mudanças nos items
   useMemo(() => {
      if (paginationData.totalPages > 0 && currentPage > paginationData.totalPages) {
         setCurrentPage(paginationData.totalPages);
      }
   }, [paginationData.totalPages, currentPage]);

   return [paginationData, actions];
}
