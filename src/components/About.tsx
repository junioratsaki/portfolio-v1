import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Award, Briefcase, GraduationCap, Heart } from 'lucide-react';

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const timeline = [
    {
      icon: GraduationCap,
      year: '2018 - 2021',
      title: 'Formation Développement Web',
      description: 'Diplôme d\'ingénieur en informatique avec spécialisation en développement web.',
      color: 'from-cyan-500 to-blue-500',
    },
    {
      icon: Briefcase,
      year: '2021 - 2022',
      title: 'Développeur Junior',
      description: 'Première expérience en startup, développement d\'applications web modernes.',
      color: 'from-violet-500 to-purple-500',
    },
    {
      icon: Award,
      year: '2022 - 2024',
      title: 'Développeur Full Stack',
      description: 'Lead développeur sur plusieurs projets d\'envergure pour clients internationaux.',
      color: 'from-fuchsia-500 to-pink-500',
    },
    {
      icon: Heart,
      year: '2024',
      title: 'Développeur Freelance',
      description: 'Lancement de mon activité freelance pour accompagner startups et PME.',
      color: 'from-emerald-500 to-teal-500',
    },
  ];

  const stats = [
    { number: '50+', label: 'Projets réalisés' },
    { number: '5+', label: 'Années d\'expérience' },
    { number: '30+', label: 'Clients satisfaits' },
    { number: '100%', label: 'Engagement' },
  ];

  return (
    <section id="about" ref={ref} className="py-24 bg-white dark:bg-slate-900 transition-colors duration-300">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-cyan-400 to-violet-500 bg-clip-text text-transparent">
              À propos de moi
            </span>
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-lg max-w-2xl mx-auto transition-colors duration-300">
            Passionné par la technologie et l'innovation
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-center"
            >
              <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-cyan-400 to-violet-500 bg-clip-text text-transparent mb-2">
                {stat.number}
              </div>
              <div className="text-slate-600 dark:text-slate-400 transition-colors duration-300">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-violet-500 rounded-2xl blur-2xl opacity-20" />
              <img
                src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&h=600&fit=crop"
                alt="Développeur au travail"
                className="relative rounded-2xl shadow-2xl"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <p className="text-slate-700 dark:text-slate-300 text-lg leading-relaxed transition-colors duration-300">
              Développeur full stack passionné avec plus de 5 ans d'expérience dans la création
              d'applications web et mobile modernes. Je me spécialise dans l'écosystème JavaScript/TypeScript
              et j'adore transformer des idées complexes en solutions élégantes et performantes.
            </p>
            <p className="text-slate-700 dark:text-slate-300 text-lg leading-relaxed transition-colors duration-300">
              Mon approche combine esthétique et fonctionnalité, en mettant l'accent sur l'expérience
              utilisateur et les meilleures pratiques de développement. J'aime relever de nouveaux défis
              et apprendre continuellement de nouvelles technologies.
            </p>

            <div className="space-y-4 mt-8">
              {timeline.map((item, index) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                    className="flex gap-4 items-start group"
                  >
                    <div className={`p-3 rounded-lg bg-gradient-to-br ${item.color} shadow-lg flex-shrink-0 group-hover:scale-110 transition-transform`}>
                      <Icon className="text-white" size={24} />
                    </div>
                    <div>
                      <div className="text-cyan-600 dark:text-cyan-400 text-sm font-semibold mb-1 transition-colors duration-300">{item.year}</div>
                      <h4 className="text-slate-900 dark:text-white font-bold text-lg mb-1 transition-colors duration-300">{item.title}</h4>
                      <p className="text-slate-600 dark:text-slate-400 transition-colors duration-300">{item.description}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
