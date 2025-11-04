import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Clock, CheckCircle, XCircle, Trophy, RotateCcw } from 'lucide-react'
import { QuizQuestion } from '@/lib/quiz-questions'

interface QuizModalProps {
  isOpen: boolean
  onClose: () => void
  questions: QuizQuestion[]
  formationTitle: string
}

type QuizState = 'identity' | 'preparation' | 'quiz' | 'results'

interface UserAnswer {
  questionId: number
  selectedAnswer: number
  isCorrect: boolean
  timeSpent: number
}

interface UserIdentity {
  firstName: string
  lastName: string
}

export function QuizModal({ isOpen, onClose, questions, formationTitle }: QuizModalProps) {
  const [quizState, setQuizState] = useState<QuizState>('identity')
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [userAnswers, setUserAnswers] = useState<UserAnswer[]>([])
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [timeLeft, setTimeLeft] = useState(20)
  const [isAnswerLocked, setIsAnswerLocked] = useState(false)
  const [userIdentity, setUserIdentity] = useState<UserIdentity>({ firstName: '', lastName: '' })

  const currentQuestion = questions[currentQuestionIndex]
  const totalQuestions = questions.length

  // Timer logic - 20 seconds per question
  useEffect(() => {
    if (quizState !== 'quiz') return

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          // Time's up - auto-advance to next question
          handleNextQuestion()
          return 20
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [quizState, currentQuestionIndex])

  const handleStartQuiz = () => {
    setQuizState('quiz')
    setCurrentQuestionIndex(0)
    setUserAnswers([])
    setSelectedAnswer(null)
    setTimeLeft(20)
    setIsAnswerLocked(false)
  }

  const handleAnswerSelect = (answerIndex: number) => {
    if (isAnswerLocked) return
    setSelectedAnswer(answerIndex)
  }

  const handleNextQuestion = () => {
    // Record the answer (or null if no answer selected)
    if (selectedAnswer !== null) {
      const isCorrect = selectedAnswer === currentQuestion.correctAnswer
      setUserAnswers([
        ...userAnswers,
        {
          questionId: currentQuestion.id,
          selectedAnswer,
          isCorrect,
          timeSpent: 20 - timeLeft
        }
      ])
    } else {
      // No answer selected - count as wrong
      setUserAnswers([
        ...userAnswers,
        {
          questionId: currentQuestion.id,
          selectedAnswer: -1,
          isCorrect: false,
          timeSpent: 20
        }
      ])
    }

    // Move to next question or show results
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
      setSelectedAnswer(null)
      setTimeLeft(20)
      setIsAnswerLocked(false)
    } else {
      // Log quiz completion with user info
      const finalAnswers = selectedAnswer !== null
        ? [...userAnswers, {
            questionId: currentQuestion.id,
            selectedAnswer,
            isCorrect: selectedAnswer === currentQuestion.correctAnswer,
            timeSpent: 20 - timeLeft
          }]
        : [...userAnswers, {
            questionId: currentQuestion.id,
            selectedAnswer: -1,
            isCorrect: false,
            timeSpent: 20
          }]

      const correctCount = finalAnswers.filter(a => a.isCorrect).length
      const percentage = Math.round((correctCount / totalQuestions) * 100)

      console.log('📊 Quiz Résultats:', {
        utilisateur: `${userIdentity.firstName} ${userIdentity.lastName}`,
        formation: formationTitle,
        score: `${correctCount}/${totalQuestions} (${percentage}%)`,
        date: new Date().toISOString(),
        détails: finalAnswers
      })

      setQuizState('results')
    }
  }

  const handleRestartQuiz = () => {
    setQuizState('identity')
    setCurrentQuestionIndex(0)
    setUserAnswers([])
    setSelectedAnswer(null)
    setTimeLeft(20)
    setIsAnswerLocked(false)
    setUserIdentity({ firstName: '', lastName: '' })
  }

  const calculateScore = () => {
    const correctAnswers = userAnswers.filter(a => a.isCorrect).length
    return {
      correct: correctAnswers,
      total: totalQuestions,
      percentage: Math.round((correctAnswers / totalQuestions) * 100)
    }
  }

  const getProgressColor = () => {
    const percentage = (timeLeft / 20) * 100
    if (percentage > 60) return 'bg-[#199CB7]'
    if (percentage > 30) return 'bg-[#DA6530]'
    return 'bg-[#8B1431]'
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <AnimatePresence mode="wait">
        {/* Identity Screen */}
        {quizState === 'identity' && (
          <motion.div
            key="identity"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 relative"
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center mb-8">
              <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-[#8B1431] to-[#DA6530] rounded-full flex items-center justify-center">
                <Trophy className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                Identifiez-vous
              </h2>
              <p className="text-gray-600">
                Pour suivre votre progression
              </p>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault()
                if (userIdentity.firstName.trim() && userIdentity.lastName.trim()) {
                  setQuizState('preparation')
                }
              }}
              className="space-y-4"
            >
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
                  Prénom *
                </label>
                <input
                  type="text"
                  id="firstName"
                  required
                  value={userIdentity.firstName}
                  onChange={(e) => setUserIdentity({ ...userIdentity, firstName: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#8B1431] focus:ring-2 focus:ring-[#8B1431]/20 outline-none transition-all"
                  placeholder="Votre prénom"
                />
              </div>

              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
                  Nom *
                </label>
                <input
                  type="text"
                  id="lastName"
                  required
                  value={userIdentity.lastName}
                  onChange={(e) => setUserIdentity({ ...userIdentity, lastName: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#8B1431] focus:ring-2 focus:ring-[#8B1431]/20 outline-none transition-all"
                  placeholder="Votre nom"
                />
              </div>

              <button
                type="submit"
                disabled={!userIdentity.firstName.trim() || !userIdentity.lastName.trim()}
                className={`w-full py-4 rounded-xl font-semibold text-lg transition-all duration-300 ${
                  userIdentity.firstName.trim() && userIdentity.lastName.trim()
                    ? 'bg-gradient-to-r from-[#8B1431] to-[#DA6530] text-white hover:shadow-lg hover:scale-105'
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                }`}
              >
                Continuer
              </button>
            </form>
          </motion.div>
        )}

        {/* Preparation Screen */}
        {quizState === 'preparation' && (
          <motion.div
            key="prep"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full p-8 relative"
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center mb-8">
              <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-[#8B1431] to-[#DA6530] rounded-full flex items-center justify-center">
                <Trophy className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                Testez vos connaissances
              </h2>
              <p className="text-gray-600">
                {formationTitle}
              </p>
            </div>

            <div className="space-y-4 mb-8">
              <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-lg">
                <Clock className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">20 secondes par question</h3>
                  <p className="text-sm text-gray-600">
                    Chaque question avance automatiquement après 20 secondes. Répondez rapidement !
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 bg-purple-50 rounded-lg">
                <CheckCircle className="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">{totalQuestions} questions QCM</h3>
                  <p className="text-sm text-gray-600">
                    Questions à choix multiples tirées aléatoirement d'un pool de 20 questions.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 bg-orange-50 rounded-lg">
                <XCircle className="w-5 h-5 text-orange-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Pas de triche possible</h3>
                  <p className="text-sm text-gray-600">
                    Le quiz avance automatiquement, impossible de revenir en arrière ou de tricher.
                  </p>
                </div>
              </div>
            </div>

            <button
              onClick={handleStartQuiz}
              className="w-full py-4 bg-gradient-to-r from-[#8B1431] to-[#DA6530] text-white rounded-xl font-semibold text-lg hover:shadow-lg transition-all duration-300"
            >
              Démarrer le quiz
            </button>
          </motion.div>
        )}

        {/* Quiz Screen */}
        {quizState === 'quiz' && currentQuestion && (
          <motion.div
            key="quiz"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full p-8"
          >
            {/* Progress Bar */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-600">
                  Question {currentQuestionIndex + 1} / {totalQuestions}
                </span>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-gray-600" />
                  <span className="text-sm font-bold text-gray-900">{timeLeft}s</span>
                </div>
              </div>
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <motion.div
                  className={`h-full ${getProgressColor()} transition-colors duration-300`}
                  initial={{ width: '100%' }}
                  animate={{ width: `${(timeLeft / 20) * 100}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </div>

            {/* Question */}
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                {currentQuestion.question}
              </h3>

              <div className="space-y-3">
                {currentQuestion.options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleAnswerSelect(index)}
                    disabled={isAnswerLocked}
                    className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-200 ${
                      selectedAnswer === index
                        ? 'border-[#8B1431] bg-[#8B1431]/5 shadow-md'
                        : 'border-gray-200 hover:border-[#DA6530] hover:bg-gray-50'
                    } ${isAnswerLocked ? 'cursor-not-allowed opacity-60' : 'cursor-pointer'}`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                          selectedAnswer === index
                            ? 'border-[#8B1431] bg-[#8B1431]'
                            : 'border-gray-300'
                        }`}
                      >
                        {selectedAnswer === index && (
                          <div className="w-3 h-3 bg-white rounded-full" />
                        )}
                      </div>
                      <span className="font-medium text-gray-900">{option}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Next Button (optional - auto-advances anyway) */}
            <button
              onClick={handleNextQuestion}
              disabled={selectedAnswer === null}
              className={`w-full py-3 rounded-xl font-semibold transition-all duration-300 ${
                selectedAnswer !== null
                  ? 'bg-gradient-to-r from-[#8B1431] to-[#DA6530] text-white hover:shadow-lg'
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}
            >
              {currentQuestionIndex < totalQuestions - 1 ? 'Question suivante' : 'Voir les résultats'}
            </button>
          </motion.div>
        )}

        {/* Results Screen */}
        {quizState === 'results' && (
          <motion.div
            key="results"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full p-8 relative max-h-[90vh] overflow-y-auto"
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {(() => {
              const score = calculateScore()
              return (
                <>
                  <div className="text-center mb-8">
                    <div className={`w-24 h-24 mx-auto mb-4 rounded-full flex items-center justify-center ${
                      score.percentage >= 70
                        ? 'bg-gradient-to-br from-green-400 to-green-600'
                        : score.percentage >= 50
                        ? 'bg-gradient-to-br from-orange-400 to-orange-600'
                        : 'bg-gradient-to-br from-red-400 to-red-600'
                    }`}>
                      <Trophy className="w-12 h-12 text-white" />
                    </div>
                    <h2 className="text-4xl font-bold text-gray-900 mb-2">
                      {score.percentage}%
                    </h2>
                    <p className="text-xl text-gray-600">
                      {score.correct} / {score.total} bonnes réponses
                    </p>
                    {userIdentity.firstName && userIdentity.lastName && (
                      <p className="mt-2 text-base font-medium text-gray-700">
                        {userIdentity.firstName} {userIdentity.lastName}
                      </p>
                    )}
                    <p className="mt-2 text-gray-500">
                      {score.percentage >= 70
                        ? '🎉 Excellent ! Vous maîtrisez le sujet.'
                        : score.percentage >= 50
                        ? '👍 Pas mal ! Continuez à apprendre.'
                        : '📚 Revoyez le contenu de la formation.'}
                    </p>
                  </div>

                  {/* Detailed Results */}
                  <div className="space-y-4 mb-8">
                    <h3 className="text-lg font-bold text-gray-900">Détails des réponses</h3>
                    {questions.map((question, qIndex) => {
                      const userAnswer = userAnswers[qIndex]
                      const isCorrect = userAnswer?.isCorrect

                      return (
                        <div
                          key={question.id}
                          className={`p-4 rounded-xl border-2 ${
                            isCorrect
                              ? 'border-green-200 bg-green-50'
                              : 'border-red-200 bg-red-50'
                          }`}
                        >
                          <div className="flex items-start gap-3 mb-2">
                            {isCorrect ? (
                              <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                            ) : (
                              <XCircle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                            )}
                            <div className="flex-1">
                              <p className="font-semibold text-gray-900 mb-2">
                                {qIndex + 1}. {question.question}
                              </p>
                              {userAnswer?.selectedAnswer !== undefined && userAnswer.selectedAnswer >= 0 && (
                                <p className="text-sm text-gray-700 mb-1">
                                  <span className="font-medium">Votre réponse :</span>{' '}
                                  {question.options[userAnswer.selectedAnswer]}
                                </p>
                              )}
                              {!isCorrect && (
                                <p className="text-sm text-gray-700 mb-1">
                                  <span className="font-medium">Bonne réponse :</span>{' '}
                                  {question.options[question.correctAnswer]}
                                </p>
                              )}
                              {question.explanation && (
                                <p className="text-sm text-gray-600 mt-2 italic">
                                  💡 {question.explanation}
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                      )
                    })}
                  </div>

                  {/* Actions */}
                  <div className="flex gap-3">
                    <button
                      onClick={handleRestartQuiz}
                      className="flex-1 py-3 bg-gradient-to-r from-[#8B1431] to-[#DA6530] text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
                    >
                      <RotateCcw className="w-5 h-5" />
                      Recommencer
                    </button>
                    <button
                      onClick={onClose}
                      className="flex-1 py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-all duration-300"
                    >
                      Fermer
                    </button>
                  </div>
                </>
              )
            })()}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
