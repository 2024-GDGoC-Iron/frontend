// src/components/common/Footer.jsx
export const Footer = () => {
  return (
    <footer className="bg-white border-t py-8">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-[#4682A9] font-medium">
              IN!PICK
              <span className="text-gray-500 ml-2">
                @ GDG on Campus Inha University
              </span>
            </p>
          </div>
          
          <div className="flex items-center space-x-6">
            <a
              href="https://github.com/2024-GDGoC-Iron"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-[#4682A9] transition-colors"
            >
              GitHub
            </a>
            <p className="text-gray-500 text-sm">
              © {new Date().getFullYear()} IRON
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};