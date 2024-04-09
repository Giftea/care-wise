import React from "react";
import Hero from ".";
import { Button } from "@/components/ui/button";

const DoctorsPageHero = () => {
  return (
    <Hero
      title={"Launch your onchain medical practice"}
      subTitle={
        "We are redesigning healthcare delivery by decentralizing care services to ensure quality care is available to everyone, anywhere."
      }
      image="/images/doctors.jpg"
      subTitle2={
        "* Provider membership is exclusive to specialist physicians with specializations"
      }
    >
      <Button className="text-xl p-8">Register Now</Button>
    </Hero>
  );
};

export default DoctorsPageHero;
