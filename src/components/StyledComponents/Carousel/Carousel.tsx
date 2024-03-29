import React from "react";
import Carousel from "react-multi-carousel";
import ItemCard from "../ItemCard/ItemCard";
import "react-multi-carousel/lib/styles.css";
import { SvgContainer } from "../Styles";
import LoadingIcon from "../SvgIcons/LoadingIcon";
interface Props {
  type: string;
  data: {
    name: Language;
    id: string;
    description: Images;
    location: { lat: number; lon: number };
    event_dates: { starting_day: string };
  }[];
}

type Language = {
  en: string;
  fi: string;
};
interface Imageobj {
  url: string;
}
type Images = {
  images: Imageobj[];
};

const responsive = {
  superLargeDesktop: {
    // the naming can be any.
    breakpoint: { max: 4000, min: 1801 },
    items: 4,
  },
  desktop: {
    breakpoint: { max: 1800, min: 1401 },
    items: 4,
  },
  desktoptw: {
    breakpoint: { max: 1400, min: 1024 },
    items: 4,
  },

  tablet: {
    breakpoint: { max: 1023, min: 464 },
    items: 3,
  },
  mobile: {
    breakpoint: { max: 464, min: 321 },
    items: 2,
  },
};
const CarouselComp: React.FC<Props> = ({ data, type }) => {
  data.sort((a, b) => {
    if (a.description.images == null) return 1; // this function fixes issues if the Api has value null
    if (b.description.images == null) return 0;
    return b.description.images.length - a.description.images.length;
  });
  if (!data.length) {
    return (
      <SvgContainer width={120} height={150} style={{ margin: "0 auto" }}>
        <LoadingIcon />
      </SvgContainer>
    );
  }
  return (
    <Carousel renderButtonGroupOutside={true} responsive={responsive}>
      {data.map((el, index) => {
        return <ItemCard key={index} type={type} data={el} width={"140"} />;
      })}
    </Carousel>
  );
};

export default CarouselComp;
