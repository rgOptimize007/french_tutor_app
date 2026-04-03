import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import confetti from "canvas-confetti";
import { 
  Trophy, 
  Flame, 
  ChevronRight, 
  CheckCircle2, 
  BookOpen,
  GraduationCap,
  ArrowRight,
  Star,
  Award,
  Lock,
  BrainCircuit
} from "lucide-react";
import { AppState, UserProfile, Module } from "./types";
import { modulesData } from "./lib/modulesData";
import { cn } from "./lib/utils";

// --- Components ---

const Mascot = ({ message }: { message: string }) => (
  <div className="flex flex-col items-center gap-4 mb-8">
    <motion.div
      animate={{ 
        y: [0, -10, 0],
        rotate: [0, 5, -5, 0]
      }}
      transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
      className="text-8xl select-none"
    >
      🐓
    </motion.div>
    <div className="bg-white p-6 rounded-3xl shadow-xl border-2 border-sky relative max-w-md">
      <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-6 h-6 bg-white border-t-2 border-l-2 border-sky rotate-45" />
      <p className="text-gray-800 font-bold text-lg text-center leading-relaxed">
        {message}
      </p>
    </div>
  </div>
);

const ProgressBar = ({ current, total }: { current: number; total: number }) => (
  <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden mb-6">
    <motion.div 
      className="h-full bg-sky shadow-[0_0_15px_rgba(112,214,255,0.5)]"
      initial={{ width: 0 }}
      animate={{ width: `${(current / total) * 100}%` }}
    />
  </div>
);

// --- Main App ---

