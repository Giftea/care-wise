import React from "react";
import { deployment, abi } from "@/lib/config";
import { useState } from "react";
import { useAccount, useWriteContract } from "wagmi";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import PhoneInput from "react-phone-number-input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { language_suggestions, specialization_suggestions } from "@/lib/data";
import { WithContext as ReactTags } from "react-tag-input";
import { useForm } from "react-hook-form";


const DoctorRegister = () => {
  const [CID, setCID] = useState("");
  const [step, setStep] = useState(0);
  const { writeContractAsync: doctorRegistrationCall } = useWriteContract();
  const [mobile, setMobile] = useState();
  const [language_tags, setLanguageTags] = useState([]);
  const [specialization_tags, setSpecializationTags] = useState([]);

  // Profeesional details
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

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   console.log(CID);

  //   try {
  //     const tx = await doctorRegistrationCall({
  //       abi,
  //       address: deployment,
  //       functionName: "receiveDoctorProfile",
  //       args: [CID],
  //     });

  //     console.log(tx);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    control,
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

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
        <form onSubmit={handleSubmit(onSubmit)}>
          {step === 0 ? (
            <>
              <p className="text-3xl mb-5 font-semibold">Personal Details</p>
              <div className="mb-3">
                <Label>Name</Label>
                <Input
                  type="string"
                  id="name"
                  placeholder="Name"
                  {...register("name")}
                />
              </div>

              <div className="mb-3">
                <Label htmlFor="email">Email</Label>
                <Input
                  type="email"
                  id="email"
                  placeholder="Email"
                  {...register("email")}
                />
              </div>

              <div className="mb-3">
                <Label>Profile Photo</Label>
                <Input type="file" id="photo" {...register("photo")} />
              </div>
              <div className="mb-3">
                <Label>Mobile</Label>
                <PhoneInput
                  placeholder="Enter phone number"
                  value={mobile}
                  id="mobile"
                  name="mobile"
                  onChange={setMobile}
                  className="rounded border-2 py-2 px-3"
                  {...register("mobile")}
                />
              </div>

              <div className="mb-3">
                <Label>Date of Birth</Label>
                <Input type="date" {...register("dob")} />
              </div>

              <Button className="mt-8" onClick={() => setStep(1)}>
                Next
              </Button>
            </>
          ) : step === 1 ? (
            <>
              <p className="text-3xl mb-5 font-semibold">Academic Details</p>

              <>
                <div className="mb-3">
                  <Label>Course</Label>
                  <Input
                    type="string"
                    id="name"
                    placeholder="Course title"
                    {...register("course")}
                  />
                </div>
                <div className="mb-3">
                  <Label>Year</Label>
                  <Input
                    type="number"
                    id="year"
                    placeholder="Graduation Year"
                    {...register("year")}
                  />
                </div>
                <div className="mb-3">
                  <Label>Degree</Label>
                  <select
                    id="degree"
                    {...register("degree")}
                    className="w-full rounded border-2 py-2 px-3"
                  >
                    <option value=""> Select degree type</option>
                    <option value="mbbs">MBBS</option>
                    <option value="msc">Msc</option>
                    <option value="doctorate">Doctorate</option>
                  </select>
                </div>
                <div className="mb-3">
                  <Label>College</Label>
                  <Input
                    type="string"
                    id="college"
                    placeholder="Enter College"
                    {...register("college")}
                  />
                </div>
                <div className="mb-3">
                  <Label>Certificate</Label>
                  <Input
                    type="file"
                    id="certificate"
                    {...register("certificate")}
                  />
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
              </>
            </>
          ) : step === 2 ? (
            <>
              <p className="text-3xl mb-5 font-semibold">
                Professional Details
              </p>

              <>
                <div className="mb-3">
                  <Label>Short Bio</Label>
                  <Textarea
                    type="string"
                    id="bio"
                    placeholder="Bio"
                    {...register("bio")}
                  />
                </div>
                <div className="mb-3">
                  <Label>Years of Experience</Label>
                  <Input
                    type="number"
                    id="experience"
                    placeholder="Enter years of practice"
                    {...register("experience")}
                  />
                </div>
                <div className="mb-3">
                  <Label>
                    Please choose the languages you are comfortable
                    communicating in.
                  </Label>
                  <ReactTags
                    tags={language_tags}
                    suggestions={language_suggestions}
                    delimiters={delimiters}
                    handleDelete={handleDelete}
                    handleAddition={handleAddition}
                    inputFieldPosition="bottom"
                    autocomplete
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
                    id="regnumber"
                    placeholder="Fill your Medical Registration Number"
                    {...register("regnumber")}
                  />
                </div>
                <Button
                  className="mt-8 text-white mr-5"
                  variant="secondary"
                  onClick={() => setStep(1)}
                >
                  Prev
                </Button>
                <Button className="mt-8" type="submit">
                  Submit
                </Button>
              </>
            </>
          ) : null}
        </form>
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

const ProfessionalDetails = ({ setStep }) => {
  const [language_tags, setLanguageTags] = useState([]);
  const [specialization_tags, setSpecializationTags] = useState([]);

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

      <>
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
      </>
    </>
  );
};
