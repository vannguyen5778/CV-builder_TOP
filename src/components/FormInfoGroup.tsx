import React from 'react'

interface Props {
  infoTitle: string;
  addonTag?: "optional" | "recommended" | null;
  placeholder: string;
  value: string;
  type?: string;
}
function FormInfoGroup({ type="text", infoTitle, addonTag = null, placeholder, value }: Props) {
  return (
    <div className="info-group">
        <span>
        <h3>{infoTitle}</h3>
        <p className="additional">{addonTag}</p>
        </span>
        <input type={type} placeholder={placeholder} value={value} />
    </div>
  )
}

export default FormInfoGroup