export default function App() {
  const [appState, setAppState] = useState<AppState>('LANDING');
  const [profile, setProfile] = useState<UserProfile>({
    name: "",
    currentModuleId: 1,
    completedModules: [],
    xp: 0,
    streak: 1,
  });
  const [modules, setModules] = useState<Module[]>(modulesData);
  const [currentModule, setCurrentModule] = useState<Module | null>(null);
  const [quizIndex, setQuizIndex] = useState(0);
  const [quizScore, setQuizScore] = useState(0);
  const [quizFeedback, setQuizFeedback] = useState<string | null>(null);
  const [showCertificate, setShowCertificate] = useState(false);

  // Sync modules with profile
  useEffect(() => {
    const updatedModules = modulesData.map(m => ({
      ...m,
      completed: profile.completedModules.includes(m.id),
      unlocked: m.id === 1 || profile.completedModules.includes(m.id - 1)
    }));
    setModules(updatedModules);
  }, [profile.completedModules]);

  const handleStart = (name: string) => {
    if (!name.trim()) return;
    setAppState('TRAIL');
  };

  const startModule = (module: Module) => {
    if (!module.unlocked) return;
    setCurrentModule(module);
    setAppState('LESSON_STEP_1');
  };

  const handleQuizAnswer = (option: string) => {
    if (!currentModule) return;
    const currentQuestion = currentModule.quiz[quizIndex];
    const isCorrect = option === currentQuestion.answer;

    if (isCorrect) {
      setQuizScore(prev => prev + 1);
      setQuizFeedback(`✅ Correct! ${currentQuestion.explanation}`);
      confetti({ particleCount: 30, spread: 50, origin: { y: 0.8 } });
    } else {
      setQuizFeedback(`❌ Oops! ${currentQuestion.explanation}`);
    }

    setTimeout(() => {
      setQuizFeedback(null);
      if (quizIndex < currentModule.quiz.length - 1) {
        setQuizIndex(prev => prev + 1);
      } else {
        finishModule();
      }
    }, 3000);
  };

  const finishModule = () => {
    if (!currentModule) return;
    
    const passed = quizScore >= 2; // Pass if at least 2/3 correct
    if (passed) {
      setAppState('CELEBRATION');
      confetti({
        particleCount: 150,
        spread: 100,
        origin: { y: 0.6 },
        colors: ['#70d6ff', '#ff70a6', '#ff9770', '#ffd670', '#e9ff70']
      });
    } else {
      // Fail logic - restart quiz or module
      alert("Let's try that quiz again to make sure you've got it!");
      setQuizIndex(0);
      setQuizScore(0);
      setAppState('LESSON_STEP_1');
    }
  };

  const completeCelebration = () => {
    if (!currentModule) return;
    
    setProfile(prev => {
      const isNewCompletion = !prev.completedModules.includes(currentModule.id);
      const newCompleted = isNewCompletion 
        ? [...prev.completedModules, currentModule.id] 
        : prev.completedModules;
      
      return {
        ...prev,
        completedModules: newCompleted,
        xp: prev.xp + 50,
      };
    });

    if (currentModule.id === 5) {
      setShowCertificate(true);
    } else {
      setAppState('TRAIL');
    }
    
    setCurrentModule(null);
    setQuizIndex(0);
    setQuizScore(0);
  };

  // --- Renderers ---

  const renderLanding = () => (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gradient-to-br from-sky/10 to-pink/10">
      <Mascot message="Bonjour ! I'm your French tutor. Ready to start your journey to fluency? Enter your name below to begin!" />
      <div className="w-full max-w-md space-y-6">
        <input 
          type="text" 
          placeholder="Enter your name" 
          className="w-full p-6 rounded-3xl border-4 border-white bg-white/80 backdrop-blur shadow-xl text-2xl font-black text-gray-800 focus:border-sky outline-none transition-all"
          value={profile.name}
          onChange={(e) => setProfile(prev => ({ ...prev, name: e.target.value }))}
          onKeyPress={(e) => e.key === 'Enter' && handleStart(profile.name)}
        />
        <button 
          onClick={() => handleStart(profile.name)}
          className="w-full bg-sky text-white py-6 rounded-3xl font-black text-2xl shadow-2xl shadow-sky/30 hover:bg-sky/90 transition-all transform hover:-translate-y-1 active:translate-y-0"
        >
          Get Started
        </button>
      </div>
    </div>
  );

  const renderTrail = () => (
    <div className="min-h-screen p-8 max-w-4xl mx-auto">
      <header className="flex justify-between items-center mb-12">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-sky rounded-2xl flex items-center justify-center text-white shadow-lg">
            <GraduationCap size={28} />
          </div>
          <h1 className="text-3xl font-black text-gray-800 tracking-tighter">French Trail</h1>
        </div>
        <div className="flex gap-6">
          <div className="flex items-center gap-2 text-coral font-black text-xl">
            <Flame size={24} /> <span>{profile.streak}</span>
          </div>
          <div className="flex items-center gap-2 text-sky font-black text-xl">
            <Trophy size={24} /> <span>{profile.xp}</span>
          </div>
        </div>
      </header>

      <Mascot message={`Welcome back, ${profile.name}! Where shall we continue our French adventure today?`} />

      <div className="space-y-6">
        {modules.map((m) => (
          <motion.button
            key={m.id}
            whileHover={m.unlocked ? { scale: 1.02, x: 10 } : {}}
            whileTap={m.unlocked ? { scale: 0.98 } : {}}
            onClick={() => startModule(m)}
            disabled={!m.unlocked}
            className={cn(
              "w-full p-8 rounded-[2.5rem] border-4 text-left transition-all flex items-center justify-between",
              m.completed 
                ? "bg-lime/10 border-lime/30" 
                : m.unlocked 
                  ? "bg-white border-white shadow-xl hover:border-sky" 
                  : "bg-gray-100 border-gray-200 opacity-60 cursor-not-allowed"
            )}
          >
            <div className="flex items-center gap-6">
              <div className={cn(
                "w-16 h-16 rounded-2xl flex items-center justify-center text-2xl font-black shadow-inner",
                m.completed ? "bg-lime text-white" : m.unlocked ? "bg-sky/10 text-sky" : "bg-gray-200 text-gray-400"
              )}>
                {m.completed ? <CheckCircle2 size={32} /> : m.unlocked ? m.id : <Lock size={32} />}
              </div>
              <div>
                <h3 className="text-2xl font-black text-gray-800">{m.title}</h3>
                <p className="text-gray-500 font-bold">
                  {m.completed ? "Completed!" : m.unlocked ? "Ready to learn" : "Locked"}
                </p>
              </div>
            </div>
            {m.unlocked && !m.completed && <ChevronRight size={32} className="text-sky" />}
          </motion.button>
        ))}
      </div>

      <div className="mt-12 p-8 bg-white/50 rounded-[3rem] border-4 border-dashed border-gray-200 text-center">
        <p className="text-gray-400 font-bold">Complete all modules to earn your French Proficiency Certificate! 🎓</p>
      </div>
    </div>
  );

  const renderLessonStep1 = () => (
    <div className="min-h-screen p-8 max-w-4xl mx-auto flex flex-col">
      <ProgressBar current={1} total={3} />
      <Mascot message="Step 1: Vocabulary & Foundations! Let's learn the building blocks for this module." />
      
      <div className="bg-white rounded-[3rem] p-10 shadow-2xl border-4 border-white flex-grow space-y-8">
        <h2 className="text-4xl font-black text-gray-800 mb-8">Vocabulary List</h2>
        <div className="grid gap-6">
          {currentModule?.vocab.map((v, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className="p-6 bg-gray-50 rounded-3xl border-2 border-gray-100"
            >
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-2xl font-black text-sky">{v.word} <span className="text-gray-400 font-mono text-lg">{v.phonetics}</span></h3>
                <span className="text-coral font-black text-lg">{v.meaning}</span>
              </div>
              {v.grammar && <p className="text-sm text-gray-500 font-bold mb-1 italic">Grammar: {v.grammar}</p>}
              {v.semantics && <p className="text-sm text-gray-600 leading-relaxed"><span className="font-black text-gray-800">Context:</span> {v.semantics}</p>}
            </motion.div>
          ))}
        </div>
        
        <div className="pt-8">
          <button 
            onClick={() => setAppState('LESSON_STEP_2')}
            className="w-full bg-sky text-white py-6 rounded-3xl font-black text-2xl shadow-xl hover:bg-sky/90 transition-all flex items-center justify-center gap-4"
          >
            Next <ArrowRight size={28} />
          </button>
        </div>
      </div>
    </div>
  );

  const renderLessonStep2 = () => (
    <div className="min-h-screen p-8 max-w-4xl mx-auto flex flex-col">
      <ProgressBar current={2} total={3} />
      <Mascot message="Step 2: Sentence Formation! Now let's see how these words work together in real sentences." />
      
      <div className="bg-white rounded-[3rem] p-10 shadow-2xl border-4 border-white flex-grow space-y-10">
        <section>
          <h3 className="text-xs font-black text-coral uppercase tracking-widest mb-4">Grammar Rule</h3>
          <div className="p-8 bg-coral/5 rounded-3xl border-2 border-coral/20">
            <p className="text-2xl font-bold text-gray-800 leading-relaxed italic">
              "{currentModule?.grammarRule}"
            </p>
          </div>
        </section>

        <section className="space-y-6">
          <h3 className="text-xs font-black text-sky uppercase tracking-widest">Example Sentences</h3>
          <div className="grid gap-6">
            {currentModule?.sentences.map((s, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="p-8 bg-sky/5 rounded-3xl border-2 border-sky/10"
              >
                <p className="text-3xl font-black text-gray-800 mb-2">{s.french}</p>
                <p className="text-lg text-gray-400 font-mono mb-2">{s.phonetics}</p>
                <p className="text-xl text-sky font-bold">Meaning: {s.english}</p>
              </motion.div>
            ))}
          </div>
        </section>
        
        <div className="pt-8">
          <button 
            onClick={() => setAppState('LESSON_STEP_3')}
            className="w-full bg-pink text-white py-6 rounded-3xl font-black text-2xl shadow-xl hover:bg-pink/90 transition-all flex items-center justify-center gap-4"
          >
            Ready for Quiz <BrainCircuit size={28} />
          </button>
        </div>
      </div>
    </div>
  );

  const renderLessonStep3 = () => {
    const q = currentModule?.quiz[quizIndex];
    return (
      <div className="min-h-screen p-8 max-w-4xl mx-auto flex flex-col">
        <ProgressBar current={quizIndex + 1} total={currentModule?.quiz.length || 3} />
        <Mascot message="Step 3: Module Quiz! Time to show off what you've learned. Good luck!" />
        
        <div className="bg-white rounded-[3rem] p-10 shadow-2xl border-4 border-white flex-grow space-y-8 relative overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={quizIndex}
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -50, opacity: 0 }}
              className="space-y-8"
            >
              <h2 className="text-4xl font-black text-gray-800 leading-tight">
                {q?.question}
              </h2>
              <div className="grid gap-4">
                {q?.options.map((opt, i) => (
                  <button
                    key={i}
                    disabled={!!quizFeedback}
                    onClick={() => handleQuizAnswer(opt)}
                    className={cn(
                      "w-full p-6 text-left rounded-2xl border-4 transition-all font-black text-xl flex justify-between items-center group",
                      quizFeedback 
                        ? opt === q.answer 
                          ? "border-lime bg-lime/10 text-lime" 
                          : "border-gray-100 bg-white text-gray-300"
                        : "border-gray-100 bg-white text-gray-600 hover:border-sky hover:text-sky hover:bg-sky/5"
                    )}
                  >
                    {opt}
                    {quizFeedback && opt === q.answer && <CheckCircle2 size={24} />}
                  </button>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>

          {quizFeedback && (
            <motion.div 
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="absolute bottom-10 left-10 right-10 p-6 bg-white shadow-2xl rounded-3xl border-4 border-sky z-20 text-center"
            >
              <p className="text-xl font-black text-gray-800">{quizFeedback}</p>
            </motion.div>
          )}
        </div>
      </div>
    );
  };

  const renderCelebration = () => (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gradient-to-br from-yellow/10 to-sky/10">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        className="text-[10rem] mb-8"
      >
        🎉
      </motion.div>
      <Mascot message={`Magnifique, ${profile.name}! You've mastered ${currentModule?.title}. Your French is getting stronger every day!`} />
      
      <div className="bg-white p-10 rounded-[3rem] shadow-2xl border-4 border-white text-center space-y-6 max-w-md w-full">
        <div className="flex justify-center gap-4 mb-4">
          {[1, 2, 3].map(i => <Star key={i} className="text-yellow fill-yellow" size={48} />)}
        </div>
        <h2 className="text-4xl font-black text-gray-800">Module Complete!</h2>
        <p className="text-2xl font-bold text-sky">+50 XP Earned</p>
        
        <button 
          onClick={completeCelebration}
          className="w-full bg-sky text-white py-6 rounded-3xl font-black text-2xl shadow-xl hover:bg-sky/90 transition-all"
        >
          {currentModule?.id === 5 ? "Claim Certificate" : "Back to Trail"}
        </button>
      </div>
    </div>
  );

  const renderCertificate = () => (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gray-900">
      <motion.div 
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-white p-16 rounded-[4rem] shadow-[0_0_100px_rgba(255,255,255,0.1)] border-[16px] border-double border-sky max-w-3xl w-full text-center space-y-12 relative"
      >
        <div className="absolute top-10 left-10 text-sky opacity-20"><Award size={120} /></div>
        <div className="absolute bottom-10 right-10 text-sky opacity-20 rotate-12"><GraduationCap size={120} /></div>
        
        <div className="space-y-4">
          <h1 className="text-xs font-black text-sky uppercase tracking-[0.5em]">Certificate of Achievement</h1>
          <div className="h-1 w-24 bg-sky mx-auto" />
        </div>

        <div className="space-y-6">
          <p className="text-2xl font-serif italic text-gray-500">This is to certify that</p>
          <h2 className="text-6xl font-black text-gray-900 tracking-tighter underline decoration-sky decoration-8 underline-offset-8">
            {profile.name}
          </h2>
          <p className="text-2xl font-serif italic text-gray-500">has successfully completed the</p>
          <h3 className="text-4xl font-black text-gray-800">Conversational French Mastery Course</h3>
        </div>

        <div className="pt-12 flex justify-between items-end border-t-2 border-gray-100">
          <div className="text-left">
            <p className="font-black text-gray-800 text-xl">L'App de Français</p>
            <p className="text-gray-400 font-bold uppercase tracking-widest text-xs">Official Tutor Mascot</p>
          </div>
          <div className="text-8xl">🐓</div>
          <div className="text-right">
            <p className="font-black text-gray-800 text-xl">{new Date().toLocaleDateString()}</p>
            <p className="text-gray-400 font-bold uppercase tracking-widest text-xs">Date of Completion</p>
          </div>
        </div>
      </motion.div>
      
      <button 
        onClick={() => { setShowCertificate(false); setAppState('TRAIL'); }}
        className="mt-12 text-white/50 font-bold hover:text-white transition-colors"
      >
        Close Certificate
      </button>
    </div>
  );

  if (showCertificate) return renderCertificate();

  return (
    <div className="min-h-screen bg-gray-50 font-sans selection:bg-sky/30">
      <AnimatePresence mode="wait">
        <motion.div
          key={appState}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4 }}
        >
          {appState === 'LANDING' && renderLanding()}
          {appState === 'TRAIL' && renderTrail()}
          {appState === 'LESSON_STEP_1' && renderLessonStep1()}
          {appState === 'LESSON_STEP_2' && renderLessonStep2()}
          {appState === 'LESSON_STEP_3' && renderLessonStep3()}
          {appState === 'CELEBRATION' && renderCelebration()}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
