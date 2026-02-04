// src/components/dashboard/StatsOverview.tsx
import React from 'react';
import { Tag, CircleCheckBig, Circle } from 'lucide-react';
import type { TaskDetails } from '../../types';

interface StatsOverviewProps {
  tasks: TaskDetails[];
}

const StatsOverview: React.FC<StatsOverviewProps> = ({ tasks }) => {
  const completedTasks = tasks.filter(t => t.status === 'COMPLETED').length;
  const pendingTasks = tasks.filter(t => t.status !== 'COMPLETED').length;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">

{/* shoing count  */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">

        <div className="flex items-center justify-between">
        
          <div>
            <p className="text-sm text-gray-600">Total Content</p>
            <p className="text-2xl font-bold text-gray-900">{tasks.length}</p>
          </div>

          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
            <Tag className="text-blue-600" size={24} />
          </div>

        </div>

      </div>
      
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
       
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600">Completed</p>
            <p className="text-2xl font-bold text-green-600">{completedTasks}</p>
          </div>

          <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
            <CircleCheckBig className="text-green-600" size={28} />
          </div>

        </div>
      </div>
      
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <div className="flex items-center justify-between">
       
          <div>
            <p className="text-sm text-gray-600">Pending</p>
            <p className="text-2xl font-bold text-orange-600">{pendingTasks}</p>
          </div>

          <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
            <Circle className="text-red-600" size={28} />
          </div>

        </div>
      </div>

    </div>
  );
};

export default StatsOverview;