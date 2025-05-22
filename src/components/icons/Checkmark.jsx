import React from "react";

const Checkmark = ({ width, height, color }) => {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clip-path="url(#clip0_1296_2717)">
        <path
          d="M18.3334 9.23306V9.99972C18.3324 11.7967 17.7505 13.5453 16.6745 14.9846C15.5986 16.4239 14.0862 17.4768 12.3629 17.9863C10.6396 18.4958 8.7978 18.4346 7.11214 17.8119C5.42648 17.1891 3.98729 16.0381 3.00922 14.5306C2.03114 13.0231 1.56657 11.2398 1.68481 9.44665C1.80305 7.65353 2.49775 5.94666 3.66531 4.58062C4.83288 3.21457 6.41074 2.26254 8.16357 1.86651C9.91641 1.47048 11.7503 1.65167 13.3918 2.38306"
          stroke="#1EA5FC"
          stroke-width="1.66667"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M18.3333 3.3335L10 11.6752L7.5 9.17516"
          stroke="#1EA5FC"
          stroke-width="1.66667"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_1296_2717">
          <rect width="20" height="20" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};

Checkmark.defaultProps = {
  width: "24",
  height: "24",
  color: "black",
};

export default Checkmark;
