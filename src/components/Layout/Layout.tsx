import React from "react";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <header className="bg-blue-600 text-white p-4">
        <div className="container mx-auto text-center">
          <h1 className="text-3xl font-bold">All leagues</h1>
        </div>
      </header>
      <main className="flex-grow container mx-auto p-4">{children}</main>
      <footer className="bg-gray-800 text-white p-4 text-center">
        <p className="text-sm">© 2025 Sporty Group.</p>
      </footer>
    </div>
  );
};

export default Layout;
