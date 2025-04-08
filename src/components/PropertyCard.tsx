
import React from 'react';
import { Property } from '@/types';
import StatusBadge from '@/components/StatusBadge';
import { 
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle, 
} from '@/components/ui/card';
import { Building, MapPin, Calendar } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface PropertyCardProps {
  property: Property;
  onStatusChange?: (id: string, status: Property['status']) => void;
  isAdmin?: boolean;
}

const PropertyCard: React.FC<PropertyCardProps> = ({ property, onStatusChange, isAdmin = false }) => {
  const formattedDate = formatDistanceToNow(new Date(property.submissionDate), { addSuffix: true });
  
  return (
    <Card className="h-full">
      <CardHeader>
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg">{property.title}</CardTitle>
          <StatusBadge status={property.status} />
        </div>
        <CardDescription className="flex items-center gap-1">
          <MapPin size={14} />
          {property.location}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-sm">
            <Building size={16} className="text-primary" />
            <span className="font-medium">Type:</span> {property.type}
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Calendar size={16} className="text-primary" />
            <span className="font-medium">Submitted:</span> {formattedDate}
          </div>
          <p className="text-sm mt-2 line-clamp-2">{property.description}</p>
        </div>
      </CardContent>
      
      {isAdmin && onStatusChange && (
        <CardFooter className="flex gap-2 flex-wrap">
          {property.status !== 'Verified' && (
            <button 
              onClick={() => onStatusChange(property.id, 'Verified')}
              className="bg-green-500 text-white px-3 py-1 text-xs rounded hover:bg-green-600"
            >
              Verify
            </button>
          )}
          {property.status !== 'Reviewing' && (
            <button 
              onClick={() => onStatusChange(property.id, 'Reviewing')}
              className="bg-blue-500 text-white px-3 py-1 text-xs rounded hover:bg-blue-600"
            >
              Mark as Reviewing
            </button>
          )}
          {property.status !== 'Rejected' && (
            <button 
              onClick={() => onStatusChange(property.id, 'Rejected')}
              className="bg-red-500 text-white px-3 py-1 text-xs rounded hover:bg-red-600"
            >
              Reject
            </button>
          )}
        </CardFooter>
      )}
    </Card>
  );
};

export default PropertyCard;
