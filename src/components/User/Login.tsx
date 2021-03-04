import React, { useState } from "react";
import {
  LoginForm,
  Modal,
  WrapperLoginAndRegister,
} from "../StyledComponents/Styles";

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
          console.log(el);
          setSuccs(el.email);
          setError([]);
        }
      })
      .catch((err) => {
        setSuccs("");
        setError(["Something went wrong please refresh and try again !"]);
      });
  };

  const test = (e: React.FormEvent): void => {
    e.preventDefault();

    fetch(`${process.env.REACT_APP_SERVER_URL}/api/user/testva`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((el) => el.json())
      .then((el) => {
        console.log(el);
      })
      .catch((err) => {});
  };
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
