interface IFormInputRow {
  icon: React.ReactNode;
  children: React.ReactNode;
  errMsg?: string | undefined;
}

const FormInputRow = ({ errMsg, icon, children }: IFormInputRow) => {
  return (
    <>
      <div className="flex  items-center space-x-3  border-b border-b-[var(--color-grey-500)] ">
        {icon}
        {children}
      </div>

      {errMsg && (
        <p className="my-2 text-sm text-[var(--color-danger)]">{errMsg}</p>
      )}
    </>
  );
};
export default FormInputRow;
