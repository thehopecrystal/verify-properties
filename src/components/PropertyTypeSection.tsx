
import { useFormContext } from "react-hook-form";
import { PropertyType } from "@/types";
import { getSubtypeOptions } from "@/schemas/propertyFormSchema";

import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface PropertyTypeSectionProps {
  propertyType: PropertyType;
}

const PropertyTypeSection = ({ propertyType }: PropertyTypeSectionProps) => {
  const { control } = useFormContext();
  const landSubtypeOptions = getSubtypeOptions(propertyType);

  return (
    <Card>
      <CardContent className="p-6">
        <div className="space-y-6">
          <h2 className="text-xl font-medium">{propertyType} Type</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={control}
              name="propertyType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Property Type</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={propertyType} disabled>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Property Type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value={propertyType}>{propertyType}</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={control}
              name="landSubtype"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{propertyType} Subtype</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder={`Select ${propertyType} Subtype`} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {landSubtypeOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PropertyTypeSection;
