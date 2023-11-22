interface Props {
  title?: string;
  addonTag?: "optional" | "recommended" | null;
  placeholder?: string;
  value?: string | number | undefined;
  type?: string;
  name?: string;
  id?: string;
  onInput?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function Input({
  type = "text",
  title,
  id,
  addonTag = null,
  placeholder,
  value,
  name,
  onInput,
}: Props) {
  return (
    <div className="info-group">
      <span>
        <h3>{title}</h3>
        <p className="additional">{addonTag}</p>
      </span>
      <input
        type={type}
        id={id}
        placeholder={placeholder}
        value={value}
        name={name}
        onInput={onInput}
      />
    </div>
  );
}

export default Input;
