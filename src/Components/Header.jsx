import { useState } from 'react';
import { MdKeyboardArrowRight } from "react-icons/md";
import { useLocation } from "react-router-dom";
import CheckInCheckOut from "./CheckInCheckOut";

const MyComponent = () => {
  const location = useLocation();
  const pathSegments = location.pathname.split("/").filter((segment) => segment !== "");

  const [isCheckInOutVisible, setIsCheckInOutVisible] = useState(false);

  return (
    <div className="flex">
      <div className="flex items-center space-x-2 px-5 py-3" style={{ width: "800px" }}>
        {pathSegments.map((segment, index) => (
          <div key={index} className="flex items-center gap-3">
            <span className="text-gray-700 text-sm" style={{ color: "#bfbfbf" }}>
              {segment.charAt(0).toUpperCase() + segment.slice(1)}
            </span>
            {index < pathSegments.length - 1 && <MdKeyboardArrowRight style={{ color: "#bfbfbf" }} />}
          </div>
        ))}
      </div>
      
      <div
        className="relative text-sm border border-gray-200 px-2 py-1 mt-2 mb-2 rounded hover:border-blue hover:cursor-pointer"
        style={{ left: "200px" }}
        onMouseOver={(e) => (e.target.style.border = "1px solid black")}
        onMouseOut={(e) => (e.target.style.border = "1px solid #e2e8f0")}
        onClick={() => setIsCheckInOutVisible(!isCheckInOutVisible)}
      >
        Check In / Check Out
      </div>
     
      {isCheckInOutVisible && (
 
    <CheckInCheckOut setIsCheckInOutVisible ={setIsCheckInOutVisible} />

)}



    </div>
  );
};

export default MyComponent;
