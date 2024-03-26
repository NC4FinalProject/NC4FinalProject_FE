import React from "react";
import Button from "@mui/material/Button";
import CoTypography from "./CoTypography";

const CoHoverButton = ({ onClick, children, style, variant, size }) => (
  <Button
    onMouseOver={(e) => {
      e.currentTarget.style.color = "#558BCF";
      e.currentTarget.style.borderColor = "#558BCF";
    }}
    onMouseOut={(e) => {
      e.currentTarget.style.color = "black";
      e.currentTarget.style.borderColor = "black";
    }}
    onClick={onClick}
    sx={{
      color: "black",
      borderColor: "black",
      "&:hover": { color: "primary", borderColor: "primary" },
    }}
    style={style}
    variant={variant}
    size={size}
  >
    <CoTypography size="Content">{children}</CoTypography>
  </Button>
);

export default CoHoverButton;