import { Outlet } from "react-router-dom";
const AuthContainer = () => {
  return (
    <section className="max-w-[60%] md:max-w-[80%] mx-auto mt-10">
      <h1 className=" text-center text-color-primary text-6xl font-bold mb-[var(--gutter-component-large)]">
        Zepy
      </h1>
      <div className="overflow-hidden !shadow-2xl px-4 py-3 bg-[var(--color-grey-0)] rounded-md  h-[70vh]  md:h-[75vh]">
        <Outlet />
      </div>
    </section>
  );
};
export default AuthContainer;
