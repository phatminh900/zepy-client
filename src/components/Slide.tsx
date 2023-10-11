import { ISlide } from "./slider";
const Slide = ({ title, height = 100, width = 100, text, imgSrc }: ISlide) => {
  return (
    <li
      data-testid="slide"
      className="absolute w-full h-full md:h-3/5 lg:h-[70%] duration-1000 transition-all"
    >
      <div className="w-full h-full">
        <img
          src={imgSrc}
          alt="Slide"
          style={{ height: height + "%", width: width + "%" }}
        />
      </div>
      {text || title ? (
        <div className="text-center mt-4">
          <h3 className="text-[var(--color-primary)] text-lg mb-2 lg:mb-4">
            {title}
          </h3>
          <p>{text}</p>
        </div>
      ) : null}
    </li>
  );
};
export default Slide;
