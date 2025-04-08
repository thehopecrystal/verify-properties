
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import VehicleForm from "@/components/VehicleForm";
import LandForm from "@/components/LandForm";
import { PropertyType } from "@/types";
import PageLayout from "@/components/PageLayout";

const SubmitProperty = () => {
  const [selectedType, setSelectedType] = useState<PropertyType>("Vehicle");

  return (
    <PageLayout 
      title="Submit Property for Verification" 
      description="Complete the form below to verify your property ownership."
    >
      <Card>
        <CardContent className="p-6">
          <Tabs defaultValue="Vehicle" onValueChange={(value) => setSelectedType(value as PropertyType)}>
            <TabsList className="grid grid-cols-3 md:grid-cols-6 mb-8">
              <TabsTrigger value="Residential">Residential</TabsTrigger>
              <TabsTrigger value="Commercial">Commercial</TabsTrigger>
              <TabsTrigger value="Land">Land</TabsTrigger>
              <TabsTrigger value="Vehicle">Vehicle</TabsTrigger>
              <TabsTrigger value="Industrial">Industrial</TabsTrigger>
              <TabsTrigger value="Agricultural">Agricultural</TabsTrigger>
            </TabsList>
            
            <TabsContent value="Residential">
              <LandForm propertyType="Residential" />
            </TabsContent>
            
            <TabsContent value="Commercial">
              <LandForm propertyType="Commercial" />
            </TabsContent>
            
            <TabsContent value="Land">
              <LandForm propertyType="Land" />
            </TabsContent>
            
            <TabsContent value="Vehicle">
              <VehicleForm />
            </TabsContent>
            
            <TabsContent value="Industrial">
              <LandForm propertyType="Industrial" />
            </TabsContent>
            
            <TabsContent value="Agricultural">
              <LandForm propertyType="Agricultural" />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </PageLayout>
  );
};

export default SubmitProperty;
