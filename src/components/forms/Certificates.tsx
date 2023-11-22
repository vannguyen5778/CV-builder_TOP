import React from "react";
import { useState, useEffect } from "react";
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

export const CertificatesSection = ({
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
    const updatedSection = [...isHiddenStates.certificates];
    updatedSection[index] = !updatedSection[index];
    const updatedState = { ...isHiddenStates, certificates: updatedSection };
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
        certificates: {
          ...savedForm.certificates,
          [name]: value,
        },
      });
    } else {
      resetSavedForm();
      const { name, value } = e.target;
      setFormValues({
        ...formValues,
        certificates: {
          ...formValues.certificates,
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
    for (const key in updatedFormValues.certificates) {
      if (key in updatedFormValues.certificates) {
        updatedFormValues.certificates[
          key as keyof typeof updatedFormValues.certificates
        ] = "";
      }
    }
    setFormValues(updatedFormValues);
  };

  const resetSavedForm = () => {
    const updatedSavedForm: typeof savedForm = { ...savedForm };
    for (const key in updatedSavedForm.certificates) {
      if (key in updatedSavedForm.certificates) {
        updatedSavedForm.certificates[
          key as keyof typeof updatedSavedForm.certificates
        ] = "";
      }
    }
    setSavedForm(updatedSavedForm);
  };

  const addElement = (id?: string) => {
    return (
      <>
        {savedNames.certificates && savedNames.certificates.length > 0 && (
          <div>
            {savedNames.certificates.map((savedName, index) => (
              <div className="forms-container flexbox">
                <button
                  id={savedName.id}
                  className="collapsed-form section-form flexbox"
                  onClick={handleOpenSavedForm}
                >
                  <span className="collapsed-form-title">{savedName.name}</span>
                  <i
                    className={
                      isHiddenStates.certificates[index]
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
      const updatedCertificatesForms = formEls.certificates.filter(
        (el) => el.id !== savedForm.certificates.id
      );
      return {
        ...formEls,
        certificates:
          updatedCertificatesForms.length > 0 ? updatedCertificatesForms : [],
      };
    });

    setSavedNames((nameList) => {
      const updatedCertificatesNames = nameList.certificates.filter(
        (el) => el.id !== savedForm.certificates.id
      );
      return {
        ...nameList,
        certificates: updatedCertificatesNames,
      };
    });
  };

  const displayElement = () => {
    const existingFormDataIndex = formData.certificates.findIndex(
      (element) => element.id === savedForm.certificates.id
    );

    if (existingFormDataIndex === -1) {
      const newSavedName = {
        id: uuidv4(),
        name: formValues.certificates.certificate,
      };

      const updatedCertificatesSavedNames = savedNames.certificates
        ? [...savedNames.certificates, newSavedName]
        : [newSavedName];

      const updatedSavedNames = {
        ...savedNames,
        certificates: updatedCertificatesSavedNames,
      };
      setSavedNames(updatedSavedNames);
      localStorage.setItem("savedNames", JSON.stringify(updatedSavedNames));

      const newCertificatesFormData = {
        id: newSavedName.id,
        ...formValues.certificates,
      };
      const updatedCertificatesFormData = formData.certificates
        ? [...formData.certificates, newCertificatesFormData]
        : [newCertificatesFormData];

      const updatedFormData = {
        ...formData,
        certificates: updatedCertificatesFormData,
      };
      setFormData(updatedFormData);
      localStorage.setItem("formData", JSON.stringify(updatedFormData));

      handleSetForm(false);
      addElement(newCertificatesFormData.id);
    } else {
      const updatedCertificatesSavedNames = [...savedNames.certificates];
      updatedCertificatesSavedNames[existingFormDataIndex] = {
        id: savedForm.certificates.id,
        name: savedForm.certificates.certificate,
      };
      const updatedSavedNames = {
        ...savedNames,
        certificates: updatedCertificatesSavedNames,
      };
      setSavedNames(updatedSavedNames);
      localStorage.setItem("savedNames", JSON.stringify(updatedSavedNames));

      const updatedCertificatesFormData = [...formData.certificates];
      updatedCertificatesFormData[existingFormDataIndex] = {
        id: savedForm.certificates.id,
        ...savedForm.certificates,
      };
      const updatedFormData = {
        ...formData,
        certificates: updatedCertificatesFormData,
      };
      setFormData(updatedFormData);
      localStorage.setItem("formData", JSON.stringify(updatedFormData));

      handleSetForm(false);
      addElement(savedForm.certificates.id);
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
    const foundFormData = formData.certificates.find(
      (element) => element.id === e.currentTarget.id
    );
    if (foundFormData) {
      if (foundFormData) {
        const updatedSavedForm: SavedFormProps = {
          certificates: foundFormData,
          experience: savedForm.experience,
          projects: savedForm.projects,
          skills: savedForm.skills,
          education: savedForm.education,
        };
        setIsEditing(true);
        setSavedForm(updatedSavedForm);
        handleSetForm(true);
      }
    }
  };

  return (
    <div id="certificates" className="add-section ctn">
      <button className="expand-section flexbox " onClick={handleChevron}>
        <h2 className="expand-section-header header">Certificates</h2>
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
              <span className="section-add-btn">Certificates</span>
            </div>
          </button>
        </div>
      )}

      {isFormOpen && !isExpanded && (
        <form
          id="certificates"
          className="certificates ctn"
          target="_blank"
          method="POST"
        >
          <Input
            title="Certificate title"
            name="certificate"
            placeholder="Enter title of the certificate"
            value={
              isEditing
                ? savedForm.certificates.certificate
                : formValues.certificates.certificate
            }
            onInput={handleInputChange}
          />
          <Input
            title="Level"
            name="level"
            placeholder="Enter level of the certificate"
            value={
              isEditing
                ? savedForm.certificates.level
                : formValues.certificates.level
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
