
import React from 'react';
import { Link } from 'react-router-dom';
import { useData } from '@/context/DataContext';
import Navigation from '@/components/Navigation';
import StatsCard from '@/components/StatsCard';
import { Button } from '@/components/ui/button';
import { 
  Home, 
  ClipboardCheck, 
  FileText, 
  UserCheck,
  Clock,
  CheckCircle,
  XCircle
} from 'lucide-react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';

const AdminDashboard: React.FC = () => {
  const { properties, requests } = useData();
  
  // Stats calculation
  const totalProperties = properties.length;
  const totalRequests = requests.length;
  const pendingProperties = properties.filter(p => p.status === 'Pending').length;
  const reviewingProperties = properties.filter(p => p.status === 'Reviewing').length;
  const verifiedProperties = properties.filter(p => p.status === 'Verified').length;
  const rejectedProperties = properties.filter(p => p.status === 'Rejected').length;
  const pendingRequests = requests.filter(r => r.status === 'Pending').length;
  
  // Recent items
  const recentProperties = [...properties]
    .sort((a, b) => new Date(b.submissionDate).getTime() - new Date(a.submissionDate).getTime())
    .slice(0, 5);
  
  const recentRequests = [...requests]
    .sort((a, b) => new Date(b.submissionDate).getTime() - new Date(a.submissionDate).getTime())
    .slice(0, 5);
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">
            Admin Dashboard
          </h1>
          <p className="text-gray-600">
            Monitor and manage property verifications and information requests.
          </p>
        </div>
        
        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatsCard 
            title="Total Properties" 
            value={totalProperties} 
            icon={Home}
          />
          <StatsCard 
            title="Total Requests" 
            value={totalRequests} 
            icon={FileText}
          />
          <StatsCard 
            title="Verified Properties" 
            value={verifiedProperties} 
            icon={CheckCircle}
            className="bg-green-50"
          />
          <StatsCard 
            title="Pending Verification" 
            value={pendingProperties + reviewingProperties} 
            icon={Clock}
            className="bg-yellow-50"
          />
        </div>
        
        {/* Status breakdown */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Pending</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{pendingProperties}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Reviewing</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{reviewingProperties}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Verified</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{verifiedProperties}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Rejected</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{rejectedProperties}</div>
            </CardContent>
          </Card>
        </div>
        
        {/* Quick action buttons */}
        <div className="flex flex-wrap gap-4 mb-8">
          <Button asChild>
            <Link to="/admin/properties">
              <ClipboardCheck className="mr-2 h-4 w-4" />
              Manage Properties
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link to="/admin/requests">
              <FileText className="mr-2 h-4 w-4" />
              Manage Requests
            </Link>
          </Button>
        </div>
        
        {/* Recent items */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Properties */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Property Submissions</CardTitle>
              <CardDescription>
                Recently submitted properties pending verification
              </CardDescription>
            </CardHeader>
            <CardContent>
              {recentProperties.length === 0 ? (
                <p className="text-center py-4 text-gray-500">No recent property submissions</p>
              ) : (
                <div className="space-y-4">
                  {recentProperties.map(property => (
                    <div key={property.id} className="flex items-center justify-between border-b pb-2">
                      <div>
                        <p className="font-medium">{property.title}</p>
                        <p className="text-sm text-gray-500">{property.type} • {property.location}</p>
                      </div>
                      <div className={`text-xs font-medium px-2 py-1 rounded-full ${
                        property.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                        property.status === 'Reviewing' ? 'bg-blue-100 text-blue-800' :
                        property.status === 'Verified' ? 'bg-green-100 text-green-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {property.status}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
          
          {/* Recent Requests */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Information Requests</CardTitle>
              <CardDescription>
                Recently submitted information requests
              </CardDescription>
            </CardHeader>
            <CardContent>
              {recentRequests.length === 0 ? (
                <p className="text-center py-4 text-gray-500">No recent information requests</p>
              ) : (
                <div className="space-y-4">
                  {recentRequests.map(request => (
                    <div key={request.id} className="flex items-center justify-between border-b pb-2">
                      <div>
                        <p className="font-medium">{request.preferredType} Request</p>
                        <p className="text-sm text-gray-500">{request.purpose} • {request.location}</p>
                      </div>
                      <div className={`text-xs font-medium px-2 py-1 rounded-full ${
                        request.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                        request.status === 'Reviewing' ? 'bg-blue-100 text-blue-800' :
                        request.status === 'Completed' ? 'bg-green-100 text-green-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {request.status}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
