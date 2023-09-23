import {
  ButtonHTMLAttributes,
  cloneElement,
  createContext,
  memo,
  useContext,
  useState,
} from "react";
import { twMerge } from "tailwind-merge";
import { HiOutlineX } from "react-icons/hi";
import useClickOutside from "src/hooks/useClickOutside.hook";

interface IModalContext {
  openName: string;
  open: (modalName: string) => void;
  close: () => void;
}
const ModalContext = createContext<IModalContext | null>(null);
const useModalContext = () => {
  const ctx = useContext(ModalContext);
  if (!ctx)
    throw new Error("Using modal context outside of modal context prodvider");
  return ctx;
};
const ModalMemo = memo(function ModalMemo({ children }: Children) {
  const [openName, setOpenName] = useState("");
  const open = (modalName: string) => {
    setOpenName(modalName);
  };
  const close = () => setOpenName("");
  return (
    <ModalContext.Provider value={{ open, openName, close }}>
      {children}
    </ModalContext.Provider>
  );
});
interface IButton extends ButtonHTMLAttributes<HTMLButtonElement> {
  name: string;
  children: React.ReactNode;
}
const Button = ({ name, children, onClick }: IButton) => {
  const { open, close, openName } = useModalContext();
  return cloneElement(children! as React.ReactElement<any>, {
    onClick: () => {
      openName ? close() : open(name);
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      onClick?.();
    },
  });
};

const Window = memo(function Window({
  children,
  name,
  className,
}: {
  className?: string;
  children: React.ReactNode;
  name: string;
}) {
  const { close, openName } = useModalContext();
  const { ref } = useClickOutside(close, true);
  if (openName !== name) return null;
  return (
    // Overlay
    <div className="fixed inset-0 z-[999] bg-black/60 backdrop-blur">
      {/* Modal */}
      <div
        ref={ref}
        style={{ top: "50%", translate: "0 -50%" }}
        className={twMerge(
          "w-4/5 left-1/2  -translate-x-1/2  md:w-full h-full md:max-w-[450px] md:h-[90%]  absolute bg-[var(--color-grey-100)] md:left-1/2 md:-translate-x-1/2  lg:rounded-md ",
          className
        )}
      >
        <div className="flex justify-end p-2">
          <button
            className="text-2xl hover:text-[var(--color-danger)]"
            onClick={close}
          >
            <HiOutlineX />
          </button>
        </div>
        <div>
          {cloneElement(children! as React.ReactElement<any>, {
            onClose: close,
          })}
        </div>
      </div>
    </div>
  );
});

// Modal.displayName="Button"
// Modal.displayName='Window'
// Modal.Button = Button;
// Modal.Window = Window;
const Modal = Object.assign(ModalMemo, { Button, Window });
export default Modal;
