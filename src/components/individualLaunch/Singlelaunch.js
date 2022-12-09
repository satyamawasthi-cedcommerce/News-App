import { useParams } from "react-router-dom";
import "./Singlelaunch.css";
import moment from "moment";
import { useQuery } from "react-query";
import { fetchLaunches } from "../../queryHook";
import { Spinner } from "@shopify/polaris";
function Singlelaunch() {
  const { id } = useParams();
  const { data, status } = useQuery(id, fetchLaunches);
  return (
    <section className="single-card-wrapper">
      {status === "loading" && <span className="loading"><Spinner size="large"/></span>}
      {status === "error" && (
        <>
          <p>Error</p>
        </>
      )}
      {status === "success" && (
        <div className="single-card">
          <h3>{data?.mission_name}</h3>
          <img src={data?.links?.mission_patch} alt="flight_launch" />
          <p>{data?.details}</p>
          <div className="single-card__launch-details">
            <p>{moment(data?.launch_date_local).format("MMMM D,YYYY")}</p>
            <a href="/#">#{data?.launch_site?.site_name}</a>
          </div>
        </div>
      )}
    </section>
  );
}

export default Singlelaunch;
