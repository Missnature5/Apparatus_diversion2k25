import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, Share2, Heart, Calendar, Send, Search, X, Users, Share } from 'lucide-react';
import Background3D from '../components/Background3D';
import * as THREE from 'three';
import { useNavigate }from 'react-router-dom';
import StudyGroup from '../components/StudyGroup';

function Dashboard() {
  const [posts, setPosts] = useState([
    { id: 1, author: "Prakriti Mukhopadhayay", content: "Welcome to the College Portal! 🚀", likes: 0, likedBy: [], comments: [], shares: 0 , timestamp: new Date("2024-02-22T08:30:00")},
    { id: 2, author: "Suvam Nath", content: "So you guyzz are enjoying Diversion2k25 right!", likes: 0, likedBy: [], comments: [], shares: 0 },
    { id: 3, author: "Shamik Mondal", content: "Converge is coming guys, are you excited 🔥 ?", likes: 0, likedBy: [], comments: [], shares: 0 },
    { id: 4, author: "Ananya Sharma", content: "The annual sports meet was amazing! Great job, everyone!", likes: 0, likedBy: [], comments: [], shares: 0 },
    { id: 5, author: "Rahul Verma", content: "Just finished our DBMS project! Can’t wait to present it. 🚀", likes: 0, likedBy: [], comments: [], shares: 0 },
    { id: 6, author: "Ishita Banerjee", content: "Finally submitted my thesis paper on AI Ethics. Feels great!", likes: 0, likedBy: [], comments: [], shares: 0 },
    { id: 7, author: "Amitabh Sinha", content: "Cricket match this Sunday! Who’s coming to support? 🏏", likes: 0, likedBy: [], comments: [], shares: 0 },
    { id: 8, author: "Priya Iyer", content: "Startup bootcamp was super informative. So many ideas! 💡", likes: 0, likedBy: [], comments: [], shares: 0 },
    { id: 9, author: "Vikram Rathore", content: "Anyone up for a late-night coding session? Let's crack this together!", likes: 0, likedBy: [], comments: [], shares: 0 },
    { id: 10, author: "Meera Nambiar", content: "Cultural fest rehearsals are on fire! Let’s make this the best one yet! 🔥", likes: 0, likedBy: [], comments: [], shares: 0 },
    { id: 11, author: "Rohit Mishra", content: "Hackathon coming up next month! Time to form teams! 👨‍💻", likes: 0, likedBy: [], comments: [], shares: 0 },
    { id: 12, author: "Sanya Kapoor", content: "Library is full of exam warriors today! Best of luck to all! 📚", likes: 0, likedBy: [], comments: [], shares: 0 },
    { id: 13, author: "Arjun Bhardwaj", content: "Can’t believe it’s the last semester! College memories forever. ❤️", likes: 0, likedBy: [], comments: [], shares: 0 },
    { id: 14, author: "Neha Reddy", content: "Volunteering for the charity event this Saturday. Join us! 🙌", likes: 0, likedBy: [], comments: [], shares: 0 },
    { id: 15, author: "Kunal Das", content: "Who else is excited for the AI/ML workshop next week? 🤖", likes: 0, likedBy: [], comments: [], shares: 0 },
  ]);
  
  const [newPost, setNewPost] = useState("");
  const [chatUser, setChatUser] = useState("");
  const [chatMessage, setChatMessage] = useState("");
  const [privateMessages, setPrivateMessages] = useState({});
  const [currentUser] = useState("Current User");
  const [searchTerm, setSearchTerm] = useState("");
  const [showComments, setShowComments] = useState({});
  const [newComment, setNewComment] = useState({});
  const [onlineUsers] = useState(['Prakriti Mukhopadhyay', 'Suvam Nath', 'Raihan Khan']); // Simulated online users
  const ws = useRef(null);
  const navigate = useNavigate()

  // Simulated WebSocket connection
  useEffect(() => {
    // In a real implementation, replace with your WebSocket server URL
    ws.current = new WebSocket('ws://your-websocket-server');

    ws.current.onmessage = (event) => {
      const data = JSON.parse(event.data);
      handleWebSocketMessage(data);
    };

    return () => {
      if (ws.current) ws.current.close();
    };
  }, []);

  // Handle incoming WebSocket messages
  const handleWebSocketMessage = (data) => {
    switch (data.type) {
      case 'new_post':
        setPosts(prev => [data.post, ...prev]);
        break;
      case 'new_comment':
        setPosts(prev => prev.map(post => 
          post.id === data.postId 
            ? { ...post, comments: [...post.comments, data.comment] }
            : post
        ));
        break;
      case 'private_message':
        setPrivateMessages(prev => ({
          ...prev,
          [data.sender]: [...(prev[data.sender] || []), { sender: data.sender, message: data.message }]
        }));
        break;
      default:
        break;
    }
  };

  // Enhanced 3D Animation Background
  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true });
    
    // Create animated particles
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 5000;
    const posArray = new Float32Array(particlesCount * 3);
    
    for(let i = 0; i < particlesCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 5;
    }
    
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    
    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.005,
      color: '#ffffff',
      transparent: true,
      opacity: 0.8
    });
    
    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);
    
    camera.position.z = 5;
    
    const animate = () => {
      requestAnimationFrame(animate);
      particlesMesh.rotation.x += 0.0001;
      particlesMesh.rotation.y += 0.0001;
      renderer.render(scene, camera);
    };
    
    animate();
    
    // Cleanup
    return () => {
      renderer.dispose();
    };
  }, []);

  const handlePostSubmit = (e) => {
    e.preventDefault();
    if (newPost.trim()) {
      const newPostObj = {
        id: Date.now(),
        author: currentUser,
        content: newPost,
        likes: 0,
        likedBy: [],
        comments: [],
        shares: 0
      };
      
      setPosts([newPostObj, ...posts]);
      ws.current.send(JSON.stringify({
        type: 'new_post',
        post: newPostObj
      }));
      setNewPost("");
    }
  };   
  const handleLike = (postId) => {
    setPosts(posts.map(post =>
      post.id === postId && !post.likedBy.includes(currentUser)
        ? { ...post, likes: post.likes + 1, likedBy: [...post.likedBy, currentUser] }
        : post
    ));
  };
  const handleComment = (postId) => {
    if (newComment[postId]?.trim()) {
      const comment = {
        id: Date.now(),
        author: currentUser,
        content: newComment[postId],
        timestamp: new Date().toISOString()
      };

      setPosts(posts.map(post =>
        post.id === postId
          ? { ...post, comments: [...post.comments, comment] }
          : post
      ));

      ws.current.send(JSON.stringify({
        type: 'new_comment',
        postId,
        comment
      }));

      setNewComment({ ...newComment, [postId]: '' });
    }
  };

  const handleShare = (postId) => {
    setPosts(posts.map(post =>
      post.id === postId
        ? { ...post, shares: post.shares + 1 }
        : post
    ));

    // Simulate sharing to social media or copying link
    navigator.clipboard.writeText(`https://yourcollegeportal.com/post/${postId}`);
  };

  const sendMessage = () => {
    if (chatUser.trim() && chatMessage.trim()) {
      const messageObj = {
        sender: currentUser,
        message: chatMessage,
        timestamp: new Date().toISOString()
      };

      setPrivateMessages((prev) => ({
        ...prev,
        [chatUser]: [...(prev[chatUser] || []), messageObj],
      }));

      ws.current.send(JSON.stringify({
        type: 'private_message',
        recipient: chatUser,
        message: chatMessage
      }));

      setChatMessage("");
    }
  };

  // Filter posts based on search term
  const filteredPosts = posts.filter(post =>
    post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.author.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const HandleLogout = ()=>{
    navigate('/');
  }

  return (

    <>
    
      <div className="min-h-screen text-white relative overflow-hidden">
        <Background3D />
        
        <div className="relative z-10">
          <motion.header
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            className="fixed z-30 top-0 left-0 right-0 bg-black/20 backdrop-blur-lg border-b border-white/10 p-4"
          >
            <div className="flex justify-between items-center max-w-6xl mx-auto">
              <h1 className="text-4xl font-bold">College Portal</h1>
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60" size={16} />
                  <input
                    type="text"
                    placeholder="Search posts..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 bg-white/5 rounded-lg text-white placeholder-white/50 border border-white/10"
                  />
                  <button onClick={HandleLogout} className='bg-blue-950 ml-8 px-4 py-2 rounded-lg '>Logout</button>

                </div>
              </div>
            </div>
          </motion.header>

          <div className="container mx-auto px-4 pt-24 pb-32">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-2xl mx-auto space-y-8"
            >
              <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10">
                <form onSubmit={handlePostSubmit}>
                  <textarea
                    placeholder="Share your thoughts..."
                    value={newPost}
                    onChange={(e) => setNewPost(e.target.value)}
                    className="w-full bg-white/5 rounded-lg p-4 text-white placeholder-white/50 border border-white/10 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    type="submit"
                    className="mt-4 px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
                  >
                    Post
                  </button>
                </form>
              </div>

              <AnimatePresence>
                {filteredPosts.map((post) => (
                  <motion.div
                    key={post.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10"
                  >
                    <div className="flex items-center space-x-4 mb-4">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
                        {post.author[0]}
                      </div>
                      <div>
                        <h3 className="font-semibold">{post.author}</h3>
                        <p className="text-sm text-white/60">Just now</p>
                      </div>
                    </div>
                    <p className="mb-4">{post.content}</p>
                    <div className="flex space-x-4 mb-4">
                      <button
                        onClick={() => handleLike(post.id)}
                        className="flex items-center space-x-2 text-white/60 hover:text-white transition-colors"
                      >
                        <Heart size={18} /> <span>{post.likes}</span>
                      </button>
                      <button
                        onClick={() => setShowComments({ ...showComments, [post.id]: !showComments[post.id] })}
                        className="flex items-center space-x-2 text-white/60 hover:text-white transition-colors"
                      >
                        <MessageSquare size={18} /> <span>{post.comments.length}</span>
                      </button>
                      <button
                        onClick={() => handleShare(post.id)}
                        className="flex items-center space-x-2 text-white/60 hover:text-white transition-colors"
                      >
                        <Share2 size={18} /> <span>{post.shares}</span>
                      </button>
                    </div>

                    {showComments[post.id] && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="border-t border-white/10 pt-4"
                      >
                        <div className="space-y-4 mb-4">
                          {post.comments.map((comment) => (
                            <div key={comment.id} className="bg-white/5 rounded-lg p-3">
                              <div className="flex items-center space-x-2 mb-2">
                                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-sm">
                                  {comment.author[0]}
                                </div>
                                <div>
                                  <p className="text-sm font-semibold">{comment.author}</p>
                                  <p className="text-xs text-white/60">{new Date(comment.timestamp).toLocaleString()}</p>
                                </div>
                              </div>
                              <p className="text-sm">{comment.content}</p>
                            </div>
                          ))}
                        </div>
                        <div className="flex space-x-2">
                          <input
                            type="text"
                            placeholder="Add a comment..."
                            value={newComment[post.id] || ''}
                            onChange={(e) => setNewComment({ ...newComment, [post.id]: e.target.value })}
                            className="flex-1 bg-white/5 rounded-lg p-2 text-white placeholder-white/50 border border-white/10"
                            onKeyDown={(e) => e.key === "Enter" && handleComment(post.id)}
                          />
                          <button
                            onClick={() => handleComment(post.id)}
                            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
                          >
                            Comment
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          </div>

          <motion.div
            initial={{ x: 300 }}
            animate={{ x: 0 }}
            className="fixed right-4 bottom-4 w-80 bg-white/5 backdrop-blur-lg rounded-xl border border-white/10 p-4"
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Private Chat</h2>
              <div className="flex items-center space-x-2">
                <Users size={16} className="text-white/60" />
                <span className="text-sm text-white/60">{onlineUsers.length} online</span>
              </div>
            </div>
            <input
              type="text"
              placeholder="Enter username..."
              value={chatUser}
              onChange={(e) => setChatUser(e.target.value)}
              className="w-full bg-white/5 rounded-lg p-2 mb-2 text-white placeholder-white/50 border border-white/10"
            />
            <div className="h-40 overflow-y-auto mb-2 bg-white/5 rounded-lg p-2">
              {(privateMessages[chatUser] || []).map((msg, index) => (
                <div
                  key={index}
                  className={`text-sm mb-2 p-2 rounded-lg ${
                    msg.sender === currentUser
                      ? 'bg-blue-600 ml-auto'
                      : 'bg-white/10'
                  } max-w-[80%] ${
                    msg.sender === currentUser ? 'ml-auto' : 'mr-auto'
                  }`}
                >
                  <p className="text-xs text-white/60 mb-1">{msg.sender}</p>
                  <p>{msg.message}</p>
                </div>
              ))}
            </div>
            <div className="flex space-x-2">
              <input
                type="text"
                placeholder="Type a message..."
                value={chatMessage}
                onChange={(e) => setChatMessage(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                className="flex-1 bg-white/5 rounded-lg p-2 text-white placeholder-white/50 border border-white/10"
              />
              <button
                onClick={sendMessage}
                className="p-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
              >
                <Send size={18} />
              </button>
            </div>
          </motion.div>

          <motion.div
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            className="fixed left-4 bottom-4 bg-white/5 backdrop-blur-lg rounded-xl border border-white/10 p-4"
          >
            <h2 className="text-lg font-semibold mb-2 flex items-center">
              <Calendar className="mr-2" /> Upcoming Events 🔥
            </h2>
            <ul className="space-y-2">
              <li className="text-sm text-white/80">🤖 Tech Fest - March 20, 2025</li>
              <li className="text-sm text-white/80">📚 Exam Week - April 1-10, 2025</li>
              <li className="text-sm text-white/80">🚀 Cultural Fest - April 15, 2025</li>
            </ul>
          </motion.div>

          {/* Online Users Sidebar */}
          <motion.div
            initial={{ x: 300 }}
            animate={{ x: 0 }}
            className="fixed right-4 top-24 w-64 bg-white/5 backdrop-blur-lg rounded-xl border border-white/10 p-4"
          >
            <h2 className="text-lg font-semibold mb-4 flex items-center">
              <Users className="mr-2" /> Online Users
            </h2>
            <ul className="space-y-2">
              {onlineUsers.map((user, index) => (
                <li
                  key={index}
                  className="flex items-center space-x-2 p-2 hover:bg-white/5 rounded-lg cursor-pointer"
                  onClick={() => setChatUser(user)}
                >
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-green-500 to-blue-500 flex items-center justify-center">
                    {user[0]}
                  </div>
                  <span className="text-sm">{user}</span>
                  <div className="w-2 h-2 rounded-full bg-green-500 ml-auto"></div>
                </li>
              ))}
            </ul>
          </motion.div>
          <StudyGroup/>
        </div>
       
      </div>
    </>
  );
}

export default Dashboard;