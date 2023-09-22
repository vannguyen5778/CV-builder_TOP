import React from "react";
import FormSectionHeader from "../FormSectionHeader";
import FormInfoGroup from "../FormInfoGroup";

function PersonalDetaisInput() {
  return (
    <div className="personal-details-ctn">
      <FormSectionHeader header="Personal Details" />
      <FormInfoGroup
        infoTitle="Full name"
        placeholder="Enter first and last name"
        value="Ivan Ivanov"
      />
      <FormInfoGroup
        type="email"
        infoTitle="Email"
        addonTag="recommended"
        placeholder="Enter email"
        value="josephine.meyers@mail.co.uk"
      />
      <FormInfoGroup
        infoTitle="Phone number"
        addonTag="recommended"
        placeholder="Enter phone number"
        value="+44 3245 5521 5521"
      />
      <FormInfoGroup
        infoTitle="Address"
        addonTag="recommended"
        placeholder="City, Country"
        value="London, UK"
      />
    </div>
  );
}

export default PersonalDetaisInput;
