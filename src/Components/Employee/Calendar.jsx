import { useState } from "react";
import { Calendar } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

export default function HypeserverDatepicker() {
  const [date, setDate] = useState(new Date());

  function onChange(date) {
    setDate(date);
  }

  return (
    <div className="shadow-leave-count "> <Calendar date={date} onChange={onChange} /></div>
   
  )
  
 
}