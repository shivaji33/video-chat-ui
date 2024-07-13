import { useCallback, useEffect, useState } from "react";

const ImageSlider = ({ images }) => {
  const [activeSliderIndex, setActiveSliderIndex] = useState(0);

  const prevSlide = () => {
    const newIndex = (activeSliderIndex - 1 + images.length) % images.length;
    setActiveSliderIndex(newIndex);
  };

  const nextSlide = useCallback(() => {
    const newIndex = (activeSliderIndex + 1) % images.length;
    setActiveSliderIndex(newIndex);
  }, [activeSliderIndex, images.length]);

  useEffect(() => {
    const intervel = setInterval(() => {
      nextSlide();
    }, 2000);

    return () => {
      clearInterval(intervel);
    };
  }, [nextSlide]);

  return (
    <div>
      <div className="flex items-center justify-center">
        {Array.isArray(images) &&
          images?.map((image, index) => (
            <img
              key={image.id + "_" + image.name}
              src={image.url}
              className={`w-full ${
                activeSliderIndex === index ? "block" : "hidden"
              }`}
              alt={image.name}
            />
          ))}
      </div>
      <div className="flex items-center justify-center">
        {images?.map((image, index) => (
          <div  key={image.id + "_" + image.name}
            className={`dot ${activeSliderIndex === index ? "active" : ""}`}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default ImageSlider;
