
import React from 'react';
import { PropertyStatus, RequestStatus } from '@/types';

interface StatusBadgeProps {
  status: PropertyStatus | RequestStatus;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const getStatusClass = () => {
    switch (status) {
      case 'Pending':
        return 'status-badge status-pending';
      case 'Reviewing':
        return 'status-badge status-reviewing';
      case 'Verified':
      case 'Completed':
        return 'status-badge status-verified';
      case 'Rejected':
        return 'status-badge status-rejected';
      default:
        return 'status-badge';
    }
  };

  return (
    <span className={getStatusClass()}>
      {status}
    </span>
  );
};

export default StatusBadge;
