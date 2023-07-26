import { cloneElement, useState, useRef, useEffect, useCallback } from "react";
export interface ISlide {
  height?: number;
  width?: number;
  imgSrc: string;
  text?: string;
  title?: string;
}
interface ISlider {
  data: ISlide[];
  children: React.ReactNode | React.ReactElement | React.ReactElement<any>;

  render: (value: ISlide, index: number, array: ISlide[]) => React.ReactNode;
}
const Slider = ({ data, render, children }: ISlider) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slidesRef = useRef<HTMLUListElement | null>(null);
  const prevSlide = useCallback(() => {
    if (currentSlide === 0) return setCurrentSlide(data.length - 1);
    setCurrentSlide((prev) => --prev);
  }, [currentSlide, setCurrentSlide, data.length]);
  const nextSlide = useCallback(() => {
    if (currentSlide === data.length - 1) return setCurrentSlide(0);
    setCurrentSlide((prev) => ++prev);
  }, [currentSlide, setCurrentSlide, data.length]);
  const gotoSlide = useCallback((slide: number) => setCurrentSlide(slide), []);
  //
  useEffect(() => {
    const slides = [...slidesRef.current!.querySelectorAll("li")!];
    slides.forEach(
      (slide, i) =>
        ((slide as HTMLLIElement).style.translate = `${
          (i - currentSlide) * 100
        }% 0`)
    );
  }, [currentSlide]);
  // 2s automatically move to the next slide
  //   TODO:PRODUCTION
  //   useEffect(() => {
  // setInterval(nextSlide, 2000);
  //   }, [nextSlide]);
  return (
    <div className="h-full ">
      <ul className="relative overflow-hidden h-full" ref={slidesRef}>
        {data.map(render)}
      </ul>
      {/* Buttons to navigate */}
      {cloneElement(children as React.ReactElement<any>, {
        onGotoPrev: prevSlide,
        onGotoNextSlide: nextSlide,
        currentSlide: currentSlide,
        onGotoSlide: gotoSlide,
      })}
    </div>
  );
};
export default Slider;
