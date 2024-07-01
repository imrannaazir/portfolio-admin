const ProductTable = () => {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-1/5 bg-gray-200">
        {/* Sidebar Content */}
        Sidebar
      </div>

      {/* Main Content */}
      <div className="w-full">
        {/* Navbar */}
        <div className="bg-blue-500 p-4">
          {/* Navbar Content */}
          Navbar
        </div>

        {/* Table with overflow scroll */}
      </div>
    </div>
  );
};

export default ProductTable;
