import Link from "next/link";
import React from "react";

const Navbar = () => {
  return (
    <div className="bg-white section-padding py-4 flex justify-between items-center fixed w-[100vw] top-0 shadow">
      <Link href="/">
        <img src="/images/logo.jpg" width={150} />
      </Link>
      <div className="nav-links">
        <Link href="/" className="mr-5 hover:text-secondary">
          Find Doctors
        </Link>
        <Link href="/" className="mr-5 hover:text-secondary">
          About
        </Link>
        <Link href="/" className="mr-5 hover:text-secondary">
          Blog
        </Link>
      </div>
      <button>hi</button>
    </div>
  );
};

export default Navbar;
