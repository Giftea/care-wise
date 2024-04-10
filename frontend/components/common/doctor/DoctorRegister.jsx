import React from "react";
import { deployment, abi } from "@/lib/config";
import { useState } from "react";
import { useAccount, useWriteContract } from "wagmi";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import PhoneInput from "react-phone-number-input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";

const DoctorRegister = () => {
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
    <div className="section-padding py-10 bg-primary grid grid-cols-2 gap-4">
      <div>
        <p className="text-secondary uppercase text-l mb-5">
          Register your Healthcare Provider account
        </p>
        <p className="text-white text-5xl font-semibold capitalize">
          Breaking the boundaries of care delivery
        </p>
      </div>

      <div className="col-span- bg-white rounded p-10">
        <PersonalDetails />
      </div>
      {/* 
      name
      bio
      specialization
      yearsofexperience
      academics [school name, degree, yearofgrad, certficate]
      supporting documents

      
      
      
      <form onSubmit={handleSubmit}>
        <input
          name="cid"
          placeholder="cid"
          value={CID}
          onChange={(e) => setCID(e.target.value)}
        />
        <input type="submit" />
      </form>

      <button onClick={()=> getdem()} >get doctor</button> */}
    </div>
  );
};

export default DoctorRegister;

const PersonalDetails = () => {
  const [value, setValue] = useState();
  return (
    <>
      <p className="text-3xl mb-5 font-semibold">Personal Details</p>
      <form action="">
        <div className="mb-3">
          <Label>Name</Label>
          <Input type="string" id="name" placeholder="Name" />
        </div>

        <div className="mb-3">
          <Label htmlFor="email">Email</Label>
          <Input type="email" id="email" placeholder="Email" />
        </div>

        <div className="mb-3">
          <Label>Profile Photo</Label>
          <Input type="file" id="photo" />
        </div>
        <div className="mb-3">
          <Label>Mobile</Label>
          <PhoneInput
            placeholder="Enter phone number"
            value={value}
            onChange={setValue}
            className="rounded border-2 py-2 px-3"
          />
        </div>

        <div className="mb-3">
          <Label>Date of Birth</Label>
          <Input type="date" />
        </div>

        <div className="mb-3">
          <Label>Gender</Label>

          <RadioGroup defaultValue="none">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="male" id="male" />
              <Label htmlFor="male">Male</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="female" id="female" />
              <Label htmlFor="female">Female</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="others" id="others" />
              <Label htmlFor="others">Others</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="undisclosed" id="undisclosed" />
              <Label htmlFor="undisclosed">Prefer not to say</Label>
            </div>
          </RadioGroup>
        </div>
        <Button className="w-full mt-8">Submit</Button>
      </form>
    </>
  );
};


const AcademicDetails = () => { 

    return (
        <></>
    )
}
