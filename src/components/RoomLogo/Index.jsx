import Typography from "../Text/Typogarphy";

const RoomLogo = ({ color, roomLogo, roomName, onClick }) => {
  return (
    <div
      style={{ textAlign: "center", cursor: onClick ? "pointer" : "default" }}
      onClick={onClick}
    >
      <div
        style={{
          padding: "16px",
          borderRadius: "20px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "110px",
          height: "90px",
          position: "relative",
          backgroundColor: color || "#ffffff",
        }}
      >
        {roomLogo ? (
          <img
            src={roomLogo}
            alt="Logo Preview"
            style={{
              maxWidth: "100%",
              maxHeight: "100%",
              objectFit: "contain",
            }}
          />
        ) : (
          <span style={{ color: "#fff" }}>No Logo</span>
        )}
      </div>
      <Typography variant="subHeading" style={{ textAlign: "center" }}>
        {roomName}
      </Typography>
    </div>
  );
};
export default RoomLogo;
