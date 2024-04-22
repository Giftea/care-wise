"use client";
import { patientRegistrationABI } from "@/lib/abis";
import { patientRegistrationDeployment } from "@/lib/config";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { useAccount, useReadContract } from "wagmi";

const PatientProfile = () => {
  const { address } = useAccount();
  const [patient, setPatient] = useState(null);
  const [patientCID, setPatientCID] = useState(null);

  const result = useReadContract({
    abi: patientRegistrationABI,
    address: patientRegistrationDeployment,
    functionName: "patients",
    args: [address],
  });

  const fetchUser = async (CID) => {
    try {
      const result = await axios.get(
        `https://gateway.pinata.cloud/ipfs/${patientCID}`
      );
      if (result?.status === 200) {
        setPatient(result?.data);
        console.log(patient);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (result?.isSuccess) {
      const userCID = result?.data[2];
      setPatientCID(userCID);
    }
  }, [result]);

  useEffect(() => {
    console.log(patientCID);
    if (patientCID) {
      fetchUser();
    }
  }, [patientCID]);

  return (
    <div>
      <div className="bg-primary text-center h-[150px]">
        <p className="text-white text-2xl py-10">
          Hi {patient?.name}, Welcome to Care Wise!
        </p>
      </div>
    </div>
  );
};

export default PatientProfile;
