import React from 'react';
import { Users, MessageCircle, Calendar, Share2, BookOpen, Trophy, Target, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTypewriter, Cursor } from 'react-simple-typewriter';

const Home = () => {
  const [text] = useTypewriter({
    words: ['Connect.', 'Share.', 'Learn.', 'Grow.'],
    loop: true,
    delaySpeed: 2000,
  });

  const features = [
    {
      icon: Users,
      title: "Vibrant Student Community",
      description: "Join a thriving network of ambitious students. Create study groups, collaborate on projects, and build meaningful connections that last beyond graduation."
    },
    {
      icon: MessageCircle,
      title: "Seamless Communication",
      description: "Experience real-time private messaging with end-to-end encryption. Create group chats for your classes, clubs, or study sessions. Never miss an important conversation."
    },
    {
      icon: Share2,
      title: "Interactive Feed",
      description: "Share your academic achievements, questions, and insights. Engage with posts through comments, likes, and shares. Filter content by subjects, departments, or interests."
    },
    {
      icon: Calendar,
      title: "Smart Event Manager",
      description: "Discover and track campus events with our intelligent calendar system. Get personalized event recommendations based on your interests and course schedule."
    },
    {
      icon: BookOpen,
      title: "Resource Sharing",
      description: "Access and share study materials, notes, and academic resources. Create collaborative study guides and share helpful learning tips with your peers."
    },
    {
      icon: Trophy,
      title: "Achievement System",
      description: "Earn badges and recognition for your academic accomplishments and community contributions. Build a portfolio of achievements visible to your network."
    },
    {
      icon: Target,
      title: "Focused Study Groups",
      description: "Find or create subject-specific study groups. Schedule virtual study sessions and track group progress through shared goals and milestones."
    },
    {
      icon: Globe,
      title: "Campus Updates",
      description: "Stay informed with real-time campus news, announcements, and important deadlines. Customize your notification preferences for relevant updates."
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { duration: 0.5, staggerChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900 z-0" />
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_30%_30%,#4B5563_0%,transparent_70%)]" />
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="container mx-auto px-4 py-20 relative z-10"
        >
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h1 className="text-5xl lg:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-gray-100 to-gray-300">
              College Book
            </h1>
            <div className="text-xl lg:text-2xl text-gray-300 mb-8 h-20">
              Your digital campus hub where students can{' '}
              <span className="font-semibold text-gray-100">{text}</span>
              <Cursor cursorColor='white' />
            </div>
            
            <motion.div 
              className="flex gap-4 justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <button className="bg-gray-100 text-gray-900 px-8 py-3 rounded-lg font-semibold text-lg hover:bg-gray-200 transition-colors">
                <Link to='/signup'>Sign-Up</Link>
              </button>
              <button className="border-2 border-gray-100 text-gray-100 px-8 py-3 rounded-lg font-semibold text-lg hover:bg-gray-800 transition-colors">
                <Link to='/login'>Login</Link>
              </button>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Features Grid */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="container mx-auto px-4 py-20"
      >
        <div className="max-w-6xl mx-auto">
          <motion.h2 
            variants={itemVariants}
            className="text-3xl font-bold text-center mb-16 text-gray-100"
          >
            Everything You Need to Succeed
          </motion.h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div 
                key={index}
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
                className="bg-gray-800 rounded-lg p-6 hover:bg-gray-700 transition-colors shadow-lg"
              >
                <feature.icon className="w-12 h-12 text-gray-100 mb-4" />
                <h3 className="text-xl font-semibold mb-3 text-gray-100">
                  {feature.title}
                </h3>
                <p className="text-gray-300">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Final CTA */}
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="container mx-auto px-4 py-20"
      >
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-6 text-gray-100">
            Transform Your College Experience Today
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Join thousands of students who are already enhancing their academic journey through our platform. Connect, collaborate, and create lasting memories with College Book.
          </p>
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gray-100 text-gray-900 px-8 py-3 rounded-lg font-semibold text-lg hover:bg-gray-200 transition-colors"
          >
            <Link to="/signup">Get Started Now</Link>
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default Home;