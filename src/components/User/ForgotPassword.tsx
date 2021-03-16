import React, { useState } from "react";
import { LoginForm, SvgContainer } from "../StyledComponents/Styles";
import LoadingIcon from "../StyledComponents/SvgIcons/LoadingIcon";

const ForgotPassword = () => {
  const [email, setEmail] = useState<string>();
  const [error, setError] = useState<string[]>([]);
  const [succs, setSuccs] = useState<string>();
  const [loading, setLoading] = useState<boolean>(false);
  const forgotPasswordEmail = () => {};
  const handleOnChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };
  return (
    <LoginForm open={true}>
      <form onSubmit={forgotPasswordEmail}>
        <label>
          <p>Email:</p>
          <input
            style={{ border: "1px solid grey", width: "300px" }}
            type="email"
            name="email"
            placeholder="email address"
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
          value="Send password reset"
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
          {succs && <p> Password reset request send to email: {succs} !</p>}
        </div>
      </form>
    </LoginForm>
  );
};

export default ForgotPassword;
