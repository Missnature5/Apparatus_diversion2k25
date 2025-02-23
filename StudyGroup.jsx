import React, { useState } from 'react';
import { Book, Upload, Video, Mic, FileText, Users, X, Plus, Camera, MicOff, VideoOff, MessageSquare, Share2 } from 'lucide-react';

const StudyGroup = () => {
  const [activeGroup, setActiveGroup] = useState({
    id: 1,
    name: "DBMS Study Group",
    members: ["John Doe", "Jane Smith", "Current User"],
    files: [
      { name: "Database Notes.pdf", type: "pdf", size: "2.4MB" },
      { name: "SQL Cheatsheet.docx", type: "doc", size: "1.1MB" }
    ],
    notes: [
      { id: 1, content: "Chapter 3 - Normalization covered today", author: "Jane Smith", date: "2024-02-23" },
      { id: 2, content: "Next meeting: Complex queries and optimization", author: "John Doe", date: "2024-02-23" }
    ]
  });

  const [newNote, setNewNote] = useState("");
  const [isCallActive, setIsCallActive] = useState(false);
  const [callType, setCallType] = useState(null);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [showChat, setShowChat] = useState(false);

  const startCall = (type) => {
    setCallType(type);
    setIsCallActive(true);
  };

  const endCall = () => {
    setIsCallActive(false);
    setCallType(null);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8 flex justify-center items-start gap-4">
      {/* Main Study Group Panel */}
      <div className="w-80 bg-gray-800/50 backdrop-blur-lg rounded-xl border border-white/10 p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold flex items-center">
            <Book className="mr-2" /> Study Groups
          </h2>
          <button className="p-2 bg-blue-600 hover:bg-blue-700 rounded-full">
            <Plus size={18} />
          </button>
        </div>

        {/* Group List */}
        <div className="space-y-2 mb-4">
          <div className="p-3 bg-blue-600 rounded-lg">
            <div className="flex items-center justify-between">
              <span>DBMS Study Group</span>
              <span className="text-sm text-white/60">3 members</span>
            </div>
          </div>
          <div className="p-3 bg-white/5 hover:bg-white/10 rounded-lg cursor-pointer">
            <div className="flex items-center justify-between">
              <span>Algorithm Design</span>
              <span className="text-sm text-white/60">4 members</span>
            </div>
          </div>
        </div>

        {/* Active Group Content */}
        <div className="border-t border-white/10 pt-4">
          <h3 className="font-semibold mb-2">{activeGroup.name}</h3>
          
          {/* Call Controls */}
          <div className="flex space-x-2 mb-4">
            {!isCallActive ? (
              <>
                <button 
                  onClick={() => startCall('video')}
                  className="flex-1 flex items-center justify-center space-x-2 p-2 bg-green-600 hover:bg-green-700 rounded-lg"
                >
                  <Video size={16} /> <span>Video</span>
                </button>
                <button 
                  onClick={() => startCall('audio')}
                  className="flex-1 flex items-center justify-center space-x-2 p-2 bg-green-600 hover:bg-green-700 rounded-lg"
                >
                  <Mic size={16} /> <span>Audio</span>
                </button>
              </>
            ) : (
              <button 
                onClick={endCall}
                className="w-full flex items-center justify-center space-x-2 p-2 bg-red-600 hover:bg-red-700 rounded-lg"
              >
                <X size={16} /> <span>End Call</span>
              </button>
            )}
          </div>

          {/* File Section */}
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-medium">Files</h4>
              <button className="p-2 bg-white/5 hover:bg-white/10 rounded-lg">
                <Upload size={16} />
              </button>
            </div>
            <div className="space-y-2">
              {activeGroup.files.map((file, index) => (
                <div key={index} className="flex items-center justify-between p-2 bg-white/5 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <FileText size={16} />
                    <span className="text-sm">{file.name}</span>
                  </div>
                  <span className="text-xs text-white/60">{file.size}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Notes Section */}
          <div>
            <h4 className="font-medium mb-2">Notes</h4>
            <div className="flex space-x-2 mb-2">
              <input
                type="text"
                value={newNote}
                onChange={(e) => setNewNote(e.target.value)}
                placeholder="Add a note..."
                className="flex-1 bg-white/5 rounded-lg p-2 text-white placeholder-white/50"
              />
              <button className="p-2 bg-blue-600 hover:bg-blue-700 rounded-lg">
                <Plus size={16} />
              </button>
            </div>
            <div className="space-y-2">
              {activeGroup.notes.map(note => (
                <div key={note.id} className="p-2 bg-white/5 rounded-lg">
                  <p className="text-sm">{note.content}</p>
                  <div className="flex justify-between text-xs text-white/60 mt-1">
                    <span>{note.author}</span>
                    <span>{note.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Active Call Panel */}
      {isCallActive && (
        <div className="w-96 bg-gray-800/50 backdrop-blur-lg rounded-xl border border-white/10 p-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Active {callType} Call</h2>
            <div className="flex items-center space-x-2">
              <button 
                onClick={() => setShowChat(!showChat)}
                className="p-2 bg-white/10 rounded-lg hover:bg-white/20"
              >
                <MessageSquare size={16} />
              </button>
              <button 
                onClick={() => setIsMuted(!isMuted)}
                className={`p-2 rounded-lg ${isMuted ? 'bg-red-600' : 'bg-white/10 hover:bg-white/20'}`}
              >
                {isMuted ? <MicOff size={16} /> : <Mic size={16} />}
              </button>
              {callType === 'video' && (
                <button 
                  onClick={() => setIsVideoOff(!isVideoOff)}
                  className={`p-2 rounded-lg ${isVideoOff ? 'bg-red-600' : 'bg-white/10 hover:bg-white/20'}`}
                >
                  {isVideoOff ? <VideoOff size={16} /> : <Video size={16} />}
                </button>
              )}
            </div>
          </div>

          {/* Video Grid */}
          <div className="grid grid-cols-2 gap-2 mb-4">
            <div className="aspect-video bg-gray-700 rounded-lg flex items-center justify-center">
              {isVideoOff ? (
                <Camera size={32} className="text-white/30" />
              ) : (
                <img src="/api/placeholder/320/180" alt="Your video" className="rounded-lg" />
              )}
            </div>
            <div className="aspect-video bg-gray-700 rounded-lg flex items-center justify-center">
              <img src="/api/placeholder/320/180" alt="John's video" className="rounded-lg" />
            </div>
            <div className="aspect-video bg-gray-700 rounded-lg flex items-center justify-center">
              <img src="/api/placeholder/320/180" alt="Jane's video" className="rounded-lg" />
            </div>
          </div>

          {/* Chat Panel */}
          {showChat && (
            <div className="border-t border-white/10 pt-4">
              <div className="h-48 overflow-y-auto mb-2 space-y-2">
                <div className="bg-white/5 p-2 rounded-lg">
                  <p className="text-sm">Can we go over the normalization examples again?</p>
                  <p className="text-xs text-white/60">John Doe</p>
                </div>
                <div className="bg-blue-600 p-2 rounded-lg ml-8">
                  <p className="text-sm">Sure! Let's start with the first normal form.</p>
                  <p className="text-xs text-white/60">You</p>
                </div>
              </div>
              <div className="flex space-x-2">
                <input
                  type="text"
                  placeholder="Type a message..."
                  className="flex-1 bg-white/5 rounded-lg p-2 text-white placeholder-white/50"
                />
                <button className="p-2 bg-blue-600 hover:bg-blue-700 rounded-lg">
                  <Share2 size={16} />
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default StudyGroup;