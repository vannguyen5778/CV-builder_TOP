import PersonalDetails from "./PersonalDetails";
import ProjectsSection from "./Projects";
import { SkillsSection } from "./Skills";
import "@/assets/styles/forms.css";
import { CertificatesSection } from "./Certificates";
import { EducationSection } from "./Education";
import { ExperienceSection } from "./Experience";
import { FormValues, FormDataProps, SavedFormProps, isHiddenProps } from "@/shared/types";
import html2pdf from "html2pdf.js";
import downloadLogo from "@/assets/images/download.png";

type Props = {
  formValues: FormValues;
  setFormValues: (formValues: FormValues) => void;
  formData: FormDataProps;
  setFormData: (formData: FormDataProps) => void;
  savedForm: SavedFormProps;
  setSavedForm: (savedForm: SavedFormProps) => void;

};

function Forms({
  formValues,
  setFormValues,
  formData,
  setFormData,
  savedForm,
  setSavedForm,

}: Props) {
  const convertAndDownloadPDF = () => {
    const resume = document.getElementById("resumeCtn"); // Replace 'htmlElementId' with the ID of the HTML element you want to convert

    if (resume) {
      html2pdf()
        .set({ html2canvas: { scale: 2 } }) // Optional configuration for html2canvas
        .from(resume)
        .save("resume.pdf");
    }
  };
  return (
    <div className="form-ctn">
      <PersonalDetails formValues={formValues} setFormValues={setFormValues} />
      <EducationSection
        formValues={formValues}
        setFormValues={setFormValues}
        formData={formData}
        setFormData={setFormData}
        savedForm={savedForm}
        setSavedForm={setSavedForm}
      />
      <ExperienceSection
        formValues={formValues}
        setFormValues={setFormValues}
        formData={formData}
        setFormData={setFormData}
        savedForm={savedForm}
        setSavedForm={setSavedForm}
      />
      <ProjectsSection
        formValues={formValues}
        setFormValues={setFormValues}
        formData={formData}
        setFormData={setFormData}
        savedForm={savedForm}
        setSavedForm={setSavedForm}
      />
      <SkillsSection
        formValues={formValues}
        setFormValues={setFormValues}
        formData={formData}
        setFormData={setFormData}
        savedForm={savedForm}
        setSavedForm={setSavedForm}
      />
      <CertificatesSection
        formValues={formValues}
        setFormValues={setFormValues}
        formData={formData}
        setFormData={setFormData}
        savedForm={savedForm}
        setSavedForm={setSavedForm}
      />
      <button className="button download-btn" onClick={convertAndDownloadPDF}>
          <img src={downloadLogo} alt="" />{" "}
        <span>
        Download
        </span>
      </button>
    </div>
  );
}

export default Forms;
