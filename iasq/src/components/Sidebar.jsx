const Sidebar = () => {
  return (
    <div className="sidebar bg-[#131825] p-[24px]">
      <div className="logo mb-[30px] text-center">
        <a href="/" className="text-[48px] font-extrabold text-white">
          IASQ
        </a>
      </div>
      <div className="sidebar-nav">
        <ul className="text-white text-[14px]">
          <li>
            <img
              src="./img/homeicon.svg"
              className="inline-block py-[16px] pr-[24px]"
            />
            Home
          </li>
          <li>
            <img
              src="./img/chatsicon.svg"
              className="inline-block py-[16px] pr-[24px]"
            />
            Chats
          </li>
          <li>
            <img
              src="./img/quizzesicon.svg"
              className="inline-block py-[16px] pr-[24px]"
            />
            Quizzes
          </li>
          <li>
            <img
              src="./img/settingsicon.svg"
              className="inline-block py-[16px] pr-[24px]"
            />
            Flashcards
          </li>
          <hr className="my-[15px]" />
          <li>
            <img
              src="./img/settingsicon.svg"
              className="inline-block py-[16px] pr-[24px]"
            />
            Settings
          </li>
          <li>
            <img
              src="./img/logouticon.svg"
              className="inline-block py-[16px] pr-[24px]"
            />
            Logout
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
