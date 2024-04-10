"use client";

import DoctorRegister from "@/components/common/doctor/DoctorRegister";
import DoctorsPageHero from "@/components/common/hero/Doctors";

export default function Home() {
  return (
    <>
      <DoctorsPageHero />
      <DoctorRegister />
    </>
  );
}
