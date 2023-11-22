type Props = {
  isFormOpen?: boolean;
  setFormOpen?: (isFormOpen: boolean) => void;
  setForm: (isOpen: boolean) => void;
  resetFormValues: () => void;
  addFormContent: () => void;
  displayElement: () => void;
  deleteElement: () => void;
};

const Buttons = ({
  isFormOpen,
  displayElement,
  setForm,
  resetFormValues,
  deleteElement,
}: Props) => {
  const handleDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setForm(false);
    resetFormValues();
    deleteElement();
  };
  const handleCancel = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    resetFormValues();
    setForm(false);
  };
  const handleSave = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    displayElement();
    resetFormValues();
    setForm(false);
  };

  return (
    <div className="buttons">
      <button className="white" onClick={handleDelete}>
        <p>Delete</p>
      </button>
      <div className="flex-wrap">
        <button className="white" onClick={handleCancel}>
          Cancel
        </button>
        <button className="blue" onClick={handleSave}>
          Save
        </button>
      </div>
    </div>
  );
};

export default Buttons;
