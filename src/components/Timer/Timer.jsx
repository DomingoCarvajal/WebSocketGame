import React, { useState, useEffect } from 'react';

const Timer = ({ reset }) => {
  const [seconds, setSeconds] = useState(30);

  useEffect(() => {
    let timer = null;
  
    // Reset the timer to 30 seconds
    setSeconds(30);
  
    // Start the timer countdown
    timer = setInterval(() => {
      setSeconds((prevSeconds) => {
        if (prevSeconds === 0) {
          clearInterval(timer); // Stop the timer if it reaches 0
          return 0; // Keep it at 0
        } else {
          return prevSeconds - 1; // Decrement the seconds otherwise
        }
      });
    }, 1000);
  
    // Clear the timer when the component unmounts or when reset is false
    return () => clearInterval(timer);
  }, [reset]);

  return (
    <div className="timer">
       {seconds} 
    </div>
  );
};

export default Timer;
