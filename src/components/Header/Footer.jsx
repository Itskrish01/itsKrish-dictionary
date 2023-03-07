import React from "react";
import { AiOutlineInstagram } from "react-icons/ai";
import { TbNotebook } from "react-icons/tb";

const Footer = () => {
  return (
    <footer className="footer flex justify-between mt-10 items-center p-4 bg-neutral text-neutral-content">
      <div className="items-center grid-flow-col">
        <div className="text-4xl mr-5">
          <TbNotebook />
        </div>
        <p> itsKrish01 - Dictionary</p>
      </div>
      <div className="grid-flow-col gap-4 md:place-self-center md:justify-self-end">
        <a
          className="text-3xl"
          href="https://www.instagram.com/itskrish01/"
          target="_blank"
        >
          <AiOutlineInstagram />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
