import { useTranslation } from "react-i18next";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";
import Slide from "src/components/Slide";
import Slider, { ISlide } from "src/components/slider";
import { useThemeContext } from "src/contexts/theme.context";

const Greeting = () => {
  const { t } = useTranslation("greeting");
  const { isDarkMode } = useThemeContext();
  const sliders: ISlide[] = [
    {
      imgSrc: `/imgs/meeting-${isDarkMode ? "dark" : "light"}.svg`,
      text: t("description.1"),
      title: t("title.1"),
    },
    {
      imgSrc: `/imgs/schedule-${isDarkMode ? "dark" : "light"}.svg`,
      text: t("description.2"),
      title: t("title.2"),
    },
    {
      imgSrc: `/imgs/work-${isDarkMode ? "dark" : "light"}.svg`,
      text: t("description.3"),
      title: t("title.3"),
    },
    {
      imgSrc: `/imgs/task-${isDarkMode ? "dark" : "light"}.svg`,
      text: t("description.4"),
      title: t("title.4"),
    },
  ];
  return (
    <div className="md:block  relative w-4/5 m-auto py-[10%] h-full ">
      <h3 className=" mb-4 lg:mb-6 text-center text-xl">
        {t("introduction")} <strong>Zepy &mdash; {t("sologan")}.</strong>
      </h3>
      <Slider
        data={sliders}
        render={(slide) => <Slide key={slide.imgSrc} {...slide}></Slide>}
      >
        {/* Clone element override existing props */}
        <SliderActions
          currentSlide={0}
          sliders={sliders}
          onGotoNextSlide={() => {}}
          onGotoPrev={() => {}}
          onGotoSlide={() => {}}
        />
        {/* <Dots sliders={sliders} currentSlide={0} onGotoSlide={() => {}} /> */}
      </Slider>
    </div>
  );
};

export default Greeting;

export function SliderActions({
  onGotoPrev,
  onGotoNextSlide,
  onGotoSlide,
  sliders,
  currentSlide,
}: {
  onGotoSlide: (slide: number) => void;
  onGotoNextSlide: () => void;
  onGotoPrev: () => void;
  sliders: ISlide[];
  currentSlide: number;
}) {
  return (
    <>
      <button
        data-testid="btn-prev-slide"
        onClick={onGotoPrev}
        className="text-5xl absolute top-1/2 left-[-10%] translate-x-1/2"
      >
        <HiChevronLeft className="text-[var(--color-grey-400)] hover:text-[var(--color-grey-500)] duration-200]" />
      </button>
      <button
        data-testid="btn-next-slide"
        className="text-5xl absolute  top-1/2 translate-x-1/2 right-0"
        onClick={onGotoNextSlide}
      >
        <HiChevronRight className="text-[var(--color-grey-400)] hover:text-[var(--color-grey-500)] duration-200]" />
      </button>
      <Dots
        sliders={sliders}
        currentSlide={currentSlide}
        onGotoSlide={onGotoSlide}
      />
    </>
  );
}

const Dots = ({
  sliders,
  onGotoSlide,
  currentSlide,
}: {
  sliders: ISlide[];
  currentSlide: number;
  onGotoSlide: (slide: number) => void;
}) => {
  return (
    <ul className="mt-4 flex gap-3 relative bottom-[10%] w-full justify-center ">
      {sliders.map((d, index) => (
        <li key={d.imgSrc}>
          <button
            onClick={() => onGotoSlide(index)}
            className={`w-2 h-2 rounded-full bg-[var(--color-grey-400)] ${
              index === currentSlide && "!bg-[var(--color-primary)]"
            }`}
          >
            &nbsp;
          </button>
        </li>
      ))}
    </ul>
  );
};
