import type { ReactNode } from "react";

interface LayoutProps {
   children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
   return (
      <div className="min-h-screen bg-neutral-950 text-white p-4">
         <div className="max-w-6xl mx-auto">
            {children}
         </div>
      </div>
   );
};

export default Layout;
