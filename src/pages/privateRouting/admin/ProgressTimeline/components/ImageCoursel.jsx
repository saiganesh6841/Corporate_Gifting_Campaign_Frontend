import React, { useEffect, useState } from "react";

// const images = [
//   "https://th.bing.com/th/id/OIP.qrWkrZjoE_oPzcd4Htbl1wHaFj?w=89&h=90&c=1&rs=1&qlt=90&r=0&dpr=1.5&pid=InlineBlock",
//   "https://i.imgur.com/your-image2.jpg",
//   "https://th.bing.com/th/id/OIP.qrWkrZjoE_oPzcd4Htbl1wHaFj?w=89&h=90&c=1&rs=1&qlt=90&r=0&dpr=1.5&pid=InlineBlock",
//   "https://i.imgur.com/your-image4.jpg",
// ];

const ImageCoursel = ({ classes, images }) => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={classes.container}>
      {images.map((src, index) => (
        <img
          key={index}
          src={src?.url}
          alt={`carousel-${index}`}
          className={classes.image}
          style={{ opacity: current === index ? 1 : 0 }}
        />
      ))}

      <div className={classes.dotsContainer}>
        {images.map((_, index) => (
          <div
            key={index}
            className={`${classes.dot} ${
              current === index ? classes.activeDot : ""
            }`}
            onClick={() => setCurrent(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default ImageCoursel;
