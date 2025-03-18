import React from 'react';

const FeatureCard = ({ imageSrc, heading, description }) => {
  return (
    <div className="feature-card px-[16px] py-[30px]">
      <img src={imageSrc} alt={heading} className="mb-[16px]" />
      <h2 className="feature-card-heading text-[24px] font-semibold">{heading}</h2>
      <p className="feature-card-description text-[18px] text-[#4b5768] mt-[16px]">
        {description}
      </p>
    </div>
  );
};

export default FeatureCard;