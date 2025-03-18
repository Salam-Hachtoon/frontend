import React from "react";

const TeamCard = ({ imgsrc, teamTitle, teamRole, className }) => {
  return (
    <div className="team-card">
      <img src={imgsrc} className={`rounded-[50%]  w-[250px] mx-auto ${className}`} />
      <div className="py-[18px] px-[16px]">
        <h4 className="font-semibold text-[20px] text-center">{teamTitle}</h4>
        <p className="text-center">{teamRole}</p>
      </div>
    </div>
  );
};

export default TeamCard;
