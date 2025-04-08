
import { useFormContext } from "react-hook-form";

import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";

const LandDetailsSection = () => {
  const { control } = useFormContext();

  return (
    <Card>
      <CardContent className="p-6">
        <h2 className="text-xl font-medium mb-4">Land Details</h2>
        
        <div className="space-y-4">
          <FormField
            control={control}
            name="landArea"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Land Area</FormLabel>
                <FormControl>
                  <Input placeholder="Land Area" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={control}
            name="landMap"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Land Map</FormLabel>
                <FormControl>
                  <Input 
                    type="file" 
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        field.onChange(file.name);
                      }
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={control}
            name="landPhotoFirst"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Land Photo First</FormLabel>
                <FormControl>
                  <Input 
                    type="file" 
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        field.onChange(file.name);
                      }
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={control}
            name="landPhotoSecond"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Land Photo Second</FormLabel>
                <FormControl>
                  <Input 
                    type="file" 
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        field.onChange(file.name);
                      }
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default LandDetailsSection;
