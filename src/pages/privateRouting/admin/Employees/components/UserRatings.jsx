import { Grid } from "@mui/material";

import defaultProfileImage from "../../../../../assets/images/avatar_default.jpg";
import Typography from "../../../../../components/Text/Typography";
import { Star24Filled, Star24Regular } from "@fluentui/react-icons";
import { getDate } from "../utils/getDate";

function UserRatings({
  ratings,
  comment,
  createdRatingTime,
  name,
  profileImage,
}) {
  return (
    <Grid
      container
      style={{
        marginTop: "30px",
        padding: "16px",
      }}
    >
      <Grid xs={1}>
        <img
          alt="profile of user"
          style={{
            width: "45px",
            height: "45px",
            borderRadius: "50%",
          }}
          src={profileImage || defaultProfileImage}
        />
      </Grid>
      <Grid
        xs={3}
        sx={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Typography
          variant="heading"
          style={{ color: "#000000", fontWeight: "700" }}
        >
          {name}
        </Typography>
        <Typography
          variant="content"
          style={{
            color: "#959595",
          }}
        >
          {getDate(createdRatingTime)}
        </Typography>
      </Grid>
      <Grid
        xs={8}
        style={{
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        {[1, 2, 3, 4, 5]?.map((rating) => {
          if (rating <= ratings) {
            return (
              <Star24Filled
                style={{
                  color: "#FF8D00",
                }}
              />
            );
          } else {
            return <Star24Regular />;
          }
        })}
      </Grid>
      <Grid xs={12}>
        <Typography>{comment}</Typography>
      </Grid>
    </Grid>
  );
}

export default UserRatings;
