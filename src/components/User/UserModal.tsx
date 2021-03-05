import React, { useState } from "react";
import Login from "./Login";
import { AiFillCaretDown, AiFillCaretUp } from "react-icons/ai";
import { LoginForm, Modal } from "../StyledComponents/Styles";
import { Link } from "react-router-dom";
import { Cookies } from "react-cookie";

const UserModal = () => {
  const [open, setOpen] = useState(false);
  const cookie = new Cookies();
  const ToggleModal = () => {
    console.log("click");
    setOpen(!open);
  };

  if (cookie.get("loged_in")) {
    return <div>U ARE INSIDE</div>;
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
        <LoginForm open={open}>
          <Login open={open} />
        </LoginForm>
      </Modal>
    </div>
  );
};

export default UserModal;
