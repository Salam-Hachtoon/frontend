const PreviewCard = ({
    card_title,
    card_description,
  }) => {
    return (
      <div className="card pt-[16px] px-[16px] pb-[24px] border-[1px] border-[#64748B] rounded-[5px] shadow-[0_6px_12px_#0000001C]">
        
        <div className="card-title mb-[12px] text-[20px] font-bold">
          <h3>{card_title}</h3>
        </div>
        <div className="card-description">
          <p className="text-[14px] text-[#4B5768]">{card_description}</p>
        </div>
      </div>
    );
  };
  
  export default PreviewCard;
  