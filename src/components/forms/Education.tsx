import React from "react";
import { useState, useEffect } from "react";
import Textarea from "@/components/forms/shared/Textarea";
import Input from "@/components/forms/shared//Input";
import {
  FormValues,
  FormDataProps,
  SavedFormProps,
  isHiddenProps,
} from "@/shared/types";
import Buttons from "@/components/forms/shared//Buttons";
import { v4 as uuidv4 } from "uuid";
import { useSection } from "@/context/SectionContext";
import { Droppable, Draggable } from "@hello-pangea/dnd";

type Props = {
  formValues: FormValues;
  setFormValues: (formValues: FormValues) => void;
  formData: FormDataProps;
  setFormData: (formData: FormDataProps) => void;
  savedForm: SavedFormProps;
  setSavedForm: (savedForm: SavedFormProps) => void;
};

export const EducationSection = ({
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
    const updatedSection = [...isHiddenStates.education];
    updatedSection[index] = !updatedSection[index];
    const updatedState = { ...isHiddenStates, education: updatedSection };
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
        education: {
          ...savedForm.education,
          [name]: value,
        },
      });
    } else {
      resetSavedForm();
      const { name, value } = e.target;
      setFormValues({
        ...formValues,
        education: {
          ...formValues.education,
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
    for (const key in updatedFormValues.education) {
      if (key in updatedFormValues.education) {
        updatedFormValues.education[
          key as keyof typeof updatedFormValues.education
        ] = "";
      }
    }
    setFormValues(updatedFormValues);
  };

  const resetSavedForm = () => {
    const updatedSavedForm: typeof savedForm = { ...savedForm };
    for (const key in updatedSavedForm.education) {
      if (key in updatedSavedForm.education) {
        updatedSavedForm.education[
          key as keyof typeof updatedSavedForm.education
        ] = "";
      }
    }
    setSavedForm(updatedSavedForm);
  };

  const addElement = (id?: string) => {
    return (
      <>
        {savedNames.education && savedNames.education.length > 0 && (
          <Droppable droppableId="educationDrop">
          {(provided) => (
            <ul className="educationItems" {...provided.droppableProps} ref={provided.innerRef}>
              {savedNames.education.map((savedName, index) => (
                <Draggable key={index} draggableId={index.toString()} index={index}>
                  {(provided) => (
                    <li className="forms-container flexbox" {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
                      <button
                        id={savedName.id}
                        className="collapsed-form section-form flexbox"
                        onClick={handleOpenSavedForm}
                      >
                        <span className="collapsed-form-title">{savedName.name}</span>
                        <i
                          className={
                            isHiddenStates.education[index]
                              ? "fa fa-eye-slash eye-icon"
                              : "fa fa-eye eye-icon"
                          }
                          onClick={(e) => {
                            e.stopPropagation();
                            handleEye(index);
                          }}
                        ></i>
                      </button>
                    </li>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </ul>
          )}
        </Droppable>
        )}
      </>
    );
  };

  const deleteElement = () => {
    setFormData((formEls) => {
      const updatedEducationForms = formEls.education.filter(
        (el) => el.id !== savedForm.education.id
      );
      return {
        ...formEls,
        education:
          updatedEducationForms.length > 0 ? updatedEducationForms : [],
      };
    });

    setSavedNames((nameList) => {
      const updatedEducationNames = nameList.education.filter(
        (el) => el.id !== savedForm.education.id
      );
      return {
        ...nameList,
        education: updatedEducationNames,
      };
    });
  };

  const displayElement = () => {
    const existingFormDataIndex = formData.education.findIndex(
      (element) => element.id === savedForm.education.id
    );

    if (existingFormDataIndex === -1) {
      const newSavedName = {
        id: uuidv4(),
        name: formValues.education.school,
      };

      const updatedEducationSavedNames = savedNames.education
        ? [...savedNames.education, newSavedName]
        : [newSavedName];

      const updatedSavedNames = {
        ...savedNames,
        education: updatedEducationSavedNames,
      };
      setSavedNames(updatedSavedNames);
      localStorage.setItem("savedNames", JSON.stringify(updatedSavedNames));

      const newEducationFormData = {
        id: newSavedName.id,
        ...formValues.education,
      };
      const updatedEducationFormData = formData.education
        ? [...formData.education, newEducationFormData]
        : [newEducationFormData];

      const updatedFormData = {
        ...formData,
        education: updatedEducationFormData,
      };
      setFormData(updatedFormData);
      localStorage.setItem("formData", JSON.stringify(updatedFormData));

      handleSetForm(false);
      addElement(newEducationFormData.id);
    } else {
      const updatedEducationSavedNames = [...savedNames.education];
      updatedEducationSavedNames[existingFormDataIndex] = {
        id: savedForm.education.id,
        name: savedForm.education.school,
      };
      const updatedSavedNames = {
        ...savedNames,
        education: updatedEducationSavedNames,
      };
      setSavedNames(updatedSavedNames);
      localStorage.setItem("savedNames", JSON.stringify(updatedSavedNames));

      const updatedEducationFormData = [...formData.education];
      updatedEducationFormData[existingFormDataIndex] = {
        id: savedForm.education.id,
        ...savedForm.education,
      };
      const updatedFormData = {
        ...formData,
        education: updatedEducationFormData,
      };
      setFormData(updatedFormData);
      localStorage.setItem("formData", JSON.stringify(updatedFormData));

      handleSetForm(false);
      addElement(savedForm.education.id);
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
    const foundFormData = formData.education.find(
      (element) => element.id === e.currentTarget.id
    );
    if (foundFormData) {
      if (foundFormData) {
        const updatedSavedForm: SavedFormProps = {
          education: foundFormData,
          experience: savedForm.experience,
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
    <div id="education" className="add-section ctn">
      <button className="expand-section flexbox " onClick={handleChevron}>
        <h2 className="expand-section-header header">Education</h2>
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
              <span className="section-add-btn">Education</span>
            </div>
          </button>
        </div>
      )}

      {isFormOpen && !isExpanded && (
        <form
          id="education"
          className="education ctn"
          target="_blank"
          // onSubmit={onSubmit}
          method="POST"
        >
          <Input
            title="School"
            name="school"
            placeholder="Enter school/ university"
            value={
              isEditing
                ? savedForm.education.school
                : formValues.education.school
            }
            onInput={handleInputChange}
          />

          <Input
            type="email"
            title="Degree"
            name="degree"
            placeholder="Enter degree/ field of study"
            value={
              isEditing
                ? savedForm.education.degree
                : formValues.education.degree
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
                  ? savedForm.education.start
                  : formValues.education.start
              }
              onInput={handleInputChange}
            />
            <Input
              title="End Date"
              name="end"
              placeholder="Enter end date"
              value={
                isEditing ? savedForm.education.end : formValues.education.end
              }
              onInput={handleInputChange}
            />
          </div>

          <Textarea
            value={
              isEditing
                ? savedForm.education.description
                : formValues.education.description
            }
            onInput={handleInputChange}
            title="Description"
            name="description"
            addonTag="optional"
            placeholder="Enter description"
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
