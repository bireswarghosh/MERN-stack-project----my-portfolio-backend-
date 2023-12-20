import React, { useState, useEffect } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { addYoutube, getUser } from "../../actions/user";
import { MdKeyboardBackspace } from "react-icons/md";
import { Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import YoutubeCard from "../YoutubeCard/YoutubeCard";

const Youtube = () => {
  const { message, error, loading } = useSelector((state) => state.update); // when i update  my img and url then show me updated alert massage via  useAlert(); and loading ,err massage for this massage come from this line so use this lne 
  const { message: loginMessage } = useSelector((state) => state.login); // if i don`t login an access this youtube page then show me an alert massage that not login .  so to access the login massage in use this line 

  const { user } = useSelector((state) => state.user); // mean go to frontend\src\reducers\user.js line 12 it`s give all data about user which show everyone

  const dispatch = useDispatch();
  const alert = useAlert();

  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [image, setImage] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();
    await dispatch(addYoutube(title, url, image));
    dispatch(getUser());
  };
// ! this  fun occur when  file like image uploaded for more details --> This code is a part of a React application. It is a file upload component that allows the user to select an image and display it on the screen. The `handleImage` function is called when the user selects an image. It reads the image file and converts it to a data URL. The data URL is then set as the value of the `image` state variable, which causes the image to be displayed on the screen.
  const handleImage = (e) => {
    const file = e.target.files[0]; // file targeted it`s 0 th index
    const Reader = new FileReader(); // then crate a new FileReader which work is to render the file 

    Reader.readAsDataURL(file); // this img crate a url and read it via url

    Reader.onload = () => { // then load the img 
      if (Reader.readyState === 2) { // if all ok 
        setImage(Reader.result);// then set it 
      }
    };
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch({ type: "CLEAR_ERRORS" });
    }
    if (message) {
      alert.success(message);
      dispatch({ type: "CLEAR_MESSAGE" });
    }
    if (loginMessage) {
      alert.success(loginMessage);
      dispatch({ type: "CLEAR_MESSAGE" });
    }
  }, [alert, error, message, dispatch, loginMessage]);

  return (
    <div className="adminPanel">
      <div className="adminPanelContainer">
        <Typography variant="h4">
          <p>A</p>
          <p>D</p>
          <p>M</p>
          <p>I</p>
          <p style={{ marginRight: "1vmax" }}>N</p>

          <p>P</p>
          <p>A</p>
          <p>N</p>
          <p>E</p>
          <p>L</p>
        </Typography>

        <form onSubmit={submitHandler}>
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="adminPanelInputs"
          />
          <input
            type="text"
            placeholder="Link"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="adminPanelInputs"
          />
          <input
            type="file"
            onChange={handleImage}
            className="adminPanelFileUpload"
            accept="image/*"
          />

          <Link to="/account">
            BACK <MdKeyboardBackspace />
          </Link>

          <Button type="submit" variant="contained" disabled={loading}>
            Add
          </Button>
        </form> 

        <div className="adminPanelYoutubeVideos">
          {user &&
            user.youtube &&
            user.youtube.map((item) => ( // if user exist then check user.youtube exist then go user.youtube.map              . //! ok, in .map fun if you use ()=>{} then to print anything so use return  other wise you pass practices mean which i use in this fun  so don`t need return you directly write in 1st becket() which you print  
              <YoutubeCard
                key={item._id}
                url={item.url}
                title={item.title}
                image={item.image.url}
                isAdmin={true} // hear admin is true so  access to delate  . the delate part exist on frontend\src\components\YoutubeCard\YoutubeCard.jsx\27-38
                id={item._id}
              />
            ))}
        </div>
      </div>
    </div>
    
  );
};

export default Youtube;
