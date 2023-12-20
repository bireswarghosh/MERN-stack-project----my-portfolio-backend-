// import React from "react";
// import Timeline from "@mui/lab/Timeline";
// import TimelineItem from "@mui/lab/TimelineItem";
// import TimelineSeparator from "@mui/lab/TimelineSeparator";
// import TimelineConnector from "@mui/lab/TimelineConnector";
// import TimelineContent from "@mui/lab/TimelineContent";
// import TimelineOppositeContent from "@mui/lab/TimelineOppositeContent";
// import TimelineDot from "@mui/lab/TimelineDot";
// import { Event } from "@mui/icons-material";
// import Typography from "@mui/material/Typography";

// // hear i assume timelines is an empty arr
// const TimeLine = ({ timelines = [] }) => {
//   return (
//     <div>
//       <Timeline position="alternate">
//         {/* //!! hear i want to add direct link of project   . if i want to use {""} i think then it will be work*/}

//         {/* position="alternate" mean  option1 left side , option2 right side , option3 left side , option4 right side etc */}
//         {timelines.map((item, index) => (
//           <TimelineItem key={index}>
//             <TimelineOppositeContent
//               sx={{ m: "auto 0" }}
//               align="right"
//               variant="body2"
//               color="text.secondary"
//             >
//               {item.date.toString().split("T")[0]}
//             </TimelineOppositeContent> {/* this is go every opposite side  */}
//             <TimelineSeparator/>
//               <TimelineConnector /> {/*  using this connector it connect every dot      */}
//               <TimelineDot>
//                 <Event /> {/* add event icon img where dot is exist      */}
//               </TimelineDot>
//               <TimelineConnector /> {/* it`s go every 2nd opposite site  */}
//             <TimelineContent sx={{ py: "12px", px: 2 }}>
//               <Typography variant="h6">{item.title}</Typography>
//               <Typography>{item.description}</Typography>
//             </TimelineContent>
//           </TimelineItem>
//         ))}
//       </Timeline>
//     </div>
//   );
// };

// export default TimeLine;








import React from "react";
import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineOppositeContent from "@mui/lab/TimelineOppositeContent";
import TimelineDot from "@mui/lab/TimelineDot";
import { Event } from "@mui/icons-material";
import Typography from "@mui/material/Typography";

const TimeLine = ({ timelines = [] }) => {
  return (
    <div>
      <Timeline position="alternate">
        {timelines.map((item, index) => (
          <TimelineItem key={index}>
            <TimelineOppositeContent
              sx={{ m: "auto 0" }}
              align="right"
              variant="body2"
              color="text.secondary"
            >
              {item.date.toString().split("T")[0]}
            </TimelineOppositeContent>

            <TimelineSeparator>
              <TimelineConnector />
              <TimelineDot>
                <Event />
              </TimelineDot>
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent sx={{ py: "12px", px: 2 }}>
              <Typography variant="h6">{item.title}</Typography>
              <Typography>{item.description}</Typography>
            </TimelineContent>
          </TimelineItem>
        ))}
      </Timeline>
    </div>
  );
};

export default TimeLine;
