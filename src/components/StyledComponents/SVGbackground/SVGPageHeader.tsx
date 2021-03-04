import React from "react";
import { Link } from "react-router-dom";
import UserModal from "../../User/UserModal";
import SearchBar from "../SearchBar/SearchBar";
import { NavBarContainer, PageHeader, PagesNav, SvgContainer } from "../Styles";
import HomeIcon from "../SvgIcons/HomeIcon";
import "./SVGbackgorund.css";
import SVGFooterPage from "./SVGFooterPage";
interface MyProps {
  children?: React.ReactNode;
}
const SVGPageHeader: React.FunctionComponent<MyProps> = (props) => {
  //This is for Pages layout
  return (
    <div>
      <PageHeader>
        <UserModal />
        <SearchBar marginBottom={0} />

        <PagesNav>
          <Link to="/placestoeat"> Places to eat</Link>
          <Link to="/activities">Activities</Link>
          <Link to="/events">Events</Link>
          <Link to="/allplaces"> Places</Link>
        </PagesNav>
        <Link to="/" style={{ marginLeft: "105px" }}>
          {" "}
          <HomeIcon />
        </Link>
      </PageHeader>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 220"
        fill="url(#gradient)"
      >
        <linearGradient id="gradient">
          <stop offset="50%" stopColor="#0093E9" />
          <stop offset="100%" stopColor="#80D0C7" />
        </linearGradient>
        <path
          fill="#gradient"
          fillOpacity="1"
          d="M0,96L26.7,101.3C53.3,107,107,117,160,133.3C213.3,149,267,171,320,149.3C373.3,128,427,64,480,64C533.3,64,587,128,640,149.3C693.3,171,747,149,800,133.3C853.3,117,907,107,960,117.3C1013.3,128,1067,160,1120,181.3C1173.3,203,1227,213,1280,218.7C1333.3,224,1387,224,1413,224L1440,224L1440,0L1413.3,0C1386.7,0,1333,0,1280,0C1226.7,0,1173,0,1120,0C1066.7,0,1013,0,960,0C906.7,0,853,0,800,0C746.7,0,693,0,640,0C586.7,0,533,0,480,0C426.7,0,373,0,320,0C266.7,0,213,0,160,0C106.7,0,53,0,27,0L0,0Z"
        ></path>
      </svg>

      <div
        style={{
          margin: "0 auto",
          minHeight: "400px",
          overflow: "hidden",
          width: "100%",
          height: "100%",
        }}
      >
        {props.children}
      </div>

      <SVGFooterPage />
    </div>
  );
};

export default SVGPageHeader;
