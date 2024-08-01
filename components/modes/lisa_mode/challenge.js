import { useState } from 'react';
import axios from 'axios';

export default function Challenge({ ip }){
    
    const [gen_status, setStatus] = useState("");
    
    function convertIP(inputString) {
      const ipPattern = /(25[0-5]|2[0-4][0-9]|[0-1]?[0-9]{1,2})\.(25[0-5]|2[0-4][0-9]|[0-1]?[0-9]{1,2})\.(25[0-5]|2[0-4][0-9]|[0-1]?[0-9]{1,2})\.(25[0-5]|2[0-4][0-9]|[0-1]?[0-9]{1,2})/g;
  
      return inputString?.replace(ipPattern, (match) => {
          const transformedIp = match.replace(/\./g, '-');
          return `https://${transformedIp}.respawn.flask.avidia.in/proxy/5000`;
      });
    }
    
    return(
        <>
<div className="d-flex align-items-center vertical-center my-3">
  <div className="container">
    <div className="row">
      <div className="col">
        <h1 style={{"color":"white"}}>Challenge AI</h1>
       </div>
    </div>
    <div className="row my-3">
        <h6 style={{"color":"orange"}}>
          V2.69<br/>{gen_status === "" ? (<p>Note: Please run "start" command in cloud lab before submitting solution.</p>): gen_status}
        </h6>
    </div>
    <div className="row my-3">
      <p className="lead" style={{"color":"white"}}>
          Click on the button to get a challenge
      </p>
    </div>
    <div className="row mx-3">
      <div className="col">
        <div className="text-center my-3">
        <button type="button" className="btn btn-warning btn-rounded mx-3">
          Challenge me!
        </button>
        </div>
        <div className="text-center my-3">
        <button type="button" className="btn btn-success btn-rounded mx-3" onClick={async () => {
          const url = convertIP(ip);
          const r = await axios.get(`${url}/read`);
          console.log(r);
        }}>
          Submit solution
        </button>
        </div>
       </div>
    </div>
  </div>
</div>
        </>
        )
}