import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "./App.css";
import CarouselComp from "./components/StyledComponents/Carousel/Carousel";

import NavBar from "./components/StyledComponents/NavBar/NavBar";
import {
  CarouselContainer,
  SvgContainer,
} from "./components/StyledComponents/Styles";
import ActivitiesIcon from "./components/StyledComponents/SvgIcons/ActivitiesIcon";
import DinnerIcon from "./components/StyledComponents/SvgIcons/DinnerIcon";
import EventsIcon from "./components/StyledComponents/SvgIcons/EventsIcon";
import LoadingIcon from "./components/StyledComponents/SvgIcons/LoadingIcon";
import PlacesIcon from "./components/StyledComponents/SvgIcons/PlacesIcon";
import { useFetch } from "./Hook/useFetch";

function FrontPage() {
  // const res = useFetch("http://open-api.myhelsinki.fi/v1/places/?language_filter=en&limit=10")
  const places = useFetch(
    `${process.env.REACT_APP_SERVER_URL}/api/Routs/front10`
  ); //Places
  const events = useFetch(
    `${process.env.REACT_APP_SERVER_URL}/api/Routs/front10Events`
  ); //events
  const activities = useFetch(
    `${process.env.REACT_APP_SERVER_URL}/api/Routs/front10Activities`
  ); //activities
  const placeToEat = useFetch(
    `${process.env.REACT_APP_SERVER_URL}/api/Routs/front10Eat`
  ); //placesto eat
  const { data } = places; //Places

  const linkStyle = { textDecoration: "none", color: "#044368" };
  return (
    <div style={{ width: "100%" }}>
      <CarouselContainer>
        <SvgContainer width={250} height={170}>
          <DinnerIcon />
          <h1>
            {" "}
            <Link to="/placetoeat" style={linkStyle}>
              Restaurants
            </Link>{" "}
          </h1>{" "}
        </SvgContainer>
        {placeToEat.error ? (
          <h1 style={{ color: "red" }}>Error, please refresh!</h1>
        ) : (
          <CarouselComp type={"placetoeat"} data={placeToEat.data} />
        )}
      </CarouselContainer>

      <CarouselContainer>
        <SvgContainer width={150} height={150}>
          <PlacesIcon />{" "}
          <h1>
            <Link to="/allplaces" style={linkStyle}>
              {" "}
              Places
            </Link>
          </h1>
        </SvgContainer>
        {places.error ? (
          <h1 style={{ color: "red" }}>Error, please refresh!</h1>
        ) : (
          <CarouselComp type={"allplaces"} data={data} />
        )}
      </CarouselContainer>

      <CarouselContainer>
        <SvgContainer width={200} height={160}>
          <ActivitiesIcon />{" "}
          <h1>
            <Link to="/activities" style={linkStyle}>
              {" "}
              Activities
            </Link>
          </h1>
        </SvgContainer>
        {activities.error ? (
          <h1 style={{ color: "red" }}>Error, please refresh!</h1>
        ) : (
          <CarouselComp type={"activities"} data={activities.data} />
        )}
      </CarouselContainer>

      <CarouselContainer>
        <SvgContainer width={150} height={160}>
          <EventsIcon />{" "}
          <h1>
            <Link to="/events" style={linkStyle}>
              {" "}
              Events
            </Link>
          </h1>
        </SvgContainer>
        {events.error ? (
          <h1 style={{ color: "red" }}>Error, please refresh!</h1>
        ) : (
          <CarouselComp type={"events"} data={events.data} />
        )}
      </CarouselContainer>
    </div>
  );
}

export default FrontPage;
