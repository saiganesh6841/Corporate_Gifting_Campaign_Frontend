import { Stack } from "@fluentui/react";
import { Persona } from "@fluentui/react-components";
import { CommentNote20Regular } from "@fluentui/react-icons";
import { Box } from "@mui/material";
import Typography from "../../../../../components/Text/Typogarphy";
import utilController from "../../../../../utils/Utilcontroller";

const ImageCard = ({ classes, data }) => {
  console.log(data, "data");
  return (
    <>
      <Box className="box_container" sx={{ padding: "10px" }}>
        <Box className={`${classes.spaceBetween} ${classes.boxShow}`}>
          <Persona
            name={data?.workerName}
            size="medium"
            avatar={{
              image: {
                src: data?.workerImage,
              },
            }}
            textAlignment="center"
            className="persona-avatar"
            // presenceOnly={false}
          />
          <Stack horizontal gap={3}>
            <CommentNote20Regular />
            <span>{data?.chatCount}</span>
          </Stack>
        </Box>
        <Box
          sx={{
            position: "relative",
            overflow: "hidden",
            borderRadius: "6px",
            margin: "4px 0px",
          }}
        >
          <img
            src={data?.roomImages?.[0]?.url}
            height="170px"
            width="100%"
            style={{ objectFit: "cover", borderRadius: "6px" }}
            alt="Room"
          />
          <Box className={classes.imageCount}>{data?.roomImages?.length}+</Box>
        </Box>
        {data?.latestChat?.message && (
          <Box className={classes.boxShow}>{data?.latestChat?.message}</Box>
        )}

        <Typography style={{ display: "flex", justifyContent: "end" }}>
          {utilController.getDate(data?.entryDate)}
        </Typography>
      </Box>
    </>
  );
};
export default ImageCard;
