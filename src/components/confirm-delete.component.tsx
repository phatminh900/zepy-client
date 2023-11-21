import Button from "./button";

function ConfirmDelete({
  resourceName,
  onClose,
  onConfirm,
  disabled,
}: {
  resourceName: string;
  onClose: () => void;
  onConfirm: () => void;
  disabled: boolean;
}) {
  const handleConfirm = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onConfirm();
    onClose();
  };
  return (
    <div className="px-4 py-2 text-sm  md:max-w-[400px] z-[9999]  h-auto top-1/2  md:pl-6 md:py-3 md:pb-5 w-full flex flex-col gap-3">
      <h3 className="font-semibold text-2xl ">Delete {resourceName}</h3>
      <p className="text-[var(--color-grey-500)] mb-3">
        Are you sure you want to delete this {resourceName} permanently? This
        action cannot be undone.
      </p>

      <div className="flex justify-end gap-3">
        <Button
          variation="danger"
          disabled={disabled}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onClose();
          }}
        >
          Cancel
        </Button>
        <Button onClick={handleConfirm} variation="danger" disabled={disabled}>
          Delete
        </Button>
      </div>
    </div>
  );
}

export default ConfirmDelete;
