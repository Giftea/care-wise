import { createContext, useState, useEffect } from "react";
import axios from "axios";
import { useAccount, useReadContract } from "wagmi";
import { doctorRegistrationABI } from "@/lib/abis";
import { doctorRegistrationDeployment } from "@/lib/config";

export const UserContext = createContext();

export function User({ children }) {
  const [isProfileReceived, setProfileReceived] = useState();
  const [isDoctorRegistered, setIsDoctorRegistered] = useState();
  const { address } = useAccount();

  const result = useReadContract({
    abi: doctorRegistrationABI,
    address: doctorRegistrationDeployment,
    functionName: "doctors",
    args: [address],
  });
const data = result.data

console.log(data)

  useEffect(() => {
   setProfileReceived(result?.data)
  }, [result]);

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
