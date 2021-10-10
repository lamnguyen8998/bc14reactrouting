import React from "react";
import Button from "@mui/material/Button";
import userStyle from "../../../style";

export default function MaterialPage() {
  const classes = userStyle();

  return (
    <div className={classes.content}>
      <h3 className={classes.title}>MaterialPage</h3>
      <Button variant="contained"> Contained</Button>
      <Button variant="contained" color="success">
        Contained
      </Button>
    </div>
  );
}
