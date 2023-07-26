const FormInputRow = ({
  icon,
  inputType = "text",
  placeholder,
}: {
  icon: React.ReactNode;
  placeholder: string;
  inputType?: string;
}) => {
  return (
    <div className="flex items-center space-x-3  border-b border-b-[var(--color-grey-500)] ">
      {icon}
      <input
        className="py-3 text-sm md:text-lg"
        type={inputType}
        placeholder={placeholder}
      />
    </div>
  );
};
export default FormInputRow;
