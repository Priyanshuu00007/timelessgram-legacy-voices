import React, { useState, useEffect } from 'react';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Search, Plus, Calendar, Image, Video, Mic, Smile, Edit, Trash2, X, ChevronLeft, ChevronRight, BookUser, Mail, Smartphone, Lock } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRef } from 'react';
import { Link } from 'react-router-dom';

const pastelBg = 'bg-gradient-to-br from-purple-100 via-pink-100 to-blue-100';

const mockOTP = '123456';

const AuthForm: React.FC<{ onAuthSuccess: (user: any) => void }> = ({ onAuthSuccess }) => {
  const [step, setStep] = useState<'form' | 'verifyEmail' | 'verifyPhone'>('form');
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    emailOTP: '',
    phoneOTP: '',
  });
  const [emailSent, setEmailSent] = useState(false);
  const [phoneSent, setPhoneSent] = useState(false);
  const [emailVerified, setEmailVerified] = useState(false);
  const [phoneVerified, setPhoneVerified] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!form.name || !form.email || !form.phone || !form.password) {
      setError('All fields are required.');
      return;
    }
    setStep('verifyEmail');
    setEmailSent(true);
  };

  const handleVerifyEmail = () => {
    if (form.emailOTP === mockOTP) {
      setEmailVerified(true);
      setStep('verifyPhone');
      setPhoneSent(true);
    } else {
      setError('Invalid OTP. Try 123456.');
    }
  };

  const handleVerifyPhone = () => {
    if (form.phoneOTP === mockOTP) {
      setPhoneVerified(true);
      onAuthSuccess({ name: form.name, email: form.email, phone: form.phone });
    } else {
      setError('Invalid OTP. Try 123456.');
    }
  };

  return (
    <div className={`min-h-screen flex items-center justify-center ${pastelBg} transition-colors duration-700`}>
      <Card className="w-full max-w-md p-8 rounded-3xl shadow-xl bg-white/80 backdrop-blur animate-fade-in">
        <h2 className="font-serif text-3xl font-bold text-center mb-6 text-emotional" style={{ fontFamily: 'Playfair Display, serif' }}>
          Life Capsule Login / Signup
        </h2>
        {step === 'form' && (
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div>
              <Label htmlFor="name">Full Name</Label>
              <div className="relative">
                <Input id="name" name="name" placeholder="Your Name" value={form.name} onChange={handleChange} className="rounded-xl mt-1 pl-10" />
                {BookUser && <BookUser className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />}
              </div>
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Input id="email" name="email" type="email" placeholder="you@email.com" value={form.email} onChange={handleChange} className="rounded-xl mt-1 pl-10" />
                {Mail && <Mail className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />}
              </div>
            </div>
            <div>
              <Label htmlFor="phone">Mobile Number</Label>
              <div className="relative">
                <Input id="phone" name="phone" type="tel" placeholder="e.g. +91 9876543210" value={form.phone} onChange={handleChange} className="rounded-xl mt-1 pl-10" />
                {Smartphone && <Smartphone className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />}
              </div>
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input id="password" name="password" type="password" placeholder="Create a password" value={form.password} onChange={handleChange} className="rounded-xl mt-1 pl-10" />
                {Lock && <Lock className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />}
              </div>
            </div>
            {error && <div className="text-destructive text-sm text-center mt-2 animate-fade-in">{error}</div>}
            <Button variant="hero" className="mt-4 rounded-xl text-lg py-3">Continue</Button>
          </form>
        )}
        {step === 'verifyEmail' && (
          <div className="flex flex-col gap-4 animate-fade-in">
            <div className="text-center text-lg">Enter the OTP sent to <span className="font-semibold">{form.email}</span></div>
            <Input name="emailOTP" placeholder="Enter OTP (123456)" value={form.emailOTP} onChange={handleChange} className="rounded-xl text-center text-lg tracking-widest" maxLength={6} />
            <Button variant="hero" className="rounded-xl" onClick={handleVerifyEmail}>Verify Email</Button>
            {error && <div className="text-destructive text-sm text-center mt-2 animate-fade-in">{error}</div>}
          </div>
        )}
        {step === 'verifyPhone' && (
          <div className="flex flex-col gap-4 animate-fade-in">
            <div className="text-center text-lg">Enter the OTP sent to <span className="font-semibold">{form.phone}</span></div>
            <Input name="phoneOTP" placeholder="Enter OTP (123456)" value={form.phoneOTP} onChange={handleChange} className="rounded-xl text-center text-lg tracking-widest" maxLength={6} />
            <Button variant="hero" className="rounded-xl" onClick={handleVerifyPhone}>Verify Mobile</Button>
            {error && <div className="text-destructive text-sm text-center mt-2 animate-fade-in">{error}</div>}
          </div>
        )}
      </Card>
    </div>
  );
};

