import React, { useEffect, useState } from "react";
import { doctorRegistrationABI } from "@/lib/abis";
import { doctorRegistrationDeployment } from "@/lib/config";
import axios from "axios";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FaGraduationCap } from "react-icons/fa6";

const DoctorProfile = ({ CID }) => {
  const [doctor, setDoctor] = useState(null);
  const fetchUser = async () => {
    try {
      const result = await axios.get(
        `https://gateway.pinata.cloud/ipfs/${CID}`
      );
      if (result?.status === 200) {
        setDoctor(result?.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, [CID]);

  useEffect(() => {
    console.log(doctor);
  }, [doctor]);
  return (
    <>
      <div className="mt-5 bg-white shadow p-8 col-span-2 flex rounded">
        <Avatar className="w-[150px] h-[150px]">
          <AvatarImage src={doctor?.photo} />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>

        <div className="ml-5 mt-3">
          <p className="text-primary text-2xl font-semibold"> {doctor?.name}</p>
          <p className="text-textgrey mb-5 text-sm ">{doctor?.course}</p>
          <p className="text-textgrey mb-5 ">{doctor?.bio}</p>
          <p>
            Consulting Languages:{" "}
            <span className="font-semibold">
              {" "}
              {doctor?.languages.map((item, index) => (
                <span key={index}> {item.text}, </span>
              ))}{" "}
            </span>{" "}
          </p>
          <p className="text-primary my-5 text-2xl ">Specialties</p>
          <div className="mt-5 flex">
            {doctor?.specialization.map((item, index) => (
              <span
                key={index}
                className="border-2 border-[#4999fa53] text-secondary p-2 mr-2 rounded"
              >
                {item?.text}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="my-10 bg-white shadow p-8 col-span-2 rounded">
        <p className="text-2xl font-semibold mb-5">Academics</p>

        <div className="flex">
          <FaGraduationCap color="#2e279d" size={50} />

          <div className="ml-5">
            <p className="text-textgrey font-semibold text-2xl mb-1 ">{doctor?.course}</p>
            <p className="text-textgrey mb-1 ">{doctor?.college}</p>
            <p className="text-textgrey mb-1 ">
              {doctor?.graduationYear}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default DoctorProfile;
