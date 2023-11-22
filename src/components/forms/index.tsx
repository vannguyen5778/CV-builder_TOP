import PersonalDetails from "./PersonalDetails";
import ProjectsSection from "./Projects";
import { SkillsSection } from "./Skills";
import "@/assets/styles/forms.css";
import { CertificatesSection } from "./Certificates";
import { EducationSection } from "./Education";
import { ExperienceSection } from "./Experience";
import {
  FormValues,
  FormDataProps,
  SavedFormProps,
  isHiddenProps,
} from "@/shared/types";
import html2pdf from "html2pdf.js";
import downloadLogo from "@/assets/images/download.png";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { DropResult } from "react-beautiful-dnd";

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
  // const [nameItems, updateNameItems] = useState(savedNames);
  // const handleDragEnd = (result) => {
  //   const items = Array.from(nameItems);
  //   const [reorderedItem] = items.splice(result.source.index, 1)
  //   items.splice(result.destination.index, 0, reorderedItem)
  //   updateNameItems(items);
  // }
  const handleOnDragEnd = (result: DropResult) => {
    console.log(result)
  }
  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <div className="form-ctn">
        <PersonalDetails
          formValues={formValues}
          setFormValues={setFormValues}
        />

        <Droppable droppableId="form-container">
          {(provided) => (
            <div
              className="drop-ctn"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              <Draggable draggableId="edu-ctn" index={1}>
                {(provided) => (
                  <div
                    className="drop add-section ctn"
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                  >
                   
                    <EducationSection
                      formValues={formValues}
                      setFormValues={setFormValues}
                      formData={formData}
                      setFormData={setFormData}
                      savedForm={savedForm}
                      setSavedForm={setSavedForm}
                    />
                  </div>
                )}
              </Draggable>

              <Draggable draggableId="experience-ctn" index={2}>
                {(provided) => (
                  <div
                    className="drop add-section ctn"
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                  >
                    <div>hello its me</div>
                    {/* <ExperienceSection
                      formValues={formValues}
                      setFormValues={setFormValues}
                      formData={formData}
                      setFormData={setFormData}
                      savedForm={savedForm}
                      setSavedForm={setSavedForm}
                    /> */}
                  </div>
                )}
              </Draggable>
              <Draggable draggableId="projects-ctn" index={3}>
                {(provided) => (
                  <div
                    className="drop add-section ctn"
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                  >
                    Hello worldf
                    {/* <ProjectsSection
                      formValues={formValues}
                      setFormValues={setFormValues}
                      formData={formData}
                      setFormData={setFormData}
                      savedForm={savedForm}
                      setSavedForm={setSavedForm}
                    /> */}
                  </div>
                )}
              </Draggable>

              <Draggable draggableId="skills-ctn" index={4}>
                {(provided) => (
                  <div
                    className="drop add-section ctn"
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                  >
                    Hello worldf
                    {/* <SkillsSection
                      formValues={formValues}
                      setFormValues={setFormValues}
                      formData={formData}
                      setFormData={setFormData}
                      savedForm={savedForm}
                      setSavedForm={setSavedForm}
                    /> */}
                  </div>
                )}
              </Draggable>

              <Draggable draggableId="certificates-ctn" index={5}>
                {(provided) => (
                  <div
                    className="drop add-section ctn"
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                  >
                    Hello worldf
                    {/* <CertificatesSection
                      formValues={formValues}
                      setFormValues={setFormValues}
                      formData={formData}
                      setFormData={setFormData}
                      savedForm={savedForm}
                      setSavedForm={setSavedForm}
                    /> */}
                  </div>
                )}
              </Draggable>

              {provided.placeholder}
              <button
                className="button download-btn"
                onClick={convertAndDownloadPDF}
              >
                <img src={downloadLogo} alt="" /> <span>Download</span>
              </button>
            </div>
          )}
        </Droppable>
      </div>
    </DragDropContext>
  );
}

export default Forms;
