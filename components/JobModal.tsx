import { motion, AnimatePresence } from 'framer-motion'
import { X, Briefcase, MapPin, Euro, CheckCircle, Send } from 'lucide-react'
import { JobDescription } from '@/lib/job-descriptions'
import Link from 'next/link'

interface JobModalProps {
  job: JobDescription | null
  isOpen: boolean
  onClose: () => void
}

export const JobModal = ({ job, isOpen, onClose }: JobModalProps) => {
  if (!job) return null

  // Encode the job title for URL parameter
  const encodedJob = encodeURIComponent(job.title)
  const applyUrl = `/digiqo-recrute?poste=${encodedJob}#formulaire`

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[150]"
          />

          {/* Modal Container */}
          <div className="fixed inset-0 z-[151] overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4">
              {/* Modal */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Header with gradient */}
                <div className="relative bg-gradient-to-br from-digiqo-primary to-digiqo-accent p-6 pb-8">
                  <button
                    onClick={onClose}
                    className="absolute top-4 right-4 p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors"
                  >
                    <X className="w-5 h-5 text-white" />
                  </button>

                  <motion.h2
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="text-2xl md:text-3xl font-bold text-white mb-2 pr-12"
                  >
                    {job.title}
                  </motion.h2>

                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.15 }}
                    className="text-white/90"
                  >
                    {job.shortDescription}
                  </motion.p>

                  {/* Key info badges */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="flex flex-wrap gap-3 mt-4"
                  >
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm">
                      <MapPin className="w-4 h-4" />
                      {job.location}
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm">
                      <Briefcase className="w-4 h-4" />
                      {job.status}
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm">
                      <Euro className="w-4 h-4" />
                      {job.remuneration}
                    </span>
                  </motion.div>
                </div>

                {/* Content - scrollable */}
                <div className="max-h-[400px] overflow-y-auto p-6 space-y-6">
                  {/* Highlights */}
                  {job.highlights && (
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.25 }}
                      className="bg-gradient-to-r from-digiqo-primary/5 to-digiqo-accent/5 rounded-xl p-4"
                    >
                      <h3 className="font-semibold text-digiqo-primary mb-2">Points forts</h3>
                      <div className="flex flex-wrap gap-2">
                        {job.highlights.map((highlight, index) => (
                          <span
                            key={index}
                            className="inline-flex items-center gap-1 px-3 py-1 bg-white rounded-full text-sm text-gray-700"
                          >
                            <CheckCircle className="w-3.5 h-3.5 text-digiqo-accent" />
                            {highlight}
                          </span>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {/* Missions */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                      <span className="w-1 h-6 bg-digiqo-primary rounded-full" />
                      Vos missions
                    </h3>
                    <ul className="space-y-2">
                      {job.missions.map((mission, index) => (
                        <motion.li
                          key={index}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.35 + index * 0.05 }}
                          className="flex items-start gap-2 text-gray-700"
                        >
                          <CheckCircle className="w-5 h-5 text-digiqo-accent shrink-0 mt-0.5" />
                          <span className="text-sm">{mission}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </motion.div>

                  {/* Profile */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                      <span className="w-1 h-6 bg-digiqo-accent rounded-full" />
                      Profil recherché
                    </h3>
                    <ul className="space-y-2">
                      {job.profile.map((requirement, index) => (
                        <motion.li
                          key={index}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.45 + index * 0.05 }}
                          className="flex items-start gap-2 text-gray-700"
                        >
                          <div className="w-1.5 h-1.5 bg-digiqo-primary rounded-full mt-2 shrink-0" />
                          <span className="text-sm">{requirement}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </motion.div>
                </div>

                {/* Footer with CTA */}
                <div className="border-t border-gray-100 p-6 bg-gray-50">
                  <div className="flex flex-col sm:flex-row gap-3 justify-between items-center">
                    <p className="text-sm text-gray-600">
                      Intéressé(e) par cette opportunité ?
                    </p>
                    <div className="flex gap-3">
                      <button
                        onClick={onClose}
                        className="px-6 py-2.5 text-gray-600 hover:text-gray-800 transition-colors"
                      >
                        Fermer
                      </button>
                      <Link
                        href={applyUrl}
                        onClick={onClose}
                        className="inline-flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-digiqo-primary to-digiqo-accent text-white font-medium rounded-full hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5"
                      >
                        <Send className="w-4 h-4" />
                        Postuler maintenant
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </>
      )}
    </AnimatePresence>
  )
}