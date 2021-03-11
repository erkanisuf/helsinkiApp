import React from "react";
import { EventsGrid, SvgContainer, Tags } from "../StyledComponents/Styles";
import moment from "moment";
import PostReview from "../Reviews/PostReview";
import MapsAPI from "../MapsAPI/MapsAPI";
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

    event_dates: {
      additional_description?: string;
      ending_day?: string;
      starting_day?: string;
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

const Events: React.FC<Props> = ({ data }) => {
  return (
    <div>
      <EventsGrid textlength={data.name.fi.length}>
        {/* TextLenght Puts font size depending of text length */}
        {/* Name and Link URL */}
        <div>
          <h1>{data.name.fi} </h1>
          <div style={{ fontWeight: 800 }}>
            Starting Day:{" "}
            {moment(data.event_dates.starting_day).format(
              "MMMM Do YYYY, h:mm:ss a"
            )}
          </div>
          <div>
            <button onClick={() => window.open(data.info_url, "_blank")}>
              Tickets{" "}
            </button>
          </div>
        </div>
        {/* Image */}
        <div>
          <div>
            {data.description.images?.map((el, index) => {
              return (
                <div key={index}>
                  <img src={el.url} alt={el.license_type.name} />
                  <p>{el.copyright_holder}</p>{" "}
                </div>
              );
            })}{" "}
          </div>
        </div>
        {/* Location */}
        <div></div>
        {/* Opening Hours*/}
        <div></div>
        {/* Tags */}

        <div>
          {data.tags.map((el, index) => {
            return <Tags key={index}># {el.name}</Tags>;
          })}{" "}
        </div>
        {/* Description Body text */}
        <div>
          {" "}
          <h1>Description</h1>
          <div dangerouslySetInnerHTML={{ __html: data.description.body }} />
          {/* Event Dates */}
        </div>

        <div
          style={{
            gridColumn: "1/4",
            borderTop: "1px solid #ccc",
            paddingTop: "15px",
          }}
        >
          <PostReview id={data.id} />
        </div>
      </EventsGrid>
      <div style={{ width: "80%", margin: "0 auto" }}>
        <SvgContainer width={200} height={150} style={{ margin: "0 auto" }}>
          <PlacesIcon /> <h1> Location</h1>
        </SvgContainer>
        {data.location.address.locality},{data.location.address.postal_code},
        {data.location.address.street_address}
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

export default Events;
