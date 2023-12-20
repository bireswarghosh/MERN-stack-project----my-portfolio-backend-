import React from "react";
import { ReactNavbar } from "overlay-navbar";
import logo from "../../Images/logo.png";
import { FaUserAlt } from "react-icons/fa";

const Header = () => {
  return (
    <ReactNavbar
      navColor1="white" //1ST  left side nav bar color 
      navColor2="hsl(219, 48%, 8%)" // this is whole nav color without 1ST  left side nav bar color . this is all right side color . navColor mean back-ground color
      burgerColor="hsl(250, 100%, 75%)" // burgerColor mean text color 
      burgerColorHover="hsl(250, 100%, 75%)" // see text color when hover 
      logo={logo}
      logoWidth= "100%"  // "250px"
      logoHoverColor="hsl(0, 100%, 50%)"

      nav2justifyContent="space-around"// space between other
      nav3justifyContent="space-around"// space between other
      link1Text="Home" // this is text which i show
      link2Text="About" // this is text which i show
      link3Text="Projects" // this is text which i show
      link4Text="Contact" // this is text which i show
      link1Url="/" // this is link where this pase go
      link2Url="/about" // this is link where this pase go
      link3Url="/projects" // this is link where this pase go
      link4Url="/contact" // this is link where this pase go
      link1ColorHover="white" // it hover link then show white color
      link1Color="HSL(250, 100%, 75%)" 
      link1Size="1.5rem"
      link1Padding="3vmax"
      profileIcon={true} //if it is true then it give me access to pest icon 
      ProfileIconElement={FaUserAlt} // this is the icon
      profileIconColor="HSL(250, 100%, 75%)"
      profileIconColorHover="white"
    />
  );
};

export default Header;
