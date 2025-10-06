import { MdSearch, MdClose } from 'react-icons/md';

interface SearchBarProps {
   searchTerm: string;
   onSearchChange: (term: string) => void;
   placeholder?: string;
}

const SearchBar = ({ searchTerm, onSearchChange, placeholder = "Buscar jogos..." }: SearchBarProps) => {
   const clearSearch = () => {
      onSearchChange("");
   };

   return (
      <div className="relative mb-4">
         <div className="relative">
            <MdSearch
               className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-500"
               size={16}
            />
            <input
               type="text"
               placeholder={placeholder}
               value={searchTerm}
               onChange={(e) => onSearchChange(e.target.value)}
               className="w-full border border-neutral-800 bg-neutral-900 px-10 py-2 text-white focus:border-blue-500 focus:outline-none transition-colors placeholder-neutral-500"
            />
            {searchTerm && (
               <button
                  onClick={clearSearch}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-neutral-500 hover:text-neutral-300 transition-colors"
                  title="Limpar busca"
               >
                  <MdClose size={16} />
               </button>
            )}
         </div>
      </div>
   );
};

export default SearchBar;
