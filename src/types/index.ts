
export type User = {
  id: string;
  fullName: string;
  email: string;
  password: string;
  role: 'user' | 'admin';
};

export type PropertyType = 'Residential' | 'Commercial' | 'Land' | 'Vehicle' | 'Industrial' | 'Agricultural';

export type PropertyStatus = 'Pending' | 'Reviewing' | 'Verified' | 'Rejected';

export type RequestStatus = 'Pending' | 'Reviewing' | 'Completed' | 'Rejected';

export type RequestPurpose = 'Purchase' | 'Rent' | 'Investment' | 'Information';

export type Property = {
  id: string;
  userId: string;
  title: string;
  description: string;
  type: PropertyType;
  location: string;
  documents: string[];
  status: PropertyStatus;
  submissionDate: string;
  updatedDate: string;
};

export type PropertyRequest = {
  id: string;
  userId: string;
  preferredType: PropertyType;
  location: string;
  purpose: RequestPurpose;
  additionalInfo: string;
  status: RequestStatus;
  submissionDate: string;
  updatedDate: string;
};
