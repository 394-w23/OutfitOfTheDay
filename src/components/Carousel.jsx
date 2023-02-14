import Carousel from "react-bootstrap/Carousel";

const MyCarousel = ({ data }) => {
  return (
    <div className="carousel">
      <Carousel interval={null}>
        {data.map((imageLink, idx) => (
          <Carousel.Item key={idx}>
            <img
              className="w-100 shadow-1-strong rounded mb-4"
              src={imageLink}
              alt="Slide"
            />
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
};

export default MyCarousel;
