
import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useData } from "@/context/DataContext";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const vehicleFormSchema = z.object({
  brandName: z.string().min(1, "Brand name is required"),
  vehicleName: z.string().min(1, "Vehicle name is required"),
  modelNumber: z.string().min(1, "Model number is required"),
  registrationNumber: z.string().min(1, "Registration number is required"),
  vehicleType: z.string().min(1, "Vehicle type is required"),
  vehicleSubtype: z.string().min(1, "Vehicle subtype is required"),
  variant: z.string().min(1, "Variant is required"),
  transmission: z.string().min(1, "Transmission is required"),
  chasisNumber: z.string().min(1, "Chasis number is required"),
  engineNumber: z.string().min(1, "Engine number is required"),
  description: z.string().optional(),
});

type VehicleFormValues = z.infer<typeof vehicleFormSchema>;

const VehicleForm = () => {
  const { addProperty } = useData();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<VehicleFormValues>({
    resolver: zodResolver(vehicleFormSchema),
    defaultValues: {
      brandName: "",
      vehicleName: "",
      modelNumber: "",
      registrationNumber: "",
      vehicleType: "",
      vehicleSubtype: "",
      variant: "",
      transmission: "",
      chasisNumber: "",
      engineNumber: "",
      description: "",
    },
  });

  const onSubmit = async (data: VehicleFormValues) => {
    setIsSubmitting(true);
    try {
      // Convert the vehicle form data to the property data structure
      addProperty({
        title: `${data.brandName} ${data.vehicleName}`,
        description: `${data.description || "No description provided"}\n
          Model: ${data.modelNumber}\n
          Registration: ${data.registrationNumber}\n
          Type: ${data.vehicleType}\n
          Subtype: ${data.vehicleSubtype}\n
          Variant: ${data.variant}\n
          Transmission: ${data.transmission}\n
          Chasis: ${data.chasisNumber}\n
          Engine: ${data.engineNumber}`,
        type: "Vehicle",
        location: "Not Applicable",
        documents: [],
      });
      
      toast.success("Vehicle submitted successfully");
      navigate("/");
    } catch (error) {
      toast.error("Failed to submit vehicle");
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const brandOptions = [
    "Toyota", "Honda", "Ford", "Chevrolet", "BMW", 
    "Mercedes-Benz", "Audi", "Volkswagen", "Nissan", "Hyundai"
  ];
  
  const vehicleTypeOptions = [
    "Car", "Truck", "SUV", "Van", "Motorcycle", 
    "Bus", "Commercial", "Agricultural"
  ];
  
  const variantOptions = [
    "Base", "Standard", "Premium", "Deluxe", "Sport", 
    "Limited Edition", "Executive", "Luxury"
  ];
  
  const transmissionOptions = [
    "Manual", "Automatic", "Semi-Automatic", "CVT", "Dual-Clutch"
  ];

  return (
    <div className="w-full max-w-3xl mx-auto p-6 bg-white rounded-md shadow">
      <h2 className="text-2xl font-bold text-center mb-6">Add Vehicle</h2>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="brandName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Brand Name</FormLabel>
                <Select 
                  onValueChange={field.onChange} 
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose Brand Name" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {brandOptions.map((brand) => (
                      <SelectItem key={brand} value={brand}>
                        {brand}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="vehicleName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Vehicle Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter Vehicle Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="modelNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Model Number</FormLabel>
                <FormControl>
                  <Input placeholder="Enter Vehicle Model Number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="registrationNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Registration Number</FormLabel>
                <FormControl>
                  <Input placeholder="Enter Vehicle Registration Number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="vehicleType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Vehicle Type</FormLabel>
                <Select 
                  onValueChange={field.onChange} 
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose Vehicle Type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {vehicleTypeOptions.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="vehicleSubtype"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Vehicle Subtype</FormLabel>
                <FormControl>
                  <Input placeholder="Enter Vehicle Subtype(ex: car, truck etc)" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="variant"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Variant</FormLabel>
                <Select 
                  onValueChange={field.onChange} 
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose Variant" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {variantOptions.map((variant) => (
                      <SelectItem key={variant} value={variant}>
                        {variant}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="transmission"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Transmission</FormLabel>
                <Select 
                  onValueChange={field.onChange} 
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose Transmission" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {transmissionOptions.map((transmission) => (
                      <SelectItem key={transmission} value={transmission}>
                        {transmission}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="chasisNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Chasis Number</FormLabel>
                <FormControl>
                  <Input placeholder="Enter Chasis Number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="engineNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Engine Number</FormLabel>
                <FormControl>
                  <Input placeholder="Enter Engine Number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Enter Description" 
                    className="min-h-[100px]" 
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <Button 
            type="submit" 
            className="w-24" 
            disabled={isSubmitting}
          >
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default VehicleForm;
