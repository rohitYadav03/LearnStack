import React from 'react';
import { CircleCheckBig, Circle, Trash2, Calendar, ExternalLink } from 'lucide-react';
import type { TaskDetails, TaskTypeStyle } from '../../types';

interface TaskCardProps {
  task: TaskDetails;
  onToggleStatus: (taskId: number, currentStatus: string) => Promise<{ success: boolean; error?: string }>;
  onDelete: (taskId: number) => Promise<{ success: boolean; error?: string }>;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, onToggleStatus, onDelete }) => {
 
  const getTypeStyle = (type: string): TaskTypeStyle => {
    const styles = {
      YOUTUBE: { bg: 'bg-red-50', text: 'text-red-600', border: 'border-red-200' },
      TWITTER: { bg: 'bg-cyan-50', text: 'text-cyan-600', border: 'border-cyan-200' },
      DOCUMENT: { bg: 'bg-blue-50', text: 'text-blue-600', border: 'border-blue-200' },
      STUDY: { bg: 'bg-purple-50', text: 'text-purple-600', border: 'border-purple-200' },
      FUN: { bg: 'bg-pink-50', text: 'text-pink-600', border: 'border-pink-200' },
      OTHER: { bg: 'bg-gray-50', text: 'text-gray-600', border: 'border-gray-200' }
    };
    return styles[type as keyof typeof styles] || styles.OTHER;
  };

  const getLinkEmbedInfo = (url: string) => {
    if (!url) return null;
    
    const youtubeMatch = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/);
    if (youtubeMatch) {
      return {
        type: 'youtube',
        id: youtubeMatch[1],
        embedUrl: `https://www.youtube.com/embed/${youtubeMatch[1]}`
      };
    }
    
    return {
      type: 'other',
      url: url
    };
  };

  const handleToggleStatus = async () => {
    const result = await onToggleStatus(task.id, task.status);
    
    if (!result.success && result.error) {
      console.error("Toggle task status failed", result.error);
      alert(result.error);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      const result = await onDelete(task.id);
      if (!result.success && result.error) {
        alert(result.error);
      }
    }
  };

  const embedInfo = getLinkEmbedInfo(task.link);
  
  const typeStyle = getTypeStyle(task.type);
  
  return (
    <div className="group bg-white rounded-2xl shadow-md border border-gray-100 hover:shadow-xl hover:border-gray-200 transition-all duration-300 overflow-hidden">
      
      <div className="p-5 pb-4">

        <div className="flex items-start justify-between mb-3">
          
          <div className="flex-1">
            {/* div for type and check if task is done */}
            <div className="flex items-center gap-2 mb-2">
              <span className={`px-2 py-1 text-xs font-medium rounded-lg ${typeStyle.bg} ${typeStyle.text} ${typeStyle.border} border`}>
                {task.type}
              </span>
              {task.status === 'COMPLETED' && (
                <CircleCheckBig size={26} className="text-green-500"/>
              )}
            </div>
            <h2 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 leading-tight">
              {task.title}
            </h2>
            <p className="text-gray-600 text-sm line-clamp-3 leading-relaxed mb-3">
              {task.why}
            </p>
          </div>
        </div>

        {/* Media Preview */}
        {embedInfo?.type === 'youtube' && (
          <div className="mb-4 rounded-xl overflow-hidden">
            <iframe
              width="100%"
              height="180"
              src={embedInfo.embedUrl}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full"
            />
          </div>
        )}
        
        {embedInfo?.type === 'other' && task.link && (
          <div className="mb-4 p-3 bg-gray-100 rounded-xl border border-gray-200">
            <a 
              href={task.link} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-blue-600 hover:text-blue-800 text-sm font-medium"
            >
              <ExternalLink size={14} />
              <span className="truncate">View Link</span>
            </a>
          </div>
        )}

        {/* Tags */}
        {task.tags?.length > 0 &&
         (
          <div className="flex flex-wrap gap-1 mb-4">

            {task.tags.slice(0, 3).map((eachTag, index) => (
              <span key={index} className="px-2 py-1 bg-purple-50 text-purple-600 text-xs rounded-lg border border-purple-100 font-style: italic">
                #{eachTag.tag.title}
              </span>
            ))}

            {task.tags.length > 3 && (
              <span className="px-2 py-1 bg-gray-50 text-gray-500 text-xs rounded-lg border border-gray-100">
                +{task.tags.length - 3} more
              </span>
            )}

          </div>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <Calendar size={12} />
            <span>{new Date(task.reminderDate).toLocaleDateString()}</span>
          </div>
          
          <div className="flex items-center gap-2">
           
            <button
              onClick={handleToggleStatus}
              className={`p-2  rounded-lg transition-all ${
                task.status === 'COMPLETED' 
                  ? 'text-green-600 hover:bg-green-50' 
                  : 'text-gray-400 hover:bg-gray-50 hover:text-green-500'
              }`}
              title={task.status === 'COMPLETED' ? 'Mark as pending' : 'Mark as completed'}
            >
              {task.status === 'COMPLETED' ? <CircleCheckBig size={18} /> : <Circle size={18} />}
            </button>
            
            <button
              onClick={handleDelete}
              className="p-2 text-gray-600 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all opacity-50 group-hover:opacity-100"
              title="Delete task"
            >
              <Trash2 size={16} />
            </button>
          </div>
        </div>



      </div>
    </div>
  );
};

export default TaskCard;