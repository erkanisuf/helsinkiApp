import React, { useEffect, useRef, useState } from "react";
import {
  DaysContainer,
  GridImageDiv,
  GridPage,
  ImageModal,
  SvgContainer,
  Tags,
} from "../StyledComponents/Styles";
import noImage from "../../staticimages/No_Image_Available.jpg";
import { AiOutlineCloseCircle } from "react-icons/ai";
import PostReview from "../Reviews/PostReview";
import MapsAPI from "../MapsAPI/MapsAPI";
import { useHistory } from "react-router";
import PlacesIcon from "../StyledComponents/SvgIcons/PlacesIcon";

interface Props {
  data: {
    id: string;
    name: { fi: string; en: string };
    info_url: string;
    location: {
      lat: number;
      lon: number;
      address: {
        street_address: string;
        postal_code: string;
        locality: string;
      };
    };
    opening_hours: { hours: Hoursarr[]; openinghours_exception?: string };
    tags: Tagz[];
    description: { body: string; intro?: string; images?: Images[] };
  };
}
interface Hoursarr {
  weekday_id: number;
  opens?: string;
  closes?: string;
  open24h?: boolean;
}
interface Tagz {
  id: string;
  name: string;
}

interface Images {
  copyright_holder: string;
  license_type: { id: number; name: string };
  url: string;
}
//
const Places: React.FC<Props> = ({ data }) => {
  const history = useHistory();
  const ref = useRef<any>(null);
  const [modalImage, setModalImage] = useState<string>();
  const [open, setOpen] = useState<boolean>(false); // Opens and close Image Modal !
  const WeekDayToName = (param: number) => {
    switch (param) {
      case 1:
        return "Monday";
      case 2:
        return "Tuesday";
      case 3:
        return "Werdnesday";
      case 4:
        return "Thursday";
      case 5:
        return "Friday";
      case 6:
        return "Saturday";
      case 7:
        return "Sunday";
      default:
        return "";
    }
  };
  const handleClickOutside = (event: any) => {
    // LATER!!:Check TypeScript for useRef
    if (event.target === ref.current) {
      CloseImageModal(); // This If you click on Modal the Black places it will close the Modal !
    }
  };
  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true); // ON CLick checks if clicked on Balack(modal ) ,if so it closes  ,if clicked on white or on pic doesnt
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, []);
  const OpenImageModal = (e: string) => {
    setModalImage(e);
    setOpen(true);
  };
  const CloseImageModal = () => {
    setOpen(false);
  };
  const RedirectToSearchPage = (e: string) => {
    // Gets the array items , makes them in to string array and after that transofrms to whole string i pass it to the API fetch(where it gets encoded)
    const searchedTag = { name: e };
    history.push({
      pathname: "/search",
      state: {
        tags: e,
        input: [searchedTag],
        type: "allplaces",
      },
    });
  };

  return (
    <div>
      <GridPage>
        {/* <div>ID: - {data.id}</div>  */}
        {/* Name and Link URL */}
        <div>
          <h1>{data.name.fi} </h1>
          <div>
            <a href={data.info_url} target="blank">
              {" "}
              Website{" "}
            </a>
          </div>
        </div>
        {/* Location */}
        <div></div>
        {/* Opening Hours*/}
        <div>
          <div>
            {data.opening_hours.hours.map((el, index) => {
              return (
                <DaysContainer key={index}>
                  <div>
                    <p>{WeekDayToName(el.weekday_id)}</p>
                  </div>
                  <div>
                    <span>
                      {el.opens
                        ? el.opens.substring(0, el.opens.length - 3)
                        : "Closed"}
                    </span>{" "}
                    -{" "}
                    <span>
                      {el.closes
                        ? el.closes.substring(0, el.closes.length - 3)
                        : ""}
                    </span>
                  </div>
                  {el.open24h && <div>24/7</div>}
                </DaysContainer>
              );
            })}
          </div>
          {data.opening_hours.openinghours_exception && (
            <div
              style={{ fontStyle: "italic", color: "red", margin: "10px auto" }}
            >
              Note: " {data.opening_hours.openinghours_exception} "
            </div>
          )}
        </div>
        {/* Tags */}
        <div>
          {data.tags.map((el, index) => {
            return (
              <Tags onClick={() => RedirectToSearchPage(el.name)} key={index}>
                # {el.name}
              </Tags>
            );
          })}{" "}
        </div>
        {/* Description Body text */}
        <div>
          {" "}
          <h1>Description</h1>
          <p>{data.description.body}</p>
        </div>
        {/* Images */}
        {/* Checks if there is images property first . If there is after that checks the lengs if there is any image. If no image render static img */}
        <GridImageDiv>
          {data.description.images ? (
            data.description.images.length ? (
              data.description.images.map((el, index) => {
                return (
                  <div
                    style={{ cursor: "Pointer" }}
                    key={index}
                    onClick={() => OpenImageModal(el.url)}
                  >
                    <img src={el.url} alt={el.license_type.name} />
                    <p
                      style={{
                        fontSize: "10px",
                        display: "flex",
                        color: "#858383",
                      }}
                    >
                      {el.copyright_holder}
                    </p>{" "}
                  </div>
                );
              })
            ) : (
              <div>
                <img src={noImage} alt={"No Image"} />
                <p>{"No Image"}</p>{" "}
              </div>
            )
          ) : (
            ""
          )}
        </GridImageDiv>
        <ImageModal open={open} id="imgModal" ref={ref}>
          <div>
            <button onClick={CloseImageModal}>
              {" "}
              <AiOutlineCloseCircle size="45px" />
            </button>
            <img src={modalImage} alt={""} />
          </div>
        </ImageModal>
      </GridPage>
      <div
        style={{
          gridColumn: "1/4",
          // gridRow: window.innerWidth <= 768 ? "7" : "7",
          borderTop: "1px solid #ccc",
          paddingTop: "15px",
        }}
      >
        <PostReview id={data.id} />
      </div>
      <div style={{ width: "80%", margin: "0 auto" }}>
        <SvgContainer width={200} height={150} style={{ margin: "0 auto" }}>
          <PlacesIcon /> <h1> Location</h1>
        </SvgContainer>
        <div style={{ color: "grey" }}>
          {data.location.address.locality},{data.location.address.postal_code},
          {data.location.address.street_address}
        </div>
        <MapsAPI
          address={data.location.address}
          lat={data.location.lat}
          lon={data.location.lon}
          name={data.name.fi}
          image={
            data.description.images && data.description.images.length
              ? data.description.images[0].url
              : ""
          }
        />
      </div>
    </div>
  );
};

export default Places;
