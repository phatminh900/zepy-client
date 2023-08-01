import { Toaster } from "react-hot-toast";

const ToasterComponent = () => {
  return (
    <Toaster
      position="top-center"
      containerStyle={{ margin: "8px" }}
      toastOptions={{
        error: {
          duration: 5000,
        },
        success: {
          duration: 5000,
        },
        style: {
          maxWidth: "500px",
          padding: "16px 24px",
          backgroundColor: "var(--color-grey-0)",
          color: "var(--color-grey-700)",
        },
      }}
      gutter={11}
    />
  );
};
export default ToasterComponent;
