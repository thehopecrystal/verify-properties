
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useData } from '@/context/DataContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { PropertyType, RequestPurpose } from '@/types';
import { FileText } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import PageLayout from '@/components/PageLayout';

const RequestInfo: React.FC = () => {
  const navigate = useNavigate();
  const { addRequest } = useData();
  const [preferredType, setPreferredType] = useState<PropertyType | ''>('');
  const [location, setLocation] = useState('');
  const [purpose, setPurpose] = useState<RequestPurpose | ''>('');
  const [additionalInfo, setAdditionalInfo] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!preferredType || !location || !purpose) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      addRequest({
        preferredType,
        location,
        purpose,
        additionalInfo: additionalInfo || 'No additional information provided.'
      });
      navigate('/');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <PageLayout 
      title="Request Property Information" 
      description="Specify your property information needs and requirements."
    >
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Information Request</CardTitle>
          <CardDescription>
            Fill in the details below to submit your property information request.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form id="requestForm" onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="preferredType">Preferred Property Type</Label>
                <Select
                  value={preferredType}
                  onValueChange={(value) => setPreferredType(value as PropertyType)}
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Residential">Residential</SelectItem>
                    <SelectItem value="Commercial">Commercial</SelectItem>
                    <SelectItem value="Land">Land</SelectItem>
                    <SelectItem value="Vehicle">Vehicle</SelectItem>
                    <SelectItem value="Industrial">Industrial</SelectItem>
                    <SelectItem value="Agricultural">Agricultural</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="purpose">Purpose</Label>
                <Select
                  value={purpose}
                  onValueChange={(value) => setPurpose(value as RequestPurpose)}
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select purpose" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Purchase">Purchase</SelectItem>
                    <SelectItem value="Rent">Rent</SelectItem>
                    <SelectItem value="Investment">Investment</SelectItem>
                    <SelectItem value="Information">Information</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="location">Preferred Location</Label>
              <Input
                id="location"
                placeholder="Enter preferred location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="additionalInfo">Additional Requirements</Label>
              <Textarea
                id="additionalInfo"
                placeholder="Provide any additional information or specific requirements"
                value={additionalInfo}
                onChange={(e) => setAdditionalInfo(e.target.value)}
                rows={5}
              />
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button 
            variant="outline"
            onClick={() => navigate('/')}
          >
            Cancel
          </Button>
          <Button 
            type="submit"
            form="requestForm"
            disabled={isSubmitting || !preferredType || !location || !purpose}
          >
            <FileText className="mr-2 h-4 w-4" />
            {isSubmitting ? 'Submitting...' : 'Submit Request'}
          </Button>
        </CardFooter>
      </Card>
    </PageLayout>
  );
};

export default RequestInfo;
