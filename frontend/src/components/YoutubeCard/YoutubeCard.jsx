// import { Button, Typography } from "@mui/material";
// import React from "react";
// import { FaTrash } from "react-icons/fa";
// import { useDispatch } from "react-redux";
// import { deleteYoutube, getUser } from "../../actions/user";
// import "./YoutubeCard.css";
// const YoutubeCard = ({
//   url = "https://youtube.com/",
//   title = "Title Here",
//   image,
//   isAdmin = false,// hear isAdmin by default flash other wise any one come and delate my video 
//   id,
// }) => {
//   const dispatch = useDispatch();
// // hear delate part 
//   const deleteHandler = async (id) => {
//     await dispatch(deleteYoutube(id));
//     dispatch(getUser());
//   };

//   return (
//     <div className="youtubeCard">
//       <a href={url} target="blank">
//         <img src={image} alt="Video" />
//         <Typography>{title}</Typography>
//       </a>
//       {isAdmin && ( // hear  isAdmin = true so work the delate button. so hear //! if  isAdmin is true mean it give access like admin mean  access frontend\src\components\Admin\Youtube.jsx this page also , so  doing  isAdmin is true i give both page access to delate video  . one is  --> frontend\src\components\YoutubeCard\YoutubeCard.jsx  and another is frontend\src\components\Admin\Youtube.jsx
//         <Button
//           style={{
//             margin: "auto",
//             display: "block",
//             color: "rgba(40,40,40,0.7)",
//           }}
//           onClick={() => deleteHandler(id)}
//         >
//           <FaTrash />
//         </Button>
//       )}
//     </div>
//   );
// };

// export default YoutubeCard;









import { Button, Typography } from "@mui/material";
import React from "react";
import { FaTrash } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { deleteYoutube, getUser } from "../../actions/user";
import "./YoutubeCard.css";
const YoutubeCard = ({
  url = "https://youtube.com/6packprogrammer",
  title = "Title Here",
  image,
  isAdmin = false,
  id,
}) => {
  const dispatch = useDispatch();

  const deleteHandler = async (id) => {
    await dispatch(deleteYoutube(id));
    dispatch(getUser());
  };

  return (
    <div className="youtubeCard">
      <a href={url} target="blank">
        <img src={image} alt="Video" />
        <Typography>{title}</Typography>
      </a>
      {isAdmin && (
        <Button
          style={{
            margin: "auto",
            display: "block",
            color: "rgba(40,40,40,0.7)",
          }}
          onClick={() => deleteHandler(id)}
        >
          <FaTrash />
        </Button>
      )}
    </div>
  );
};

export default YoutubeCard;

