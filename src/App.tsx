import React, { useContext, useEffect } from "react";
import { Route, Switch } from "react-router";
import "./App.css";
import IDPage from "./components/IDPage/IDPage";
import Page from "./components/Pages/Page";

import NavBar from "./components/StyledComponents/NavBar/NavBar";
import { WrapperLoginAndRegister } from "./components/StyledComponents/Styles";
import SVGPageHeader from "./components/StyledComponents/SVGbackground/SVGPageHeader";
import Login from "./components/User/Login";
import Register from "./components/User/Register";
import FrontPage from "./FrontPage";
import { Store } from "./Context/AppContext";
import { Cookies } from "react-cookie";

function App(): JSX.Element {
  const { state, dispatch } = useContext(Store);
  console.log(state);

  // navigator.geolocation.getCurrentPosition(function (position) {
  //   console.log(position);
  // });

  // function geoloc() {
  //   navigator.geolocation.getCurrentPosition(function (position) {
  //     console.log(position);
  //   });
  // }

  //This Function Checks if there is Cookie in browser , if so fetches to server.
  //In the server is made check if user cookie is still valid , if its its sends current user tokens .
  // AFter that it dispatchs to main state and puts the current loged user name and changes status to is_logged_in:true , if invalid token to false;
  const cookies = new Cookies();
  const usercookie = cookies.get("loged_in");
  useEffect(() => {
    console.log(usercookie, "mycooki");
    if (!usercookie) {
      dispatch({ type: "LOG_OUT", is_loged_in: false });
    } else {
      fetch(`${process.env.REACT_APP_SERVER_URL}/api/user/GetUserByToken`, {
        method: "GET",
        headers: { Authorization: `Bearer ${usercookie}` },
      })
        .then((el) => {
          if (el.status === 200) {
            return el.json();
          } else {
            console.log("error , failed to fetch");
          }
        })
        .then((el) => {
          if (el.isSuccs) {
            dispatch({
              type: "LOG_IN",
              is_loged_in: true,
              loged_email: el.email,
            });
          } else {
            dispatch({ type: "LOG_OUT", is_loged_in: false });
          }
        })
        .catch((err) => console.log(err, "err"));
    }
  }, [usercookie]);

  return (
    <div className="App">
      <Switch>
        <Route path="/events">
          <Page
            link={`${process.env.REACT_APP_SERVER_URL}/api/Routs/allEvents`}
            type={"events"}
          />
        </Route>
        <Route path="/placestoeat">
          <Page
            link={`${process.env.REACT_APP_SERVER_URL}/api/Routs/allPlacesToEat`}
            type={"placetoeat"}
          />
        </Route>
        <Route path="/activities">
          <Page
            link={`${process.env.REACT_APP_SERVER_URL}/api/Routs/allActivities`}
            type={"activities"}
          />
        </Route>
        <Route path="/allplaces">
          <Page
            link={`${process.env.REACT_APP_SERVER_URL}/api/Routs/allPlaces`}
            type={"allplaces"}
          />
        </Route>
        <Route path="/allbyid/:id">
          <IDPage />
        </Route>
        <Route path="/login">
          <SVGPageHeader>
            <h1 style={{ color: "#0093e9" }}>Login</h1>
            <WrapperLoginAndRegister>
              <Login open={true} />
            </WrapperLoginAndRegister>
          </SVGPageHeader>
        </Route>
        <Route path="/register">
          <SVGPageHeader>
            <h1 style={{ color: "#0093e9" }}>Register</h1>
            <Register />
          </SVGPageHeader>
        </Route>
        <Route path="/">
          <NavBar />
          <FrontPage />

          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
            <linearGradient id="gradient">
              <stop offset="10%" stopColor="#70c0ce" />
              <stop offset="90%" stopColor="#0093E9" />
            </linearGradient>
            <path
              fill="url(#gradient)"
              fillOpacity="1"
              d="M0,192L120,208C240,224,480,256,720,229.3C960,203,1200,117,1320,74.7L1440,32L1440,320L1320,320C1200,320,960,320,720,320C480,320,240,320,120,320L0,320Z"
            ></path>
          </svg>
        </Route>
      </Switch>
    </div>
  );
}

export default App;
