import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { uploadJSONToIPFS } from "@/lib/pinata";
import { useToast } from "@/components/ui/use-toast";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { useAccount, useWriteContract } from "wagmi";
import { patientRegistrationABI } from "@/lib/abis";
import { patientRegistrationDeployment } from "@/lib/config";
import { useRouter } from "next/navigation";

function Register() {
  const router = useRouter();
  const { toast } = useToast();
  const [disabled, setDisabled] = useState(false);
  const { address } = useAccount();
  const { writeContractAsync: doctorRegistrationCall } = useWriteContract();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  function triggerToast(title = "", desc, variant = "default") {
    toast({
      title: title,
      description: desc,
      variant: variant,
    });
  }

  const sendPatientProfile = async (CID) => {
    // Convert address to bytes32
    const userIDBytes32 = "0x" + address.slice(2).padStart(64, "0");

    try {
      const tx = await doctorRegistrationCall({
        abi: patientRegistrationABI,
        address: patientRegistrationDeployment,
        functionName: "registerPatient",
        args: [userIDBytes32, CID],
      });
      console.log(tx);
      reset();
      setDisabled(false);
      triggerToast("Success!", "Profile successfully submitted", "success");
      router.push('/patients/profile')
    } catch (error) {
      console.log(error);
    }
  };

  async function uploadMetadataToIPFS(doctorData) {
    const doctorDataJSON = doctorData;
    setDisabled(true);
    try {
      triggerToast("Wait patiently", "Uploading profile data to IPFS");

      //upload the metadata JSON to IPFS
      const response = await uploadJSONToIPFS(doctorDataJSON);
      if (response.success === true) {
        const hash = response.ipfsHash;
        await sendPatientProfile(hash);

        return response.pinataURL;
      }
    } catch (e) {
      console.log("error uploading JSON metadata:", e);
    }
  }

  const onSubmit = async (data) => {
    try {
      await uploadMetadataToIPFS(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-primary section-padding min-h-[100vh] flex justify-center py-10">
      <div className="bg-white rounded p-10 h-fit w-1/2">
        <p className="text-3xl mb-5 font-semibold">Register as a Patient</p>
        <form onSubmit={handleSubmit(onSubmit)}>
          <>
            <div className="mb-3">
              <Label>Name</Label>
              <Input
                type="string"
                id="name"
                placeholder="Name"
                {...register("name", { required: true })}
              />
              {errors.name?.type === "required" && (
                <p className="error-text" role="alert">
                  Name is required
                </p>
              )}
            </div>

            <div className="mb-3">
              <Label htmlFor="email">Email</Label>
              <Input
                type="email"
                id="email"
                placeholder="Email"
                {...register("email", { required: true })}
              />
              {errors.email?.type === "required" && (
                <p className="error-text" role="alert">
                  Email is required
                </p>
              )}
            </div>
          </>
          <Button disabled={disabled} type="submit" className="w-full">
            Submit
          </Button>
        </form>
        <p className="text-center mt-3 text-sm ">
          Are you a Doctor?{" "}
          <Link className="text-secondary" href={"/doctors"}>
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
