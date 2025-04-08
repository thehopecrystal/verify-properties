
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useData } from '@/context/DataContext';
import { useAuth } from '@/context/AuthContext';
import PropertyCard from '@/components/PropertyCard';
import RequestCard from '@/components/RequestCard';
import EmptyState from '@/components/EmptyState';
import StatsCard from '@/components/StatsCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Home, FileText, Search, ClipboardCheck } from 'lucide-react';
import PageLayout from '@/components/PageLayout';

const UserDashboard: React.FC = () => {
  const { user } = useAuth();
  const { getUserProperties, getUserRequests } = useData();
  const [searchTerm, setSearchTerm] = useState('');
  
  const properties = getUserProperties();
  const requests = getUserRequests();
  
  const filteredProperties = properties.filter(
    property => 
      property.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
      property.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      property.type.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const filteredRequests = requests.filter(
    request => 
      request.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.preferredType.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const pendingProperties = properties.filter(p => p.status === 'Pending').length;
  const verifiedProperties = properties.filter(p => p.status === 'Verified').length;
  const pendingRequests = requests.filter(r => r.status === 'Pending').length;
  
  return (
    <PageLayout 
      title={`Hello ${user?.fullName.split(' ')[0]} 🎉`}
      description="You can easily verify properties and track your verification requests."
    >
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <StatsCard 
          title="Pending Properties" 
          value={pendingProperties} 
          icon={Home}
          description="Properties awaiting verification"
        />
        <StatsCard 
          title="Verified Properties" 
          value={verifiedProperties} 
          icon={ClipboardCheck}
          description="Successfully verified properties"
        />
        <StatsCard 
          title="Pending Requests" 
          value={pendingRequests} 
          icon={FileText}
          description="Information requests in progress"
        />
      </div>
      
      {/* Action buttons */}
      <div className="flex flex-wrap gap-4 mb-8">
        <Button asChild>
          <Link to="/submit">
            <ClipboardCheck className="mr-2 h-4 w-4" />
            Submit New Property
          </Link>
        </Button>
        <Button variant="outline" asChild>
          <Link to="/request">
            <FileText className="mr-2 h-4 w-4" />
            Request Information
          </Link>
        </Button>
      </div>
      
      {/* Search and filter */}
      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
        <Input
          type="text"
          placeholder="Search by title, location, or type..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>
      
      <Tabs defaultValue="properties" className="w-full">
        <TabsList className="mb-8">
          <TabsTrigger value="properties" className="flex-1">Properties</TabsTrigger>
          <TabsTrigger value="requests" className="flex-1">Information Requests</TabsTrigger>
        </TabsList>
        
        <TabsContent value="properties">
          {filteredProperties.length === 0 ? (
            <EmptyState 
              title="No properties found"
              description={searchTerm ? "Try adjusting your search" : "Submit your first property for verification"}
              actionLabel={!searchTerm ? "Submit Property" : undefined}
              actionLink={!searchTerm ? "/submit" : undefined}
            />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProperties.map(property => (
                <PropertyCard 
                  key={property.id} 
                  property={property} 
                />
              ))}
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="requests">
          {filteredRequests.length === 0 ? (
            <EmptyState 
              title="No requests found"
              description={searchTerm ? "Try adjusting your search" : "Submit your first information request"}
              actionLabel={!searchTerm ? "Request Information" : undefined}
              actionLink={!searchTerm ? "/request" : undefined}
            />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredRequests.map(request => (
                <RequestCard 
                  key={request.id} 
                  request={request} 
                />
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </PageLayout>
  );
};

export default UserDashboard;
