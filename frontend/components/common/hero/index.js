import React from "react";

const Hero = ({ title, subTitle, subTitle2, image, children }) => {
  return (
    <div className="section-padding grid grid-cols-3 gap-4 h-[85vh] pt-10 bg-grey">
      <div className="col-span-2 pt-20 pr-10">
        {" "}
        <p className="text-muted font-semibold text-7xl leading-tight">
          {title}
        </p>
        <p className="text-xl mt-10 text-textgrey w-3/4">{subTitle}</p>
        <div className="mt-10"> {children}</div>
        <p className="text-sm italic mt-5">{subTitle2} </p>
      </div>
      <div className="min-h-[600px] ">
        <img
          src={image}
          className="h-[90%] w-full object-cover object-bottom border-4 border-primary rounded"
        />
      </div>
    </div>
  );
};

export default Hero;
