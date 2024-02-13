
import Clock from 'react-simple-clock';

const CheckInCheckOut = () => {
  return (
    
      <div style={{  position:"absolute",borderWidth: "5px", borderColor: "rgb(0, 10, 25)", backgroundColor: "rgba(2, 12, 15, 0.753)" ,borderRadius:"50%" }}> <Clock
        live={true}
        hourMarkFormat="number"
        mode="dark"
      /></div>
   
  );
};

export default CheckInCheckOut;
