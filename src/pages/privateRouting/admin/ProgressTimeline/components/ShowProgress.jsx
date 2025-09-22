// import React, { useRef, useEffect } from "react";
// import { ChevronRight24Regular } from "@fluentui/react-icons";
// import ImageCoursel from "./ImageCoursel";
// import Typography from "../../../../../components/Text/Typogarphy";
// import utilController from "../../../../../utils/Utilcontroller";

// const ShowProgress = ({
//   classes,
//   progressData = {},
//   setUserForm,
//   userForm,
// }) => {
//   const scrollRef = useRef(null);
//   const scrollInnerRef = useRef(null);
//   const [lineWidth, setLineWidth] = React.useState(0);

//   const data = progressData?.rows ?? [];

//   //   useEffect(() => {
//   //     if (scrollInnerRef.current) {
//   //       setLineWidth(scrollInnerRef.current.scrollWidth);
//   //     }
//   //   }, [data]);
//   useEffect(() => {
//     if (scrollInnerRef.current && scrollRef.current) {
//       const contentWidth = scrollInnerRef.current.scrollWidth;
//       const containerWidth = scrollRef.current.offsetWidth;
//       setLineWidth(Math.max(contentWidth, containerWidth));
//     }
//   }, [data]);

//   if (!data || data.length === 0) {
//     return (
//       <div style={{ padding: "20px" }}>
//         <Typography variant="subHeading">No Data Found</Typography>
//       </div>
//     );
//   }

//   return (
//     <div style={{ padding: "20px" }}>
//       <div
//         ref={scrollRef}
//         style={{
//           position: "relative",
//           //   overflowX: "auto",
//           overflowX: "auto",
//           padding: "20px 0",
//           scrollbarWidth: "none",
//           //   height: "100%",
//           //   width: data?.length < 3 ? "100%" : "max-content",
//         }}
//       >
//         <div
//           ref={scrollInnerRef}
//           style={{
//             display: "flex",
//             gap: "40px",
//             position: "relative",
//             minWidth: "max-content",
//           }}
//         >
//           {/* Timeline Line */}
//           <div
//             style={{
//               position: "absolute",
//               top: "50%",
//               height: "2px",
//               backgroundColor: "#ccc",
//               zIndex: 0,
//               width: `${lineWidth}px`,
//               border: "4px solid",
//               borderImageSource:
//                 "linear-gradient(90deg, #C4E8C4 0%, #E8C6C4 22%, #E8E4C4 46.5%, #C4E8E3 74%, #C4C8E8 100%)",
//               borderImageSlice: 1,
//             }}
//           />

//           {/* Initial Dot */}
//           <div
//             style={{
//               position: "relative",
//               minWidth: "15px",
//               display: "flex",
//               alignItems: "center",
//               justifyContent: "center",
//             }}
//           >
//             <div
//               style={{
//                 position: "absolute",
//                 top: "51%",
//                 width: "13px",
//                 height: "13px",
//                 backgroundColor: "#41080c",
//                 borderRadius: "50%",
//                 transform: "translateY(-50%)",
//                 zIndex: 1,
//               }}
//             />
//             <div
//               style={{
//                 marginTop: "61px",
//                 marginRight: "-50px",
//                 textAlign: "center",
//                 fontSize: "12px",
//                 color: "#666",
//               }}
//             >
//               <Typography variant="content">
//                 {utilController.getDate(progressData?.createdOn)}
//               </Typography>
//               <div style={{ fontSize: "12px", color: "gray" }}>Created On</div>
//             </div>
//           </div>

//           {/* Timeline Items */}
//           {data.map((item, index) => {
//             const isTop = index % 2 === 0;
//             return (
//               <div
//                 key={item._id || index}
//                 style={{
//                   position: "relative",
//                   minWidth: "180px",
//                   display: "flex",
//                   flexDirection: "column",
//                   alignItems: "center",
//                   zIndex: 1,
//                 }}
//               >
//                 {isTop && (
//                   <div
//                     style={{
//                       marginBottom: "220px",
//                       borderRadius: "6px",
//                       width: "160px",
//                       padding: "10px",
//                     }}
//                   >
//                     <ImageCoursel classes={classes} images={item?.roomImages} />
//                     <Typography variant="subHeading">
//                       Note: {item.notes}
//                     </Typography>
//                     <div style={{ fontSize: "12px", color: "gray" }}>
//                       Uploaded date
//                     </div>
//                     <Typography variant="content">
//                       {utilController.getDate(item?.uploadedDate)}
//                     </Typography>
//                   </div>
//                 )}

//                 <div
//                   style={{
//                     position: "absolute",
//                     top: "51%",
//                     width: "13px",
//                     height: "13px",
//                     backgroundColor: "#561E1E",
//                     borderRadius: "50%",
//                     transform: "translateY(-50%)",
//                     zIndex: 1,
//                   }}
//                 />

//                 {!isTop && (
//                   <div
//                     style={{
//                       marginTop: "300px",
//                       borderRadius: "6px",
//                       width: "160px",
//                       padding: "10px",
//                       textAlign: "left",
//                     }}
//                   >
//                     <div style={{ fontSize: "12px", color: "gray" }}>
//                       Uploaded date
//                     </div>
//                     <Typography variant="content" style={{ display: "block" }}>
//                       {utilController.getDate(item?.uploadedDate)}
//                     </Typography>
//                     <Typography variant="content">
//                       Note: {item.notes}
//                     </Typography>
//                     <ImageCoursel classes={classes} images={item?.roomImages} />
//                   </div>
//                 )}
//               </div>
//             );
//           })}

