import { Stack } from "@fluentui/react";
import Backdrop from "@mui/material/Backdrop";
import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { handleCloseLoading } from "../../Redux/LoadingSlice";
import { image } from "../../images/image";
import Typography from "../Text/Typography";

export default function BackdropComponent() {
  const { isOpen } = useSelector((state) => state?.isOpen);
  const dispatch = useDispatch();
  // const attachment = [
  //   {
  //     url: image.loading1,
  //   },
  //   {
  //     url: image.loading2,
  //   },
  //   {
  //     url: image.loading3,
  //   },
  //   {
  //     url: image.loading4,
  //   },
  // ];
  const timeoutRef = React.useRef(null);
  const [index, setIndex] = React.useState(0);
  const delay = 1500;

  function resetTimeout() {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  }

  // React.useEffect(() => {
  //   resetTimeout();
  //   timeoutRef.current = setTimeout(
  //     () =>
  //       setIndex((prevIndex) =>
  //         prevIndex === attachment.length - 1 ? 0 : prevIndex + 1
  //       ),
  //     delay
  //   );

  //   return () => {
  //     resetTimeout();
  //   };
  // }, [index]);

  return (
    <div>
      <Backdrop
        className="flyden__backdrop"
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isOpen}
        // open={true}
        onClick={() => {
          dispatch(handleCloseLoading());
          resetTimeout();
        }}
      >
        <Stack horizontalAlign="center">
          <Stack
            style={{
              width: "130px",
              height: "130px",
              borderRadius: "100%",
              background: "white",
              justifyContent: "center",
              alignItems: "center",
              overflow: "hidden",
            }}
          ></Stack>

          <Typography
            variant={"heading"}
            style={{ color: "white", marginTop: "8px" }}
          >
            Loading Please Wait...
          </Typography>
        </Stack>
      </Backdrop>
    </div>
  );
}
