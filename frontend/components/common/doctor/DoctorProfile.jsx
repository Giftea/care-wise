import React, { useEffect, useState } from "react";
import { doctorRegistrationABI } from "@/lib/abis";
import { doctorRegistrationDeployment } from "@/lib/config";
import axios from "axios";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

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
  return <div className="mt-5 bg-white shadow p-8 col-span-2 flex justify-between rounded">

  </div>;
};

export default DoctorProfile;
