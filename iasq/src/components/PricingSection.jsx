const pricingPlans = [
  {
    price: "Free",
    duration: "Lifetime",
    features: ["Basic", "20", "Standard"],
    btnColor: "bg-[#10b981]",
  },
  {
    price: "$10",
    duration: "Month",
    features: ["Deep Insights", "up to 500", "fast"],
    btnColor: "bg-[#1b39e9]",
  },
  {
    price: "$20",
    duration: "Month",
    features: ["Advanced AI Insights", "up to 1000", "Fastest"],
    btnColor: "bg-[#ff8C00]",
  },
];

const PricingCard = ({ price, duration, btnColor, features }) => {
  return (
    <div className="px-[32px] text-center border-r border-[#e6e9f5]  pt-[50px]">
      <h3 className="text-[40px] font-bold mb-[28px] inline-block mr-[8px] ">
        {price}
      </h3>
      <span className="py-[7px] font-medium text-14px text-[#858ba0]">
        /{duration}
      </span>
      <button
        className={`px-[24px] py-[16px] font-bold rounded-[4px] w-[238px] cursor-pointer text-white ${btnColor}`}
      >
        Choose This Plan
      </button>
      <ul className="mb-8 mt-[20px] border-t border-[#e6e9f5] pt-[20px]">
        {features.map((feature, index) => (
          <li key={index} className="text-gray-600 mb-2">
            {feature}
            <hr className="border border-[#e6e9f5] my-[20px]" />
          </li>
        ))}
      </ul>
    </div>
  );
};

const PricingSection = () => {
  return (
    <div className="grid grid-cols-3 md:grid-cols-4 gap-8">
      <div className="px-[33px] border-r border-[#e6e9f5] pt-[50px]">
        <h3 className="text-[24px] font-bold px-[32px] py-[20px]">
          Compare Plans
        </h3>
        <p className="text-[#858BA0] font-normal px-[32px]">
          Choose your workspace plan according to your organizational plan
        </p>
        <ul className="mb-8 mt-[20px] border-t border-[#e6e9f5] pt-[20px] text-center">
          <li className="text-gray-600 mb-2">
            AI Summarization
            <hr className="border border-[#e6e9f5] my-[20px]" />
          </li>
          <li className="text-gray-600 mb-2">
            Questions Per Input
            <hr className="border border-[#e6e9f5] my-[20px]" />
          </li>
          <li className="text-gray-600 mb-2">
            Processing Speed
            <hr className="border border-[#e6e9f5] my-[20px]" />
          </li>
        </ul>
      </div>

      {pricingPlans.map((plan, index) => (
        <PricingCard
          key={index}
          duration={plan.duration}
          btnColor={plan.btnColor}
          price={plan.price}
          features={plan.features}
        />
      ))}
    </div>
  );
};

export default PricingSection;
