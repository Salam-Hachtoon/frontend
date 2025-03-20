import React from "react";
import { useNavigate } from "react-router-dom";

const Card = ({
  card_topic,
  card_level,
  card_title,
  card_description,
  card_date,
  navroute, // will be changed later to the id of the quiz/summary/flashcard set
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(navroute); // Navigate to the single page, will be changed to the ID of the feature we want for routing
  };
  return (
    <div  onClick={handleClick} className="card pt-[16px] px-[16px] pb-[24px] border-[1px] border-[#64748B] rounded-[5px] shadow-[0_6px_12px_#0000001C] cursor-pointer">
      <div className="card-header grid grid-cols-2 text-[14px] text-[#4B5768]">
        <span>Topic: {card_topic}</span>
        <span className="text-right">Level: {card_level}</span>
      </div>
      <div className="card-title mb-[12px] text-[20px] font-bold">
        <h3>{card_title}</h3>
      </div>
      <div className="card-description">
        <p className="text-[14px] text-[#4B5768]">{card_description}</p>
      </div>
      <div className="card-footer mt-[15px] flex justify-between items-center">
        <p className="text-[14px] text-[#4B5768]">Date: {card_date}</p>
        <div className="flex gap-[8px]">
          <div className="share-button flex items-center border border-[#4B5768] px-[10px] py-[5px] rounded-[5px] min-h-[32px] cursor-pointer">
            <img src="/img/shareicon.svg" className="mr-[8px]" />
            <span className="text-[12px] text-[#4B5768]">Share</span>
          </div>
          <div className="bookmark-button flex items-center border border-[#4B5768] px-[10px] py-[5px] rounded-[5px] min-h-[32px] cursor-pointer">
            <img src="/img/bookmark.svg" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
