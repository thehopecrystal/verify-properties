
import { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useData } from "@/context/DataContext";
import { PropertyType } from "@/types";

import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { landFormSchema, LandFormValues, getSubtypeOptions, getLandSubtypeLabel } from "@/schemas/propertyFormSchema";
import PropertyTypeSection from "@/components/PropertyTypeSection";
import PartyDetailsSection from "@/components/PartyDetailsSection";
import LandDetailsSection from "@/components/LandDetailsSection";
import WitnessSection from "@/components/WitnessSection";

interface LandFormProps {
  propertyType?: PropertyType;
}

const LandForm = ({ propertyType = "Land" }: LandFormProps) => {
  const { addProperty } = useData();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const form = useForm<LandFormValues>({
    resolver: zodResolver(landFormSchema),
    defaultValues: {
      propertyType: propertyType,
      landSubtype: "",
      firstPartyName: "",
      firstPartyPhoto: "",
      firstPartyIdType: "",
      firstPartyIdNumber: "",
      firstPartyMobile: "",
      firstPartyAddress: "",
      secondPartyName: "",
      secondPartyPhoto: "",
      secondPartyIdType: "",
      secondPartyIdNumber: "",
      secondPartyMobile: "",
      secondPartyAddress: "",
      landArea: "",
      landMap: "",
      landPhotoFirst: "",
      landPhotoSecond: "",
      witnessFirstName: "",
      witnessFirstPhoto: "",
      witnessFirstIdType: "",
      witnessFirstIdNumber: "",
      witnessFirstMobile: "",
      witnessSecondName: "",
      witnessSecondPhoto: "",
      witnessSecondIdType: "",
      witnessSecondIdNumber: "",
      witnessSecondMobile: "",
    },
  });
  
  const onSubmit = (data: LandFormValues) => {
    setIsSubmitting(true);
    try {
      // Get subtype options for this property type
      const landSubtypeOptions = getSubtypeOptions(propertyType);
      
      // Create a title from the property type and land subtype
      const title = `${propertyType} Property - ${getLandSubtypeLabel(data.landSubtype, landSubtypeOptions)}`;
      const description = `${propertyType} area: ${data.landArea}, First party: ${data.firstPartyName}`;
      
      // Prepare documents array
      const documents: string[] = [];
      if (data.firstPartyPhoto) documents.push(data.firstPartyPhoto);
      if (data.landMap) documents.push(data.landMap);
      if (data.landPhotoFirst) documents.push(data.landPhotoFirst);
      if (data.landPhotoSecond) documents.push(data.landPhotoSecond);
      
      addProperty({
        title: title,
        description: description,
        type: propertyType,
        location: data.firstPartyAddress,
        documents: documents,
      });
      
      form.reset();
      toast.success(`${propertyType} details submitted successfully`);
    } catch (error) {
      toast.error(`Failed to submit ${propertyType.toLowerCase()} details`);
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <FormProvider {...form}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <PropertyTypeSection propertyType={propertyType} />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <PartyDetailsSection isFirstParty={true} />
            <PartyDetailsSection isFirstParty={false} />
          </div>
          
          <LandDetailsSection />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <WitnessSection isFirstWitness={true} />
            <WitnessSection isFirstWitness={false} />
          </div>
          
          <div className="flex justify-end">
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Submitting..." : "Submit"}
            </Button>
          </div>
        </form>
      </Form>
    </FormProvider>
  );
};

export default LandForm;
