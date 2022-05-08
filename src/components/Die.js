import React from "react";

export default function Die({ value, isHeld, holdDice }) {
  const styles = {
    backgroundColor: isHeld ? "#59E391" : "black",
    transition: "all .5s ease",
    boxShadow: isHeld
      ? "0px 0px 12px 2px hsla(177, 71%, 46%, 0.384)"
      : "0px 0px 12px -2px hsla(177, 71%, 46%, 0.384)",
  };
  return (
    <div className="die-face" style={styles} onClick={holdDice}>
      <img className="die-num" src={value} alt="die-number"></img>
    </div>
  );
}
