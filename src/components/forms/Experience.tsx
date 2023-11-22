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

export const ExperienceSection = ({
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
    const updatedSection = [...isHiddenStates.experience];
    updatedSection[index] = !updatedSection[index];
    const updatedState = { ...isHiddenStates, experience: updatedSection };
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
        experience: {
          ...savedForm.experience,
          [name]: value,
        },
      });
    } else {
      resetSavedForm();
      const { name, value } = e.target;
      setFormValues({
        ...formValues,
        experience: {
          ...formValues.experience,
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
    for (const key in updatedFormValues.experience) {
      if (key in updatedFormValues.experience) {
        updatedFormValues.experience[
          key as keyof typeof updatedFormValues.experience
        ] = "";
      }
    }
    setFormValues(updatedFormValues);
  };

  const resetSavedForm = () => {
    const updatedSavedForm: typeof savedForm = { ...savedForm };
    for (const key in updatedSavedForm.experience) {
      if (key in updatedSavedForm.experience) {
        updatedSavedForm.experience[
          key as keyof typeof updatedSavedForm.experience
        ] = "";
      }
    }
    setSavedForm(updatedSavedForm);
  };

  const addElement = (id?: string) => {
    return (
      <>
        {savedNames.experience && savedNames.experience.length > 0 && (
          <div>
            {savedNames.experience.map((savedName, index) => (
              <div className="forms-container flexbox">
                <button
                  id={savedName.id}
                  className="collapsed-form section-form flexbox"
                  onClick={handleOpenSavedForm}
                >
                  <span className="collapsed-form-title">{savedName.name}</span>
                  <i
                    className={
                      isHiddenStates.experience[index]
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
      const updatedExperienceForms = formEls.experience.filter(
        (el) => el.id !== savedForm.experience.id
      );
      return {
        ...formEls,
        experience:
          updatedExperienceForms.length > 0 ? updatedExperienceForms : [],
      };
    });

    setSavedNames((nameList) => {
      const updatedExperienceNames = nameList.experience.filter(
        (el) => el.id !== savedForm.experience.id
      );
      return {
        ...nameList,
        experience: updatedExperienceNames,
      };
    });
  };

  const displayElement = () => {
    const existingFormDataIndex = formData.experience.findIndex(
      (element) => element.id === savedForm.experience.id
    );

    if (existingFormDataIndex === -1) {
      const newSavedName = {
        id: uuidv4(),
        name: formValues.experience.company,
      };

      const updatedExperienceSavedNames = savedNames.experience
        ? [...savedNames.experience, newSavedName]
        : [newSavedName];

      const updatedSavedNames = {
        ...savedNames,
        experience: updatedExperienceSavedNames,
      };
      setSavedNames(updatedSavedNames);
      localStorage.setItem("savedNames", JSON.stringify(updatedSavedNames));

      const newExperienceFormData = {
        id: newSavedName.id,
        ...formValues.experience,
      };
      const updatedExperienceFormData = formData.experience
        ? [...formData.experience, newExperienceFormData]
        : [newExperienceFormData];

      const updatedFormData = {
        ...formData,
        experience: updatedExperienceFormData,
      };
      setFormData(updatedFormData);
      localStorage.setItem("formData", JSON.stringify(updatedFormData));

      handleSetForm(false);
      addElement(newExperienceFormData.id);
    } else {
      const updatedExperienceSavedNames = [...savedNames.experience];
      updatedExperienceSavedNames[existingFormDataIndex] = {
        id: savedForm.experience.id,
        name: savedForm.experience.company,
      };
      const updatedSavedNames = {
        ...savedNames,
        experience: updatedExperienceSavedNames,
      };
      setSavedNames(updatedSavedNames);
      localStorage.setItem("savedNames", JSON.stringify(updatedSavedNames));

      const updatedExperienceFormData = [...formData.experience];
      updatedExperienceFormData[existingFormDataIndex] = {
        id: savedForm.experience.id,
        ...savedForm.experience,
      };
      const updatedFormData = {
        ...formData,
        experience: updatedExperienceFormData,
      };
      setFormData(updatedFormData);
      localStorage.setItem("formData", JSON.stringify(updatedFormData));

      handleSetForm(false);
      addElement(savedForm.experience.id);
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
    const foundFormData = formData.experience.find(
      (element) => element.id === e.currentTarget.id
    );
    if (foundFormData) {
      if (foundFormData) {
        const updatedSavedForm: SavedFormProps = {
          experience: foundFormData,
          education: savedForm.education,
          projects: savedForm.projects,
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
    <div id="experience" className="add-section ctn">
      <button className="expand-section flexbox " onClick={handleChevron}>
        <h2 className="expand-section-header header">Experience</h2>
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
              <span className="section-add-btn">Experience</span>
            </div>
          </button>
        </div>
      )}

      {isFormOpen && !isExpanded && (
        <form
          id="experience"
          className="experience ctn"
          target="_blank"
          method="POST"
        >
          <Input
            title="Company name"
            name="company"
            placeholder="Enter company name"
            value={
              isEditing
                ? savedForm.experience.company
                : formValues.experience.company
            }
            onInput={handleInputChange}
          />

          <Input
            title="Position title"
            name="position"
            placeholder="Enter position title"
            value={
              isEditing
                ? savedForm.experience.position
                : formValues.experience.position
            }
            onInput={handleInputChange}
          />

          <div className="flex-wrap">
            <Input
              title="Start Date"
              name="start"
              placeholder="Enter start date"
              value={
                isEditing
                  ? savedForm.experience.start
                  : formValues.experience.start
              }
              onInput={handleInputChange}
            />
            <Input
              title="End Date"
              name="end"
              placeholder="Enter end date"
              value={
                isEditing ? savedForm.experience.end : formValues.experience.end
              }
              onInput={handleInputChange}
            />
          </div>
          <Textarea
            title="Description"
            name="description"
            addonTag="optional"
            placeholder="Enter description"
            value={
              isEditing
                ? savedForm.experience.description
                : formValues.experience.description
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

export default ExperienceSection;
