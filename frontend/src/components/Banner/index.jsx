import React from "react";
import bertBanner from "../../assets/img/bert_banner.png";

const Banner = () => {
  return (
    <div className="flex justify-center items-center py-4 px-6 bg-white">
      <img src={bertBanner} alt="Branch" className="w-20 mr-2" />
      <p className=" text-4xl  text-pink-500">BioASQ: BioMedical Online Question Answering</p>
    </div>
  );
};

export default Banner;
