import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const FindDoctors = () => {
  return (
    <div className="section-padding py-10">
      <p>
        Find one of the best Doctors to get instant medical advice and second
        opinion for your health problems. Ask doctors online and consult them
        through video, phone, or chat. Get started now!
      </p>

      <div className="grid grid-cols-3">
        <DoctorCard />
        <DoctorCard />
      </div>
    </div>
  );
};

export default FindDoctors;

const DoctorCard = () => {
  return (
    <div className="mt-5 bg-white shadow p-8 col-span-2 flex justify-between rounded">
      <div className="flex">
        <Avatar className="w-[100px] h-[100px]">
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>

        <div className="ml-5">
          <p className="text-primary text-2xl font-semibold">Dr. John</p>
          <p className="text-textgrey mb-5">MBBS</p>
          <p>
            Experience: <span className="font-semibold">16+ Yrs</span>
          </p>
          <p>
            Consulting Languages: <span className="font-semibold">English</span>{" "}
          </p>
          <div className="mt-5 flex">
            <span className="border-2 border-[#4999fa53] text-secondary p-2 mr-2 rounded">
              Family Physician
            </span>
            <span className="border-2 border-[#4999fa53] text-secondary p-2 mr-2 rounded">
              Family Physician
            </span>
          </div>
        </div>
      </div>

      <div className="flex flex-col">
        <button className="bg-primary text-white p-2 mr-2 rounded my-1 px-10">
          Ask Query $3
        </button>
        <button className="bg-secondary text-white p-2 mr-2 rounded my-1 px-10">
          50hrs Chat $9
        </button>
        <button className="bg-textgrey text-white p-2 mr-2 rounded my-1 px-10">
          Consult $13
        </button>
      </div>
    </div>
  );
};
