import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '../components/ui/button';
import { useRef } from 'react';
import { Image, Video, Mic, X, Play, StopCircle, Trash2, Pause } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const THEMES = [
  { name: 'Dreamy', bg: 'from-pink-100 via-blue-100 to-purple-100', font: 'font-serif', texture: '' },
  { name: 'Vintage', bg: 'from-yellow-100 via-orange-100 to-pink-200', font: 'font-serif', texture: '' },
  { name: 'Minimal', bg: 'from-white via-gray-100 to-gray-200', font: 'font-sans', texture: '' },
  { name: 'Notebook', bg: 'from-blue-50 via-white to-blue-100', font: 'font-handwritten', texture: '' },
];

const AnimatedPetals: React.FC = () => (
  <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
    {[...Array(10)].map((_, i) => (
      <motion.div
        key={i}
        initial={{ y: -100, x: Math.random() * window.innerWidth }}
        animate={{ y: [0, window.innerHeight + 100], x: [Math.random() * window.innerWidth, Math.random() * window.innerWidth] }}
        transition={{ duration: 14 + Math.random() * 6, repeat: Infinity, delay: i * 0.8 }}
        className="absolute text-3xl opacity-20 select-none"
        style={{ left: `${Math.random() * 100}%` }}
      >
        {['🌸','🌷','✨','💮','🌺','🌼','❀','❁'][i % 8]}
      </motion.div>
    ))}
  </div>
);

const FONT_OPTIONS = [
  { label: 'Handwriting', class: 'font-handwritten', style: { fontFamily: 'Dancing Script, cursive' } },
  { label: 'Serif', class: 'font-serif', style: { fontFamily: 'Playfair Display, serif' } },
  { label: 'Minimal', class: 'font-sans', style: { fontFamily: 'Poppins, Inter, sans-serif' } },
];
const MOOD_COLORS = [
  { label: 'Calm Blue', value: 'bg-blue-50', text: 'text-blue-700' },
  { label: 'Warm Pink', value: 'bg-pink-50', text: 'text-pink-700' },
  { label: 'Soft Yellow', value: 'bg-yellow-50', text: 'text-yellow-700' },
  { label: 'Gentle Green', value: 'bg-green-50', text: 'text-green-700' },
  { label: 'Classic White', value: 'bg-white', text: 'text-gray-700' },
];

const EMOTION_OPTIONS = [
  { label: 'Joy', emoji: '😊' },
  { label: 'Sadness', emoji: '😔' },
  { label: 'Peace', emoji: '😌' },
  { label: 'Reflection', emoji: '💭' },
  { label: 'Love', emoji: '❤️' },
  { label: 'Gratitude', emoji: '🙏' },
  { label: 'Surprise', emoji: '😮' },
  { label: 'Pride', emoji: '🌟' },
  { label: 'Hope', emoji: '🌱' },
  { label: 'Nostalgia', emoji: '🕰️' },
];

const MOOD_MUSIC = [
  { label: 'None', value: '' },
  { label: 'Rain', value: 'https://cdn.pixabay.com/audio/2022/07/26/audio_124bfae5c7.mp3' },
  { label: 'Calm Piano', value: 'https://cdn.pixabay.com/audio/2022/10/16/audio_12b6b1b7b7.mp3' },
  { label: 'Birds', value: 'https://cdn.pixabay.com/audio/2022/03/15/audio_115b7b1b7b.mp3' },
  { label: 'Waves', value: 'https://cdn.pixabay.com/audio/2022/03/15/audio_115b7b1b7c.mp3' },
];

