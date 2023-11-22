import Header from "./shared/Header";
import Input from "./shared/Input";
import { FormValues } from "@/shared/types";

type Props = {
  formValues: FormValues;
  setFormValues: (formValues: FormValues) => void;
};

function PersonalDetails({ formValues, setFormValues }: Props) {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      personalInfo: { ...formValues.personalInfo, [name]: value },
    });
  };

  return (
    <form
      id="personaldetails"
      className="personal-details ctn"
      target="_blank"
      // onSubmit={onSubmit}
      method="POST"
    >
      <Header header="Personal Details" />
      <Input
        title="Full name"
        name="fullName"
        id="fullName"
        placeholder="Enter first and last name"
        value={formValues.personalInfo.fullName}
        onInput={handleInputChange}
      />

      <Input
        type="email"
        title="Email"
        name="email"
        addonTag="recommended"
        placeholder="Enter email"
        value={formValues.personalInfo.email}
        onInput={handleInputChange}
      />
      <Input
        type="tel"
        title="Phone number"
        name="phone"
        addonTag="recommended"
        placeholder="Enter phone number"
        value={formValues.personalInfo.phone}
        onInput={handleInputChange}
      />
      <Input
        title="Address"
        name="address"
        addonTag="recommended"
        placeholder="City, Country"
        value={formValues.personalInfo.address}
        onInput={handleInputChange}
      />
    </form>
  );
}

export default PersonalDetails;
