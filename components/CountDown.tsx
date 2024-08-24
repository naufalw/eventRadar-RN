import { useEffect, useState } from "react";
import { Text } from "react-native";

const CountDown = ({duration} : {duration:any}) => {
    // Initial time in seconds (1 hour)
    // const timeEvent =  new Date("Aug 25, 2024 00:45:00");
    // const initialTime = timeEvent.getTime() - Date.now();
    const initialTime= duration
    const [timeRemaining, setTimeRemaining] = useState(initialTime);
  
    useEffect(() => {
      const timerInterval = setInterval(() => {
        setTimeRemaining((prevTime:number) => {
          if (prevTime === 0) {
            clearInterval(timerInterval);
            return 0;
          } else {
            return prevTime - 1;
          }
        });
      }, 1000);
  
      // Cleanup the interval when the component unmounts
      return () => clearInterval(timerInterval);
    }, []); // The empty dependency array ensures the effect runs only once on mount
  
    // Convert seconds to hours, minutes, and seconds
    const hours = Math.floor(timeRemaining / 3600);
    const minutes = Math.floor((timeRemaining % 3600) / 60);
    const seconds = timeRemaining % 60;
  
    return (
        <Text style={{ fontSize: 40, fontWeight: 800, textAlign:"center", width:"100%" }}>
          {hours < 10 ? "0"+hours : hours} : {minutes< 10 ? "0"+minutes: minutes} : {seconds < 10 ? "0"+seconds : seconds}
        </Text>
      );
  };
  

export default CountDown;