const AddMemory: React.FC = () => {
  const [theme, setTheme] = useState(THEMES[0]);
  const [font, setFont] = useState(FONT_OPTIONS[0]);
  const [fontSize, setFontSize] = useState(20);
  const [moodColor, setMoodColor] = useState(MOOD_COLORS[0]);
  const [text, setText] = useState('');
  const [emotions, setEmotions] = useState([EMOTION_OPTIONS[0]]);
  const editorRef = useRef<HTMLTextAreaElement>(null);
  const [media, setMedia] = useState([]);
  const [dragActive, setDragActive] = useState(false);
  const [recording, setRecording] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const mediaInputRef = useRef<HTMLInputElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const [carouselIdx, setCarouselIdx] = useState(0);
  const [music, setMusic] = useState(MOOD_MUSIC[0]);
  const [musicPlaying, setMusicPlaying] = useState(false);
  const [musicVolume, setMusicVolume] = useState(0.5);
  const musicRef = useRef<HTMLAudioElement>(null);
  const [focusMode, setFocusMode] = useState(false);
  const [date, setDate] = useState(() => new Date().toISOString().slice(0, 10));
  const [time, setTime] = useState(() => new Date().toTimeString().slice(0, 5));
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [savedMemory, setSavedMemory] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (music.value && musicPlaying) {
      musicRef.current?.play();
    } else {
      musicRef.current?.pause();
    }
  }, [music, musicPlaying]);
  useEffect(() => {
    if (musicRef.current) musicRef.current.volume = musicVolume;
  }, [musicVolume]);
  // Fade music in/out with focus mode
  useEffect(() => {
    if (musicRef.current) {
      musicRef.current.volume = focusMode ? Math.min(musicVolume + 0.2, 1) : musicVolume;
    }
  }, [focusMode, musicVolume]);

  const toggleEmotion = (option: any) => {
    setEmotions(prev => prev.some(e => e.emoji === option.emoji)
      ? prev.filter(e => e.emoji !== option.emoji)
      : [...prev, option]);
  };

  // Drag-and-drop upload
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
    const files = Array.from(e.dataTransfer.files);
    handleFiles(files);
  };
  const handleFiles = (files: File[]) => {
    const newMedia = files.map(file => {
      const type = file.type.startsWith('image') ? 'image' : file.type.startsWith('video') ? 'video' : file.type.startsWith('audio') ? 'audio' : 'other';
      return { type, url: URL.createObjectURL(file), file };
    });
    setMedia([...media, ...newMedia]);
  };
  const handleMediaInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) handleFiles(Array.from(e.target.files));
  };
  const removeMedia = (idx: number) => setMedia(media.filter((_, i) => i !== idx));

  // Audio recording
  const startRecording = async () => {
    if (!navigator.mediaDevices) return;
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const recorder = new MediaRecorder(stream);
    mediaRecorderRef.current = recorder;
    const chunks: BlobPart[] = [];
    recorder.ondataavailable = e => chunks.push(e.data);
    recorder.onstop = () => {
      const blob = new Blob(chunks, { type: 'audio/webm' });
      setAudioBlob(blob);
      setAudioUrl(URL.createObjectURL(blob));
      setMedia([...media, { type: 'audio', url: URL.createObjectURL(blob), file: blob }]);
    };
    recorder.start();
    setRecording(true);
  };
  const stopRecording = () => {
    mediaRecorderRef.current?.stop();
    setRecording(false);
  };

  // Save handler
  const handleSave = () => {
    const memory = {
      date,
      time,
      emotions,
      text,
      font,
      fontSize,
      moodColor,
      media,
      music,
    };
    setSavedMemory(memory);
    setShowConfirmation(true);
    setTimeout(() => navigate('/life-capsule'), 3500);
  };

  // Lined-paper background style
  const linedPaper = {
    backgroundImage: `repeating-linear-gradient(to bottom, #e0c3fc22 0px, #e0c3fc22 1px, transparent 1px, transparent 32px)`,
    backgroundColor: moodColor ? undefined : '#fff',
  };

  return (
    <div className={`relative min-h-screen w-full flex flex-col items-center justify-center bg-gradient-to-br ${theme.bg} transition-colors duration-700 ${theme.font}`}
      style={{ fontFamily: theme.font === 'font-handwritten' ? 'Dancing Script, cursive' : undefined }}
    >
      <AnimatedPetals />
      {/* Theme Selector */}
      <div className="fixed top-4 right-2 z-20 flex gap-1 bg-white/40 backdrop-blur rounded-full shadow px-2 py-1 sm:top-6 sm:right-8 sm:gap-2 sm:px-4 sm:py-2">
        <span className="text-xs sm:text-sm text-muted-foreground">Theme:</span>
        {THEMES.map(t => (
          <Button key={t.name} variant={theme.name === t.name ? 'emotional' : 'outline'} size="sm" className="rounded-full px-2 sm:px-3 text-xs sm:text-sm" onClick={() => setTheme(t)}>{t.name}</Button>
        ))}
      </div>
      {/* Welcome & Placeholder for Journal UI */}
      <div className="relative z-10 w-full max-w-2xl mx-auto flex flex-col items-center justify-center pt-20 pb-8 px-2 sm:pt-24 sm:pb-12 sm:px-4 animate-fade-in">
        <motion.h1
          className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 text-emotional drop-shadow-lg text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Write a New Memory
        </motion.h1>
        <motion.p
          className="text-base sm:text-lg md:text-xl text-muted-foreground mb-4 sm:mb-8 font-light text-center"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 1 }}
        >
          This is your sacred space. Let your heart speak, and capture a moment for your Life Capsule.
        </motion.p>
        {/* Focus Mode Toggle */}
        <div className="w-full flex justify-end mb-2 px-1 sm:px-0">
          <Button variant={focusMode ? 'emotional' : 'outline'} size="sm" className="rounded-full px-3 sm:px-4 text-xs sm:text-sm" onClick={() => setFocusMode(f => !f)}>
            {focusMode ? 'Exit Focus Mode' : 'Focus Mode'}
          </Button>
        </div>
        {/* Date and Time Picker */}
        <div className="w-full flex flex-col sm:flex-row gap-2 sm:gap-4 items-center justify-center mb-3 sm:mb-4 animate-fade-in-slow">
          <div className="flex flex-col items-center w-full sm:w-auto">
            <span className="text-xs text-muted-foreground mb-1">Date</span>
            <input type="date" value={date} onChange={e => setDate(e.target.value)} className="rounded-xl bg-white/80 px-2 py-1 w-full sm:w-auto" />
          </div>
          <div className="flex flex-col items-center w-full sm:w-auto">
            <span className="text-xs text-muted-foreground mb-1">Time</span>
            <input type="time" value={time} onChange={e => setTime(e.target.value)} className="rounded-xl bg-white/80 px-2 py-1 w-full sm:w-auto" />
          </div>
        </div>
        {/* Main journaling area */}
        <div className={`relative w-full min-h-[400px] rounded-2xl sm:rounded-3xl bg-white/60 shadow-xl backdrop-blur-lg flex flex-col items-center justify-center animate-fade-in-slow p-2 sm:p-8 ${focusMode ? 'fixed inset-0 z-50 rounded-none min-h-screen bg-white/90 transition-all duration-700' : ''}`} style={{ border: focusMode ? 'none' : '1.5px dashed #e0c3fc', ...(focusMode ? { boxShadow: '0 0 0 9999px rgba(200,200,255,0.25)' } : {}) }}>
          {focusMode && (
            <motion.div className="fixed inset-0 z-40 bg-gradient-to-br from-blue-100/80 via-pink-100/80 to-purple-100/80 backdrop-blur-2xl" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} />
          )}
          {/* Animated Multi-Select Emotion Picker */}
          <div className="w-full flex flex-col items-center mb-3 sm:mb-4">
            <div className="flex flex-wrap gap-1 sm:gap-2 justify-center mb-2">
              {EMOTION_OPTIONS.map(opt => (
                <motion.button
                  key={opt.emoji}
                  type="button"
                  onClick={() => toggleEmotion(opt)}
                  className={`rounded-full px-3 sm:px-4 py-2 text-lg sm:text-xl font-semibold shadow transition-all duration-200 border-2 focus:outline-none focus:ring-2 focus:ring-emotional/50 ${emotions.some(e => e.emoji === opt.emoji)
                    ? 'bg-pink-100 border-pink-400 text-emotional animate-pulse'
                    : 'bg-white/70 border-pink-100 text-gray-500 hover:bg-pink-50'}`}
                  whileTap={{ scale: 0.92 }}
                  whileHover={{ scale: 1.08 }}
                  animate={emotions.some(e => e.emoji === opt.emoji) ? { boxShadow: '0 0 0 4px #fbc2eb88' } : {}}
                >
                  <span className="mr-1 text-lg sm:text-2xl align-middle">{opt.emoji}</span>
                  <span className="align-middle text-xs sm:text-base font-serif">{opt.label}</span>
                </motion.button>
              ))}
            </div>
            <div className="flex gap-1 sm:gap-2 mt-1 flex-wrap justify-center">
              {emotions.map(e => (
                <motion.div key={e.emoji} className="rounded-full bg-pink-200/80 px-2 sm:px-3 py-1 text-base sm:text-lg font-semibold shadow-emotional flex items-center gap-1 animate-fade-in" initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
                  <span>{e.emoji}</span>
                  <span className="text-xs font-serif">{e.label}</span>
                  <button className="ml-1 text-xs text-destructive hover:scale-125 transition" onClick={() => toggleEmotion(e)}>&times;</button>
                </motion.div>
              ))}
            </div>
          </div>
          {/* Media Upload Panel */}
          <div className={`w-full flex flex-col items-center mb-4 sm:mb-6 animate-fade-in-slow`}>
            <div
              className={`w-full rounded-xl sm:rounded-2xl border-2 border-dashed p-3 sm:p-6 bg-pink-50/40 flex flex-col items-center gap-2 transition-all duration-300 ${dragActive ? 'border-emotional bg-pink-100/60' : 'border-pink-200'}`}
              onDragOver={e => { e.preventDefault(); setDragActive(true); }}
              onDragLeave={e => { e.preventDefault(); setDragActive(false); }}
              onDrop={handleDrop}
            >
              <div className="mb-2 text-emotional font-semibold text-sm sm:text-base">Upload Photos, Videos, or Audio</div>
              <Button variant="outline" onClick={() => mediaInputRef.current?.click()} className="text-xs sm:text-base">Select Files</Button>
              <input ref={mediaInputRef} type="file" multiple className="hidden" onChange={handleMediaInput} />
              <div className="flex gap-2 mt-2 flex-wrap w-full overflow-x-auto">
                {media.length > 0 && (
                  <div className="w-full flex flex-col items-center">
                    {/* Carousel controls */}
                    <div className="flex gap-2 items-center mb-2">
                      <Button variant="outline" size="icon" disabled={carouselIdx === 0} onClick={() => setCarouselIdx(i => Math.max(0, i - 1))}>&lt;</Button>
                      <span className="text-xs text-muted-foreground">{carouselIdx + 1} / {media.length}</span>
                      <Button variant="outline" size="icon" disabled={carouselIdx === media.length - 1} onClick={() => setCarouselIdx(i => Math.min(media.length - 1, i + 1))}>&gt;</Button>
                    </div>
                    {/* Carousel preview */}
                    <div className="relative w-36 h-36 sm:w-48 sm:h-48 flex items-center justify-center bg-white/80 rounded-xl shadow-inner">
                      {media[carouselIdx].type === 'image' && <img src={media[carouselIdx].url} alt="" className="w-full h-full object-cover rounded-xl" />}
                      {media[carouselIdx].type === 'video' && <video src={media[carouselIdx].url} controls className="w-full h-full object-cover rounded-xl" />}
                      {media[carouselIdx].type === 'audio' && <audio src={media[carouselIdx].url} controls className="w-full" />}
                      <button className="absolute top-2 right-2 bg-white rounded-full shadow p-1 text-destructive opacity-80 hover:opacity-100" onClick={() => removeMedia(carouselIdx)}><Trash2 className="w-4 h-4" /></button>
                    </div>
                  </div>
                )}
              </div>
            </div>
            {/* Inline Audio Recording */}
            <div className="flex gap-2 items-center mt-2 sm:mt-4">
              {!recording && (
                <Button variant="emotional" size="icon" className="rounded-full shadow" onClick={startRecording} title="Record Audio">
                  <Mic className="w-6 h-6" />
                </Button>
              )}
              {recording && (
                <Button variant="destructive" size="icon" className="rounded-full animate-pulse" onClick={stopRecording} title="Stop Recording">
                  <StopCircle className="w-6 h-6" />
                </Button>
              )}
              {audioUrl && !recording && (
                <audio src={audioUrl} controls className="h-10" />
              )}
              <span className="text-xs text-muted-foreground">Record a voice note</span>
            </div>
          </div>
          {/* Mood Music Picker/Player */}
          <div className="w-full flex flex-col items-center mb-4 sm:mb-6 animate-fade-in-slow">
            <div className="flex flex-col sm:flex-row gap-2 items-center mb-2 w-full justify-center">
              <span className="text-xs sm:text-sm text-muted-foreground">Mood Music:</span>
              <select value={music.value} onChange={e => {
                const found = MOOD_MUSIC.find(m => m.value === e.target.value);
                setMusic(found || MOOD_MUSIC[0]);
                setMusicPlaying(!!e.target.value);
              }} className="rounded-xl bg-white/80 px-2 py-1 text-xs sm:text-base">
                {MOOD_MUSIC.map(m => <option key={m.label} value={m.value}>{m.label}</option>)}
              </select>
              <Button variant={musicPlaying ? 'emotional' : 'outline'} size="icon" className="rounded-full" onClick={() => setMusicPlaying(p => !p)} disabled={!music.value}>
                {musicPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
              </Button>
              <input type="range" min={0} max={1} step={0.01} value={musicVolume} onChange={e => setMusicVolume(Number(e.target.value))} className="w-20 sm:w-24 mx-2" />
              <span className="text-xs text-muted-foreground">{Math.round(musicVolume * 100)}%</span>
            </div>
            <audio ref={musicRef} src={music.value} loop style={{ display: 'none' }} />
          </div>
          {/* Editor Controls */}
          <div className="w-full flex flex-col sm:flex-row flex-wrap gap-2 items-center justify-between mb-3 sm:mb-4 px-1 sm:px-4 pt-2 sm:pt-4">
            <div className="flex gap-2 items-center">
              <span className="text-xs sm:text-sm text-muted-foreground">Font:</span>
              {FONT_OPTIONS.map(opt => (
                <Button key={opt.label} variant={font.label === opt.label ? 'emotional' : 'outline'} size="sm" className="rounded-full px-2 sm:px-3 text-xs sm:text-sm" onClick={() => setFont(opt)}>{opt.label}</Button>
              ))}
            </div>
            <div className="flex gap-2 items-center">
              <span className="text-xs sm:text-sm text-muted-foreground">Size:</span>
              <input type="range" min={16} max={32} value={fontSize} onChange={e => setFontSize(Number(e.target.value))} className="w-16 sm:w-24" />
              <span className="text-xs sm:text-base font-semibold">{fontSize}px</span>
            </div>
            <div className="flex gap-2 items-center">
              <span className="text-xs sm:text-sm text-muted-foreground">Mood:</span>
              {MOOD_COLORS.map(opt => (
                <Button key={opt.label} variant={moodColor.label === opt.label ? 'emotional' : 'outline'} size="sm" className="rounded-full px-2 sm:px-3 text-xs sm:text-sm" onClick={() => setMoodColor(opt)}>{opt.label}</Button>
              ))}
            </div>
          </div>
          {/* Rich Text Editor (styled textarea for now) */}
          <textarea
            ref={editorRef}
            value={text}
            onChange={e => setText(e.target.value)}
            placeholder="Write your memory..."
            className={`w-full min-h-[200px] sm:min-h-[300px] rounded-xl sm:rounded-2xl shadow-inner p-3 sm:p-6 outline-none resize-none transition-all duration-300 ${font.class} ${moodColor.value} ${moodColor.text} text-base sm:text-lg`}
            style={{ ...font.style, fontSize: fontSize, ...linedPaper }}
            spellCheck={true}
            autoFocus
          />
          {/* Save Button */}
          <div className="w-full flex justify-center mt-6 sm:mt-8 animate-fade-in-slow">
            <Button variant="hero" className="rounded-xl text-base sm:text-lg py-2 sm:py-3 px-6 sm:px-8" onClick={handleSave}>
              📖 Save to Capsule
            </Button>
          </div>
        </div>
      </div>
      {/* Confirmation modal, inside the main return so state is in scope */}
      {showConfirmation && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 animate-fade-in">
          <motion.div
            className="relative bg-white rounded-2xl sm:rounded-3xl shadow-2xl p-6 sm:p-10 flex flex-col items-center max-w-xs sm:max-w-lg w-full animate-fade-in-slow"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
          >
            {/* Animated petals/sparkles */}
            <div className="absolute inset-0 pointer-events-none z-0">
              {[...Array(12)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ y: 0, opacity: 0 }}
                  animate={{ y: -120 - Math.random() * 80, opacity: [1, 0] }}
                  transition={{ duration: 2.5 + Math.random(), delay: i * 0.1 }}
                  className="absolute text-2xl sm:text-3xl opacity-30 select-none"
                  style={{ left: `${Math.random() * 100}%`, bottom: 0 }}
                >
                  {['🌸','🌷','✨','💮','🌺','🌼','❀','❁'][i % 8]}
                </motion.div>
              ))}
            </div>
            <div className="z-10 flex flex-col items-center">
              <div className="text-3xl sm:text-4xl mb-2 animate-fade-in">🌸</div>
              <div className="font-serif text-xl sm:text-2xl font-bold text-emotional mb-2 animate-fade-in">Memory captured!</div>
              <div className="text-sm sm:text-base text-muted-foreground mb-4 sm:mb-6 animate-fade-in-slow">Your memory has been saved to your Life Capsule.</div>
              {/* Preview of saved memory */}
              {savedMemory && (
                <div className="w-full bg-gradient-to-br from-pink-50 via-blue-50 to-purple-50 rounded-xl sm:rounded-2xl shadow p-2 sm:p-4 mb-2 sm:mb-4 animate-fade-in-slow">
                  <div className="flex gap-2 items-center mb-2">
                    {savedMemory.emotions.map((e: any) => <span key={e.emoji} className="text-xl sm:text-2xl">{e.emoji}</span>)}
                    <span className="ml-auto text-xs text-muted-foreground">{savedMemory.date} {savedMemory.time}</span>
                  </div>
                  <div className={`text-xs sm:text-base ${savedMemory.font.class} ${savedMemory.moodColor.text}`} style={{ ...savedMemory.font.style, fontSize: savedMemory.fontSize }}>
                    {savedMemory.text.length > 120 ? savedMemory.text.slice(0, 120) + '…' : savedMemory.text}
                  </div>
                  {savedMemory.media.length > 0 && (
                    <div className="flex gap-2 mt-2">
                      {savedMemory.media.slice(0, 2).map((m: any, i: number) => m.type === 'image' ? <img key={i} src={m.url} alt="" className="w-8 h-8 sm:w-12 sm:h-12 object-cover rounded-lg border" /> : m.type === 'audio' ? <Mic className="w-6 h-6 sm:w-8 sm:h-8 text-purple-400" key={i} /> : m.type === 'video' ? <Video className="w-6 h-6 sm:w-8 sm:h-8 text-blue-400" key={i} /> : null)}
                    </div>
                  )}
                </div>
              )}
              <Button variant="emotional" className="mt-2" onClick={() => navigate('/life-capsule')}>Return to Dashboard</Button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default AddMemory; 