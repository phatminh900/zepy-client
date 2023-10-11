import { screen, render, within } from "@testing-library/react";
import { test, expect, describe, beforeAll, vi } from "vitest";
import Slider, { ISlide } from "../slider";
import Slide from "../Slide";
import { SliderActions } from "src/pages/private/chats/greeting/greeting.container";
import userEvent from "@testing-library/user-event";
beforeAll(() => {
  window.HTMLMediaElement.prototype.play = vi.fn();
});
describe("render", () => {
  test("render all imgs provided with matched imgSrc", () => {
    const sliders: ISlide[] = [
      {
        imgSrc: `/imgs/meeting-dark.svg`,
        text: "escription.1",
        title: "title.1",
      },
      {
        imgSrc: `/imgs/schedule-dark.svg`,
        text: "escription.2",
        title: "title.2",
      },
      {
        imgSrc: `/imgs/work-dark.svg`,
        text: "escription.3",
        title: "title.3",
      },
      {
        imgSrc: `/imgs/task-dark.svg`,
        text: "escription.4",
        title: "title.4",
      },
    ];
    render(
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
    );
    const sliderContainer = screen.getByTestId("slider-container");
    const slides = within(sliderContainer).getAllByTestId("slide");
    expect(slides).toHaveLength(sliders.length);
    //
    sliders.forEach((slide, i) => {
      expect(within(slides[i]).getByRole("img")).toHaveAttribute(
        "src",
        `${slide.imgSrc}`
      );
      // expect(slides[i]).toHaveAttribute('src',)
    });
  });
  test("render all imgs with translate property (0%,100%,....)", () => {
    const sliders: ISlide[] = [
      {
        imgSrc: `/imgs/meeting-dark.svg`,
        text: "escription.1",
        title: "title.1",
      },
      {
        imgSrc: `/imgs/schedule-dark.svg`,
        text: "escription.2",
        title: "title.2",
      },
      {
        imgSrc: `/imgs/work-dark.svg`,
        text: "escription.3",
        title: "title.3",
      },
      {
        imgSrc: `/imgs/task-dark.svg`,
        text: "escription.4",
        title: "title.4",
      },
    ];
    render(
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
    );
    const sliderContainer = screen.getByTestId("slider-container");
    const slides = within(sliderContainer).getAllByTestId("slide");
    slides.forEach((slide, i) => {
      expect(slide).toHaveStyle(`translate:${i * 100}% 0`);
    });
  });
  test("render all imgs with translate property (0%,100%,....)", () => {
    const sliders: ISlide[] = [
      {
        imgSrc: `/imgs/meeting-dark.svg`,
        text: "escription.1",
        title: "title.1",
      },
      {
        imgSrc: `/imgs/schedule-dark.svg`,
        text: "escription.2",
        title: "title.2",
      },
      {
        imgSrc: `/imgs/work-dark.svg`,
        text: "escription.3",
        title: "title.3",
      },
      {
        imgSrc: `/imgs/task-dark.svg`,
        text: "escription.4",
        title: "title.4",
      },
    ];
    render(
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
    );
    const sliderContainer = screen.getByTestId("slider-container");
    const slides = within(sliderContainer).getAllByTestId("slide");
    slides.forEach((slide, i) => {
      expect(slide).toHaveStyle(`translate:${i * 100}% 0`);
    });
  });
});
function renderComponent() {
  const sliders: ISlide[] = [
    {
      imgSrc: `/imgs/meeting-dark.svg`,
      text: "escription.1",
      title: "title.1",
    },
    {
      imgSrc: `/imgs/schedule-dark.svg`,
      text: "escription.2",
      title: "title.2",
    },
    {
      imgSrc: `/imgs/work-dark.svg`,
      text: "escription.3",
      title: "title.3",
    },
    {
      imgSrc: `/imgs/task-dark.svg`,
      text: "escription.4",
      title: "title.4",
    },
  ];
  render(
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
  );
}
describe("actions", () => {
  describe("next slide", () => {
    test("go to the next slide", async () => {
      renderComponent();
      const user = userEvent.setup();
      const btnNextSlide = screen.getByTestId("btn-next-slide");
      //   all slides
      const slides = screen.getAllByTestId("slide");
      // initial 0% 100% 200%
      await user.click(btnNextSlide);
      // after clicking -100% 0% 100%
      slides.forEach((slide, i) => {
        expect(slide).toHaveStyle(`translate:${(i - 1) * 100}% 0`);
      });
    });
    test.only("at the last slide go to the 1st one", async () => {
      renderComponent();
      const user = userEvent.setup();
      const btnNextSlide = screen.getByTestId("btn-next-slide");
      //   all slides
      const slides = screen.getAllByTestId("slide");
      // initial 0%
      const firstSlide = slides[0];
      for (let i = 0; i < slides.length; i++) {
        await user.click(btnNextSlide);
      }
      // after clicking 0%
      expect(firstSlide).toHaveStyle("translate:0% 0");
    });
  });
  describe("prev slide", () => {
    test("go to the prev slide", async () => {
      renderComponent();
      const user = userEvent.setup();
      const btnNextSlide = screen.getByTestId("btn-next-slide");
      const btnPrevSlide = screen.getByTestId("btn-prev-slide");
      //   all slides
      const slides = screen.getAllByTestId("slide");
      // initial 0% 100% 200%
      await user.click(btnNextSlide);
      // after clicking next -100% 0% 100%

      //   go to prev slide (0% 100% 200%)
      await user.click(btnPrevSlide);
      slides.forEach((slide, i) => {
        expect(slide).toHaveStyle(`translate:${i * 100}% 0`);
      });
    });
    test("at the first slide go to the last one", async () => {
      renderComponent();
      const user = userEvent.setup();
      const btnPrevSlide = screen.getByTestId("btn-prev-slide");
      //   all slides
      const slides = screen.getAllByTestId("slide");
      // initial 0%
      const firstSlide = slides[0];
      await user.click(btnPrevSlide);
      // after clicking
      expect(firstSlide).toHaveStyle(
        `translate:-${(slides.length - 1) * 100}% 0`
      );
      //   expect(firstSlide).toHaveStyle("translate:0% 0");
    });
  });
});
