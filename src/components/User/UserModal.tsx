import React, { useState } from "react";
import Login from "./Login";
import {
  AiFillCaretDown,
  AiFillCaretUp,
  AiFillCloseCircle,
} from "react-icons/ai";
import { LoginForm, Modal } from "../StyledComponents/Styles";
import { Link } from "react-router-dom";
import { Store } from "../../Context/AppContext";
import { useCookies } from "react-cookie";
const UserModal = () => {
  const { state, dispatch } = React.useContext(Store);
  const [open, setOpen] = useState(false); // Opens Login Toggler on top Right
  const [cookies, removeCookie, setCookie] = useCookies([]);

  const ToggleModal = () => {
    setOpen(!open);
  };

  const LogOut = () => {
    document.cookie =
      "loged_in=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    dispatch({ type: "LOG_OUT", is_loged_in: false });
  };

  if (state.is_loged_in) {
    return (
      <div
        style={{
          color: "white",
          width: "80%",
          position: "absolute",
          top: 15,
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <span>Logged in as : {state.loged_email}</span>{" "}
        <span onClick={LogOut} style={{ cursor: "Pointer" }}>
          / Log Out
        </span>
      </div>
    );
  }
  return (
    <div
      style={{
        color: "white",
        width: "80%",
        position: "absolute",
        top: 15,
        display: "flex",
        justifyContent: "flex-end",
      }}
    >
      <span style={{ cursor: "Pointer" }} onClick={ToggleModal}>
        {open ? <AiFillCaretUp /> : <AiFillCaretDown />} Login{" "}
      </span>
      <span>
        /{" "}
        <Link to="/register" style={{ color: "white", textDecoration: "none" }}>
          Sign up
        </Link>{" "}
      </span>
      <Modal open={open}>
        <div
          onClick={() => setOpen(false)}
          style={{
            cursor: "Pointer",
            position: "absolute",
            top: 3,
            left: 10,
            fontSize: "18px",
          }}
        >
          {" "}
          <AiFillCloseCircle />
        </div>
        <LoginForm open={open}>
          <Login open={open} />
        </LoginForm>
      </Modal>
    </div>
  );
};

export default UserModal;
