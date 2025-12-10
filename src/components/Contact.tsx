import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Mail, MapPin, Phone, Send, MessageCircle } from 'lucide-react';
import emailjs from '@emailjs/browser';

export default function Contact() {
  const ref = useRef(null);
  const formRef = useRef<HTMLFormElement>(null); // Référence pour EmailJS
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  
  // États pour gérer le chargement et les messages de succès/erreur
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const contactInfo = [
    {
      icon: Mail,
      label: 'Email',
      value: 'atsakij@gmail.com',
      href: 'mailto:atsakij@gmail.com',
    },
    {
      icon: Phone,
      label: 'Téléphone',
      value: '+237 655 86 94 77',
      href: 'tel:+237655869477',
    },
    {
      icon: MapPin,
      label: 'Localisation',
      value: 'Douala, Cameroun',
      href: '#',
    },
  ];

  // --- LOGIQUE ENVOI EMAIL (EmailJS) ---
  const sendEmail = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');

    // ⚠️ REMPLACE CES VALEURS PAR TES CLÉS EMAILJS ⚠️
    // Trouve-les sur : https://dashboard.emailjs.com/admin
    const SERVICE_ID = 'service_xxxxxxx';  
    const TEMPLATE_ID = 'template_xxxxxxx';
    const PUBLIC_KEY = 'xxxxxxxxxxxxxxx';

    if (formRef.current) {
      emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, formRef.current, PUBLIC_KEY)
        .then((result) => {
            console.log(result.text);
            setStatus('success');
            setFormData({ name: '', email: '', subject: '', message: '' }); // Reset du formulaire
            setTimeout(() => setStatus('idle'), 5000); // Efface le message après 5s
        }, (error) => {
            console.log(error.text);
            setStatus('error');
            setTimeout(() => setStatus('idle'), 5000);
        });
    }
  };

  // --- LOGIQUE ENVOI WHATSAPP (AMÉLIORÉE) ---
  const sendToWhatsApp = () => {
    // 1. On récupère le nom (ou on met un vide si pas encore rempli)
    const name = formData.name ? formData.name : "";

    // 2. On définit le message
    let message = "";

    // Si l'utilisateur a déjà tapé un message dans le formulaire, on l'utilise
    if (formData.message) {
      message = `Salut Junior ! 👋\n\nJe suis ${name}.\n\nVoici mon message :\n${formData.message}`;
    } 
    // Sinon, on met un message d'accroche par défaut
    else {
      message = `Salut Junior ! 👋\n\nJe suis ${name} et je viens de visiter ton portfolio.\nJ'aimerais discuter d'un projet avec toi.`;
    }

    // 3. On encode le texte pour qu'il passe dans l'URL (les espaces deviennent %20, etc.)
    const text = encodeURIComponent(message);
    
    // Ton numéro (sans le + et sans espaces)
    const phoneNumber = "237655869477"; 
    
    // Ouvre WhatsApp
    window.open(`https://wa.me/${phoneNumber}?text=${text}`, '_blank');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <section id="contact" ref={ref} className="py-24 bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-cyan-400 to-violet-500 bg-clip-text text-transparent">
              Contactez-moi
            </span>
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-lg max-w-2xl mx-auto">
            Vous avez un projet en tête ? Discutons-en !
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* COLONNE GAUCHE : INFO */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Envoyons ensemble !</h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                Je suis toujours ouvert à de nouveaux projets et opportunités de collaboration.
                N'hésitez pas à me contacter pour discuter de vos idées.
              </p>
            </div>

            <div className="space-y-4">
              {contactInfo.map((info, index) => {
                const Icon = info.icon;
                return (
                  <motion.a
                    key={index}
                    href={info.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="flex items-center gap-4 p-4 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 hover:border-cyan-500/50 transition-all duration-300 group shadow-sm dark:shadow-none"
                  >
                    <div className="p-3 bg-gradient-to-br from-cyan-500 to-violet-500 rounded-lg group-hover:scale-110 transition-transform">
                      <Icon className="text-white" size={24} />
                    </div>
                    <div>
                      <div className="text-slate-500 dark:text-slate-400 text-sm">{info.label}</div>
                      <div className="text-slate-900 dark:text-white font-semibold group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
                        {info.value}
                      </div>
                    </div>
                  </motion.a>
                );
              })}
            </div>
          </motion.div>

          {/* COLONNE DROITE : FORMULAIRE */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <form ref={formRef} onSubmit={sendEmail} className="space-y-6 bg-white dark:bg-slate-900 p-8 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xl dark:shadow-none">
              
              {/* CHAMPS DU FORMULAIRE */}
              <div>
                <label htmlFor="name" className="block text-slate-700 dark:text-slate-300 mb-2 font-medium">Nom complet</label>
                <input
                  type="text"
                  id="name"
                  name="name" // Important pour EmailJS : doit correspondre au {{name}} dans ton template
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:border-cyan-500 transition-colors"
                  placeholder="Votre nom"
                  required
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-slate-700 dark:text-slate-300 mb-2 font-medium">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:border-cyan-500 transition-colors"
                  placeholder="votre@email.com"
                  required
                />
              </div>

              <div>
                <label htmlFor="subject" className="block text-slate-700 dark:text-slate-300 mb-2 font-medium">Sujet</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:border-cyan-500 transition-colors"
                  placeholder="Objet de votre message"
                  required
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-slate-700 dark:text-slate-300 mb-2 font-medium">Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={5}
                  className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:border-cyan-500 transition-colors resize-none"
                  placeholder="Votre message..."
                  required
                />
              </div>

              {/* MESSAGES DE STATUT */}
              {status === 'success' && (
                <div className="p-3 bg-green-500/10 border border-green-500/20 rounded text-green-500 text-center text-sm">
                  Message envoyé avec succès ! Je vous répondrai très vite.
                </div>
              )}
              {status === 'error' && (
                <div className="p-3 bg-red-500/10 border border-red-500/20 rounded text-red-500 text-center text-sm">
                  Une erreur est survenue. Essayez le bouton WhatsApp ci-dessous.
                </div>
              )}

              {/* BOUTONS D'ACTION */}
              <div className="flex flex-col gap-3">
                <motion.button
                  type="submit"
                  disabled={status === 'sending'}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full px-8 py-4 bg-gradient-to-r from-cyan-500 to-violet-600 rounded-lg font-semibold text-white shadow-lg shadow-cyan-500/50 hover:shadow-xl hover:shadow-violet-500/50 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {status === 'sending' ? 'Envoi en cours...' : 'Envoyer le message'}
                  <Send size={20} />
                </motion.button>

                <div className="relative flex py-2 items-center">
                  <div className="flex-grow border-t border-slate-700"></div>
                  <span className="flex-shrink-0 mx-4 text-slate-500 text-sm">Ou contactez-moi directement</span>
                  <div className="flex-grow border-t border-slate-700"></div>
                </div>

                <motion.button
                  type="button"
                  onClick={sendToWhatsApp}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full px-8 py-4 bg-green-600 hover:bg-green-500 rounded-lg font-semibold text-white shadow-lg shadow-green-900/20 transition-all duration-300 flex items-center justify-center gap-2"
                >
                  Discussion immédiate sur WhatsApp
                  <MessageCircle size={20} />
                </motion.button>
              </div>

            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}