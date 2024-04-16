import { createContext, useState, useEffect } from "react";
import axios from "axios";
import { useAccount, useReadContract } from "wagmi";
import { doctorRegistrationABI } from "@/lib/abis";
import { doctorRegistrationDeployment } from "@/lib/config";

export const UserContext = createContext();

export function User({ children }) {
  const [isProfileReceived, setProfileReceived] = useState(false);
  const [isDoctorRegistered, setIsDoctorRegistered] = useState();
  const { address, status } = useAccount();
  const result = useReadContract({
    abi: doctorRegistrationABI,
    address: doctorRegistrationDeployment,
    functionName: "doctors",
    args: [address],
  });
  const data = result?.status === "success" ? result.data : null;


  if (status === 'connected' ) {

  }

  useEffect(() => {
    // result?.status === "success"
    //   ? setProfileReceived(data[1])
    //   : setProfileReceived(false);
  }, []);

  return (
    <UserContext.Provider
      value={{
        isProfileReceived,
        setProfileReceived,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
