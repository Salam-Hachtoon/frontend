import "../App.css";
import Header from "../components/header";
import PCHeader from "../components/PageContentHeader";
import PreviewCard from "../components/PreviewCard";
import Sidebar from "../components/Sidebar";

const Homepage = () => {
  return (
    <div className="grid grid-cols-[16%_84%] h-screen">
      <Sidebar></Sidebar>
      <div className="main-content">
        <Header></Header>
        <div className="page-content px-[64px] py-[48px]">

          {/* Quizzes */}
          <PCHeader pageHeader="Quizzes"></PCHeader>
          <div className="cards-container grid grid-cols-3 mt-[16px] gap-[8px] mb-[55px] ">
            <PreviewCard
              card_title="Explain What is Atom?"
              card_description="Explain the concept of black holes, how they form, and the role of event horizon in general relativity"
            ></PreviewCard>
            <PreviewCard
              card_title="Explain What is Atom?"
              card_description="Explain the concept of black holes, how they form, and the role of event horizon in general relativity"
            ></PreviewCard>
            <PreviewCard
              card_title="Explain What is Atom?"
              card_description="Explain the concept of black holes, how they form, and the role of event horizon in general relativity"
            ></PreviewCard>
          </div>

          {/* Chats */}
          <PCHeader className="mt-[16px]" pageHeader="Chats"></PCHeader>
          <div className="cards-container grid grid-cols-3 mt-[16px] gap-[8px] mb-[55px]">
            <PreviewCard
              card_title="Explain What is Atom?"
              card_description="Explain the concept of black holes, how they form, and the role of event horizon in general relativity"
            ></PreviewCard>
            <PreviewCard
              card_title="Explain What is Atom?"
              card_description="Explain the concept of black holes, how they form, and the role of event horizon in general relativity"
            ></PreviewCard>
            <PreviewCard
              card_title="Explain What is Atom?"
              card_description="Explain the concept of black holes, how they form, and the role of event horizon in general relativity"
            ></PreviewCard>
          </div>

          {/* Flash Card Sets */}
          <PCHeader
            className="mt-[16px]"
            pageHeader="Flash Card Sets"
          ></PCHeader>
          <div className="cards-container grid grid-cols-3 mt-[16px] gap-[8px] ">
            <PreviewCard
              card_title="Explain What is Atom?"
              card_description="Explain the concept of black holes, how they form, and the role of event horizon in general relativity"
            ></PreviewCard>
            <PreviewCard
              card_title="Explain What is Atom?"
              card_description="Explain the concept of black holes, how they form, and the role of event horizon in general relativity"
            ></PreviewCard>
            <PreviewCard
              card_title="Explain What is Atom?"
              card_description="Explain the concept of black holes, how they form, and the role of event horizon in general relativity"
            ></PreviewCard>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
