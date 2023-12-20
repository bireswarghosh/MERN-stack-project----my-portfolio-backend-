import { Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import { BsGithub, BsYoutube, BsInstagram, BsLinkedin } from "react-icons/bs";
import "./Footer.css";

const Footer = () => {
  return (
    <div className="footer">
      <div>
        <Typography variant="h5">About Me</Typography>
        <Typography>
          Hey, my name is Bireswar Ghosh . I am a Full-Stack Developer .
        </Typography>

        <Link to="/contact" className="footerContactBtn">
          <Typography>Contact Us</Typography>
        </Link>
      </div>
      
      
      <div>

        {/* //! ADD SOME REAL LINK */}
        <Typography variant="h6">Social Media</Typography>
        <a href="https://github.com//" target="black">
          <BsGithub />
        </a>
        <a href="https://youtube.com/6packprogrammer/" target="black">
          <BsYoutube />
        </a>
        <a href="https://instagram.com//" target="black">
          <BsInstagram />
        </a>
        <a href="https://www.linkedin.com/in//" target="black">
          <BsLinkedin />
        </a>
      </div>
    </div>
  );
};

export default Footer;
