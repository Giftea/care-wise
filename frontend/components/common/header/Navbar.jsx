import Link from "next/link";
import React from "react";
import { ConnectKitButton } from "connectkit";

const Navbar = () => {
  return (
    <div className="bg-white section-padding py-4 flex justify-between items-center fixed w-[100vw] top-0 shadow z-[1000]">
      <Link href="/">
        <img src="/images/logo.jpg" width={150} />
      </Link>
      <div className="nav-links">
        <Link href="/doctors/find-doctors" className="mr-10 hover:text-secondary">
          Find a Doctor
        </Link>
        <Link href="/doctors" className="mr-10 hover:text-secondary">
          For Healthcare Providers
        </Link>
        <Link href="/" className="mr-10 hover:text-secondary">
          Articles
        </Link>
      </div>
      <ConnectKitButton />
    </div>
  );
};

export default Navbar;
