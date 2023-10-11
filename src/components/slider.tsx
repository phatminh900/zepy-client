import { cloneElement, useState, useRef, useEffect, useCallback } from "react";
import useSound from "src/hooks/useSound.hook";
import pageTurnMp3 from "src/assets/mp3/page-flip.wav";
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
  const { play } = useSound(pageTurnMp3);
  const slidesRef = useRef<HTMLUListElement | null>(null);
  const prevSlide = useCallback(() => {
    play();
    if (currentSlide === 0) return setCurrentSlide(data.length - 1);
    setCurrentSlide((prev) => --prev);
  }, [currentSlide, setCurrentSlide, data.length, play]);
  const nextSlide = useCallback(() => {
    play();
    if (currentSlide === data.length - 1) return setCurrentSlide(0);
    setCurrentSlide((prev) => ++prev);
  }, [currentSlide, setCurrentSlide, data.length, play]);
  const gotoSlide = useCallback(
    (slide: number) => {
      setCurrentSlide(slide);
      play();
    },
    [play]
  );
  //
  useEffect(() => {
    const slides = [...slidesRef.current!.querySelectorAll("li")!];
    slides.forEach(
      (slide, i) =>
        ((slide as HTMLLIElement).style.translate = `${
          (i - currentSlide) * 100
        }% 0`)
    );
  }, [currentSlide, data]);

  // 2s automatically move to the next slide
  //   TODO:PRODUCTION
  //   useEffect(() => {
  // setInterval(nextSlide, 2000);
  //   }, [nextSlide]);
  return (
    <div data-testid="slider-container" className="h-full ">
      <ul className="relative overflow-hidden h-[95%] " ref={slidesRef}>
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
