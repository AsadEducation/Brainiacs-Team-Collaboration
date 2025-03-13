const Navbar = () => {
    return (
      <nav className="relative px-4 py-4 flex justify-between items-center bg-primaryColor">
        <a className="text-2xl font-bold leading-none text-black" href="#">
          Brainiacs
        </a>
        <div className="lg:hidden">
          <button className="navbar-burger flex items-center text-accentColor p-3">
            <svg className="block h-4 w-4 fill-current" viewBox="0 0 20 20">
              <title>Mobile menu</title>
              <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"></path>
            </svg>
          </button>
        </div>
        <ul className="hidden lg:flex lg:mx-auto lg:items-center lg:w-auto lg:space-x-6">
          {["Home", "About Us", "Services", "Pricing", "Contact"].map((item, index) => (
            <li key={index}>
              <a
                className={`text-sm ${
                  item === "About Us" ? "text-accentColor font-bold" : "text-secondaryColor hover:text-accentColor"
                }`}
                href="#"
              >
                {item}
              </a>
            </li>
          ))}
        </ul>
        <div className="hidden lg:flex items-center space-x-3">
          <a className="py-2 px-6 bg-secondaryColor hover:bg-accentColor text-sm text-black font-bold rounded-xl transition duration-200" href="#">Log In</a>
        </div>
      </nav>
    );
  };
  
  export default Navbar;
  