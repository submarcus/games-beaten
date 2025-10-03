interface FilterButtonProps {
   isOpen: boolean;
   activeFiltersCount: number;
   onClick: () => void;
}

const FilterButton = ({ isOpen, activeFiltersCount, onClick }: FilterButtonProps) => {
   return (
      <button
         onClick={onClick}
         className="group relative flex h-12 w-12 items-center justify-center border border-neutral-800 transition-all duration-300 hover:bg-neutral-800"
      >
         <div className="relative h-5 w-5">
            <div
               className={`absolute h-0.5 w-5 bg-white transition-all duration-300 ${isOpen ? "rotate-45 translate-y-2" : "translate-y-0"
                  }`}
            ></div>
            <div
               className={`absolute h-0.5 w-5 bg-white transition-all duration-300 ${isOpen ? "opacity-0" : "translate-y-2"
                  }`}
            ></div>
            <div
               className={`absolute h-0.5 w-5 bg-white transition-all duration-300 ${isOpen ? "-rotate-45 translate-y-2" : "translate-y-4"
                  }`}
            ></div>
         </div>

         {/* Active filters badge */}
         {activeFiltersCount > 0 && (
            <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-blue-500 text-xs font-bold text-white">
               {activeFiltersCount}
            </span>
         )}
      </button>
   );
};

export default FilterButton;
