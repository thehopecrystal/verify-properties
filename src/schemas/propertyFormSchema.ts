
import { z } from "zod";
import { PropertyType } from "@/types";

export const landFormSchema = z.object({
  // Land Type Information
  propertyType: z.string().min(1, "Property type is required"),
  landSubtype: z.string().min(1, "Land subtype is required"),
  
  // First Party Details
  firstPartyName: z.string().min(1, "First party name is required"),
  firstPartyPhoto: z.string().optional(),
  firstPartyIdType: z.string().min(1, "ID type is required"),
  firstPartyIdNumber: z.string().min(1, "ID number is required"),
  firstPartyMobile: z.string().min(1, "Mobile number is required"),
  firstPartyAddress: z.string().min(1, "Address is required"),
  
  // Second Party Details
  secondPartyName: z.string().optional(),
  secondPartyPhoto: z.string().optional(),
  secondPartyIdType: z.string().optional(),
  secondPartyIdNumber: z.string().optional(),
  secondPartyMobile: z.string().optional(),
  secondPartyAddress: z.string().optional(),
  
  // Land Details
  landArea: z.string().min(1, "Land area is required"),
  landMap: z.string().optional(),
  landPhotoFirst: z.string().optional(),
  landPhotoSecond: z.string().optional(),
  
  // Witness First
  witnessFirstName: z.string().min(1, "Witness name is required"),
  witnessFirstPhoto: z.string().optional(),
  witnessFirstIdType: z.string().min(1, "Witness ID type is required"),
  witnessFirstIdNumber: z.string().min(1, "Witness ID number is required"),
  witnessFirstMobile: z.string().min(1, "Witness mobile number is required"),
  
  // Witness Second
  witnessSecondName: z.string().optional(),
  witnessSecondPhoto: z.string().optional(),
  witnessSecondIdType: z.string().optional(),
  witnessSecondIdNumber: z.string().optional(),
  witnessSecondMobile: z.string().optional(),
});

export type LandFormValues = z.infer<typeof landFormSchema>;

export const getSubtypeOptions = (propertyType: PropertyType) => {
  switch (propertyType) {
    case "Residential":
      return [
        { value: "apartment", label: "Apartment" },
        { value: "house", label: "House" },
        { value: "condo", label: "Condominium" },
        { value: "villa", label: "Villa" },
        { value: "townhouse", label: "Townhouse" },
        { value: "studio", label: "Studio" },
        { value: "other", label: "Other" },
      ];
    case "Commercial":
      return [
        { value: "office", label: "Office Space" },
        { value: "retail", label: "Retail Space" },
        { value: "warehouse", label: "Warehouse" },
        { value: "restaurant", label: "Restaurant" },
        { value: "hotel", label: "Hotel" },
        { value: "other", label: "Other" },
      ];
    case "Industrial":
      return [
        { value: "factory", label: "Factory" },
        { value: "manufacturing", label: "Manufacturing Facility" },
        { value: "warehouse", label: "Warehouse" },
        { value: "distribution", label: "Distribution Center" },
        { value: "other", label: "Other" },
      ];
    case "Agricultural":
      return [
        { value: "farm", label: "Farm" },
        { value: "ranch", label: "Ranch" },
        { value: "orchard", label: "Orchard" },
        { value: "vineyard", label: "Vineyard" },
        { value: "forest", label: "Forest Land" },
        { value: "other", label: "Other" },
      ];
    case "Land":
    default:
      return [
        { value: "agricultural", label: "Agricultural Land" },
        { value: "residential", label: "Residential Land" },
        { value: "commercial", label: "Commercial Land" },
        { value: "industrial", label: "Industrial Land" },
        { value: "forest", label: "Forest Land" },
        { value: "recreational", label: "Recreational Land" },
        { value: "other", label: "Other" },
      ];
  }
};

export const idTypeOptions = [
  { value: "national_id", label: "National ID" },
  { value: "passport", label: "Passport" },
  { value: "drivers_license", label: "Driver's License" },
  { value: "other", label: "Other" },
];

export const getLandSubtypeLabel = (value: string, options: Array<{value: string, label: string}>) => {
  return options.find(opt => opt.value === value)?.label || value;
};
