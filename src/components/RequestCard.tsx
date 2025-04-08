
import React from 'react';
import { PropertyRequest } from '@/types';
import StatusBadge from '@/components/StatusBadge';
import { 
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle, 
} from '@/components/ui/card';
import { Home, MapPin, Calendar, Tag } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface RequestCardProps {
  request: PropertyRequest;
  onStatusChange?: (id: string, status: PropertyRequest['status']) => void;
  isAdmin?: boolean;
}

const RequestCard: React.FC<RequestCardProps> = ({ request, onStatusChange, isAdmin = false }) => {
  const formattedDate = formatDistanceToNow(new Date(request.submissionDate), { addSuffix: true });
  
  return (
    <Card className="h-full">
      <CardHeader>
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg">{request.preferredType} Property Request</CardTitle>
          <StatusBadge status={request.status} />
        </div>
        <CardDescription className="flex items-center gap-1">
          <MapPin size={14} />
          {request.location}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-sm">
            <Home size={16} className="text-primary" />
            <span className="font-medium">Type:</span> {request.preferredType}
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Tag size={16} className="text-primary" />
            <span className="font-medium">Purpose:</span> {request.purpose}
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Calendar size={16} className="text-primary" />
            <span className="font-medium">Requested:</span> {formattedDate}
          </div>
          <p className="text-sm mt-2 line-clamp-2">{request.additionalInfo}</p>
        </div>
      </CardContent>
      
      {isAdmin && onStatusChange && (
        <CardFooter className="flex gap-2 flex-wrap">
          {request.status !== 'Completed' && (
            <button 
              onClick={() => onStatusChange(request.id, 'Completed')}
              className="bg-green-500 text-white px-3 py-1 text-xs rounded hover:bg-green-600"
            >
              Complete
            </button>
          )}
          {request.status !== 'Reviewing' && (
            <button 
              onClick={() => onStatusChange(request.id, 'Reviewing')}
              className="bg-blue-500 text-white px-3 py-1 text-xs rounded hover:bg-blue-600"
            >
              Mark as Reviewing
            </button>
          )}
          {request.status !== 'Rejected' && (
            <button 
              onClick={() => onStatusChange(request.id, 'Rejected')}
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

export default RequestCard;
