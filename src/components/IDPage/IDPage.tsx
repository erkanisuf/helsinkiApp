import React, { useState, useEffect } from "react";
import { useLocation, useHistory, useParams } from "react-router-dom";
import { SvgContainer } from "../StyledComponents/Styles";
import SVGPageHeader from "../StyledComponents/SVGbackground/SVGPageHeader";
import LoadingIcon from "../StyledComponents/SvgIcons/LoadingIcon";
import Activities from "./Activities";
import Events from "./Events";
import Places from "./Places";
interface LocationState {
  id: string;
  type: string;
  pathname: string;
}
interface IDdata {
  id: string;
  name: { fi: string; en: string };
  info_url: string;
  location: {
    lat: number;
    lon: number;
    address: { street_address: string; postal_code: string; locality: string };
  };
  opening_hours: { hours: Hoursarr[]; openinghours_exception?: string };
  tags: Tags[];
}
interface Hoursarr {
  weekday_id: number;
  opens?: string;
  closes?: string;
  open24h?: boolean;
}
interface Tags {
  id: string;
  name: string;
}

interface ParamTypes {
  id: string;
}

const IDPage = () => {
  const location = useLocation<LocationState>();
  const { id } = useParams<ParamTypes>(); // param id
  const { state } = location;

  const [data, setData] = useState<IDdata | any>();
  const [error, setError] = useState<boolean>(false);
  const history = useHistory();

  useEffect(() => {
    const abortCont = new AbortController();
    // This is in case the link is copy pasted to new browser tab. Because it gives error this statment fixes the issue. The first Main If statment runs only when
    //LInk is copyu pasted to new browser thab , the second statment(else) runs in normal situation!
    if (!state) {
      console.log(id, "location");
      if (location.pathname.includes("placetoeat" || "allplaces")) {
        FetchById(
          `${process.env.REACT_APP_SERVER_URL}/api/Routs/PlacebyID/${id}`,
          abortCont.signal
        );
      } else if (location.pathname.includes("events")) {
        FetchById(
          `${process.env.REACT_APP_SERVER_URL}/api/Routs/eventID/${id}`,
          abortCont.signal
        );
      } else if (location.pathname.includes("activities")) {
        FetchById(
          `${process.env.REACT_APP_SERVER_URL}/api/Routs/activitybyID/${id}`,
          abortCont.signal
        );
      }
    } else {
      if (state.type === "allplaces" || state.type === "placetoeat") {
        FetchById(
          `${process.env.REACT_APP_SERVER_URL}/api/Routs/PlacebyID/${state.id}`,
          abortCont.signal
        );
      } else if (state.type === "events") {
        FetchById(
          `${process.env.REACT_APP_SERVER_URL}/api/Routs/eventID/${state.id}`,
          abortCont.signal
        );
      } else if (state.type === "activities") {
        FetchById(
          `${process.env.REACT_APP_SERVER_URL}/api/Routs/activitybyID/${state.id}`,
          abortCont.signal
        );
      }
    }

    return () => abortCont.abort();
  }, [location.pathname]);

  //Fetchs by ID
  const FetchById = (url: string, abort: any) => {
    fetch(url, { signal: abort })
      .then((el) => {
        return el.json();
      })
      .then((el) => {
        if (el.status === 500) {
          setError(true);
        } else {
          setData(el);
        }
      })

      .catch((err) => {
        if (err.name === "AbortError") {
          console.log("err ABORT");
        } else {
          setError(true);
        }
      });
  };

  const PageByType = () => {
    //Checks the Type of Object and then renders component for it
    switch (state.type) {
      case "allplaces":
        return <Places data={data} />;
      case "placetoeat":
        return <Places data={data} />;
      case "events":
        return <Events data={data} />;
      case "activities":
        return <Activities data={data} />;
      default:
        return (
          <SVGPageHeader>
            <h1 style={{ color: "red" }}>
              Something went wrong please refresh.
            </h1>
          </SVGPageHeader>
        );
    }
  };

  //BUG FIX: This one in cas elink is pasted to new tab . Otherwise it gives error and doesnt render . Function is same as the upper one
  const PageByTypeNewTab = () => {
    if (location.pathname.includes("placetoeat")) {
      return <Places data={data} />;
    } else if (location.pathname.includes("allplaces")) {
      <Events data={data} />;
    } else if (location.pathname.includes("events")) {
      <Events data={data} />;
    } else if (location.pathname.includes("activities")) {
      <Activities data={data} />;
    }
  };

  if (error) {
    return (
      <SVGPageHeader>
        <h1 style={{ color: "red" }}>Something went wrong please refresh.</h1>
      </SVGPageHeader>
    );
  } else if (!data) {
    return (
      <SVGPageHeader>
        <SvgContainer width={120} height={150} style={{ margin: "0 auto" }}>
          <LoadingIcon />
        </SvgContainer>
      </SVGPageHeader>
    );
  } else
    return (
      <SVGPageHeader>{state ? PageByType() : PageByTypeNewTab()}</SVGPageHeader>
    );
};

export default IDPage;
