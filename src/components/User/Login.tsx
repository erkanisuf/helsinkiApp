import React, { useState } from "react";
import {
  LoginForm,
  Modal,
  WrapperLoginAndRegister,
} from "../StyledComponents/Styles";
import { useCookies } from "react-cookie";

interface Props {
  open: boolean;
}
const Login: React.FC<Props> = ({ open }) => {
  const [loginUser, setLoginUser] = useState({
    Password: "",

    Email: "",
  });
  const [error, setError] = useState<string[]>([]);
  const [succs, setSuccs] = useState<string>("");
  const [cookies, setCookie] = useCookies([]);

  const handleOnChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginUser({ ...loginUser, [e.target.name]: e.target.value });
  };

  const LogIn = (e: React.FormEvent): void => {
    e.preventDefault();

    fetch(`${process.env.REACT_APP_SERVER_URL}/api/user/login`, {
      method: "POST",
      body: JSON.stringify(loginUser),
      headers: { "Content-Type": "application/json" },
    })
      .then((el) => el.json())
      .then((el) => {
        if (!el.isSuccs) {
          setError(el.errors);
          setSuccs("");
          console.log(el);
        } else {
          const date = new Date(new Date().getTime() + 1 * 60 * 1000); // Expires in 1 minute (change 1 if want more),in backend is diffrent for now CHANGE LATER!
          console.log(typeof date);
          console.log(el);
          setCookie("loged_in", el.token, {
            path: "/",
            expires: date,
          });
          setSuccs(el.email);
          setError([]);
        }
      })
      .catch((err) => {
        console.log(err);
        setSuccs("");
        setError(["Something went wrong please refresh and try again !"]);
      });
  };

  const test = (e: React.FormEvent): void => {
    e.preventDefault();

    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9lbWFpbGFkZHJlc3MiOiJlcmthbmlzdWZAZ21haWwuY29tIiwiZXhwIjoxNjE0OTUxMzcxLCJpc3MiOiJodHRwczovL2xvY2FsaG9zdDozMDAwLyIsImF1ZCI6Imh0dHBzOi8vbG9jYWxob3N0OjUwMDAvIn0.yx4r_W1qyJoW2fUGlzmxWweDNx01-S7fRhkpLGKvSzo";
    const headers = {
      Authorization: "Bearer ${token}",
      "Content-Type": "application/json",
    };
    fetch(`${process.env.REACT_APP_SERVER_URL}/api/user/testva`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((el) => {
        if (el.status === 200) {
          return el.json();
        } else {
          console.log("Error OR Token Expired");
        }
      })
      .then((el) => {
        console.log(el);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  console.log("");
  return (
    <LoginForm open={open}>
      <button onClick={test}>Test</button>
      <form onSubmit={LogIn}>
        <label>
          Email:
          <input
            type="email"
            name="email"
            placeholder="email address"
            required
            onChange={handleOnChangeInput}
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            name="password"
            placeholder="password"
            required
            onChange={handleOnChangeInput}
          />
        </label>
        <input type="submit" value="Sign in" />
        <p>Forgot password?</p>
        <div style={{ color: "red" }}>
          {error &&
            error.map((el) => {
              return <p key={el}>{el}</p>;
            })}
        </div>
        <div style={{ color: "green" }}>
          {succs && <p>Email: {succs} succsessfuly Loged in !</p>}
        </div>
      </form>
    </LoginForm>
  );
};

export default Login;
