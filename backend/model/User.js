import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: String,
  email: {
    type: String,
    unique: true,
    required: [true, "Please Enter Email"], // if anyone  forgot to enter email so this err massage will be send ---> "Please Enter Email"
  },
  password: {
    type: String,
    required: [true, "Please Enter Password"],
    select: false,
  },

  timeline: [
    {
      title: String,
      description: String,
      date: Date,
    },
  ],

  skills: { // in skill have 6 img so crate it 6 times
    image1: {
      public_id: String,
      url: String,
    },

    image2: {
      public_id: String,
      url: String,
    },
    image3: {
      public_id: String,
      url: String,
    },
    image4: {
      public_id: String,
      url: String,
    },
    image5: {
      public_id: String,
      url: String,
    },
    image6: {
      public_id: String,
      url: String,
    },
  },

  youtube: [ 
    {
      url: String,
      title: String,
      image: {
        public_id: String,
        url: String,
      },
    },
  ],

  projects: [ // this all come from frontend\src\components\Projects\Projects.jsx line 10-15
    {
      url: String,
      title: String,
      image: {
        public_id: String,
        url: String,
      },
      description: String,
      techStack: String,
    },
  ],

  about: { // this is come from about page in backend frontend\src\components\About\About.jsx
    name: String,
    title: String,
    subtitle: String,
    description: String,
    quote: String,
    avatar: {
      public_id: String,
      url: String,
    },
  },
});

export const User = mongoose.model("User", userSchema);
