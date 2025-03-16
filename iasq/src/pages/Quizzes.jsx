import "../App.css";
import Card from "../components/card";
import Header from "../components/header";
import PCHeader from "../components/PageContentHeader";
import Sidebar from "../components/Sidebar";

const Quizzes = () => {
  return (
    <div className="grid grid-cols-[16%_84%] h-screen">
      <Sidebar></Sidebar>
      <div className="main-content">
        <Header></Header>
        <div className="page-content px-[64px] py-[48px]">
          <PCHeader pageHeader="Your Quizzes"></PCHeader>
          <div className="cards-container grid grid-cols-3 mt-[16px] gap-[8px] ">
            <Card
              card_topic="Physics"
              card_level="Hard"
              card_title="Explain What is Atom?"
              card_description="Explain the concept of black holes, how they form, and the role of event horizon in general relativity"
              card_date="March 12, 2025"
            ></Card>
            <Card
              card_topic="Physics"
              card_level="Hard"
              card_title="Explain What is Atom?"
              card_description="Explain the concept of black holes, how they form, and the role of event horizon in general relativity"
              card_date="March 12, 2025"
            ></Card>
            <Card
              card_topic="Physics"
              card_level="Hard"
              card_title="Explain What is Atom?"
              card_description="Explain the concept of black holes, how they form, and the role of event horizon in general relativity"
              card_date="March 12, 2025"
            ></Card>
            <Card
              card_topic="Physics"
              card_level="Hard"
              card_title="Explain What is Atom?"
              card_description="Explain the concept of black holes, how they form, and the role of event horizon in general relativity"
              card_date="March 12, 2025"
            ></Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Quizzes;
