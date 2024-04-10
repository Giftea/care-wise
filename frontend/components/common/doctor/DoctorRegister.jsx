import React from "react";
import { deployment, abi } from "@/lib/config";
import { useState } from "react";
import { useAccount, useWriteContract } from "wagmi";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import PhoneInput from "react-phone-number-input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { language_suggestions, specialization_suggestions } from "@/lib/data";
import { WithContext as ReactTags } from "react-tag-input";

const DoctorRegister = () => {
  const [CID, setCID] = useState("");
  const [step, setStep] = useState(2);
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
        {step === 0 ? (
          <PersonalDetails setStep={setStep} />
        ) : step === 1 ? (
          <AcademicDetails setStep={setStep} />
        ) : step === 2 ? (
          <ProfessionalDetails setStep={setStep} />
        ) : null}
      </div>
      {/*  
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

const PersonalDetails = ({ setStep }) => {
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
        <Button className="mt-8" onClick={() => setStep(1)}>
          Next
        </Button>
      </form>
    </>
  );
};

const AcademicDetails = ({ setStep }) => {
  return (
    <>
      <p className="text-3xl mb-5 font-semibold">Academic Details</p>

      <form>
        <div className="mb-3">
          <Label>Course</Label>
          <Input type="string" id="name" placeholder="Name" />
        </div>
        <div className="mb-3">
          <Label>Year</Label>
          <Input type="number" id="year" placeholder="Graduation Year" />
        </div>
        <div className="mb-3">
          <Label>Degree</Label>
          <Input type="string" id="name" placeholder="Name" />
        </div>
        <div className="mb-3">
          <Label>College</Label>
          <Input type="string" id="name" placeholder="Enter College" />
        </div>
        <div className="mb-3">
          <Label>Certificate</Label>
          <Input type="file" id="certificate" />
        </div>
        <Button
          className="mt-8 text-white mr-5"
          variant="secondary"
          onClick={() => setStep(0)}
        >
          Prev
        </Button>
        <Button className="mt-8" onClick={() => setStep(2)}>
          Next
        </Button>
      </form>
    </>
  );
};

const ProfessionalDetails = ({ setStep }) => {
  const [language_tags, setLanguageTags] = useState([]);
  const [specialization_tags, setSpecializationTags] = useState([]);
  console.log("specialization_tags", specialization_tags);
  console.log("language_tags", language_tags);
  const handleDelete = (i) => {
    setLanguageTags(language_tags.filter((tag, index) => index !== i));
  };
  const handleSpecializationDelete = (i) => {
    setSpecializationTags(
      specialization_tags.filter((tag, index) => index !== i)
    );
  };

  const handleAddition = (tag) => {
    setLanguageTags([...language_tags, tag]);
  };

  const handleSpecializationAddition = (tag) => {
    setSpecializationTags([...specialization_tags, tag]);
  };

  const KeyCodes = {
    comma: 188,
    enter: 13,
  };

  const delimiters = [KeyCodes.comma, KeyCodes.enter];

  return (
    <>
      <p className="text-3xl mb-5 font-semibold">Professional Details</p>

      <form>
        <div className="mb-3">
          <Label>Short Bio</Label>
          <Textarea type="string" id="bio" placeholder="Bio" />
        </div>
        <div className="mb-3">
          <Label>Years of Experience</Label>
          <Input
            type="number"
            id="experience"
            placeholder="Enter years of practice"
          />
        </div>
        <div className="mb-3">
          <Label>
            Please choose the languages you are comfortable communicating in.
          </Label>
          <ReactTags
            tags={language_tags}
            suggestions={language_suggestions}
            delimiters={delimiters}
            handleDelete={handleDelete}
            handleAddition={handleAddition}
            inputFieldPosition="bottom"
            autocomplete
            placeholder="Choose languages"
          />
        </div>
        <div className="mb-3">
          <Label>Specialties</Label>
          <ReactTags
            tags={specialization_tags}
            suggestions={specialization_suggestions}
            delimiters={delimiters}
            handleDelete={handleSpecializationDelete}
            handleAddition={handleSpecializationAddition}
            inputFieldPosition="bottom"
            autocomplete
            placeholder="Choose your specialties"
          />
        </div>
        <div className="mb-3">
          <Label>Medical Registration Number</Label>
          <Input
            type="number"
            id="reg-number"
            placeholder="Fill your Medical Registration Number"
          />
        </div>
        <Button
          className="mt-8 text-white mr-5"
          variant="secondary"
          onClick={() => setStep(1)}
        >
          Prev
        </Button>
        <Button className="mt-8">Submit</Button>
      </form>
    </>
  );
};
