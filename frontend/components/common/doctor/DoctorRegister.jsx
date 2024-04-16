import React from "react";
import { doctorRegistrationDeployment } from "@/lib/config";
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
import { ConnectKitButton } from "connectkit";
import Spinner from "../Spinner";
import { uploadFileToIPFS, uploadJSONToIPFS } from "@/lib/pinata";
import { useToast } from "@/components/ui/use-toast";
import { doctorRegistrationABI } from "@/lib/abis";

const DoctorRegister = () => {
  const { toast } = useToast();
  const [disabled, setDisabled] = useState(true);
  const [imageCID, setImageCID] = useState("");
  const [certCID, setCertCID] = useState("");
  const { writeContractAsync: doctorRegistrationCall } = useWriteContract();
  const [mobile, setMobile] = useState();
  const [language_tags, setLanguageTags] = useState([]);
  const [specialization_tags, setSpecializationTags] = useState([]);
  const { status, address } = useAccount();
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

  async function OnChangeFile(e) {
    var file = e.target.files[0];
    //check for file extension
    try {
      triggerToast(
        "Uploading file to IPFS",
        "Please wait patiently as the file is being uploaded"
      );

      const response = await uploadFileToIPFS(file);
      if (response.success === true) {
        if (e.target.id === "photo") {
          setImageCID(response.pinataURL);
          triggerToast("Success!", "File uploaded to IPFS", "success");
        } else if (e.target.id === "certificate") {
          setCertCID(response.pinataURL);
          triggerToast("Success!", "File uploaded to IPFS", "success");
          setDisabled(false);
        } else {
          return;
        }
      }
    } catch (e) {
      console.log("Error during file upload", e);
    }
  }

  const sendDoctorProfile = async (CID) => {
    try {
      const tx = await doctorRegistrationCall({
        abi: doctorRegistrationABI,
        address: doctorRegistrationDeployment,
        functionName: "receiveDoctorProfile",
        args: [CID],
      });

      console.log(tx);

      reset();
      triggerToast("Success!", "Profile successfully submitted", "success");
    } catch (error) {
      console.log(error);
    }
  };

  async function uploadMetadataToIPFS(doctorData) {
    const doctorDataJSON = doctorData;
    try {
      //upload the metadata JSON to IPFS
      const response = await uploadJSONToIPFS(doctorDataJSON);
      if (response.success === true) {
        console.log("Uploaded JSON to Pinata: ", response);
        const hash =response.ipfsHash;
        await sendDoctorProfile(hash);

        return response.pinataURL;
      }
    } catch (e) {
      console.log("error uploading JSON metadata:", e);
    }
  }

  const onSubmit = async (data) => {
    try {
      const doctorData = {
        ...data,
        languages: language_tags,
        specialization: specialization_tags,
        photo: imageCID,
        certificate: certCID,
      };

      await uploadMetadataToIPFS(doctorData);
    } catch (error) {
      console.log(error);
    }
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

      {status === "connected" ? (
        <div className="col-span-1 bg-white rounded p-10">
          <form onSubmit={handleSubmit(onSubmit)}>
            <>
              <p className="text-3xl mb-5 font-semibold">Personal Details</p>
              <div className="grid grid-cols-2 gap-2">
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
              </div>

              <div className="mb-3">
                <Label>Profile Photo</Label>
                <Input
                  type="file"
                  id="photo"
                  required
                  onChange={OnChangeFile}
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                {" "}
                <div className="mb-3">
                  <Label>Mobile</Label>
                  <PhoneInput
                    placeholder="Enter phone number"
                    value={mobile}
                    id="mobile"
                    name="mobile"
                    onChange={setMobile}
                    className="rounded border-2 py-2 px-3"
                    {...register("mobile", { required: true })}
                  />
                  {errors.mobile?.type === "required" && (
                    <p className="error-text" role="alert">
                      Mobile number is required
                    </p>
                  )}
                </div>
                <div className="mb-6">
                  <Label>Date of Birth</Label>
                  <Input type="date" {...register("dob", { required: true })} />
                  {errors.dob?.type === "required" && (
                    <p className="error-text" role="alert">
                      Date of Birth is required
                    </p>
                  )}
                </div>
              </div>

              <>
                <p className="text-3xl mb-5 font-semibold">Academic Details</p>

                <>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="mb-3">
                      <Label>Course</Label>
                      <Input
                        type="string"
                        id="name"
                        placeholder="Course title"
                        {...register("course", { required: true })}
                      />
                      {errors.course?.type === "required" && (
                        <p className="error-text" role="alert">
                          Course is required
                        </p>
                      )}
                    </div>
                    <div className="mb-3">
                      <Label>Year</Label>
                      <Input
                        type="number"
                        id="graduationYear"
                        placeholder="Graduation Year"
                        {...register("graduationYear", { required: true })}
                      />
                      {errors.graduationYear?.type === "required" && (
                        <p className="error-text" role="alert">
                          Graduation Year is required
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div className="mb-3">
                      <Label>Degree</Label>
                      <select
                        id="degree"
                        {...register("degree", { required: true })}
                        className="w-full rounded border-2 py-2 px-3"
                      >
                        <option value=""> Select degree type</option>
                        <option value="mbbs">MBBS</option>
                        <option value="msc">Msc</option>
                        <option value="doctorate">Doctorate</option>
                      </select>
                      {errors.degree?.type === "required" && (
                        <p className="error-text" role="alert">
                          Degree is required
                        </p>
                      )}
                    </div>
                    <div className="mb-3">
                      <Label>College</Label>
                      <Input
                        type="string"
                        id="college"
                        placeholder="Enter College"
                        {...register("college", { required: true })}
                      />
                      {errors.college?.type === "required" && (
                        <p className="error-text" role="alert">
                          College is required
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="mb-3">
                    <Label>Certificate</Label>
                    <Input
                      type="file"
                      id="certificate"
                      onChange={OnChangeFile}
                      required
                    />
                  </div>
                </>
              </>
              <>
                <p className="text-3xl mb-5 font-semibold">
                  Professional Details
                </p>

                <>
                  <div className="grid grid-cols-2 gap-2">
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
                      <input
                        type="number"
                        className="rounded border-2 py-2 px-3 w-full"
                        id="experience"
                        placeholder="Enter years of practice"
                        {...register("experience")}
                      />
                    </div>
                  </div>

                  <>
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
                  </>

                  <div className="mb-6 w-[50%]">
                    <Label>Medical Registration Number</Label>
                    <Input
                      type="number"
                      id="regNumber"
                      placeholder="Fill your Medical Registration Number"
                      {...register("regNumber", { required: true })}
                    />
                    {errors.regNumber?.type === "required" && (
                      <p className="error-text" role="alert">
                        Medical Registration Number is required
                      </p>
                    )}
                  </div>

                  <Button disabled={disabled} className="w-full" type="submit">
                    Submit
                  </Button>
                </>
              </>
            </>
          </form>
        </div>
      ) : (
        <div className="col-span- bg-white rounded p-10">
          {" "}
          <p className="text-3xl mb-5 font-semibold">
            Connect Wallet to Register
          </p>
          <div className="flex justify-center">
            {status === "disconnected" ? (
              <ConnectKitButton />
            ) : (
              <Spinner loading={true} size={50} />
            )}
          </div>
        </div>
      )}
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
