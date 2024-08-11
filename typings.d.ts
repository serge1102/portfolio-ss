// sanity からのレスポンスは以下のプロパティを含む
interface SanityBody {
  _createdAt: string;
  _id: string;
  _rev: string;
  _updatedAt: string;
}

// image は以下のプロパティを含む
interface Image {
  _type: "image";
  assets: {
    _ref: string;
    _type: "reference";
  };
}

export interface PageInfo extends SanityBody {
  _type: "pageInfo";
  address: string;
  backgroundInfomation: string;
  email: string;
  role: string;
  heroImage: Image;
  name: string;
  phoneNumber: string;
  profilePic: Image;
}

export interface Technology extends SanityBody {
  _type: "skill";
  image: Image;
  progress: number;
  title: string;
  square: boolean;
}

export interface Skill extends SanityBody {
  _type: "skill";
  image: Image;
  progress: number;
  title: string;
  displayOrder: number;
  square: boolean;
}

export interface Experience extends SanityBody {
  _type: "experience";
  company: string;
  companyImage: Image;
  dateStarted: date;
  dateEnded: date;
  isCurrentlyWorkingHere: boolean;
  jobTitle: string;
  points: string[];
  technologies: Technology[];
}

export interface Project extends SanityBody {
  _type: "project";
  title: string;
  image: Image;
  linkToBuild: string;
  points: string[];
  technologies: Technology[];
}

export interface Social extends SanityBody {
  _type: "social";
  title: string;
  url: string;
}

export interface Certification extends SanityBody {
  _type: "certification";
  image: Image;
  title: string;
  displayOrder: number;
  square: boolean;
}

export interface Strength extends SanityBody {
  _type: "strength";
  image: Image;
  title: string;
  displayOrder: number;
  description: string;
}
