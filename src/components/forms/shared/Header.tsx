

interface Props {
    header: string;
}

function FormSectionHeader({ header }: Props) {
  return (
    <div className="header">{header}</div>
  )
}

export default FormSectionHeader