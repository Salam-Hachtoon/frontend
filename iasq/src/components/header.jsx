const Header = () => {
    return (
        <div className="header py-[16px] px-[32px] ml-[24px] grid grid-cols-[60%_30%_10%]">
          {/* Search Section */}
          <div className="search-section flex items-center rounded-[4px] bg-[#F7F8F9] h-[44px]">
            {/* Dropdown */}
            <div className="dropdown bg-[#E7EAEE] p-[12px] text-[14px] rounded-l-[4px]">
              All{" "}
              <img
                src="/img/arrowdown.svg"
                className="inline-block ml-[16px]"
              />
            </div>

            {/* Search Input */}
            <div className="searchbar flex-grow">
              <input
                type="text"
                placeholder="Search for quizzes, flashcards, summaries...."
                className="w-full p-[12px] outline-none text-[#A0ABBB]"
              />
            </div>

            {/* Search Icon */}
            <div className="p-[12px] rounded-r-[4px]">
              <img src="/img/magnifyingglass.svg" className="inline-block" />
            </div>
          </div>

          {/* New Chat Button */}
          <div className="h-[33px]">
            <button className="bg-[#1B39E9] py-[8px] px-[16px] text-white rounded-[4px] ml-4 text-[14px] w-[42%] float-right cursor-pointer">
              + Start a New Chat
            </button>
          </div>

          {/* Profile Section */}
          <div className="profile flex items-center ml-auto p-[4px]">
            <img
              src="/img/profilephoto.png"
              alt="Profile"
              className="w-[40px] h-[40px] [40px] rounded-full"
            />
            <img src="/img/arrowdown.svg" alt="Dropdown" className="ml-2" />
          </div>
        </div>
    );
};

export default Header;