export enum SelectedPage {
    PersonalDetails = "personaldetails",
    Experience = "experience",
    Projects = "projects",
    Education = "education",
    Skills = "skills",
    Others = "others"
  }

  export type PersonalInfo = {
    id?: string;
    // isHidden: false;
    fullName: string;
    email: string;
    phone: number | undefined | string;
    address: string;
  };
  
  export type Education = {
    id?: string;
    // isHidden?: false;
    school: string;
    degree: string;
    start: string;
    end: string;
    description?: string;
  };
  
  export type Experience = {
    id?: string;
    // isHidden: false;
    company: string;
    position: string;
    start: string;
    end: string;
    location?: string;
    description?: string;
  };
  
  export type Projects = {
    id?: string;
    // isHidden: false;
    project: string;
    description: string;
    tech: string;
    start: string;
    end: string;
    link?: string;
  };
  
  export type Skills = {
    id?: string;
    // isHidden: false;
    skills: string;
  };
  
  export type Certificates = {
    id?: string;
    certificate: string;
    level: string;
  };

  export type FormValues = {
    personalInfo: PersonalInfo;
    education: Education;
    experience: Experience;
    projects: Projects;
    skills: Skills;
    certificates: Certificates;
  };


  export type FormDataProps = {
    education: Education[];
    experience: Experience[];
    projects: Projects[];
    skills: Skills[];
    certificates: Certificates[];
  }

  export type SavedFormProps = {
    education: Education;
    experience: Experience;
    projects: Projects;
    skills: Skills;
    certificates: Certificates;
  }
  
  type SavedName = {
      id: string;
      name: string;
      // isHidden: boolean;
  }
  
  
  export type SavedNamesProps = {
    education: SavedName[];
    experience: SavedName[];
    projects: SavedName[];
    skills: SavedName[];
    certificates: SavedName[];
  }
  
  type isHidden = boolean[]

  export type isHiddenProps = {
    education: isHidden;
    experience: isHidden;
    projects: isHidden;
    skills: isHidden;
    certificates: isHidden;
  }