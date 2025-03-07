import { Link } from 'react-router-dom';

const TaskItem = ({ task, onDelete }) => {
  // Function to determine status color
  const getStatusColor = () => {
    switch (task.status) {
      case 'completed':
        return 'bg-green-200 text-green-800';
      case 'in progress':
        return 'bg-yellow-200 text-yellow-800';
      default:
        return 'bg-gray-200 text-gray-800';
    }
  };

  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return 'No due date';
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-4">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-semibold">{task.title}</h3>
          <p className="text-gray-600 mt-1">{task.description}</p>
          <div className="mt-2 flex items-center">
            <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor()}`}>
              {task.status}
            </span>
            <span className="text-xs text-gray-500 ml-2">
              Due: {formatDate(task.dueDate)}
            </span>
          </div>
        </div>
        <div className="flex space-x-2">
          <Link 
            to={`/edit/${task._id}`} 
            className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-3 rounded text-sm"
          >
            Edit
          </Link>
          <button 
            onClick={() => onDelete(task._id)} 
            className="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded text-sm"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskItem;