
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Property, PropertyRequest } from '@/types';
import { useAuth } from '@/context/AuthContext';
import { toast } from 'sonner';

interface DataContextType {
  properties: Property[];
  requests: PropertyRequest[];
  addProperty: (property: Omit<Property, 'id' | 'userId' | 'status' | 'submissionDate' | 'updatedDate'>) => void;
  updatePropertyStatus: (id: string, status: Property['status']) => void;
  addRequest: (request: Omit<PropertyRequest, 'id' | 'userId' | 'status' | 'submissionDate' | 'updatedDate'>) => void;
  updateRequestStatus: (id: string, status: PropertyRequest['status']) => void;
  getUserProperties: () => Property[];
  getUserRequests: () => PropertyRequest[];
  getPropertyById: (id: string) => Property | undefined;
  getRequestById: (id: string) => PropertyRequest | undefined;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [properties, setProperties] = useState<Property[]>([]);
  const [requests, setRequests] = useState<PropertyRequest[]>([]);

  useEffect(() => {
    // Load data from localStorage
    const storedProperties = localStorage.getItem('properties');
    const storedRequests = localStorage.getItem('requests');
    
    if (storedProperties) {
      setProperties(JSON.parse(storedProperties));
    }
    
    if (storedRequests) {
      setRequests(JSON.parse(storedRequests));
    }
  }, []);

  // Save data to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('properties', JSON.stringify(properties));
  }, [properties]);

  useEffect(() => {
    localStorage.setItem('requests', JSON.stringify(requests));
  }, [requests]);

  const addProperty = (propertyData: Omit<Property, 'id' | 'userId' | 'status' | 'submissionDate' | 'updatedDate'>) => {
    if (!user) {
      toast.error('You must be logged in to submit a property');
      return;
    }
    
    const newProperty: Property = {
      id: crypto.randomUUID(),
      userId: user.id,
      status: 'Pending',
      submissionDate: new Date().toISOString(),
      updatedDate: new Date().toISOString(),
      ...propertyData
    };
    
    setProperties(prev => [...prev, newProperty]);
    toast.success('Property submitted successfully');
  };

  const updatePropertyStatus = (id: string, status: Property['status']) => {
    setProperties(prev => 
      prev.map(prop => 
        prop.id === id 
          ? { ...prop, status, updatedDate: new Date().toISOString() } 
          : prop
      )
    );
    toast.success(`Property status updated to ${status}`);
  };

  const addRequest = (requestData: Omit<PropertyRequest, 'id' | 'userId' | 'status' | 'submissionDate' | 'updatedDate'>) => {
    if (!user) {
      toast.error('You must be logged in to submit a request');
      return;
    }
    
    const newRequest: PropertyRequest = {
      id: crypto.randomUUID(),
      userId: user.id,
      status: 'Pending',
      submissionDate: new Date().toISOString(),
      updatedDate: new Date().toISOString(),
      ...requestData
    };
    
    setRequests(prev => [...prev, newRequest]);
    toast.success('Request submitted successfully');
  };

  const updateRequestStatus = (id: string, status: PropertyRequest['status']) => {
    setRequests(prev => 
      prev.map(req => 
        req.id === id 
          ? { ...req, status, updatedDate: new Date().toISOString() } 
          : req
      )
    );
    toast.success(`Request status updated to ${status}`);
  };

  const getUserProperties = () => {
    if (!user) return [];
    return user.role === 'admin' 
      ? properties 
      : properties.filter(prop => prop.userId === user.id);
  };

  const getUserRequests = () => {
    if (!user) return [];
    return user.role === 'admin' 
      ? requests 
      : requests.filter(req => req.userId === user.id);
  };

  const getPropertyById = (id: string) => {
    return properties.find(prop => prop.id === id);
  };

  const getRequestById = (id: string) => {
    return requests.find(req => req.id === id);
  };

  return (
    <DataContext.Provider 
      value={{ 
        properties, 
        requests, 
        addProperty, 
        updatePropertyStatus, 
        addRequest, 
        updateRequestStatus,
        getUserProperties,
        getUserRequests,
        getPropertyById,
        getRequestById
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};
