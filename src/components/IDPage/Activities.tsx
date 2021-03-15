import React, { useEffect, useRef, useState } from "react";
import {
  EventsGrid,
  ImageModal,
  SvgContainer,
  Tags,
} from "../StyledComponents/Styles";
import { AiOutlineCloseCircle } from "react-icons/ai";
import PostReview from "../Reviews/PostReview";
import MapsAPI from "../MapsAPI/MapsAPI";
import PlacesIcon from "../StyledComponents/SvgIcons/PlacesIcon";
import { useHistory } from "react-router";
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

    where_when_duration: {
      duration?: string;
      where_and_when?: string;
    };
    tags: Tagz[];
    description: { body: string; intro?: string; images?: Images[] };
  };
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

const Activities: React.FC<Props> = ({ data }) => {
  const ref = useRef<any>(null);
  const history = useHistory();

  const [modalImage, setModalImage] = useState<string>();
  const [open, setOpen] = useState<boolean>(false);
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
        type: "activities",
      },
    });
  };
  return (
    <div>
      <EventsGrid textlength={data.name.fi.length}>
        {/* TextLenght Puts font size depending of text length */}
        {/* Name and Link URL */}
        <div>
          {" "}
          <h1>{data.name.fi} </h1>
          <div>
            <div style={{ fontWeight: 700, color: "#969494" }}>
              {data.where_when_duration.duration && (
                <span>Duration: {data.where_when_duration.duration}</span>
              )}
            </div>
            <div style={{ fontWeight: 700, color: "#969494" }}>
              {data.where_when_duration.where_and_when && (
                <span>
                  Place and When: {data.where_when_duration.where_and_when}
                </span>
              )}
            </div>
            <button onClick={() => window.open(data.info_url, "_blank")}>
              Info{" "}
            </button>
          </div>{" "}
        </div>
        {/* Image */}
        <div>
          <div>
            <div>
              <img
                src={
                  data.description.images ? data.description.images[0].url : ""
                }
                alt={
                  data.description.images ? data.description.images[0].url : ""
                }
              />
            </div>
          </div>
        </div>

        {/* Location */}

        {/* Opening Hours*/}
        <div></div>
        {/* Dont remove thse divs ! */}
        <div></div>
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
        <div style={{ marginTop: "55px" }}>
          {" "}
          <h1>Description</h1>
          <div dangerouslySetInnerHTML={{ __html: data.description.body }} />
          {/* Event Dates */}
        </div>
        <div style={{ width: 300 }}>
          {data.description.images?.map((el, index) => {
            return (
              <div key={index} onClick={() => OpenImageModal(el.url)}>
                <img src={el.url} alt={el.license_type.name} />
                <p
                  style={{
                    fontSize: "10px",
                    display: "flex",
                    color: "#858383",
                  }}
                >
                  {el.copyright_holder}
                </p>
              </div>
            );
          })}
        </div>
        <ImageModal open={open} id="imgModal" ref={ref}>
          <div>
            <button onClick={CloseImageModal}>
              <AiOutlineCloseCircle size="45px" />
            </button>
            <img src={modalImage} alt={""} />
          </div>
        </ImageModal>
      </EventsGrid>
      <div
        style={{
          gridColumn: "1/4",
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
        <div>
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

export default Activities;
