import React from "react";
import { useState, useEffect } from "react";
import Textarea from "@/components/forms/shared/Textarea";
import Input from "@/components/forms/shared//Input";
import { FormValues, FormDataProps, SavedFormProps } from "@/shared/types";
import Buttons from "@/components/forms/shared//Buttons";
import { v4 as uuidv4 } from "uuid";
import { useSection } from "@/context/SectionContext";

type Props = {
  formValues: FormValues;
  setFormValues: (formValues: FormValues) => void;
  formData: FormDataProps;
  setFormData: (formData: FormDataProps) => void;
  savedForm: SavedFormProps;
  setSavedForm: (savedForm: SavedFormProps) => void;
};

export const ProjectsSection = ({
  formValues,
  setFormValues,
  formData,
  setFormData,
  savedForm,
  setSavedForm,
}: Props) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(true);
  const [isFormOpen, setFormOpen] = useState<boolean>(false);
  const {
    isEditing,
    isHiddenStates,
    setIsHiddenStates,
    setIsEditing,
    savedNames,
    setSavedNames,
  } = useSection();

  const handleChevron = () => {
    setIsExpanded((prevIsExpanded) => !prevIsExpanded);
  };

  const handleEye = (index: number) => {
    const updatedSection = [...isHiddenStates.projects];
    updatedSection[index] = !updatedSection[index];
    const updatedState = { ...isHiddenStates, projects: updatedSection };
    setIsHiddenStates(updatedState);
    localStorage.setItem("isHiddenStates", JSON.stringify(updatedState));
  };

  useEffect(() => {
    const isHiddenStatesFromStorage = localStorage.getItem("isHiddenStates");
    if (isHiddenStatesFromStorage) {
      setIsHiddenStates(JSON.parse(isHiddenStatesFromStorage));
    }
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (isEditing) {
      const { name, value } = e.target;
      setSavedForm({
        ...savedForm,
        projects: {
          ...savedForm.projects,
          [name]: value,
        },
      });
    } else {
      resetSavedForm();
      const { name, value } = e.target;
      setFormValues({
        ...formValues,
        projects: {
          ...formValues.projects,
          [name]: value,
        },
      });
    }
  };

  const handleSetForm = (isOpen: boolean) => {
    setFormOpen(isOpen);
  };

  const resetFormValues = () => {
    const updatedFormValues: typeof formValues = { ...formValues };
    for (const key in updatedFormValues.projects) {
      if (key in updatedFormValues.projects) {
        updatedFormValues.projects[
          key as keyof typeof updatedFormValues.projects
        ] = "";
      }
    }
    setFormValues(updatedFormValues);
  };

  const resetSavedForm = () => {
    const updatedSavedForm: typeof savedForm = { ...savedForm };
    for (const key in updatedSavedForm.projects) {
      if (key in updatedSavedForm.projects) {
        updatedSavedForm.projects[
          key as keyof typeof updatedSavedForm.projects
        ] = "";
      }
    }
    setSavedForm(updatedSavedForm);
  };

  const addElement = (id?: string) => {
    return (
      <>
        {savedNames.projects && savedNames.projects.length > 0 && (
          <div>
            {savedNames.projects.map((savedName, index) => (
              <div className="forms-container flexbox">
                <button
                  id={savedName.id}
                  className="collapsed-form section-form flexbox"
                  onClick={handleOpenSavedForm}
                >
                  <span className="collapsed-form-title">{savedName.name}</span>
                  <i
                    className={
                      isHiddenStates.projects[index]
                        ? "fa fa-eye-slash eye-icon"
                        : "fa fa-eye eye-icon"
                    }
                    onClick={(e) => {
                      e.stopPropagation();
                      handleEye(index);
                    }}
                  ></i>
                </button>
              </div>
            ))}
          </div>
        )}
      </>
    );
  };

  const deleteElement = () => {
    setFormData((formEls) => {
      const updatedProjectsForms = formEls.projects.filter(
        (el) => el.id !== savedForm.projects.id
      );
      return {
        ...formEls,
        projects: updatedProjectsForms.length > 0 ? updatedProjectsForms : [],
      };
    });

    setSavedNames((nameList) => {
      const updatedProjectsNames = nameList.projects.filter(
        (el) => el.id !== savedForm.projects.id
      );
      return {
        ...nameList,
        projects: updatedProjectsNames,
      };
    });
  };

  const displayElement = () => {
    const existingFormDataIndex = formData.projects.findIndex(
      (element) => element.id === savedForm.projects.id
    );

    if (existingFormDataIndex === -1) {
      const newSavedName = {
        id: uuidv4(),
        name: formValues.projects.project,
      };

      const updatedProjectsSavedNames = savedNames.projects
        ? [...savedNames.projects, newSavedName]
        : [newSavedName];

      const updatedSavedNames = {
        ...savedNames,
        projects: updatedProjectsSavedNames,
      };
      setSavedNames(updatedSavedNames);
      localStorage.setItem("savedNames", JSON.stringify(updatedSavedNames));

      const newProjectsFormData = {
        id: newSavedName.id,
        ...formValues.projects,
      };
      const updatedProjectsFormData = formData.projects
        ? [...formData.projects, newProjectsFormData]
        : [newProjectsFormData];

      const updatedFormData = {
        ...formData,
        projects: updatedProjectsFormData,
      };
      setFormData(updatedFormData);
      localStorage.setItem("formData", JSON.stringify(updatedFormData));

      handleSetForm(false);
      addElement(newProjectsFormData.id);
    } else {
      const updatedProjectsSavedNames = [...savedNames.projects];
      updatedProjectsSavedNames[existingFormDataIndex] = {
        id: savedForm.projects.id,
        name: savedForm.projects.project,
      };
      const updatedSavedNames = {
        ...savedNames,
        projects: updatedProjectsSavedNames,
      };
      setSavedNames(updatedSavedNames);
      localStorage.setItem("savedNames", JSON.stringify(updatedSavedNames));

      const updatedProjectsFormData = [...formData.projects];
      updatedProjectsFormData[existingFormDataIndex] = {
        id: savedForm.projects.id,
        ...savedForm.projects,
      };
      const updatedFormData = {
        ...formData,
        projects: updatedProjectsFormData,
      };
      setFormData(updatedFormData);
      localStorage.setItem("formData", JSON.stringify(updatedFormData));

      handleSetForm(false);
      addElement(savedForm.projects.id);
    }
  };

  useEffect(() => {
    const savedNamesFromStorage = localStorage.getItem("savedNames");
    if (savedNamesFromStorage) {
      setSavedNames(JSON.parse(savedNamesFromStorage));
    }
  }, []);

  useEffect(() => {
    const savedFormDataFromStorage = localStorage.getItem("formData");
    if (savedFormDataFromStorage) {
      setFormData(JSON.parse(savedFormDataFromStorage));
    }
  }, []);

  const handleOpenSavedForm = (e: React.MouseEvent<HTMLButtonElement>) => {
    const foundFormData = formData.projects.find(
      (element) => element.id === e.currentTarget.id
    );
    if (foundFormData) {
      if (foundFormData) {
        const updatedSavedForm: SavedFormProps = {
          projects: foundFormData,
          education: savedForm.education,
          experience: savedForm.experience,
          skills: savedForm.skills,
          certificates: savedForm.certificates,
        };
        setIsEditing(true);
        setSavedForm(updatedSavedForm);
        handleSetForm(true);
      }
    }
  };

  return (
    <div id="projects" className="add-section ctn">
      <button className="expand-section flexbox " onClick={handleChevron}>
        <h2 className="expand-section-header header">Projects</h2>
        <i
          className={isExpanded ? "fa fa-chevron-up" : "fa fa-chevron-down"}
        ></i>
      </button>

      {!isExpanded && !isFormOpen && (
        <div
          className={`section-content ${
            isExpanded && !isFormOpen ? "open" : ""
          }`}
        >
          {addElement()}

          <button
            className="create-form"
            onClick={() => {
              setFormOpen(true);
              resetFormValues();
              setIsEditing(false);
            }}
          >
            <div className="button-content bold">
              <i className="fa fa-plus"></i>
              <span className="section-add-btn">Projects</span>
            </div>
          </button>
        </div>
      )}

      {isFormOpen && !isExpanded && (
        <form
          id="projects"
          className="projects ctn"
          target="_blank"
          method="POST"
        >
          <Input
            title="Project title"
            name="project"
            placeholder="Enter project title"
            value={
              isEditing
                ? savedForm.projects.project
                : formValues.projects.project
            }
            onInput={handleInputChange}
          />

          <Textarea
            title="Description"
            name="description"
            placeholder="Enter description"
            value={
              isEditing
                ? savedForm.projects.description
                : formValues.projects.description
            }
            onInput={handleInputChange}
          />
          <Input
            title="Technologies"
            name="tech"
            placeholder="Enter technologies used"
            value={
              isEditing ? savedForm.projects.tech : formValues.projects.tech
            }
            onInput={handleInputChange}
          />
          <div className="flex-wrap">
            <Input
              title="Start date"
              name="start"
              placeholder="Enter start date"
              value={
                isEditing ? savedForm.projects.start : formValues.projects.start
              }
              onInput={handleInputChange}
            />
            <Input
              title="End date"
              name="end"
              placeholder="Enter end date"
              value={
                isEditing ? savedForm.projects.end : formValues.projects.end
              }
              onInput={handleInputChange}
            />
          </div>
          <Input
            title="Demo link"
            name="link"
            addonTag="optional"
            placeholder="Enter demo link"
            value={
              isEditing ? savedForm.projects.link : formValues.projects.link
            }
            onInput={handleInputChange}
          />

          <Buttons
            isFormOpen={isFormOpen}
            resetFormValues={resetFormValues}
            setForm={handleSetForm}
            addFormContent={addElement}
            displayElement={displayElement}
            deleteElement={deleteElement}
          />
        </form>
      )}
    </div>
  );
};

export default ProjectsSection;
