import React, { useState, useEffect } from "react";

const CountdownTimer = ({ timeLeft, setTimeLeft }) => {
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timer); // Cleanup the timer on component unmount
  }, []);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
  };

  return (
    <div className="text-sm font-bold text-gray-800">
      {formatTime(timeLeft)}
    </div>
  );
};

export default CountdownTimer;
