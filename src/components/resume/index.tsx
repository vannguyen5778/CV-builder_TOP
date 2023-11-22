import { useSection } from "@/context/SectionContext";
import {
  Education,
  Experience,
  Projects,
  Skills,
  Certificates,
  FormValues,
  SavedFormProps,
  FormDataProps,
} from "@/shared/types";
import "@/assets/styles/resume.css";

type Props = {
  formValues: FormValues;
  savedForm: SavedFormProps;
  formData: FormDataProps;
};

const Resume = ({ formValues, savedForm, formData }: Props) => {
  const { isEditing, isHiddenStates } = useSection();

  const eduSnippet = (form: Education) => {
    const { school, start, end, degree, description, id } = form;
    const formIndex = formData.education.findIndex(
      (data) => data.id === form.id
    );

    return (
      <>
        {!isHiddenStates.education[formIndex] && (
          <>
            {isEditing && savedForm.education.id === form.id ? (
              <>
                <div className="flexbox">
                  <div className="bold school">
                    {savedForm.education.school}
                  </div>
                  <div className="time">
                    <span className="start">{savedForm.education.start}</span> -
                    <span className="end">{savedForm.education.end}</span>
                  </div>
                </div>
                <div className="cursive degree">
                  {savedForm.education.degree}
                </div>
                <ul className="resume-ul">
                  <li className="description">
                    {savedForm.education.description}
                  </li>
                </ul>
              </>
            ) : (
              <>
                <div className="flexbox">
                  <div className="bold school">{school}</div>
                  <div className="time">
                    <span className="start">{start}</span> -
                    <span className="end">{end}</span>
                  </div>
                </div>
                <div className="cursive degree">{degree}</div>
                <ul className="resume-ul">
                  <li className="description">{description}</li>
                </ul>
              </>
            )}
          </>
        )}
      </>
    );
  };

  const experienceSnippet = (form: Experience) => {
    const { company, position, start, end, location, description, id } = form;
    const formIndex = formData.experience.findIndex(
      (data) => data.id === form.id
    );

    return (
      <>
        {!isHiddenStates.experience[formIndex] && (
          <>
            {isEditing && savedForm.experience.company === form.id ? (
              <>
                <div className="flexbox">
                  <div className="position">
                    <span className="bold">
                      {savedForm.experience.position}
                    </span>{" "}
                    at{" "}
                    <span className="bold">{savedForm.experience.company}</span>
                  </div>
                  <div className="time">
                    <span className="start">{savedForm.experience.start}</span>{" "}
                    -<span className="end">{savedForm.experience.end}</span>
                  </div>
                </div>
                <div className="cursive location">
                  {savedForm.experience.location}
                </div>
                <ul className="resume-ul">
                  <li className="description">
                    {savedForm.experience.description}
                  </li>
                </ul>
              </>
            ) : (
              <>
                <div className="flexbox">
                  <div className="position">
                    <span className="bold">{position}</span> at{" "}
                    <span className="bold">{company}</span>
                  </div>
                  <div className="time">
                    <span className="start">{start}</span> -
                    <span className="end">{end}</span>
                  </div>
                </div>
                <div className="cursive degree">{location}</div>
                <ul className="resume-ul">
                  <li className="description">{description}</li>
                </ul>
              </>
            )}
          </>
        )}
      </>
    );
  };

  const projectsSnippet = (form: Projects) => {
    const { project, description, tech, start, end, link, id } = form;
    const formIndex = formData.projects.findIndex(
      (data) => data.id === form.id
    );

    return (
      <>
        {!isHiddenStates.projects[formIndex] && (
          <>
            {isEditing && savedForm.projects.project === form.id ? (
              <>
                <div className="flexbox">
                  <div className="bold project">
                    {savedForm.projects.project}
                  </div>
                  <div className="time">
                    <span className="start">{savedForm.projects.start}</span> -
                    <span className="end">{savedForm.projects.end}</span>
                  </div>
                </div>
                <div className="cursive technologies">
                  <span>Techologies used: </span>
                  {savedForm.projects.tech}
                </div>
                <ul className="resume-ul ">
                  <li className="description">
                    {savedForm.projects.description}
                  </li>
                  <li className="link">
                    <span>Demo link: </span> {savedForm.projects.link}
                  </li>
                </ul>
              </>
            ) : (
              <>
                <div className="flexbox">
                  <div className="bold project">{project}</div>
                  <div className="time">
                    <span className="start">{start}</span> -
                    <span className="end">{end}</span>
                  </div>
                </div>
                <div className="cursive technologies">
                  <span>Techologies used: </span>
                  {tech}
                </div>
                <ul className="resume-ul ">
                  <li className="description">{description}</li>
                  <li className="link">
                    <span>Demo link: </span> {link}
                  </li>
                </ul>
              </>
            )}
          </>
        )}
      </>
    );
  };

  const skillsSnippet = (form: Skills) => {
    const { skills, id } = form;
    const formIndex = formData.skills.findIndex((data) => data.id === form.id);

    return (
      <>
        {!isHiddenStates.skills[formIndex] && (
          <>
            {isEditing && savedForm.skills.skills === form.id ? (
              <>
                <div className="flexbox">
                  <div className="bold skills description">
                    {savedForm.skills.skills}
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="flexbox">
                  <div className="bold skills description">{skills}</div>
                </div>
              </>
            )}
          </>
        )}
      </>
    );
  };

  const certificatesSnippet = (form: Certificates) => {
    const { certificate, level, id } = form;
    const formIndex = formData.certificates.findIndex(
      (data) => data.id === form.id
    );

    return (
      <>
        {!isHiddenStates.certificates[formIndex] && (
          <>
            {isEditing && savedForm.certificates.certificate === form.id ? (
              <>
                <div className="flexbox">
                  <div className="certificates section">
                    {formValues.certificates.certificate} -{" "}
                    <span className="level">
                      {formValues.certificates.level}
                    </span>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="flexbox">
                  <div className="certificates section">
                    {certificate} - <span className="level">{level}</span>
                  </div>
                </div>
              </>
            )}
          </>
        )}
      </>
    );
  };

  return (
    <>
      <div className="resume-flexbox">
        <div className="resume-flex-ctn">
          <div className="resume-ctn" id="resumeCtn">
            <header>
              <h1 className="full-name" id="fullName">
                {formValues.personalInfo.fullName}
              </h1>
              <div className="header-section">
                <p className="email">{formValues.personalInfo.email}</p>
                <p className="phone-number">{formValues.personalInfo.phone}</p>
                <p className="address">{formValues.personalInfo.address}</p>
              </div>
            </header>

            <div className="education section">
              <h4>EDUCATION</h4>
              {formData.education.map((form) => eduSnippet(form))}
              <div className="flexbox">
                <div className="bold school">{formValues.education.school}</div>
                <div className="time">
                  <span className="start">{formValues.education.start}</span> -
                  <span className="end"> {formValues.education.end}</span>
                </div>
              </div>
              <div className="cursive degree">
                {formValues.education.degree}
              </div>
              <ul className="resume-ul">
                <li className="description">
                  {formValues.education.description}
                </li>
              </ul>
            </div>

            <div className="experience section">
              <h4>EXPERIENCE</h4>
              {formData.experience.map((form) => experienceSnippet(form))}

              <div className="flexbox">
                <div className="position">
                  <span className="bold">{formValues.experience.position}</span>{" "}
                  {formValues.experience.company.length > 0 && <span>at</span>}{" "}
                  <span className="bold">{formValues.experience.company}</span>
                </div>
                <div className="time">
                  <span className="start">{formValues.experience.start}</span> -
                  <span className="end">{formValues.experience.end}</span>
                </div>
              </div>

              <div className="cursive location">
                {formValues.experience.location}
              </div>
              <ul className="resume-ul">
                <li className="description">
                  {formValues.experience.description}
                </li>
              </ul>
            </div>

            <div className="projects section">
              <h4>PROJECTS</h4>
              {formData.projects.map((form) => projectsSnippet(form))}
              <div className="section-element">
                <div className="flexbox">
                  <div className="bold project">
                    {formValues.projects.project}
                  </div>
                  <div className="time">
                    <span className="start">{formValues.projects.start}</span> -
                    <span className="end">{formValues.projects.end}</span>
                  </div>
                </div>
                <div className="cursive technologies">
                  {formValues.projects.tech.length > 0 && (
                    <span>Techologies used: </span>
                  )}
                  {formValues.projects.tech}
                </div>
                <ul className="resume-ul ">
                  <li className="description">
                    {formValues.projects.description}
                  </li>
                  <li className="link">
                    {formValues.projects.link !== undefined &&
                      formValues.projects.link.length > 0 && (
                        <span>Demo link: </span>
                      )}{" "}
                    {formValues.projects.link}
                  </li>
                </ul>
              </div>
            </div>

            <div className="skills section">
              <h4>SKILLS</h4>
              {formData.skills.map((form) => skillsSnippet(form))}

              <div className="section-element">{formValues.skills.skills}</div>
            </div>

            <div className="certificates section">
              <h4>CERTIFICATES</h4>
              {formData.certificates.map((form) => certificatesSnippet(form))}

              <div className="section-element">
                <ul>
                  <div className="certificate">
                    {formValues.certificates.certificate}{" "}
                    {formValues.certificates.level.length > 0 && <span>-</span>}{" "}
                    <span className="level">
                      {formValues.certificates.level}
                    </span>
                  </div>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Resume;
