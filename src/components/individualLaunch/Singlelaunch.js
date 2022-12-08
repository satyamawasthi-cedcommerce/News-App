import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./Singlelaunch.css";
import moment from "moment";
function Singlelaunch() {
  const { id } = useParams();
  const [individualDetails, setIndividualDetails] = useState({});
  useEffect(() => {
    fetch(`https://api.spacexdata.com/v3/launches/${id}`)
      .then((res) => res.json())
      .then((fetchedData) => {
        setIndividualDetails(fetchedData);
      });
  }, [id]);
  return (
    <section className="single-card-wrapper">
      <div className="single-card">
        <h3>{individualDetails?.mission_name}</h3>
        <img
          src={individualDetails?.links?.mission_patch}
          alt="flight_launch"
        />
        <p>{individualDetails?.details}</p>
        <div className="single-card__launch-details">
          <p>
            {moment(individualDetails?.launch_date_local).format("MMMM D,YYYY")}
          </p>
          <a href="/#">#{individualDetails?.launch_site?.site_name}</a>
        </div>
      </div>
    </section>
  );
}

export default Singlelaunch;
