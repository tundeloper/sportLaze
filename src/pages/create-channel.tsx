import { useState } from 'react';
import Layout from '../components/layout/layout';

export default function CreateChannel() {
  const [channelName, setChannelName] = useState('');
  const [description, setDescription] = useState('');
  const [selectedLounge, setSelectedLounge] = useState('Soccer');
  const maxCharCount = 244;

  return (
    <Layout>
    <div className="flex flex-col items-center p-6 min-h-screen bg-[#f9f2f2]">
      {/* Floating Create Button */}
      <button className="border-2 border-blue-600 text-blue-600 px-6 py-2 rounded-full text-lg font-semibold hover:bg-blue-100 transition-all">
        + Create Channels
      </button>
      
      {/* Form Container */}
      <div className="mt-8 w-full max-w-lg p-6 rounded-lg">
        {/* Channel Name */}
        <label className="block text-gray-700 mb-1">Name of Channel</label>
        <input
          type="text"
          placeholder="Type Name of Channel"
          value={channelName}
          onChange={(e) => setChannelName(e.target.value)}
          className="w-full p-3 border border-gray-400 bg-transparent text-secondary rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
        />
        
        {/* Description */}
        <label className="block text-gray-700 mb-1">Description</label>
        <textarea
          placeholder="Type Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-3 border border-gray-400 bg-transparent text-secondary rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
          rows={4}
        />
        <div className="text-right text-gray-500 text-sm mt-[-1rem]">{maxCharCount - description.length}</div>

        {/* Lounges */}
        <label className="block text-gray-700 font-medium mb-2">Lounges</label>
        <div className="flex gap-2">
          <button className="px-4 py-2 border rounded-full bg-gray-200 text-gray-700 font-medium">
            {selectedLounge}
          </button>
        </div>
        
        {/* Submit Button */}
        <button className="w-full mt-6 bg-secondary text-white py-3 rounded-lg text-lg font-semibold hover:bg-secondary20 transition-all">
          Create Channel
        </button>
      </div>
    </div>
    </Layout>
  );
}