const EMOTIONS = [
  { label: 'Joy', emoji: '😊' },
  { label: 'Sadness', emoji: '😔' },
  { label: 'Peace', emoji: '😌' },
  { label: 'Reflection', emoji: '💭' },
  { label: 'Love', emoji: '❤️' },
  { label: 'Gratitude', emoji: '🙏' },
  { label: 'Surprise', emoji: '😮' },
];

const THEME_TAGS = ['Family', 'Growth', 'Pain', 'Achievement', 'Travel', 'Love', 'Regret'];

const AddEditMemoryModal: React.FC<{
  open: boolean;
  onClose: () => void;
  onSave: (entry: any) => void;
  initial?: any;
}> = ({ open, onClose, onSave, initial }) => {
  const [title, setTitle] = useState(initial?.title || '');
  const [date, setDate] = useState(initial?.date || new Date().toISOString().slice(0, 10));
  const [emotion, setEmotion] = useState(initial?.emotion || '😊');
  const [mood, setMood] = useState(initial?.mood || 'Joy');
  const [theme, setTheme] = useState(initial?.theme || '');
  const [text, setText] = useState(initial?.text || '');
  const [media, setMedia] = useState(initial?.media || []);
  const [location, setLocation] = useState(initial?.location || '');
  const [music, setMusic] = useState(false);
  const [focus, setFocus] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Auto-save draft (local state only for now)
  useEffect(() => {
    if (open) {
      localStorage.setItem('lifeCapsuleDraft', JSON.stringify({ title, date, emotion, mood, theme, text, media, location }));
    }
  }, [title, date, emotion, mood, theme, text, media, location, open]);

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
  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) handleFiles(Array.from(e.target.files));
  };
  const removeMedia = (idx: number) => setMedia(media.filter((_, i) => i !== idx));

  // Save
  const handleSave = () => {
    onSave({
      id: initial?.id || Date.now(),
      title,
      date,
      emotion,
      mood,
      theme,
      text,
      media,
      location,
    });
    localStorage.removeItem('lifeCapsuleDraft');
    onClose();
  };

  // Focus mode
  const toggleFocus = () => setFocus(f => !f);

  if (!open) return null;
  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center bg-black/40 animate-fade-in ${focus ? 'p-0' : 'p-4'}`}
      tabIndex={-1}
      onClick={focus ? toggleFocus : undefined}
    >
      <motion.div
        className={`relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl p-8 flex flex-col gap-6 animate-fade-in-slow ${focus ? 'max-w-full min-h-screen p-0 rounded-none' : ''}`}
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.98 }}
        onClick={e => e.stopPropagation()}
      >
        <button className="absolute top-4 right-4 text-xl text-muted-foreground hover:text-destructive z-10" onClick={onClose}><X className="w-6 h-6" /></button>
        <div className="flex items-center gap-3 mb-2">
          <span className="text-3xl cursor-pointer" title="Pick emotion">
            <select value={emotion} onChange={e => setEmotion(e.target.value)} className="bg-transparent border-none text-3xl focus:outline-none">
              {EMOTIONS.map(e => <option key={e.emoji} value={e.emoji}>{e.emoji}</option>)}
            </select>
          </span>
          <input type="text" value={title} onChange={e => setTitle(e.target.value)} placeholder="Title of your memory" className="font-serif text-2xl font-bold flex-1 bg-transparent border-b border-pink-200 focus:border-emotional outline-none px-2 py-1" style={{ fontFamily: 'Playfair Display, serif' }} />
        </div>
        <div className="flex gap-3 items-center mb-2">
          <Input type="date" value={date} onChange={e => setDate(e.target.value)} className="rounded-xl bg-white/80 w-40" />
          <select value={mood} onChange={e => setMood(e.target.value)} className="rounded-xl bg-pink-50 px-2 py-1 text-emotional">
            {EMOTIONS.map(e => <option key={e.label} value={e.label}>{e.emoji} {e.label}</option>)}
          </select>
          <select value={theme} onChange={e => setTheme(e.target.value)} className="rounded-xl bg-blue-50 px-2 py-1 ml-2">
            <option value="">Theme</option>
            {THEME_TAGS.map(tag => <option key={tag} value={tag}>{tag}</option>)}
          </select>
          <Button variant="outline" size="sm" className="ml-auto" onClick={toggleFocus}>{focus ? 'Exit Focus' : 'Focus Mode'}</Button>
        </div>
        {/* Rich Text Area */}
        <textarea
          value={text}
          onChange={e => setText(e.target.value)}
          placeholder="Write your memory..."
          className={`rounded-xl border p-4 min-h-[160px] text-lg bg-white/80 font-serif shadow-inner focus:outline-none focus:ring-2 focus:ring-emotional transition-all duration-300 ${focus ? 'min-h-[60vh] text-2xl' : ''}`}
          style={{ fontFamily: 'Poppins, Inter, serif' }}
        />
        {/* Drag-and-drop upload */}
        <div
          className={`rounded-xl border-2 border-dashed p-4 bg-pink-50/40 flex flex-col items-center gap-2 transition-all duration-300 ${dragActive ? 'border-emotional bg-pink-100/60' : 'border-pink-200'}`}
          onDragOver={e => { e.preventDefault(); setDragActive(true); }}
          onDragLeave={e => { e.preventDefault(); setDragActive(false); }}
          onDrop={handleDrop}
        >
          <div className="mb-2 text-emotional font-semibold">Upload Photos, Videos, or Audio</div>
          <Button variant="outline" onClick={() => fileInputRef.current?.click()}>Select Files</Button>
          <input ref={fileInputRef} type="file" multiple className="hidden" onChange={handleFileInput} />
          <div className="flex gap-2 mt-2 flex-wrap">
            {media.map((m, i) => (
              <div key={i} className="relative group">
                {m.type === 'image' ? <img src={m.url} alt="" className="w-20 h-20 object-cover rounded-lg border" /> : m.type === 'audio' ? <Mic className="w-10 h-10 text-purple-400" /> : m.type === 'video' ? <Video className="w-10 h-10 text-blue-400" /> : null}
                <button className="absolute -top-2 -right-2 bg-white rounded-full shadow p-1 text-destructive opacity-80 hover:opacity-100" onClick={() => removeMedia(i)}><X className="w-4 h-4" /></button>
              </div>
            ))}
          </div>
        </div>
        {/* Location Tag (Google Maps placeholder) */}
        <div className="flex gap-2 items-center mt-2">
          <Input value={location} onChange={e => setLocation(e.target.value)} placeholder="Location (optional)" className="rounded-xl bg-blue-50" />
          <span className="text-xs text-muted-foreground">(Google Maps coming soon)</span>
        </div>
        {/* Mood Music Toggle (placeholder) */}
        <div className="flex gap-2 items-center mt-2">
          <Button variant={music ? 'emotional' : 'outline'} size="sm" onClick={() => setMusic(m => !m)}>{music ? '🎵 Mood Music On' : '🎵 Mood Music Off'}</Button>
          <span className="text-xs text-muted-foreground">(Coming soon)</span>
        </div>
        <Button variant="hero" className="mt-4 rounded-xl text-lg py-3" onClick={handleSave}>📖 Save to Capsule</Button>
      </motion.div>
    </div>
  );
};

const MOCK_ENTRIES = [
  {
    id: 1,
    title: 'A Walk in the Park',
    date: '2024-06-10',
    emotion: '😊',
    mood: 'Joy',
    text: 'Today I took a long walk in the park and felt the sun on my face. It was peaceful and beautiful.',
    media: [{ type: 'image', url: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=facearea&w=400&q=80' }],
  },
  {
    id: 2,
    title: 'Voice Note for Myself',
    date: '2024-06-09',
    emotion: '💭',
    mood: 'Reflection',
    text: 'Recorded a voice note about my dreams and hopes for the future.',
    media: [{ type: 'audio', url: '' }],
  },
  {
    id: 3,
    title: 'Old Family Video',
    date: '2024-06-08',
    emotion: '❤️',
    mood: 'Love',
    text: 'Watched an old family video. Felt so much love and nostalgia.',
    media: [{ type: 'video', url: '' }],
  },
  {
    id: 4,
    title: 'Gratitude Journal',
    date: '2024-06-07',
    emotion: '🙏',
    mood: 'Gratitude',
    text: 'Wrote down three things I am grateful for today.',
    media: [],
  },
];

function filterEntries(entries, { search, emotion, mediaType, date }) {
  return entries.filter(entry => {
    if (search && !entry.title.toLowerCase().includes(search.toLowerCase()) && !entry.text.toLowerCase().includes(search.toLowerCase())) return false;
    if (emotion && entry.mood !== emotion) return false;
    if (mediaType) {
      if (mediaType === 'text' && entry.media.length > 0) return false;
      if (mediaType !== 'text' && !entry.media.some(m => m.type === mediaType)) return false;
    }
    if (date && entry.date !== date) return false;
    return true;
  });
}

const AnimatedPetals: React.FC = () => (
  <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
    {[...Array(12)].map((_, i) => (
      <motion.div
        key={i}
        initial={{ y: -100, x: Math.random() * window.innerWidth }}
        animate={{ y: [0, window.innerHeight + 100], x: [Math.random() * window.innerWidth, Math.random() * window.innerWidth] }}
        transition={{ duration: 12 + Math.random() * 6, repeat: Infinity, delay: i * 0.7 }}
        className="absolute text-3xl opacity-30 select-none"
        style={{ left: `${Math.random() * 100}%` }}
      >
        {['🌸','🌷','✨','💮','🌺','🌼','❀','❁'][i % 8]}
      </motion.div>
    ))}
  </div>
);

const LifeCapsuleDashboard: React.FC<{ user: any }> = ({ user }) => {
  const [entries, setEntries] = useState(MOCK_ENTRIES);
  const [search, setSearch] = useState('');
  const [emotion, setEmotion] = useState('');
  const [mediaType, setMediaType] = useState('');
  const [date, setDate] = useState('');
  const [showCreate, setShowCreate] = useState(false);
  const [expanded, setExpanded] = useState<any>(null);

  const filtered = filterEntries(entries, { search, emotion, mediaType, date });

  return (
    <div className="relative min-h-screen font-[Poppins,sans-serif] bg-gradient-to-br from-pink-100 via-blue-100 to-purple-100">
      <AnimatedPetals />
      {/* Top Welcome Section */}
      <div className="relative z-10 w-full max-w-3xl mx-auto pt-12 pb-6 px-4 text-center animate-fade-in">
        <motion.h1
          className="font-serif text-3xl md:text-4xl font-bold mb-2 text-emotional drop-shadow-lg"
          style={{ fontFamily: 'Playfair Display, serif' }}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Hello, {user.name} <span className="inline-block">🌸</span>
        </motion.h1>
        <motion.p
          className="text-lg md:text-xl text-muted-foreground mb-2 font-light"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 1 }}
        >
          Let's write your story today.
        </motion.p>
        <motion.div
          className="w-full flex justify-center mt-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 1 }}
        >
          <span className="inline-block px-4 py-2 rounded-full bg-white/60 text-emotional font-serif shadow-emotional text-base animate-fade-in-slow" style={{ fontFamily: 'Dancing Script, cursive' }}>
            Your Life Capsule is a safe, beautiful place for your memories, feelings, and dreams.
          </span>
        </motion.div>
      </div>
      {/* Main Layout */}
      <div className="relative z-10 flex flex-row max-w-6xl mx-auto gap-8 px-2 pb-16">
        {/* Sidebar */}
        <aside className="sticky top-8 h-fit min-w-[260px] max-w-[320px] bg-white/70 backdrop-blur-lg shadow-xl rounded-3xl flex flex-col gap-6 p-6 border border-pink-100 animate-fade-in-slow">
          <div className="mb-2">
            <span className="font-serif text-lg text-emotional">Filters</span>
          </div>
          <div className="relative mb-2">
            <Input placeholder="Search memories..." value={search} onChange={e => setSearch(e.target.value)} className="rounded-xl pl-10 bg-white/80" />
            <Search className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
          </div>
          <div>
            <Label className="block mb-2 text-emotional">Emotion</Label>
            <div className="flex flex-wrap gap-2">
              {EMOTIONS.map(e => (
                <Button key={e.label} variant={emotion === e.label ? 'emotional' : 'outline'} size="sm" className="rounded-full px-3" onClick={() => setEmotion(emotion === e.label ? '' : e.label)}>
                  <span className="mr-1">{e.emoji}</span> {e.label}
                </Button>
              ))}
            </div>
          </div>
          <div>
            <Label className="block mb-2 text-emotional">Media</Label>
            <div className="flex gap-2">
              <Button variant={mediaType === '' ? 'emotional' : 'outline'} size="sm" className="rounded-full px-3" onClick={() => setMediaType('')}>All</Button>
              <Button variant={mediaType === 'text' ? 'emotional' : 'outline'} size="sm" className="rounded-full px-3" onClick={() => setMediaType('text')}><Smile className="w-4 h-4 mr-1" />Text</Button>
              <Button variant={mediaType === 'image' ? 'emotional' : 'outline'} size="sm" className="rounded-full px-3" onClick={() => setMediaType('image')}><Image className="w-4 h-4 mr-1" />Image</Button>
              <Button variant={mediaType === 'video' ? 'emotional' : 'outline'} size="sm" className="rounded-full px-3" onClick={() => setMediaType('video')}><Video className="w-4 h-4 mr-1" />Video</Button>
              <Button variant={mediaType === 'audio' ? 'emotional' : 'outline'} size="sm" className="rounded-full px-3" onClick={() => setMediaType('audio')}><Mic className="w-4 h-4 mr-1" />Audio</Button>
            </div>
          </div>
          <div>
            <Label className="block mb-2 text-emotional">Date</Label>
            <Input type="date" value={date} onChange={e => setDate(e.target.value)} className="rounded-xl bg-white/80" />
            {date && <Button variant="outline" size="icon" onClick={() => setDate('')}><X className="w-4 h-4" /></Button>}
          </div>
          <div>
            <Label className="block mb-2 text-emotional">Theme</Label>
            <div className="flex flex-wrap gap-2">
              {['Family','Growth','Pain','Achievement','Travel','Love','Regret'].map(theme => (
                <Button key={theme} variant="outline" size="sm" className="rounded-full px-3 opacity-80">{theme}</Button>
              ))}
            </div>
          </div>
        </aside>
        {/* Timeline Main Content */}
        <main className="flex-1 flex flex-col gap-8 pt-2 animate-fade-in-slow">
          {/* Floating Add Button */}
          <Link to="/life-capsule/add" className="fixed bottom-8 right-8 z-50">
            <Button variant="hero" size="lg" className="rounded-full shadow-2xl px-6 py-4 text-xl flex items-center gap-2 animate-fade-in-slow">
              <Plus className="w-6 h-6" /> Add New Memory
            </Button>
          </Link>
          {/* Timeline */}
          <div className="relative flex flex-col gap-8 mt-2">
            <div className="absolute left-6 top-0 bottom-0 w-1 bg-gradient-to-b from-pink-200 via-blue-200 to-purple-200 rounded-full opacity-60" style={{ zIndex: 0 }} />
            {filtered.length === 0 && (
              <div className="text-center text-muted-foreground text-lg mt-16">No memories found. Try adjusting your filters or create a new entry.</div>
            )}
            {filtered.map((entry, idx) => (
              <motion.div
                key={entry.id}
                className="relative flex gap-6 items-start group animate-fade-in"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1, duration: 0.7 }}
              >
                {/* Timeline dot */}
                <div className="flex flex-col items-center z-10">
                  <span className="w-6 h-6 rounded-full bg-white border-4 border-pink-200 flex items-center justify-center text-2xl shadow-emotional">{entry.emotion}</span>
                  {idx !== filtered.length - 1 && <div className="w-1 flex-1 bg-gradient-to-b from-pink-200 via-blue-200 to-purple-200 opacity-60" />}
                </div>
                {/* Diary Page */}
                <div className="flex-1 bg-white/90 rounded-2xl shadow-lg border border-pink-100 p-6 relative hover:scale-[1.01] transition-transform cursor-pointer" onClick={() => setExpanded(entry)}>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-serif text-xl font-bold text-foreground group-hover:text-emotional transition-colors">{entry.title}</span>
                    <span className="ml-2 px-2 py-0.5 rounded-full bg-emotional/10 text-emotional text-xs font-semibold">{entry.mood}</span>
                    <span className="ml-auto text-xs text-muted-foreground">{entry.date}</span>
                  </div>
                  {/* Media carousel preview */}
                  <div className="flex gap-2 mb-2">
                    {entry.media.map((m, i) => m.type === 'image' ? <img key={i} src={m.url} alt="" className="w-16 h-16 object-cover rounded-lg border" /> : m.type === 'audio' ? <Mic className="w-8 h-8 text-purple-400" key={i} /> : m.type === 'video' ? <Video className="w-8 h-8 text-blue-400" key={i} /> : null)}
                  </div>
                  <div className="text-base text-muted-foreground line-clamp-3" style={{ fontFamily: 'Poppins, Inter, serif' }}>{entry.text.length > 120 ? entry.text.slice(0, 120) + '…' : entry.text}</div>
                  <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button variant="outline" size="icon" className="rounded-full"><Edit className="w-4 h-4" /></Button>
                    <Button variant="destructive" size="icon" className="rounded-full"><Trash2 className="w-4 h-4" /></Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          {/* Expand entry modal and create modal remain as before */}
          {/* ... */}
        </main>
      </div>
      {/* Floating Add Button is already included above */}
      <AddEditMemoryModal
        open={showCreate}
        onClose={() => setShowCreate(false)}
        onSave={entry => setEntries([entry, ...entries])}
      />
    </div>
  );
};

const LifeCapsule: React.FC = () => {
  const [user, setUser] = useState<any>(null);

  if (!user) {
    return <AuthForm onAuthSuccess={setUser} />;
  }

  return <LifeCapsuleDashboard user={user} />;
};

export default LifeCapsule; 