import "../../App.css";
import Card from "../../components/card";
import Header from "../../components/header";
import PCHeader from "../../components/PageContentHeader";

const Quizzes = () => {
  return (
    <div>
      <Header></Header>
      <div className="page-content px-[64px] py-[48px]">
        <PCHeader pageHeader="Your Quizzes"></PCHeader>
        <div className="cards-container grid grid-cols-3 mt-[16px] gap-[8px] ">
          <Card
            card_topic="Category"
            card_level="Difficulty"
            card_title="Quiz Title"
            card_description="Quiz Summary"
            card_date="Created at"
            navroute="/home/quizpage"
          />
        </div>
      </div>
    </div>
  );
};

export default Quizzes;
