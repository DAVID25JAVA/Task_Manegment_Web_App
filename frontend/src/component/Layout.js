import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function Layout({ children }) {
  return (
    <div>
      <Navbar onLoginClick={() => setIsLoginOpen(true)} />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
