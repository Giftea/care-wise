"use client";

import DoctorRegister from "@/components/common/doctor/DoctorRegister";
import DoctorsPageHero from "@/components/common/hero/Doctors";
import { useEffect } from "react";
import { animateScroll as scroll } from "react-scroll";

export default function Home() {
  const scrollToTop = () => {
    scroll.scrollToTop();
  };

  useEffect(() => {
    scrollToTop();
  }, []);
  return (
    <>
      <DoctorsPageHero />
      <DoctorRegister />
    </>
  );
}
