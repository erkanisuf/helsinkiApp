import styled from "styled-components";

const defaultMargin: number = 0;
export const Button = styled.button`
  background: #3590c5;
  width: 200px;
  height: 50px;
  border-radius: 3px;
  border: none;
  cursor: pointer;
  color: white;
  font-family: "Open Sans", sans-serif;
  font-size: 15px;
  border-radius: 10px;
  display: flex;
  justify-content: space-around;
  text-decoration: none;
  align-items: center;
  &:hover {
    background: #ffffff;
    border: 1px solid #3590c5;
    color: #3590c5;
  }
  &:disabled {
    background: #e4e3e3;
    cursor: default;
    color: #5e5d5d;
    &:hover {
      border: none;
    }
  }
`;
export const ButtonCards = styled.div`
  display: "flex";
  flex-direction: column;
  justify-content: center;
  padding: 35px 5px;
  align-content: center;
  align-items: center;
  width: 200px;
  background-color: white;
  height: 160px;
  border-bottom: 5px solid #3590c5;
  border-top: 5px solid #3adce7;
  border-radius: 10px;
  margin: 0 10px;
  cursor: pointer;
  transition: 0.5s;

  &:hover {
    transform: scale(1.1);
  }
  p {
    margin: 0;
  }
`;

export const NavBarContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #0093e9;
  background-image: linear-gradient(160deg, #0093e9 0%, #80d0c7 100%);

  z-index: 1;
  height: 500px;
`;

interface RowDivProps {
  readonly marginBottom: number;
}
export const RowDiv = styled.div<RowDivProps>`
  display: flex;
  flex-direction: row;
  margin-bottom: ${(props) => props.marginBottom}px;
  justify-content: center;
  align-items: center;
  font-family: "Kalam", cursive;
  font-size: 18px;
  p {
    color: black;
  }
  a {
    text-decoration: none;
  }
`;

export const SearchBarStyle = styled.input`
  width: 400px;
  height: 50px;
  outline: none;
  border: none;
`;

export const SelectStyle = styled.select`
  width: 100px;
  height: 52px;
  outline: none;
  border: none;
  border-left: 5px solid #5eb7eb;
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
`;

export const SearchButton = styled.button`
  width: 100px;
  color: white;
  font-family: "Kalam", cursive;
  background-color: #094263;
  height: 52px;
  cursor: pointer;
  outline: none;
  border: none;
  display: flex;
  align-items: center;
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
  transition: 1s;
  &:disabled {
    background-color: #6d6a6a;
    cursor: default;
  }
`;

export const ItemsCard = styled.div`
  display: "flex";
  flex-direction: column;
  justify-content: center;
  font-family: "Open Sans", sans-serif;
  font-weight: 600;
  color: #2e2d2d;
  align-content: center;
  align-items: center;
  width: 300px;
  background-color: white;
  height: 250px;
  box-shadow: 1px 1px 5px 0px #adadad;
  border-radius: 10px;
  margin: 10px;
  cursor: pointer;
  transition: 0.1s;
  overflow: hidden;
  border-bottom: 12px solid #fdfdfd;
  &:hover {
    border-bottom: 12px solid #094263;
  }
  p {
    margin: 10px;
  }
  div {
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center center;
    border-top-right-radius: 10px;
    border-top-left-radius: 10px;
    width: 100%;
    padding: 5px;
    height: 150px;
  }
`;

export const CarouselContainer = styled.div`
  width: 80%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  margin: 0 auto;

  border-bottom: 1px solid #a3b4c7;
  padding: 50px;
  h1 {
    text-align: left;
  }
`;

interface SVGProps {
  width: number;
  height: number;
}
export const SvgContainer = styled.div<SVGProps>`
  display: flex;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: -50px;
  width: ${(props) => props.width}px;
  height: ${(props) => props.height}px;
`;

export const PageContainer = styled.div`
  display: flex;
  display: flex;
  width: 75%;
  margin: 0 auto;
  align-items: flex-start;
  justify-content: flex-start;
  flex-wrap: wrap;
  margin-bottom: 20px;
`;

export const PageHeader = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  margin: 0 auto;
  background-color: #10a7ff;
  background-image: linear-gradient(160deg, #0093e9 60%, #80d0c7 100%);
  justify-content: space-around;
  padding-top: 50px;
  align-items: center;
  align-self: center;
`;

export const NextPrevbtn = styled.button`
  background: none;
  border: none;
  outline: none;
  cursor: pointer;
  border-bottom: 5px solid white;
  border-radius: 5px;
  &:active {
    background: none;
    border: none;
    outline: none;
  }
  &:hover {
    border-bottom: 5px solid #10a7ff;
  }
`;

export const PagesNav = styled.div`
  display: flex;
  width: 30%;
  justify-content: space-between;
  color: white;

  font-size: 20px;

  a {
    font-family: "Open Sans", sans-serif;
    color: white;
    text-decoration: none;
    font-weight: 400;
    text-transform: uppercase;
    padding: 5px 10px;

    border-radius: 15px;
    transition: 0.5s;
    &:hover {
      background-color: #54b4ec;
      transform: scale(1.1);
    }
  }
`;

export const DaysContainer = styled.div`
  box-shadow: 1px 1px 5px 0px #adadad !important;
  border: 1px solid #0093e9 !important;
  display: flex;
  font-family: "Open Sans", sans-serif;
  flex-direction: column;
  flex-wrap: wrap;
  height: 150px;
  width: 100%;
  margin: 5px;
  padding: 10px !important;
  border-radius: 10px;
  background-color: white;
  p {
    font-weight: 600;
  }
`;

export const Tags = styled.div`
  background-color: #10a7ff;
  background-image: linear-gradient(160deg, #0093e9 10%, #80d0c7 100%);
  margin: 5px !important;
  padding: 10px !important;
  border-radius: 10px;
  font-family: "Open Sans", sans-serif;
  color: white;
  min-width: 200;
  max-width: 210px;
  font-weight: 500;

  cursor: pointer;
`;
// PLACES GRID
export const GridPage = styled.div`
  width: 80%;
  margin: 55px auto;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 200px minmax(300px, 100%);
  gap: 50px;

  div {
    display: flex;
  }

  //Name and Link
  div:nth-of-type(1) {
    font-family: "Open Sans", sans-serif;
    grid-column: 1/2;
    grid-row: 1;
    flex-direction: column;
    background-color: white;

    a {
      text-decoration: none;
      color: #0093e9;
      font-weight: 700;
      border-bottom: 5px solid #0093e9;
      border-radius: 5px;
      padding-bottom: 10px;
    }
    h1 {
      margin: 0;
      font-size: 52px;
    }
  }
  //Location
  div:nth-of-type(2) {
    grid-column: 1/4;
    grid-row: 5;
    flex-direction: column;
  }
  // Description Body Text
  div:nth-of-type(5) {
    font-family: "Open Sans", sans-serif;
    box-shadow: 0px 0px 4px 0px #c4c3c3;
    background-color: white;
    padding: 15px;
    border-radius: 10px;
    grid-column: 1/2;
    grid-row: 2;
    flex-direction: column;
  }
  // Open Times
  div:nth-of-type(3) {
    grid-column: 1/4;
    grid-row: 3;
    flex-direction: column;
    div {
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      div {
        display: flex;
        flex-direction: column;
      }
    }
  }

  //TAGS
  div:nth-of-type(4) {
    border-top: 1px solid #c4c3c3;
    padding: 10px;
    grid-column: 1/4;
    grid-row: 4;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: flex-end;
    align-items: flex-end;
  }
`;
//IMAGES
export const GridImageDiv = styled.div`
  grid-column: 2/4;
  grid-row: 1/3;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  p {
    display: none;
  }
  div:nth-of-type(1) {
    width: 100%;
    margin: 5px;
    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }
  div {
    margin: 5px;
    grid-row: 2;
    width: 200px;

    img {
      width: 200px;
      height: 100%;
      object-fit: contain;
    }
  }
`;
interface TextLength {
  textlength: number;
}
// EVENTS GRID and ACtivities
export const EventsGrid = styled.div<TextLength>`
  width: 80%;
  margin: 55px auto;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 300px minmax(300px, 100%);
  gap: 50px;

  div {
    display: flex;
  }

  //Name and Link
  div:nth-of-type(1) {
    font-family: "Open Sans", sans-serif;
    grid-column: 2/4;
    grid-row: 1/2;
    width: 100%;
    flex-direction: column;
    background-color: white;
    margin: 15px auto;

    button {
      background-color: #0093e9;
      width: 300px;
      margin: 25px auto;
      padding: 25px;
      color: white;
      font-family: "Open Sans", sans-serif;
      text-transform: uppercase;
      font-weight: 600;
      border: none;
      border-radius: 10px;
      cursor: pointer;
      &:hover {
        background-color: #116596;
      }
    }

    h1 {
      margin: 15px auto;
      padding: 0px 50px;
      // This one depending of text length puts font size
      font-size: ${(props) =>
        props.textlength > 30
          ? "18px"
          : props.textlength > 20
          ? "35px"
          : "55px"};
      width: 100%;

      border-bottom: 5px solid #0093e9;
    }
  }
  div:nth-of-type(2) {
    display: flex;
    flex-direction: column;
    grid-column: 1/2;
    grid-row: 1/2;

    div {
      background-color: #10a7ff;
      width: 300px;
      height: 300px;

      background-image: linear-gradient(160deg, #0093e9 10%, #80d0c7 100%);
      box-shadow: 1px 1px 5px 0px #adadad;
      transform: rotate(45deg);
      border-radius: 10px;
      display: flex;
      justify-content: center;
      align-items: center;
      div {
        transform: rotate(-45deg);
        background-image: linear-gradient(160deg, #ffffff 10%, #ffffff 100%);
        box-shadow: 1px 1px 5px 0px #adadad;
        padding-top: 15px;
        border-radius: 10px;

        img {
          padding: 15px;
          width: 80%;
          height: 80%;
          object-fit: contain;
        }
      }
    }
  }
  div:nth-of-type(3) {
    display: flex;
    flex-direction: column;
    grid-column: 1/2;
    grid-row: 5/6;
  }
  //TAGS
  div:nth-of-type(5) {
    border-top: 1px solid #c4c3c3;
    padding: 10px;

    grid-column: 1/4;
    grid-row: 4/5;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: flex-end;
    align-items: flex-end;
  }
  //DESCRIPTIOn
  div:nth-of-type(6) {
    margin: 35px auto;

    box-shadow: 0px 0px 5px 0px #cecccc;
    background-color: white;
    padding: 10px;
    border-radius: 10px;
    width: 100%;
    border-top: 1px solid #cecece;
    display: flex;
    flex-direction: column;
    grid-column: 1/4;
    grid-row: 2/3;
  }
  div:nth-of-type(7) {
    border-top: 1px solid #cecece;
    padding: 10px;
    width: 100% !important;
    grid-column: 1/4;
    grid-row: 3/4;
    flex-direction: row;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    div {
      flex: 1;
    }
    img {
      width: 300px;
      object-fit: contain;
      box-shadow: 0px 0px 5px 0px #cecccc;
      cursor: pointer;
      height: 250px;
      padding: 5px;
      border-radius: 5px;
    }
  }
`;

//Login Modals - Toggler
interface ModalProps {
  open: boolean;
}
export const Modal = styled.div<ModalProps>`
  height: ${(props) => (props.open ? "230px" : "0px")};
  /* display: ${(props) => (props.open ? "flex" : "none")}; */
  background: ${"rgba(68, 149, 204, 0.575)"};
  object-fit: cover;
  width: 220px;
  position: absolute;
  top: 25px;
  transition: 0.3s;
  visibility: ${(props) => (props.open ? "visible" : "hidden")};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  border: 1px solid white;
  border-radius: 10px;
  padding: 35px 0px;
`;

//In the Top right bar the toggling one
export const LoginForm = styled.div<ModalProps>`
  display: ${(props) => (props.open ? "flex" : "none")};
  flex-direction: column;
  align-items: center;

  height: 100%;
  justify-content: space-between;
  font-family: "Open Sans", sans-serif;
  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 0 auto;
    justify-content: center;
  }
  input {
    border: none;
    outline: none;
    width: 80%;
    padding: 12px;
    border-radius: 10px;
  }
  input[type="submit"] {
    padding: 0;
    width: 70%;
    margin: 0 auto;
    margin-top: 15px;
    padding: 10px;
    align-self: center;
    justify-self: center;
    cursor: pointer;
    color: #0093e9;
    font-weight: 700;

    background-color: #ffffff;
    &:hover {
      color: white;
      background-color: #0093e9;
    }
  }
  p {
    cursor: pointer;
    font-size: 13px;
    &:hover {
      text-decoration: underline;
    }
  }
`;
// This is in the Route Wrapper for Register and Login.
export const WrapperLoginAndRegister = styled.div`
  width: 300px;
  height: 100%;

  margin: 0 auto;
  flex-direction: column;
  align-items: center;

  height: 100%;
  justify-content: space-between;
  text-align: left;
  color: #0093e9;
  font-weight: 500;
  padding: 50px;
  border-radius: 10px;
  border: 5px solid #0093e9;

  input {
    width: 250px;
    margin: 15px auto;
    border: 1px solid #ccc;
  }
`;

// IMAge oN Open MOdal

interface ImageModal {
  open: boolean;
}
export const ImageModal = styled.div<ImageModal>`
  visibility: none;
  display: ${(props) => (props.open ? "flex" : "none")}!important;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 5222;
  width: 100%;
  height: 100vh;

  justify-content: center;
  align-items: center;
  margin: 0 auto;
  background-color: ${"rgba(0, 0, 0, 0.7)"};
  div {
    padding: 5px;
    margin: 0 auto;
    display: flex;
    justify-content: center;
    align-items: center;
    max-width: 80%;
    max-height: 100%;

    button {
      background-color: #0093e9;

      width: 80px !important;
      margin: 25px auto;
      padding: 5px !important;
      color: white;
      font-family: "Open Sans", sans-serif;
      text-transform: uppercase;
      font-weight: 600;
      border: none;
      border-radius: 10px;
      cursor: pointer;
      &:hover {
        background-color: #116596;
      }
    }
  }

  img {
    max-width: 100%;

    max-height: 700px;
  }
`;

// Reviews Styles
export const FormColumnFlex = styled.form`
  display: flex;
  flex-direction: column;

  align-items: center;
  input[type="submit"] {
    margin: 5px;
    background-color: #0093e9;
    align-self: flex-end;
    width: 120px !important;
    padding: 15px !important;
    color: white;
    font-family: "Open Sans", sans-serif;
    text-transform: uppercase;
    font-weight: 600;
    border: none;
    border-radius: 10px;
    cursor: pointer;
    &:hover {
      background-color: #116596;
    }
    &:disabled {
      background-color: grey;
      cursor: initial;
    }
  }
`;

export const ReviewTextArea = styled.textarea`
  border-radius: 10px;
  border: 1px solid #ccc;
  padding: 15px;
  &:focus {
    outline: none;
  }
`;
