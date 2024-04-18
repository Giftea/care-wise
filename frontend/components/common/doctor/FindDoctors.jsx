import React, { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAccount, useReadContract } from "wagmi";
import { doctorRegistrationABI } from "@/lib/abis";
import { doctorRegistrationDeployment } from "@/lib/config";
import axios from "axios";
import { Skeleton } from "@/components/ui/skeleton";

const FindDoctors = () => {
  const [doctors, setDoctors] = useState([]);
  const { status, address } = useAccount();
  const [loading, setLoading] = useState(true);

  const result = useReadContract({
    abi: doctorRegistrationABI,
    address: doctorRegistrationDeployment,
    functionName: "getAllRegisteredDoctors",
  });

  useEffect(() => {
    if (result.isSuccess) {
      setLoading(false);
      setDoctors(result.data);
    }
  }, [result, doctors]);

  return (
    <div className="section-padding py-10">
      <p>
        Find one of the best Doctors to get instant medical advice and second
        opinion for your health problems. Ask doctors online and consult them
        through video, phone, or chat. Get started now!
      </p>

      <div className="grid grid-cols-3">
        {!loading ? (
          <>
            {doctors.map((item, index) => (
              <DoctorCard id={index} CID={item.userDataCID} />
            ))}
          </>
        ) : (
          <>
            <CardSkeleton />
            <CardSkeleton />
            <CardSkeleton />
            <CardSkeleton />
          </>
        )}
      </div>
    </div>
  );
};

export default FindDoctors;

const DoctorCard = ({ id, CID }) => {
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
    <div
      key={id}
      className="mt-5 bg-white shadow p-8 col-span-2 flex justify-between rounded"
    >
      <div className="flex">
        <Avatar className="w-[100px] h-[100px]">
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>

        <div className="ml-5">
          <p className="text-primary text-2xl font-semibold"> {doctor?.name}</p>
          <p className="text-textgrey mb-5">{doctor?.course}</p>
          <p>
            Experience:{" "}
            <span className="font-semibold">{doctor?.experience}+ Yrs</span>
          </p>
          <p>
            Consulting Languages:{" "}
            <span className="font-semibold">
              {" "}
              {doctor?.languages.map((item, index) => (
                <span key={index}> {item.text}, </span>
              ))}{" "}
            </span>{" "}
          </p>
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

const CardSkeleton = () => {
  return (
    <div className="mt-5 bg-white shadow p-8 col-span-2 flex justify-between">
      <div className="flex">
        {" "}
        <Skeleton className="w-[100px] h-[100px] rounded-full" />
        <div className="ml-5">
          <Skeleton className="h-4 w-[50px] mb-2" />
          <Skeleton className="h-4 w-[70px] mb-3" />
          <Skeleton className="h-4 w-[100px] mb-3 mt-10" />
          <Skeleton className="h-4 w-[250px] mb-3" />
          <Skeleton className="h-4 w-[350px] mb-3" />
        </div>
      </div>

      <div className="space-y-2">
        <Skeleton className="h-4 w-[200px] py-4 my-1" />
        <Skeleton className="h-4 w-[200px py-4 my-1" />
        <Skeleton className="h-4 w-[200px] py-4 my-1" />
      </div>
    </div>
  );
};
