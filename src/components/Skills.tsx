import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Code2, Database, Layout, Server, Smartphone, Zap } from 'lucide-react';

export default function Skills() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const skills = [
    {
      category: 'Frontend',
      icon: Layout,
      technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Next.js', 'Vue.js', 'Bootstrap'],
      color: 'from-cyan-500 to-blue-500',
    },
    {
      category: 'Backend',
      icon: Server,
      technologies: ['Node.js', 'Express', 'Python', 'Django', 'PHP', 'C#', 'Java', 'PostgreSQL'],
      color: 'from-violet-500 to-purple-500',
    },
    {
      category: 'Mobile',
      icon: Smartphone,
      technologies: ['React Native', 'Flutter', 'iOS', 'Android'],
      color: 'from-fuchsia-500 to-pink-500',
    },
    {
      category: 'Database',
      icon: Database,
      technologies: ['MongoDB', 'MySQL', 'Redis', 'Supabase', 'Firebase'],
      color: 'from-emerald-500 to-teal-500',
    },
    {
      category: 'DevOps',
      icon: Zap,
      technologies: ['Docker', 'AWS', 'CI/CD', 'Git', 'Linux'],
      color: 'from-orange-500 to-red-500',
    },
    {
      category: 'Tools',
      icon: Code2,
      technologies: ['VS Code', 'Wamp', 'Visual Studio', 'Figma', 'Postman', 'Swagger', 'Jira', 'Notion'],
      color: 'from-indigo-500 to-blue-500',
    },
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <section id="skills" ref={ref} className="py-24 bg-white dark:bg-slate-900 transition-colors duration-300">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-cyan-400 to-violet-500 bg-clip-text text-transparent">
              Compétences
            </span>
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-lg max-w-2xl mx-auto transition-colors duration-300">
            Technologies et outils que je maîtrise pour créer des solutions complètes
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          animate={isInView ? 'show' : 'hidden'}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {skills.map((skill, index) => {
            const Icon = skill.icon;
            return (
              <motion.div
                key={index}
                variants={item}
                whileHover={{ y: -5, scale: 1.02 }}
                className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700 hover:border-cyan-500/50 transition-all duration-300 group shadow-sm dark:shadow-md"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className={`p-3 rounded-lg bg-gradient-to-br ${skill.color} shadow-lg`}>
                    <Icon className="text-white" size={24} />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
                    {skill.category}
                  </h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {skill.technologies.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="px-3 py-1 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-full text-sm hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
