"use client";

import DoctorRegister from "@/components/common/doctor/DoctorRegister";
import DoctorsPageHero from "@/components/common/hero/Doctors";
import { deployment, abi } from "@/lib/config";
import { useState } from "react";
import { useAccount, useWriteContract } from "wagmi";

export default function Home() {
  const [CID, setCID] = useState("");
  const { writeContractAsync: doctorRegistrationCall } = useWriteContract();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(CID);

    try {
      const tx = await doctorRegistrationCall({
        abi,
        address: deployment,
        functionName: "receiveDoctorProfile",
        args: [CID],
      });

      console.log(tx);
    } catch (error) {
      console.log(error);
    }
  };

  ("CID123456");

  async function getdem() {
    try {
      const tx = await doctorRegistrationCall({
        abi,
        address: deployment,
        functionName: "doctors",
        args: ["0x55A8661defB6b46414F2d79Bb486a115Ab28f6A3"],
      });

      console.log(tx);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <DoctorsPageHero />
      <DoctorRegister />
    </>
  );
}
