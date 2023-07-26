import { ISlide } from "./slider";

const Slide = ({ title, height = 100, width = 100, text, imgSrc }: ISlide) => {
  return (
    <li className="absolute w-full h-full duration-1000 transition-all">
      <div>
        <img
          src={imgSrc}
          alt="Slide"
          style={{ height: height + "%", width: width + "%" }}
        />
      </div>
      {text || title ? (
        <div className="text-center mt-4">
          <h3 className="text-[var(--color-primary)] text-lg mb-4">{title}</h3>
          <p>{text}</p>
        </div>
      ) : null}
    </li>
  );
};
export default Slide;
