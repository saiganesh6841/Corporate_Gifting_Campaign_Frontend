const RoomLogo = ({ color, roomLogo }) => {
  return (
    <>
      <div
        style={{
          padding: "16px",
          borderRadius: "8px",
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
    </>
  );
};
export default RoomLogo;
