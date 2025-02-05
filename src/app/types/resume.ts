export interface PersonalInfo {
    fullName: string;
    email: string;
    phone: string;
    location: string;
    website?: string;
    linkedin?: string;
    username?: string;
  }
  
  export interface WorkExperience {
    id: string;
    company: string;
    position: string;
    startDate: string;
    endDate: string;
    current: boolean;
    responsibilities: string[];
  }
  
  export interface Education {
    id: string;
    institution: string;
    degree: string;
    field: string;
    startDate: string;
    endDate: string;
    gpa?: string;
  }
  
  export interface Skill {
    id: string;
    name: string;
    level: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
  }
  
  export interface Certificate {
    id: string;
    name: string;
    issuer: string;
    date: string;
    url?: string;
  }
  
  export interface ResumeData {
    personalInfo: PersonalInfo;
    summary: string;
    workExperience: WorkExperience[];
    education: Education[];
    skills: Skill[];
    certificates: Certificate[];
    languages: string[];
  }