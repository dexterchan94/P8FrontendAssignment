export const labelStyles = {
  color: "var(--color-secondary)",
  fontSize: "0.7rem",
};

export const sliderStyles = {
  "& .MuiSlider-thumb": {
    backgroundColor: "#fff",
    border: "1px solid currentColor",
  },
  "& .MuiSlider-track": {
    height: "3px",
  },
  "& .MuiSlider-rail": {
    height: "2px",
    backgroundColor: "#bfbfbf",
  },
  "& .MuiSlider-mark": {
    display: "none",
  },
  "& .MuiSlider-markLabel": {
    color: "var(--color-secondary)",
    fontSize: "0.7rem",
    top: "22px",
  },
  "& .MuiSlider-markLabel[data-index='0']": {
    transform: "translateX(0)",
  },
  "& .MuiSlider-markLabel[data-index='1']": {
    transform: "translateX(-100%)",
  },
};
