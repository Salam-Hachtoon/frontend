import "../../App.css";
import Header from "../../components/header";
import PCHeader from "../../components/PageContentHeader";

const Summaries = () => {
  return (
    <div>
      <Header></Header>
      <div className="page-content px-[64px] py-[48px]">
        <PCHeader pageHeader="Your Summaries"></PCHeader>
        <div className="cards-container grid grid-cols-3 mt-[16px] gap-[8px] ">
          {/* card for each summary file genereated, contains the name of the file, and the category
            a downlod, open in another tab button */}
          <div className="summary-card pt-[16px] px-[16px] pb-[24px] border-[1px] border-[#64748B] rounded-[5px] shadow-[0_6px_12px_#0000001C]">
            <div className="card-header  text-[14px] text-[#4B5768]">
              {/* card type will go here */}
              <span>Topic: file-type or category</span>
            </div>
            <div className="card-body">
              <h1 className="card-title mb-[12px] text-[20px] font-bold">
                Card Title
              </h1>
              <div className="card-details text-[14px] text-[#4B5768]">
                <p>summary description if available</p>
                <p>file size</p>
                <p>created_at</p>
              </div>
            </div>
            <div className="card-buttons mt-[35px] grid grid-cols-2 gap-[10px]">
              <a
                href="#" // file url here
                target="_blank"
                // download={`${file.name}_${contentType}.pdf`}
                className="px-4 py-2 bg-blue-500 text-white text-center rounded-lg hover:bg-blue-600"
              >
                Download PDF
              </a>
              <a
                href="#" //file url here
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-green-500 text-white text-center rounded-lg hover:bg-green-600"
              >
                View in New Tab
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Summaries;
