import React, { useState } from "react";
import {
  LoginForm,
  Modal,
  WrapperLoginAndRegister,
} from "../StyledComponents/Styles";
import { useCookies } from "react-cookie";
import { Store } from "../../Context/AppContext";

interface Props {
  open: boolean;
}
const Login: React.FC<Props> = ({ open }) => {
  const { state, dispatch } = React.useContext(Store);
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
          dispatch({
            type: "LOG_IN",
            is_loged_in: true,
            loged_email: el.email,
          });
        }
      })
      .catch((err) => {
        console.log(err);
        setSuccs("");
        setError(["Something went wrong please refresh and try again !"]);
      });
  };

  console.log("");
  return (
    <LoginForm open={open}>
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
