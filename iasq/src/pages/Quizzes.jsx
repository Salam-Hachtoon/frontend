import "../App.css";
import Header from "../components/header";
import Sidebar from "../components/Sidebar";

const Quizzes = () => {
  return (
    <div className="grid grid-cols-[16%_84%] h-screen">
      <Sidebar></Sidebar>
      <div className="main-content">
        <Header></Header>
      </div>
    </div>
  );
};

export default Quizzes;
