import React, { useState } from "react";
import { FormEvent } from "react";
import { useLocation, useParams } from "react-router";
import { LoginForm, SvgContainer } from "../StyledComponents/Styles";
import LoadingIcon from "../StyledComponents/SvgIcons/LoadingIcon";
interface ParamTypes {
  id: string;
}
const ResetPassword = () => {
  const location = useLocation<any>(); // Token
  const token = location.pathname.replace("/resetpassword/", ""); // tried with useParams but the tokens special chars f.ex //// make issue with the id

  const [resetPassword, setresetPassword] = useState({
    Password: "",
    ConfirmPassword: "",
    Email: "",
  });
  const [error, setError] = useState<string[]>([]);
  const [succs, setSuccs] = useState<string>();
  const [loading, setLoading] = useState<boolean>(false);

  const handleOnChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setresetPassword({ ...resetPassword, [e.target.name]: e.target.value });
  };
  const resetPasswordRequest = (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    if (resetPassword.ConfirmPassword !== resetPassword.Password) {
      setError(["Passwords does not match!"]);
    } else if (!resetPassword.Email) {
      setError(["Please write valid Email!"]);
    } else {
      fetch(`${process.env.REACT_APP_SERVER_URL}/api/user/resetpassword`, {
        method: "POST",
        body: JSON.stringify({ ...resetPassword, token: token }),
        headers: { "Content-Type": "application/json" },
      })
        .then((el) => {
          return el.json();
        })

        .then((el: any) => {
          if (!el.isSuccs) {
            setError(el.errors);
            setSuccs("");
            setLoading(false);
          } else {
            setSuccs(el.email);
            setError([]);
            setLoading(false);
            setresetPassword({
              Password: "",
              ConfirmPassword: "",
              Email: "",
            });
          }
        })
        .catch((err) => {
          console.log(err);
          setSuccs("");
          setError(["Error , please try again"]);
          setLoading(false);
        });
    }
  };
  return (
    <LoginForm open={true}>
      <form
        onSubmit={resetPasswordRequest}
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <label>
          <p>Email:</p>
          <input
            style={{ border: "1px solid grey", width: "100%" }}
            type="email"
            name="Email"
            placeholder="required"
            required
            onChange={handleOnChangeInput}
          />
        </label>
        <label>
          <p>Password:</p>
          <input
            style={{ border: "1px solid grey", width: "100%" }}
            type="password"
            name="Password"
            placeholder="required"
            required
            onChange={handleOnChangeInput}
          />
        </label>
        <label>
          <p>Confirm Password:</p>
          <input
            style={{ border: "1px solid grey", width: "100%" }}
            type="password"
            name="ConfirmPassword"
            placeholder="required"
            required
            onChange={handleOnChangeInput}
          />
        </label>

        <input
          style={{
            border: "1px solid grey",
            width: "300px",
          }}
          type="submit"
          value="Change password"
        />
        {}
        {loading && (
          <SvgContainer width={50} height={60} style={{ margin: "0 auto" }}>
            <LoadingIcon />
          </SvgContainer>
        )}

        <div style={{ color: "red" }}>
          {error &&
            error.map((el) => {
              return <p key={el}>{el}</p>;
            })}
        </div>
        <div style={{ color: "green" }}>
          {succs && <p> Password of email: {succs} has been changed!</p>}
        </div>
      </form>
    </LoginForm>
  );
};

export default ResetPassword;
