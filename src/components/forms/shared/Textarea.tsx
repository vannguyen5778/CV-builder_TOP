interface Props {
  title?: string;
  addonTag?: "optional" | "recommended" | null;
  placeholder: string;
  value?: string;
  type?: string;
  cols?: number;
  rows?: number;
  name?: string;

  onInput?: (e: any) => void;
}

function Textarea({
  title,
  name,
  addonTag = null,
  placeholder,
  value,
  cols,
  rows,
  onInput,
}: Props) {
  return (
    <div className="info-group">
      <span>
        <h3>{title}</h3>
        <p className="additional">{addonTag}</p>
      </span>
      <textarea
        cols={cols}
        rows={rows}
        name={name}
        placeholder={placeholder}
        value={value}
        onInput={onInput}
      />
    </div>
  );
}

export default Textarea;
