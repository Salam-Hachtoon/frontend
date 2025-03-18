import "../App.css";
import Header from "../components/header";
import Sidebar from "../components/Sidebar";

const NewChat = () => {
  return (
    <div className="grid grid-cols-[16%_84%] h-screen">
      <Sidebar></Sidebar>
      <div className="main-content">
        <Header></Header>
        <div className="page-content px-[64px] py-[48px]">
          {/* response box */}
          <div className="response-box border-[0.5px] border-[#CBD5E1] rounded-[5px]">

            {/* response header */}
            <div className="response-header bg-[#F8FAFC] p-[12px]">
              <h2 className="question">
                what is the latest trend in technology
              </h2>
            </div>

            {/* response content */}
            <div className="response-content h-[500px]">
              <p>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                Molestiae sint qui culpa debitis atque eum consequatur,
                laboriosam dolores veniam suscipit et quidem veritatis sed
                blanditiis laudantium. Praesentium corrupti vel nihil.
              </p>
            </div>

            {/* response footer */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewChat;
