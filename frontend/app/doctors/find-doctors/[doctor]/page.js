"use client";
import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { useAccount, useReadContract } from "wagmi";
import { doctorRegistrationABI } from "@/lib/abis";
import { doctorRegistrationDeployment } from "@/lib/config";
import DoctorProfile from "@/components/common/doctor/DoctorProfile";
import { CardSkeleton } from "@/components/common/doctor/FindDoctors";

const Doctor = () => {
  const [doctor, setDoctor] = useState();
  const [loading, setLoading] = useState(true);
  const pathname = usePathname();
  const parts = pathname.split("/");

  const doctorAddress = parts[parts.length - 1];

  const result = useReadContract({
    abi: doctorRegistrationABI,
    address: doctorRegistrationDeployment,
    functionName: "getAllRegisteredDoctors",
  });

  useEffect(() => {
    if (result?.isSuccess) {
      setLoading(false);
      const foundDoctor = result?.data.find(
        (doctor) => doctor.doctorAddress === doctorAddress
      );
      setDoctor(foundDoctor);
      console.log(doctor);
    }
  }, [result, doctor]);

  return (
    <>
      <div className="bg-secondary text-white py-10 text-center">
        Care Wise / Doctor / General Practitioner / {}
      </div>

      <div className="grid grid-cols-3 section-padding">
        {loading ? (
          <CardSkeleton />
        ) : (
          <DoctorProfile CID={doctor?.userDataCID} />
        )}
      </div>
    </>
  );
};

export default Doctor;
