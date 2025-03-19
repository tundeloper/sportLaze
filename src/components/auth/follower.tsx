export default function Follow () {
    return (
      <div className="flex items-start space-x-3 p-4 bg-gray-100 rounded-lg w-96">
        {/* Profile Image */}
        <img
          src="https://via.placeholder.com/40"
          alt="User Avatar"
          className="w-10 h-10 rounded-full"
        />
  
        {/* User Info */}
        <div className="flex-1">
          <div className="flex items-center space-x-2">
            <span className="font-semibold text-gray-900">Debby Rose Gaglin</span>
            <span className="text-gray-500">@debbyRosegag</span>
            <span className="bg-gray-300 text-xs px-2 py-0.5 rounded-lg text-gray-700">
              Follows you
            </span>
          </div>
          <p className="text-gray-600 text-sm mt-1">
            Lorem ipsum dolor sit amet consectetur. Id blandit lectus enim sit
          </p>
        </div>
  
        {/* Follow Button */}
        <button className="border border-gray-400 text-gray-700 px-4 py-1 rounded-full hover:bg-gray-200">
          Following
        </button>
      </div>
    );
  }