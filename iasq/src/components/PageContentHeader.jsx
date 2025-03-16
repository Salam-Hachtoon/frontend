const PCHeader = ({pageHeader}) => {
    return (
        <div className="content-header">
            <h2 className="inline-block text-[24px] underline font-semibold">
              {pageHeader}
            </h2>
            <div className="sort-filter float-right grid grid-cols-2 gap-[6px]">
              <div className="sort inline-block border border-[#4B5768] px-[12px] py-[8px] rounded-[5px] text-[12px] text-[#4B5768]">
                Sort
                <img src="/img/arrowdown.svg" className="inline-block" />
              </div>
              <div className="filter inline-block border border-[#4B5768] px-[12px] py-[8px] rounded-[5px] text-[12px] text-[#4B5768]">
                Filter
                <img src="/img/filter.svg" className="inline-block ml-[6px]" />
              </div>
            </div>
          </div>
    );
};

export default PCHeader;