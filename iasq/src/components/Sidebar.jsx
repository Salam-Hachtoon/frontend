import { Link, useNavigate } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("You are already logged out!");
      return;
    }

    const confirmLogout = window.confirm("Are you sure you want to log out?");
    
    if (confirmLogout) {
      localStorage.removeItem("token");
      navigate("/login"); 
    }
  };

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
            
            <Link to="/Home"><img src="/img/homeicon.svg" className="inline-block py-[16px] pr-[24px]" />Home</Link>
          </li>
          <li>
            <Link to="Summaries"><img src="/img/chatsicon.svg" className="inline-block py-[16px] pr-[24px]" /> Summaries</Link>
          </li>
          <li>

            <Link to="quizzes"><img src="/img/quizzesicon.svg" className="inline-block py-[16px] pr-[24px]" />Quizzes</Link>
          </li>
          <li>
           
            <Link to="flashcards"> <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 384 512"
              className="inline-block py-[16px] pr-[24px] w-[40px]"
            >
              <path
                fill="#ffffff"
                d="M280 64l40 0c35.3 0 64 28.7 64 64l0 320c0 35.3-28.7 64-64 64L64 512c-35.3 0-64-28.7-64-64L0 128C0 92.7 28.7 64 64 64l40 0 9.6 0C121 27.5 153.3 0 192 0s71 27.5 78.4 64l9.6 0zM64 112c-8.8 0-16 7.2-16 16l0 320c0 8.8 7.2 16 16 16l256 0c8.8 0 16-7.2 16-16l0-320c0-8.8-7.2-16-16-16l-16 0 0 24c0 13.3-10.7 24-24 24l-88 0-88 0c-13.3 0-24-10.7-24-24l0-24-16 0zm128-8a24 24 0 1 0 0-48 24 24 0 1 0 0 48z"
              />
            </svg>Flashcards</Link>
          </li>
          <hr className="my-[15px]" />
          <li>

            <Link to="Settings"><img src="/img/settingsicon.svg" className="inline-block py-[16px] pr-[24px]" />Settings</Link>
          </li>
          <li>

            <button onClick={handleLogout} className="text-white bg-transparent border-none cursor-pointer"><img src="/img/logouticon.svg" className="inline-block py-[16px] pr-[24px]" />
              Logout
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
