import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Globe, Calendar, Tag, ExternalLink, ArrowLeft, User, Book, Video, FileText, Headphones, Eye, CheckCircle, Clock } from 'lucide-react';

interface SharedTask {
  title: string;
  type: 'ARTICLE' | 'VIDEO' | 'BOOK' | 'PODCAST' | 'COURSE';
  why: string;
  link?: string;
  status: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED';
  reminderDate?: string;
  tags: string[];
  createdAt: string;
}

const SharedPage: React.FC = () => {
  const { shareLink } = useParams<{ shareLink: string }>();
  const [tasks, setTasks] = useState<SharedTask[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSharedContent = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/share/${shareLink}`, { credentials : "include"});
        const data = await response.json();
        
        if (response.ok) {
          if (data.message === "not found") {
            setError("This shared brain doesn't exist or has been disabled.");
          } else {
            setTasks(data.message);
          }
        } else {
          setError(data.message || "Failed to load shared content");
        }
      } catch (error) {
        setError("Failed to load shared content. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    if (shareLink) {
      fetchSharedContent();
    }
  }, [shareLink]);

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'ARTICLE': return <FileText className="text-blue-600" size={20} />;
      case 'VIDEO': return <Video className="text-red-600" size={20} />;
      case 'BOOK': return <Book className="text-green-600" size={20} />;
      case 'PODCAST': return <Headphones className="text-purple-600" size={20} />;
      case 'COURSE': return <Globe className="text-orange-600" size={20} />;
      default: return <FileText className="text-gray-600" size={20} />;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'COMPLETED': return <CheckCircle className="text-green-600" size={16} />;
      case 'IN_PROGRESS': return <Eye className="text-blue-600" size={16} />;
      case 'PENDING': return <Clock className="text-gray-600" size={16} />;
      default: return <Clock className="text-gray-600" size={16} />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'COMPLETED': return 'Completed';
      case 'IN_PROGRESS': return 'In Progress';
      case 'PENDING': return 'Pending';
      default: return 'Pending';
    }
  };

  const getStatsOverview = () => {
    const total = tasks.length;
    const completed = tasks.filter(task => task.status === 'COMPLETED').length;
    const inProgress = tasks.filter(task => task.status === 'IN_PROGRESS').length;
    const pending = tasks.filter(task => task.status === 'PENDING').length;
    
    return { total, completed, inProgress, pending };
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading shared brain...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Globe className="text-red-600" size={32} />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Brain Not Found</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <Link 
            to="/"
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-medium transition-colors"
          >
            <ArrowLeft size={20} />
            Go Home
          </Link>
        </div>
      </div>
    );
  }

  const stats = getStatsOverview();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link 
                to="/"
                className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
              >
                <ArrowLeft size={20} />
                Back to Home
              </Link>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Globe size={16} />
              <span>Shared Brain</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <User className="text-white" size={32} />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Shared Learning Brain</h1>
          <p className="text-gray-600">Discover what someone else is learning and get inspired!</p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Items</p>
                <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Globe className="text-blue-600" size={24} />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Completed</p>
                <p className="text-2xl font-bold text-green-600">{stats.completed}</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <CheckCircle className="text-green-600" size={24} />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">In Progress</p>
                <p className="text-2xl font-bold text-blue-600">{stats.inProgress}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Eye className="text-blue-600" size={24} />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pending</p>
                <p className="text-2xl font-bold text-gray-600">{stats.pending}</p>
              </div>
              <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                <Clock className="text-gray-600" size={24} />
              </div>
            </div>
          </div>
        </div>

        {/* Content Grid */}
        {tasks.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Globe className="text-gray-400" size={32} />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No content shared yet</h3>
            <p className="text-gray-600">This learning brain is empty. Check back later!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {tasks.map((task, index) => (
              <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    {getTypeIcon(task.type)}
                    <div>
                      <h3 className="font-semibold text-gray-900 line-clamp-2">{task.title}</h3>
                      <span className="text-xs font-medium px-2 py-1 rounded-full bg-gray-100 text-gray-600 mt-1 inline-block">
                        {task.type.toLowerCase()}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    {getStatusIcon(task.status)}
                    <span className="text-xs font-medium text-gray-600">
                      {getStatusText(task.status)}
                    </span>
                  </div>
                </div>

                <p className="text-gray-600 text-sm mb-4 line-clamp-3">{task.why}</p>

                {task.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {task.tags.slice(0, 3).map((tag, tagIndex) => (
                      <span key={tagIndex} className="inline-flex items-center gap-1 text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded-full">
                        <Tag size={12} />
                        {tag}
                      </span>
                    ))}
                    {task.tags.length > 3 && (
                      <span className="text-xs text-gray-500">+{task.tags.length - 3} more</span>
                    )}
                  </div>
                )}

                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <Calendar size={14} />
                    <span>Added {new Date(task.createdAt).toLocaleDateString()}</span>
                  </div>
                  
                  {task.link && (
                    <a 
                      href={task.link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs text-blue-600 hover:text-blue-800 font-medium"
                    >
                      <ExternalLink size={14} />
                      Visit
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Footer */}
        <div className="text-center mt-12 py-8 border-t border-gray-200">
          <p className="text-gray-600 mb-4">Inspired by what you see? Start your own learning journey!</p>
          <Link 
            to="/signup"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-6 py-3 rounded-xl font-medium shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
          >
            <User size={20} />
            Create Your Brain
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SharedPage;