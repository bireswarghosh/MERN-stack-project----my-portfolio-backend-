import React, { useEffect } from "react";
import "./Home.css";
import * as THREE from "three"; //!  hear i import every thing from three.js by using *
import moonImage from "../../Images/moon.jpg";
import venusImage from "../../Images/venus.jpg";
import spaceImage from "../../Images/space.jpg";
import { Typography } from "@mui/material";
import TimeLine from "../TimeLine/TimeLine";
import {
  // SiCplusplus,
  SiReact,
  SiJavascript,
  SiMongodb,
  SiNodedotjs,
  SiExpress,
  SiCss3,
  SiHtml5,
  // SiThreedotjs,
} from "react-icons/si";
import YoutubeCard from "../YoutubeCard/YoutubeCard";
import { Link } from "react-router-dom";
import { MouseOutlined } from "@mui/icons-material";

const Home = ({ timelines, youtubes, skills }) => {
  useEffect(() => {
    const textureLoader = new THREE.TextureLoader();//textureLoader mean focus in front  . all images are texture nd crate a textureLoader for img 

    const moonTexture = textureLoader.load(moonImage); // add moon img in  textureLoader
    const venusTexture = textureLoader.load(venusImage);
    const spaceTexture = textureLoader.load(spaceImage);

    const scene = new THREE.Scene();    //if you  want to use  three.js then crate   scene and write this line as it is
    const camera = new THREE.PerspectiveCamera( // Perspective Camera mean when a human view 
      75, // vertical field of view
      window.innerWidth / window.innerHeight,// this the ratio of you screen like my screen 1920/1810 like 16:9
      0.1,
      1000
    ); // this 2 are minimum 0.1 and maximum value 1000
    camera.position.set(4, 4, 8);

    const canvas = document.querySelector(".homeCanvas"); // hear mainly target .homeCanvas class
    const renderer = new THREE.WebGLRenderer({ canvas }); // now render the canvas tag .  mainly hear use this line --> const renderer = new THREE.WebGLRenderer({canvas : canvas }); BUT HEAR PROPERTY AND VALUE WILL BE SAME SO USE IT`S ONE 
// ! Geometry have 3 different value hight weight and depth . Geometry have many types BoxGeometry mean cube . Mesh work is to color the Geometry  . Mesh have different type  one is MeshBasicMaterial . now to call it for run so 
    const moonGeometry = new THREE.SphereGeometry(2, 64, 64);
    const moonMaterial = new THREE.MeshStandardMaterial({ map: moonTexture });  // hear i crate moon with out courser view 
    const moon = new THREE.Mesh(moonGeometry, moonMaterial);
// ! moon position --> 0,0,0 mean exist iis center 
    const venusGeometry = new THREE.SphereGeometry(3, 64, 64);
    const venusMaterial = new THREE.MeshBasicMaterial({ map: venusTexture });//mainly use Mesh for color but hear i add img replace with color 
    const venus = new THREE.Mesh(venusGeometry, venusMaterial);
    venus.position.set(8, 5, 5);// hear add position otherwise overlap on moon

    const pointLight = new THREE.PointLight(0xffffff, 1); // pointLight work as a torch , without pointLight show nothing show everything black black using pointLight show changes of moon and venus . Otherwise nothing show .  // pointLight focus on lighted side mean brightest side
    const pointLight2 = new THREE.PointLight(0xffffff, 0.1); // it focus on dark side of moon by using position and light opacity 0.1

    pointLight.position.set(8, 5, 5);
    pointLight2.position.set(-8, -5, -5);

    scene.add(moon);
    scene.add(venus);
    scene.add(pointLight);
    scene.add(pointLight2);
    scene.background = spaceTexture;

    const constSpeed = 0.01;
    window.addEventListener("mousemove", (e) => { // if mouse move then 
      if (e.clientX <= window.innerWidth / 2) {  // e.clientX mean x coordinate of mouse   so left side of     half of  window.innerWidth
        moon.rotation.x -= constSpeed; // hear i change rotation 
        moon.rotation.y += constSpeed;
        venus.rotation.x -= constSpeed;
        venus.rotation.y += constSpeed;
      }
// right side in vertically
      if (e.clientX > window.innerWidth / 2) {
        moon.rotation.x -= constSpeed;
        moon.rotation.y -= constSpeed;
        venus.rotation.x -= constSpeed;
        venus.rotation.y -= constSpeed;
      }
// lower side of hooringantaly
      if (e.clientY > window.innerHeight / 2) {
        moon.rotation.x -= constSpeed;
        moon.rotation.y += constSpeed;
        venus.rotation.x -= constSpeed;
        venus.rotation.y += constSpeed;
      }
// upper  side of hooringantaly
      if (e.clientY <= window.innerHeight / 2) {
        moon.rotation.x -= constSpeed;
        moon.rotation.y -= constSpeed;
        venus.rotation.x -= constSpeed;
        venus.rotation.y -= constSpeed;
      }
    });

    const animate = () => {
      requestAnimationFrame(animate);// in one times call animate fun then again and again call animate fun by using this  requestAnimationFrame
      moon.rotation.y += 0.001; //rotation in y axis with 0.001 this time spend 
      venus.rotation.y += 0.001;
      renderer.setSize(window.innerWidth, window.innerHeight); // NOW HEAR  set size and render it 
      renderer.render(scene, camera);  // now hear render both of it  
    };

    animate(); // add this property in animate function and call this fun  .  

    return window.addEventListener("scroll", () => {
      camera.rotation.z = window.scrollY * 0.001;
      camera.rotation.y = window.scrollY * 0.003;

      const skillsBox = document.getElementById("homeskillsBox");

      if (window.scrollY > 1500) {
        skillsBox.style.animationName = "homeskillsBoxAnimationOn";
      } else {
        skillsBox.style.animationName = "homeskillsBoxAnimationOff";
      }
    });
  }, []);

  return (
    <div className="home">
      <canvas className="homeCanvas"></canvas> {/* canvas ALREADY PRESENT IN HTML */}

      <div className="homeCanvasContainer">
        <Typography variant="h1">
          <p>B</p>
          <p>I</p>
          <p>R</p>
          <p>E</p>
          <p>S</p>
          <p>W</p>
          <p>A</p>
          <p>R</p>
        </Typography>

        <div className="homeCanvasBox">
          <Typography variant="h2">DESIGNER</Typography>
          <Typography variant="h2">DEVELOPER</Typography>
          <Typography variant="h2">TEACHER</Typography>
          <Typography variant="h2">CONTENT CREATOR</Typography>
        </div>

        <Link to="/projects">VIEW WORK</Link>
      </div>

      <div className="homeScrollBtn">
        <MouseOutlined />
      </div>

      <div className="homeContainer">
        <Typography variant="h3">TIMELINE
       
        </Typography>
        <TimeLine timelines={timelines} />
      </div>

      <div className="homeSkills">
        <Typography variant="h3">SKILLS</Typography>

        <div className="homeCubeSkills">
          <div className="homeCubeSkillsFaces homeCubeSkillsFace1">
            <img src={skills.image1.url} alt="Face1" />
          </div>

          <div className="homeCubeSkillsFaces homeCubeSkillsFace2">
            <img src={skills.image2.url} alt="Face2" />
          </div>

          <div className="homeCubeSkillsFaces homeCubeSkillsFace3">
            <img src={skills.image3.url} alt="Face3" />
          </div>

          <div className="homeCubeSkillsFaces homeCubeSkillsFace4">
            <img src={skills.image4.url} alt="Face4" />
          </div>

          <div className="homeCubeSkillsFaces homeCubeSkillsFace5">
            <img src={skills.image5.url} alt="Face5" />
          </div>

          <div className="homeCubeSkillsFaces homeCubeSkillsFace6">
            <img src={skills.image6.url} alt="Face6" />
          </div>
        </div>

        <div className="cubeShadow"></div>

        <div className="homeskillsBox" id="homeskillsBox">
          {/* <SiCplusplus /> */}
          <SiHtml5 />
          <SiCss3 />
          <SiJavascript />
          <SiMongodb />
          <SiExpress />
          <SiNodedotjs />
          <SiReact />
          {/* //! hear i want to add my-sql icon */}
          {/* <SiThreedotjs /> */}
        </div>
      </div>
        
       {/* <div className="homeYoutube">
        <Typography variant="h3"> YOUTUBE VIDEOS</Typography>

        <div className="homeYoutubeWrapper">
          {youtubes.map((item) => (
            <YoutubeCard
              image={item.image.url}
              title={item.title}
              url={item.url}
              id={item._id}
              key={item._id}
            /> 
          ))}
        </div>
      </div> */}




<div className="homeYoutube">
        <Typography variant="h3"> YOUTUBE VIDEOS</Typography>

        <div className="homeYoutubeWrapper">
          {youtubes.map((item) => (
            <YoutubeCard
              image={item.image.url}
              title={item.title}
              url={item.url}
              id={item._id}
              key={item._id}
            />
          ))}
        </div>
      </div>


    </div>
  );
};

export default Home;
