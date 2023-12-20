import { User } from "../model/User.js";
import jwt from "jsonwebtoken";
import { sendMail } from "../middlewares/sendMail.js";
import cloudinary from "cloudinary";

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
// ! hear only one user who is admin so i do not hash password  and no need to register
    const user = await User.findOne({ email, password });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid email or password",
      });
    }
// now hear crate token
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);

    res
      .status(200)
      .cookie("token", token, {
        expires: new Date(Date.now() + 1200000000),
        httpOnly: true,
      })
      .json({
        success: true,
        message: "Logged In Successfully",
      });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const logout = async (req, res) => {
  try {
    res
      .status(200)
      .cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true,
      })
      .json({
        success: true,
        message: "Logged Out Successfully",
      });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

 // !!! one important note ==>> basically i use axios.get("/api/v1/user"); when i hit this url  it give me user details when user is not log in because when any 3rd person land this portfolio website then he simply see my work . because 1st of all website store my all data so he see it .
export const getUser = async (req, res) => {
  try {
    const user = await User.findOne().select("-password -email"); // find one use and only one user as admin  is exist . hear mainly if  anyone visit open all website till he is log in or not so . i do not want that, anyone come and see my email ans password so i want to hide it so use -->.select("-password -email");

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
}; 

export const myProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const contact = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    const userMessage = `Hey, I am ${name}. My email is ${email}. My message is ${message}.`;

    await sendMail(userMessage);

    return res.status(200).json({
      success: true,
      message: "Message Sent Successfully",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateUser = async (req, res) => {
  try {
    const user = await User.findById(req.user._id); // because i login and then try to update so at that case i find user via req.user._id
// this all 5 are object and hear occur update fun
    const { name, email, password, skills, about } = req.body;

    if (name) {
      user.name = name;
    }

    if (email) {
      user.email = email;
    }
    if (password) {
      user.password = password;
    }
// cloudinary use hear 
    if (skills) {
      if (skills.image1) {  // ! 1st time when you upload img then comment out every destroy  line mean this line -->  await cloudinary.v2.uploader.destroy(user.skills.image.public_id);  other wise redux not permission you to upload img .    this err happened because when img not exist then what you  destroy or delate .                   then after 1st times mean once img upload then remember to remove comment this line otherwise show private cloudinary link on public through on db
        await cloudinary.v2.uploader.destroy(user.skills.image1.public_id); //  if img 1  then first destroy or delate  img via user.skills.image1.public_id  . in cloudinary every img have different id which access by public_id
        const myCloud = await cloudinary.v2.uploader.upload(skills.image1, {
          folder: "portfolio", // this is the folder
        }); // then next step upload img and set folder where save 
            //  and this 3 line for to save the img 
        user.skills.image1 = {
          public_id: myCloud.public_id,
          url: myCloud.secure_url,
        };
      }
            
      if (skills.image2) {
        await cloudinary.v2.uploader.destroy(user.skills.image2.public_id);
        const myCloud = await cloudinary.v2.uploader.upload(skills.image2, {
          folder: "portfolio",
        });

        user.skills.image2 = {
          public_id: myCloud.public_id,
          url: myCloud.secure_url,
        };
      }

      if (skills.image3) {
        await cloudinary.v2.uploader.destroy(user.skills.image3.public_id);
        const myCloud = await cloudinary.v2.uploader.upload(skills.image3, {
          folder: "portfolio",
        });

        user.skills.image3 = {
          public_id: myCloud.public_id,
          url: myCloud.secure_url,
        };
      }

      if (skills.image4) {
        await cloudinary.v2.uploader.destroy(user.skills.image4.public_id);
        const myCloud = await cloudinary.v2.uploader.upload(skills.image4, {
          folder: "portfolio",
        });

        user.skills.image4 = {
          public_id: myCloud.public_id,
          url: myCloud.secure_url,
        };
      }

      if (skills.image5) {
        await cloudinary.v2.uploader.destroy(user.skills.image5.public_id);
        const myCloud = await cloudinary.v2.uploader.upload(skills.image5, {
          folder: "portfolio",
        });

        user.skills.image5 = {
          public_id: myCloud.public_id,
          url: myCloud.secure_url,
        };
      }

      if (skills.image6) {
        await cloudinary.v2.uploader.destroy(user.skills.image6.public_id);
        const myCloud = await cloudinary.v2.uploader.upload(skills.image6, {
          folder: "portfolio",
        });

        user.skills.image6 = {
          public_id: myCloud.public_id,
          url: myCloud.secure_url,
        };
      }
    }
          // ! AFTER  changing img all data have go to about so  
    if (about) {
      if (about.name) {
        user.about.name = about.name;  // add this 2 or 3  line 
      }
      if (about.title) {
        user.about.title = about.title; // add this 2 or 3  line 
      }
      if (about.subtitle) {
        user.about.subtitle = about.subtitle; // add this 2 or 3  line 
      }

      if (about.description) {
        user.about.description = about.description; // add this 2 or 3  line 
      }
      if (about.quote) {
        user.about.quote = about.quote; // add this 2 or 3  line 
      }
          // ! same thing happened line 129 .      comment out 221 . then after 1st times mean once img upload then remember to remove comment this line 
      if (about.avatar) {
        await cloudinary.v2.uploader.destroy(user.about.avatar.public_id);

        const myCloud = await cloudinary.v2.uploader.upload(about.avatar, {
          folder: "portfolio",
        });

        user.about.avatar = {
          public_id: myCloud.public_id,
          url: myCloud.secure_url,
        };
      }
    }
// after all changes save it
    await user.save();

    res.status(200).json({
      success: true,
      message: "User Updated Successfully",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const addTimeline = async (req, res) => {
  try {
    const { title, description, date } = req.body;

    const user = await User.findById(req.user._id);
// hear timeline is an arr so use unshift
    user.timeline.unshift({
      title,
      description,
      date,
    });

    await user.save();

    res.status(200).json({
      success: true,
      message: "Added To Timline",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const addYoutube = async (req, res) => {
  try {
    const { url, title, image } = req.body;

    const user = await User.findById(req.user._id);

    const myCloud = await cloudinary.v2.uploader.upload(image, {
      folder: "portfolio",
    });
    user.youtube.unshift({
      url,
      title,
      image: {
        public_id: myCloud.public_id,
        url: myCloud.secure_url,
      },
    });

    await user.save();

    res.status(200).json({
      success: true,
      message: "Added To Youtube Videos",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const addProject = async (req, res) => {
  try {
    const { url, title, image, description, techStack } = req.body;

    const user = await User.findById(req.user._id);

    const myCloud = await cloudinary.v2.uploader.upload(image, {
      folder: "portfolio",
    });
    user.projects.unshift({
      url,
      title,
      description,
      techStack,
      image: {
        public_id: myCloud.public_id,
        url: myCloud.secure_url,
      },
    });

    await user.save();

    res.status(200).json({
      success: true,
      message: "Added To Projects",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteTimeline = async (req, res) => {
  try {
    const { id } = req.params; // it mean req.params.id

    const user = await User.findById(req.user._id);
// 1st assume user.timeline is  equal to an arr and hear use arr.filter method , which item.id not match removed from the list . now store it on user.timeline 
    user.timeline = user.timeline.filter((item) => item._id != id);

    await user.save();

    res.status(200).json({
      success: true,
      message: "Deleted from Timline",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteYoutube = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findById(req.user._id);

    const video = user.youtube.find((video) => video._id == id);
//*  after find through id destroy the video image id
    await cloudinary.v2.uploader.destroy(video.image.public_id);

    user.youtube = user.youtube.filter((video) => video._id != id);

    await user.save();

    res.status(200).json({
      success: true,
      message: "Deleted from Youtube",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteProject = async (req, res) => {
  try {
    const { id } = req.params; // head also find through id

    const user = await User.findById(req.user._id);

    const project = user.projects.find((item) => item._id == id);

    await cloudinary.v2.uploader.destroy(project.image.public_id);

    user.projects = user.projects.filter((item) => item._id != id);

    await user.save();

    res.status(200).json({
      success: true,
      message: "Deleted from Projects",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
