import React from "react";
import Hero from ".";
import { Button } from "@/components/ui/button";

const Home = () => {
  return (
    <Hero
      title={"Feeling unwell? Consult top doctors"}
      subTitle={
        "Get 24/7 online consultations with the best doctors without breaking a sweat and your bank."
      }
      image="/images/hero.jpg"
    >
      <Button className="text-xl p-8">
        <a href="/patients/register">Register Now</a>
      </Button>
      <Button variant="secondary" className="ml-6 text-xl p-8 text-white">
        <a href="/doctors/find-doctors">Find Doctors</a>
      </Button>
    </Hero>
  );
};

export default Home;
