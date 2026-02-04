import React, {  useContext, useState } from 'react';
import { Plus, Share2, Globe, Tag } from 'lucide-react';
import LoggedInHeader from '../LoggedInHeader';
import TaskCard from './TaskCard';
import StatsOverview from './StatsOverview';
import AddContentModal from './AddContentModal';
import ShareModal from './ShareModal';
import { useTasks } from '../../hooks/useTasks'; // task CRUD aur state management
import { authContext } from '../../context/authContext';

const Dashboard: React.FC = () => {
  const [showAddForm, setShowAddForm] = useState(false); // decide krtha hai ki AddContentModal open hai ya nahi
  const [showShareModal, setShowShareModal] = useState(false); // decide karta hai ki ShareModal open hai ya nahi
  
  const { tasks, isSubmitting, createTask, deleteTask, toggleTaskStatus } = useTasks();
const {user} = useContext(authContext)
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <LoggedInHeader />

      {/* Header Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
    
    {/* for heading and all that  */}
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">My Learning Hub</h1>
            <p className="text-gray-600">Track and organize your content for future learning</p>
          </div>
          
          {/* add content button and share button  */}
          <div className="flex items-center gap-3">
          
            <button 
              onClick={() => setShowAddForm(true)}
              className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-6 py-3 rounded-xl font-medium shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
            >
              <Plus size={20} />
              Add Content
            </button>
            
            <button 
              onClick={() => setShowShareModal(true)}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium border shadow-sm hover:shadow-md transition-all duration-200 ${
                user?.isShared 
                  ? 'bg-green-50 hover:bg-green-100 text-green-700 border-green-200' 
                  : 'bg-white hover:bg-gray-50 text-gray-700 border-gray-200'
              }`}
            >
              {user?.isShared ? (
                <>
                  <Globe size={20} className="text-green-600" />
                  Sharing Active
                </>
              ) : (
                <>
                  <Share2 size={20} className="text-purple-600" />
                  Share Brain
                </>
              )}
            </button>
          </div>
        </div>

        {/* Stats Overview */}
        <StatsOverview tasks={tasks} />

        {/* Content Grid */}
        {tasks.length === 0 ? 
        (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Tag className="text-gray-400" size={32} />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No content yet</h3>
            <p className="text-gray-600 mb-6">Start building your learning collection by adding your first content</p>
            <button 
              onClick={() => setShowAddForm(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-medium transition-colors"
            >
              Add Your First Content
            </button>
          </div>
        )
         :
          (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {tasks.map((task) =>{
               
            return  <TaskCard
                key={task.id}
                task={task}
                onToggleStatus={toggleTaskStatus}
                onDelete={deleteTask}
              />}
            )}
          </div>
        )
        }
      </div>

      {/* Modals */}
      <AddContentModal
        isOpen={showAddForm}
        onClose={() => setShowAddForm(false)}
        onSubmit={createTask}
        isSubmitting={isSubmitting}
      />

      <ShareModal
        isOpen={showShareModal}
        onClose={() => setShowShareModal(false)}
      />
      
    </div>
  );
};

export default Dashboard;