import { Button } from "@/components/ui/button";
import React from "react";

const Hero = () => {
  return (
    <div className="mt-[110px] section-padding grid grid-cols-3 h-[85vh] pt-10 bg-grey">
      <div className="col-span-2 ">
        {" "}
        <p className="text-muted font-semibold text-7xl leading-tight">
          Feeling unwell?
          <br /> Consult top doctors
        </p>
        <p className="text-xl mt-10 text-secondary">
          Get 24/7 online consultations with the best doctors without
          <br /> breaking a sweat and your bank.
        </p>
        <div className="mt-10">
          {" "}
          <Button className="text-xl p-8">Consult Now</Button>
          <Button variant="secondary" className="ml-6 text-xl p-8 text-white">
            Find Doctors
          </Button>
        </div>
      </div>
      <div className="min-h-[600px] ">
        <img
          src="/images/hero.jpg"
          className="h-[90%] w-full object-cover object-bottom border-4 border-primary rounded"
        />
      </div>
    </div>
  );
};

export default Hero;
