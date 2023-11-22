import React from "react";
import { useState, useEffect } from "react";
import Textarea from "@/components/forms/shared/Textarea";
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

export const SkillsSection = ({
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
    const updatedSection = [...isHiddenStates.skills]; 
    updatedSection[index] = !updatedSection[index];
    const updatedState = { ...isHiddenStates, skills: updatedSection };
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
        skills: {
          ...savedForm.skills,
          [name]: value,
        },
      });
    } else {
      resetSavedForm();
      const { name, value } = e.target;
      setFormValues({
        ...formValues,
        skills: {
          ...formValues.skills,
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
    for (const key in updatedFormValues.skills) {
      if (key in updatedFormValues.skills) {
        updatedFormValues.skills[key as keyof typeof updatedFormValues.skills] =
          "";
      }
    }
    setFormValues(updatedFormValues);
  };

  const resetSavedForm = () => {
    const updatedSavedForm: typeof savedForm = { ...savedForm };
    for (const key in updatedSavedForm.skills) {
      if (key in updatedSavedForm.skills) {
        updatedSavedForm.skills[key as keyof typeof updatedSavedForm.skills] =
          "";
      }
    }
    setSavedForm(updatedSavedForm);
  };

  const addElement = (id?: string) => {
    return (
      <>
        {savedNames.skills && savedNames.skills.length > 0 && (
          <div>
            {savedNames.skills.map((savedName, index) => (
              <div className="forms-container flexbox">
                <button
                  id={savedName.id}
                  className="collapsed-form section-form flexbox"
                  onClick={handleOpenSavedForm}
                >
                  <span className="collapsed-form-title">{savedName.name}</span>
                  <i
                    className={
                      isHiddenStates.skills[index]
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
      const updatedSkillsForms = formEls.skills.filter(
        (el) => el.id !== savedForm.skills.id
      );
      return {
        ...formEls,
        skills: updatedSkillsForms.length > 0 ? updatedSkillsForms : [],
      };
    });

    setSavedNames((nameList) => {
      const updatedSkillsNames = nameList.skills.filter(
        (el) => el.id !== savedForm.skills.id
      );
      return {
        ...nameList,
        skills: updatedSkillsNames,
      };
    });
  };

  const displayElement = () => {
    const existingFormDataIndex = formData.skills.findIndex(
      (element) => element.id === savedForm.skills.id
    );

    if (existingFormDataIndex === -1) {
      const newSavedName = {
        id: uuidv4(),
        name: formValues.skills.skills,
      };

      const updatedSkillsSavedNames = savedNames.skills
        ? [...savedNames.skills, newSavedName]
        : [newSavedName];

      const updatedSavedNames = {
        ...savedNames,
        skills: updatedSkillsSavedNames,
      };
      setSavedNames(updatedSavedNames);
      localStorage.setItem("savedNames", JSON.stringify(updatedSavedNames));

      const newSkillsFormData = { id: newSavedName.id, ...formValues.skills };
      const updatedSkillsFormData = formData.skills
        ? [...formData.skills, newSkillsFormData]
        : [newSkillsFormData];

      const updatedFormData = { ...formData, skills: updatedSkillsFormData };
      setFormData(updatedFormData);
      localStorage.setItem("formData", JSON.stringify(updatedFormData));

      handleSetForm(false);
      addElement(newSkillsFormData.id);
    } else {
      const updatedSkillsSavedNames = [...savedNames.skills];
      updatedSkillsSavedNames[existingFormDataIndex] = {
        id: savedForm.skills.id,
        name: savedForm.skills.skills,
      };
      const updatedSavedNames = {
        ...savedNames,
        skills: updatedSkillsSavedNames,
      };
      setSavedNames(updatedSavedNames);
      localStorage.setItem("savedNames", JSON.stringify(updatedSavedNames));

      const updatedSkillsFormData = [...formData.skills];
      updatedSkillsFormData[existingFormDataIndex] = {
        id: savedForm.skills.id,
        ...savedForm.skills,
      };
      const updatedFormData = { ...formData, skills: updatedSkillsFormData };
      setFormData(updatedFormData);
      localStorage.setItem("formData", JSON.stringify(updatedFormData));

      handleSetForm(false);
      addElement(savedForm.skills.id);
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
    const foundFormData = formData.skills.find(
      (element) => element.id === e.currentTarget.id
    );
    if (foundFormData) {
      if (foundFormData) {
        const updatedSavedForm: SavedFormProps = {
          skills: foundFormData,
          experience: savedForm.experience,
          projects: savedForm.projects,
          education: savedForm.education,
          certificates: savedForm.certificates,
        };
        setIsEditing(true);
        setSavedForm(updatedSavedForm);
        handleSetForm(true);
      }
    }
  };

  return (
    <div id="skills" className="add-section ctn">
      <button className="expand-section flexbox " onClick={handleChevron}>
        <h2 className="expand-section-header header">Skills</h2>
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
              <span className="section-add-btn">Skills</span>
            </div>
          </button>
        </div>
      )}

      {isFormOpen && !isExpanded && (
        <form
          id="skills"
          className="skills ctn"
          target="_blank"
          // onSubmit={onSubmit}
          method="POST"
        >
          <Textarea
            placeholder="Enter skills"
            name="skills"
            rows={2}
            value={
              isEditing ? savedForm.skills.skills : formValues.skills.skills
            }
            onInput={handleInputChange}
          ></Textarea>

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
