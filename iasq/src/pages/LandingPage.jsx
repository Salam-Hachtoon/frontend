import "../App.css";
import FeatureCard from "../components/FeatureCard";
import Footer from "../components/Footer";
import PricingSection from "../components/PricingSection";
import TeamCard from "../components/TeamCard";
import "../styles/landingpage.css";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();
  const handleLoginClick = () => {
    navigate("/Login");
  };

  return (
    <div>
      {/* Header */}
      <div id="header" className="header grid grid-cols-3 px-[40px]">
        <div className="logo px-[20px] py-[33px]">
          <h1 className="text-[24px] text-[#0C071C] font-extrabold">IASQ</h1>
        </div>
        <div className="nav lp-nav">
          <ul>
            <li><a href="#hero">Home</a></li>
            <li><a href="#Features">Features</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="#team">Team</a></li>
            <li><a href="#pricing">Pricing</a></li>
          </ul>
        </div>
        <div className="button">
          <button
            className="cursor-pointer py-[12px] px-[18px] bg-[#1B39E9] rounded-[4px] text-white float-right mt-[25px]"
            onClick={handleLoginClick}
          >
            Get Started
          </button>
        </div>
      </div>
      {/* // Header */}

      {/* Hero Section */}
      <div id="hero" className="grid grid-cols-2 gap-[32px] mt-[90px]">
        <div className="hero-text pl-[133px] my-auto">
          <h1 className="text-[48px] font-medium">
            Explore, Learn, and Grow Smarter Everyday
          </h1>
          <p className="text-[18px] mt-[24px] ">
            Ask anything, get AI-powered summaries, and test your knowledge with
            smart quizzes to learn faster and smarter
          </p>
          <div className="hero-buttons mt-[32px]">
            <button
              className="cursor-pointer py-[12px] px-[18px] bg-[#1B39E9] rounded-[4px] text-white mr-[10px]"
              onClick={handleLoginClick}
            >
              Get Started
            </button>
            <a
              href="#"
              className="cursor-pointer py-[12px] px-[18px] bg-[#161819] rounded-[4px] text-white"
            >
              Learn More
            </a>
          </div>
        </div>
        <div className="hero-image bg-[#D5DBFC] mx-auto px-[50px]">
          <img src="/img/hero.png" className=" bg-[#D5DBFC]" />
        </div>
      </div>
      {/* // Hero Section */}

      {/* Features Section */}
      <div
        id="features"
        className="py-[150px] px-[120px] grid grid-cols-2 gap-[32px]"
      >
        <div className="features-text">
          <div className="features-heading">
            <h1 className="text-[48px] font-medium">Features</h1>
            <p className="text-[18px]">
              Ask anything, get AI-powered summaries, and test your knowledge
              with smart quizzes to learn faster and smarter
            </p>
          </div>
          <div className="features-list grid grid-cols-2 gap-[8px] mt-[50px]">
            <FeatureCard
              imageSrc={"img/file-text.svg"}
              heading={"Instant AI Summaries"}
              description={
                "Upload text or enter a prompt, and let IASQ generate clear, concise summaries in seconds."
              }
            />
            <FeatureCard
              imageSrc={"img/mingcute_target-line.svg"}
              heading={"Intelligent Questions"}
              description={
                "Turn any content into engaging questions to test your understanding and reinforce learning."
              }
            />
            <FeatureCard
              imageSrc={"img/bi_lightbulb.svg"}
              heading={"AI-Powered Insights"}
              description={
                "Ask follow-up questions, explore deeper topics, and refine your knowledge with AI assistance"
              }
            />
            <FeatureCard
              imageSrc={"img/rivet-icons_magnifying-glass.svg"}
              heading={"Iteractive Learning"}
              description={
                "Simply upload documents or paste text, and IASQ will analyze and summarize effortlessly"
              }
            />
          </div>
        </div>
        <div className="features-img mx-auto">
          <img src="/img/features.png" />
        </div>
      </div>
      {/* // Features Section */}

      {/* About Section */}
      <div id="about" className="p-[120px] grid grid-cols-[45%_50%] gap-[70px]">
        <div className="about-img">
          <img src="/img/about.png" className="float-right" />
        </div>
        <div className="about-text">
          <h1 className="text-[32px] font-semibold mb-[32px]">
            Make learning easier and more simplified for everyone
          </h1>
          <p>
            At IASQ, we believe that learning should be effortless, engaging,
            and efficient. Our goal is to empower students, professionals, and
            lifelong learners by providing AI-driven tools that simplify complex
            information.
          </p>
          <p className="mt-[50px]">
            IASQ is your AI-powered learning assistant, designed to break down
            long texts into concise summaries, highlight key insights, and
            generate thought-provoking questions—all in seconds.
          </p>
        </div>
      </div>
      {/* // About Section */}

      {/* Team Section */}
      <div id="team" className="px-[180px] py-[142px]">
        <div id="team-heading">
          <h1 className="text-[48px] font-semibold text-center">Our Team</h1>
          <p className="text-center mt-[10px] px-12">
            At IASQ, we believe that learning should be effortless, engaging,
            and efficient. Our goal is to empower students, professionals, and
            lifelong learners by providing AI-driven tools that simplify complex
            information
          </p>
        </div>
        <div
          id="team-profiles"
          className="grid grid-cols-3 gap-[4px] mt-[100px] mx-auto px-[120px]"
        >
          <TeamCard
            imgsrc={"/img/nile.jpg"}
            teamTitle={"Ahmedelniel Esmaiel"}
            teamRole={"UI/UX Designer"}
          />
          <TeamCard
            imgsrc={"/img/akram.jpg"}
            teamTitle={"Akram Adam"}
            teamRole={"Frontend Developer"}
          />
          <TeamCard
            imgsrc={"/img/lina.jpg"}
            teamTitle={"Lena Abdelkhalig"}
            teamRole={"Frontend Developer"}
          />
        </div>
        <div className="grid grid-cols-2 gap-[60px] mt-[50px]  mx-auto px-[250px]">
          <TeamCard
            imgsrc={"/img/mahmoud.jpg"}
            teamTitle={"Mahmoud Ahmed"}
            teamRole={"Backend Developer"}
            className={""}
          />
          <TeamCard
            imgsrc={"/img/ibrahim.jpeg"}
            teamTitle={"Ibrahim Hanafi"}
            teamRole={"Backend Developer"}
            className={""}
          />
        </div>
      </div>
      {/* // Team Section */}

      {/* Pricing Section */}
      <div id="pricing" className="border-t border-b border-[#e6e9f5]">
        <PricingSection></PricingSection>
      </div>
      {/* // Pricing  Section*/}

      {/* Footer */}
      <Footer></Footer>
      {/* //Footer */}
    </div>
  );
};

export default LandingPage;
