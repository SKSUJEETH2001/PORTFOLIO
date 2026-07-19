export interface PersonalDetails {
  name: string;
  email: string;
  phone: string;
  linkedin: string;
  location: string;
  bio: string;
  focusArea: string;
}

export interface Education {
  degree: string;
  institution: string;
  graduationYear: string;
  gpa: string;
  coursework: string[];
}

export interface Internship {
  id: string;
  company: string;
  role: string;
  duration: string;
  description: string[];
}

export interface Project {
  id: string;
  title: string;
  role: string;
  description: string;
  methods: string[]; // e.g. ["FIFO/LIFO", "EOQ Model", "KPI Tracking"]
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  year: string;
}

export interface PortfolioData {
  personal: PersonalDetails;
  education: Education;
  internships: Internship[];
  projects: Project[];
  skills: string[];
  certifications: Certification[];
}

export type ThemeType = "ocean-marine" | "cargo-steel" | "royal-freight" | "editorial-ivory";
