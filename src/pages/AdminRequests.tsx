
import React, { useState } from 'react';
import { useData } from '@/context/DataContext';
import RequestCard from '@/components/RequestCard';
import { Input } from '@/components/ui/input';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { RequestStatus } from '@/types';
import { Search, Filter } from 'lucide-react';
import EmptyState from '@/components/EmptyState';
import PageLayout from '@/components/PageLayout';

const AdminRequests: React.FC = () => {
  const { requests, updateRequestStatus } = useData();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [purposeFilter, setpurposeFilter] = useState<string>('all');
  
  const filteredRequests = requests.filter(request => {
    const matchesSearch = 
      request.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.preferredType.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.additionalInfo.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || request.status === statusFilter;
    const matchesPurpose = purposeFilter === 'all' || request.purpose === purposeFilter;
    
    return matchesSearch && matchesStatus && matchesPurpose;
  });
  
  return (
    <PageLayout 
      title="Manage Requests" 
      description="Review and update the status of information requests."
    >
      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <Input
            type="text"
            placeholder="Search requests..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <div className="flex items-center gap-2">
          <Filter size={18} className="text-gray-500" />
          <Select 
            value={statusFilter} 
            onValueChange={setStatusFilter}
          >
            <SelectTrigger>
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="Pending">Pending</SelectItem>
              <SelectItem value="Reviewing">Reviewing</SelectItem>
              <SelectItem value="Completed">Completed</SelectItem>
              <SelectItem value="Rejected">Rejected</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="flex items-center gap-2">
          <Filter size={18} className="text-gray-500" />
          <Select 
            value={purposeFilter} 
            onValueChange={setpurposeFilter}
          >
            <SelectTrigger>
              <SelectValue placeholder="Filter by purpose" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Purposes</SelectItem>
              <SelectItem value="Purchase">Purchase</SelectItem>
              <SelectItem value="Rent">Rent</SelectItem>
              <SelectItem value="Investment">Investment</SelectItem>
              <SelectItem value="Information">Information</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      {filteredRequests.length === 0 ? (
        <EmptyState 
          title="No requests found"
          description="Try adjusting your filters or search term"
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRequests.map(request => (
            <RequestCard 
              key={request.id} 
              request={request} 
              onStatusChange={updateRequestStatus}
              isAdmin={true}
            />
          ))}
        </div>
      )}
    </PageLayout>
  );
};

export default AdminRequests;
