import React, { useState } from "react";
import { LoginForm, WrapperLoginAndRegister } from "../StyledComponents/Styles";
import SVGPageHeader from "../StyledComponents/SVGbackground/SVGPageHeader";

const Register = () => {
  const [newuser, setNewuser] = useState({
    Firstname: "",
    Lastname: "",
    Password: "",
    ConfirmPassword: "",
    Email: "",
  });
  const [error, setError] = useState<string[]>([]);
  const [succs, setSuccs] = useState<string>("");
  console.log(newuser);
  const handleOnChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewuser({ ...newuser, [e.target.name]: e.target.value });
  };

  const CreateNewUser = (e: React.FormEvent): void => {
    e.preventDefault();

    if (newuser.Password !== newuser.ConfirmPassword) {
      setError(["Passwords does not match !"]);
    } else {
      fetch(`${process.env.REACT_APP_SERVER_URL}/api/user/register`, {
        method: "POST",
        body: JSON.stringify(newuser),
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
    }
  };

  return (
    <WrapperLoginAndRegister>
      <LoginForm open={true}>
        <form onSubmit={CreateNewUser}>
          <label>
            First Name:
            <input
              type="text"
              name="Firstname"
              onChange={handleOnChangeInput}
            />
          </label>
          <label>
            Last Name:
            <input type="text" name="Lastname" onChange={handleOnChangeInput} />
          </label>
          <label>
            Email:
            <input
              type="email"
              name="Email"
              placeholder="required"
              required
              onChange={handleOnChangeInput}
            />
          </label>
          <label>
            Password:
            <input
              type="password"
              name="Password"
              placeholder="required"
              required
              onChange={handleOnChangeInput}
            />
          </label>
          <label>
            Confirm Password:
            <input
              type="password"
              name="ConfirmPassword"
              placeholder="required"
              required
              onChange={handleOnChangeInput}
            />
          </label>
          <input type="submit" value="Sign Up" />
          <div style={{ color: "red" }}>
            {error &&
              error.map((el) => {
                return <p key={el}>{el}</p>;
              })}
          </div>
          <div style={{ color: "green" }}>
            {succs && <p>Email: {succs} succsessfuly registered !</p>}
          </div>
        </form>
      </LoginForm>
    </WrapperLoginAndRegister>
  );
};

export default Register;
