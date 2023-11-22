import Navbar from "./components/navbar";
import Forms from "./components/forms";
import Resume from "./components/resume";
import { useEffect, useState } from "react";
import "./index.css";
import {
  SelectedPage,
  FormValues,
  SavedFormProps,
  FormDataProps,
} from "@/shared/types";
import { SectionProvider } from "./context/SectionContext";
import logo from "@/assets/images/logo.png";

function App() {
  const [isTopOfPage, setIsTopOfPage] = useState<boolean>(true)
  const [selectedPage, setSelectedPage] = useState<SelectedPage>(
    SelectedPage.PersonalDetails
  );

  useEffect( () => {
    const handleScroll = () => {
      if (window.scrollY === 0) {
        setIsTopOfPage(true)
      } else {
        setIsTopOfPage(false)
      }
    }  
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const [formValues, setFormValues] = useState<FormValues>({
    personalInfo: {
      fullName: "",
      email: "",
      phone: undefined,
      address: "",
    },

    education: {
      school: "",
      degree: "",
      start: "",
      end: "",
      description: "",
    },
    experience: {
      company: "",
      position: "",
      start: "",
      end: "",
      description: "",
    },
    projects: {
      project: "",
      description: "",
      tech: "",
      start: "",
      end: "",
      link: "",
    },
    skills: {
      skills: "",
    },
    certificates: {
      certificate: "",
      level: "",
    },
  });

  const [savedForm, setSavedForm] = useState<SavedFormProps>({
    education: {
      school: "",
      degree: "",
      start: "",
      end: "",
      description: "",
    },
    experience: {
      company: "",
      position: "",
      start: "",
      end: "",
      description: "",
    },
    projects: {
      project: "",
      description: "",
      tech: "",
      start: "",
      end: "",
      link: "",
    },
    skills: {
      skills: "",
    },
    certificates: {
      certificate: "",
      level: "",
    },
  });

  const [formData, setFormData] = useState<FormDataProps>({
    education: [],
    experience: [],
    projects: [],
    skills: [],
    certificates: [],
  });

  

  return (
    <>
      <div className={`${!isTopOfPage ? "background" : ""} logo`}>
        <img  src={logo} alt="" />
      </div>
      <SectionProvider>
        <div className="App">
          <Navbar
            selectedPage={selectedPage}
            setSelectedPage={setSelectedPage}
          />
          <Forms
            formValues={formValues}
            setFormValues={setFormValues}
            formData={formData}
            setFormData={setFormData}
            savedForm={savedForm}
            setSavedForm={setSavedForm}
          
          />
          <Resume
            formValues={formValues}
            formData={formData}
            savedForm={savedForm}
          
          />
        </div>
      </SectionProvider>
    </>
  );
}

export default App;


// manage validation
// account - not local storage
// scroll/motive div changing scroll bar based on the osition of the page