//           {/* Load More Button */}
//           {data.length < (progressData?.filterRecords ?? 0) && (
//             <div
//               style={{
//                 position: "relative",
//                 minWidth: "50px",
//                 display: "flex",
//                 flexDirection: "column",
//                 alignItems: "center",
//                 justifyContent: "flex-start",
//                 zIndex: 1,
//               }}
//             >
//               <div
//                 style={{
//                   backgroundColor: "#fde8e8",
//                   color: "#000",
//                   fontSize: "14px",
//                   padding: "4px 10px",
//                   borderRadius: "10px",
//                   marginBottom: "10px",
//                   marginTop: "120px",
//                 }}
//               >
//                 {Math.max(0, (progressData?.filterRecords ?? 0) - data.length)}+
//                 more
//               </div>

//               <div
//                 style={{
//                   position: "absolute",
//                   top: "50%",
//                   width: "25px",
//                   height: "25px",
//                   backgroundColor: "#41080c",
//                   borderRadius: "50%",
//                   transform: "translateY(-50%)",
//                   display: "flex",
//                   alignItems: "center",
//                   justifyContent: "center",
//                   cursor: "pointer",
//                 }}
//                 onClick={() => {
//                   const nextPage = (userForm?.page ?? 1) + 1;
//                   setUserForm((prev) => ({
//                     ...prev,
//                     page: nextPage,
//                   }));
//                 }}
//               >
//                 <ChevronRight24Regular style={{ color: "#fff" }} />
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ShowProgress;

import React, { useRef, useEffect, useState } from "react";
import { ChevronRight24Regular } from "@fluentui/react-icons";
import ImageCoursel from "./ImageCoursel";
import Typography from "../../../../../components/Text/Typogarphy";
import utilController from "../../../../../utils/Utilcontroller";

const ShowProgress = ({
  classes,
  progressData = {},
  setUserForm,
  userForm,
}) => {
  const scrollRef = useRef(null);
  const scrollInnerRef = useRef(null);
  const [lineWidth, setLineWidth] = useState(0);
  const data = progressData?.rows ?? [];

  //   const styleProps = { lineWidth };
  //   const classes = useStyles(styleProps); // Pass dynamic width to styles

  useEffect(() => {
    if (scrollInnerRef.current && scrollRef.current) {
      const contentWidth = scrollInnerRef.current.scrollWidth;
      const containerWidth = scrollRef.current.offsetWidth;
      setLineWidth(Math.max(contentWidth, containerWidth));
    }
  }, [data]);

  if (!data || data.length === 0 || !userForm?.projectId) {
    return (
      <div style={{ textAlign: "center" }}>
        <Typography variant="heading">No Data Found</Typography>
      </div>
    );
  }

  return (
    <div style={{ padding: "20px" }}>
      <div ref={scrollRef} className={classes.scrollContainer}>
        <div ref={scrollInnerRef} className={classes.scrollInner}>
          <div
            style={{
              position: "absolute",
              top: "50%",
              height: "2px",
              backgroundColor: "#ccc",
              zIndex: 0,
              width: `${lineWidth}px`,
              border: "4px solid",
              borderImageSource:
                "linear-gradient(90deg, #C4E8C4 0%, #E8C6C4 22%, #E8E4C4 46.5%, #C4E8E3 74%, #C4C8E8 100%)",
              borderImageSlice: 1,
            }}
          />

          {/* Initial Dot */}
          <div className={classes.dotWrapper}>
            <div className={classes.initialDot} />
            <div className={classes.createdText}>
              <Typography variant="content">
                {utilController.getDate(progressData?.createdOn)}
              </Typography>
              <div style={{ fontSize: "12px", color: "gray" }}>Created On</div>
            </div>
          </div>

          {/* Timeline Items */}
          {data.map((item, index) => {
            const isTop = index % 2 === 0;
            return (
              <div key={item._id || index} className={classes.itemWrapper}>
                {isTop && (
                  <div className={classes.contentTop}>
                    {item?.roomImages?.length > 0 && (
                      <ImageCoursel
                        classes={classes}
                        images={item?.roomImages}
                      />
                    )}
                    <Typography variant="subHeading">
                      Note: {item.notes}
                    </Typography>
                    <div style={{ fontSize: "12px", color: "gray" }}>
                      Uploaded date
                    </div>
                    <Typography variant="content">
                      {utilController.getDate(item?.uploadedDate)}
                    </Typography>
                  </div>
                )}

                <div className={classes.timelineDot} />

                {!isTop && (
                  <div className={classes.contentBottom}>
                    <div style={{ fontSize: "12px", color: "gray" }}>
                      Uploaded date
                    </div>
                    <Typography variant="content" style={{ display: "block" }}>
                      {utilController.getDate(item?.uploadedDate)}
                    </Typography>
                    <Typography variant="content">
                      Note: {item.notes}
                    </Typography>
                    {item?.roomImages?.length > 0 && (
                      <ImageCoursel
                        classes={classes}
                        images={item?.roomImages}
                      />
                    )}
                  </div>
                )}
              </div>
            );
          })}

          {/* Load More Button */}
          {data.length < (progressData?.filterRecords ?? 0) && (
            <div className={classes.loadMoreWrapper}>
              <div className={classes.moreCount}>
                {Math.max(0, (progressData?.filterRecords ?? 0) - data.length)}+
                more
              </div>
              <div
                className={classes.loadMoreBtn}
                onClick={() => {
                  const nextPage = (userForm?.page ?? 1) + 1;
                  setUserForm((prev) => ({
                    ...prev,
                    page: nextPage,
                  }));
                }}
              >
                <ChevronRight24Regular style={{ color: "#fff" }} />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ShowProgress;
