import { NavBar } from "@/components/ui/tubelight-navbar";
import { Heart, Home, BookOpen, Info, Shield, User, MessageSquare, Book } from "lucide-react";
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { Label } from "@/components/ui/label";
import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import letterFade from "@/assets/letter-fade.jpg";

export const Navigation = () => {
  const navItems = [
    { name: 'Home', url: '/', icon: Home },
    { name: 'How It Works', url: '#how-it-works', icon: BookOpen },
    { name: 'Life Capsule', url: '/life-capsule', icon: Book },
    { name: 'About', url: '/about', icon: Info },
    { name: 'Security', url: '#security', icon: Shield },
  ];

  return (
    <>
      {/* Fixed Navigation Bar at top */}
      <NavBar items={navItems} />

      {/* Header with Logo and CTA - below navigation */}
      <div className="flex items-center px-6 lg:px-8 py-6">
        <div className="flex items-center gap-2">
          <Heart className="w-5 h-5 sm:w-6 sm:h-6 text-emotional animate-logo-heart" />
          <span className="font-serif text-lg sm:text-xl font-bold text-foreground animate-logo-shimmer logo-gradient-bg" style={{ WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Timelessgram</span>
          <style>{`
            @keyframes logo-heart-pulse {
              0% { transform: scale(1); filter: drop-shadow(0 0 0 #e2557b); }
              30% { transform: scale(1.18); filter: drop-shadow(0 0 8px #e2557b88); }
              50% { transform: scale(1.08); filter: drop-shadow(0 0 4px #e2557b44); }
              100% { transform: scale(1); filter: drop-shadow(0 0 0 #e2557b); }
            }
            .animate-logo-heart {
              animation: logo-heart-pulse 1.8s infinite;
              transform-origin: center;
            }
            @keyframes logo-shimmer {
              0% { background-position: -200% 0; }
              100% { background-position: 200% 0; }
            }
            .animate-logo-shimmer.logo-gradient-bg {
              background: linear-gradient(90deg, #e2557b 0%, #fbbf24 40%, #a78bfa 60%, #e2557b 100%);
              background-size: 200% 100%;
              animation: logo-shimmer 2.5s linear infinite;
            }
          `}</style>
        </div>
        {/* Responsive button container */}
        <div className="ml-auto pr-0">
          {/* Mobile layout: only Create Legacy button, no login icon */}
          <div className="flex flex-col items-end gap-2 sm:hidden w-full pr-0">
            <a
              href="/create-legacy"
              className="bg-emotional hover:bg-emotional/90 text-white px-4 py-2 rounded-full font-medium transition-colors text-sm w-auto" style={{ marginRight: '0.5px' }}
            >
              Create Legacy
            </a>
          </div>
          {/* Desktop layout */}
          <div className="hidden sm:flex flex-row items-center gap-2">
            <Dialog>
              <DialogTrigger asChild>
                <button
                  className="bg-white border border-emotional text-emotional hover:bg-emotional hover:text-white px-4 sm:px-6 py-2 rounded-full font-medium transition-colors text-sm sm:text-base shadow-emotional focus:outline-none focus:ring-2 focus:ring-emotional/50 w-auto"
                >
                  Login
                </button>
              </DialogTrigger>
              <DialogContent className="max-w-md p-0 bg-white/90 shadow-emotional rounded-3xl overflow-hidden relative">
                {/* Animated emotional background */}
                <div className="absolute inset-0 w-full h-full z-0 animate-gradient bg-gradient-to-br from-pink-200 via-yellow-100 to-pink-300 opacity-90 pointer-events-none select-none" />
                {/* Floating hearts animation */}
                <div className="absolute inset-0 w-full h-full z-0 pointer-events-none select-none">
                  {[...Array(7)].map((_, i) => (
                    <span
                      key={i}
                      className={`absolute heart-anim heart-${i}`}
                      style={{
                        left: `${10 + i * 12}%`,
                        animationDelay: `${i * 0.7}s`,
                      }}
                    >
                      <svg width="32" height="32" viewBox="0 0 24 24" fill="#e2557b" opacity="0.7">
                        <path d="M12 21s-6.7-5.6-9.3-8.2C-1.2 9.2 2.4 3.6 7.5 5.1c2.1.6 3.5 2.6 4.5 4.1 1-1.5 2.4-3.5 4.5-4.1C21.6 3.6 25.2 9.2 21.3 12.8 18.7 15.4 12 21 12 21z" />
                      </svg>
                    </span>
                  ))}
                </div>
                <div className="relative z-10 p-8">
                  <Tabs defaultValue="login">
                    <TabsList className="w-full flex justify-center mb-6 bg-emotional/10">
                      <TabsTrigger value="login">Login</TabsTrigger>
                      <TabsTrigger value="otp">Forgot Password / OTP</TabsTrigger>
                    </TabsList>
                    <TabsContent value="login">
                      <LoginForm />
                    </TabsContent>
                    <TabsContent value="otp">
                      <OTPForm />
                    </TabsContent>
                  </Tabs>
                </div>
                {/* Animated gradient and hearts CSS */}
                <style>{`
                  .animate-gradient {
                    background-size: 200% 200%;
                    animation: gradientMove 8s ease-in-out infinite;
                  }
                  @keyframes gradientMove {
                    0% { background-position: 0% 50%; }
                    50% { background-position: 100% 50%; }
                    100% { background-position: 0% 50%; }
                  }
                  .heart-anim {
                    animation: floatHeart 6s linear infinite;
                    opacity: 0.7;
                  }
                  @keyframes floatHeart {
                    0% { transform: translateY(100%) scale(0.8) rotate(-10deg); opacity: 0; }
                    10% { opacity: 0.7; }
                    50% { opacity: 0.9; }
                    100% { transform: translateY(-120%) scale(1.1) rotate(10deg); opacity: 0; }
                  }
                  .heart-0 { width: 28px; top: 80%; }
                  .heart-1 { width: 22px; top: 85%; }
                  .heart-2 { width: 32px; top: 90%; }
                  .heart-3 { width: 26px; top: 88%; }
                  .heart-4 { width: 24px; top: 83%; }
                  .heart-5 { width: 30px; top: 86%; }
                  .heart-6 { width: 20px; top: 92%; }
                `}</style>
              </DialogContent>
            </Dialog>
            <a
              href="/create-legacy"
              className="bg-emotional hover:bg-emotional/90 text-white px-4 sm:px-6 py-2 rounded-full font-medium transition-colors text-sm sm:text-base w-auto"
            >
              Create Legacy
            </a>
          </div>
        </div>
        {/* Mobile floating login button (FAB) */}
        <div className="sm:hidden">
          <Dialog>
            <DialogTrigger asChild>
              {/* Draggable, animated floating button */}
              {(() => {
                // Draggable logic
                const [pos, setPos] = useState({ x: 0, y: 0 });
                const [dragging, setDragging] = useState(false);
                const startPos = useRef({ x: 0, y: 0 });
                const startPointer = useRef({ x: 0, y: 0 });
                const btnRef = useRef(null);
                // Bounds (viewport)
                const minX = 0, minY = 0;
                const maxX = typeof window !== 'undefined' ? window.innerWidth - 64 : 0;
                const maxY = typeof window !== 'undefined' ? window.innerHeight - 64 : 0;
                // Handlers
                const onPointerDown = (e) => {
                  setDragging(true);
                  startPos.current = { ...pos };
                  if (e.touches) {
                    startPointer.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
                  } else {
                    startPointer.current = { x: e.clientX, y: e.clientY };
                  }
                  document.addEventListener('pointermove', onPointerMove);
                  document.addEventListener('pointerup', onPointerUp);
                  document.addEventListener('touchmove', onPointerMove, { passive: false });
                  document.addEventListener('touchend', onPointerUp);
                };
                const onPointerMove = (e) => {
                  if (!dragging) return;
                  let clientX, clientY;
                  if (e.touches) {
                    clientX = e.touches[0].clientX;
                    clientY = e.touches[0].clientY;
                  } else {
                    clientX = e.clientX;
                    clientY = e.clientY;
                  }
                  let dx = clientX - startPointer.current.x;
                  let dy = clientY - startPointer.current.y;
                  let newX = Math.min(Math.max(startPos.current.x + dx, minX), maxX);
                  let newY = Math.min(Math.max(startPos.current.y + dy, minY), maxY);
                  setPos({ x: newX, y: newY });
                  if (e.cancelable) e.preventDefault();
                };
                const onPointerUp = () => {
                  setDragging(false);
                  document.removeEventListener('pointermove', onPointerMove);
                  document.removeEventListener('pointerup', onPointerUp);
                  document.removeEventListener('touchmove', onPointerMove);
                  document.removeEventListener('touchend', onPointerUp);
                };
                // Style
                const style = {
                  position: 'fixed' as React.CSSProperties['position'],
                  zIndex: 50,
                  background: 'rgba(255,255,255,0.7)',
                  border: '1.5px solid #e2557b',
                  color: '#e2557b',
                  borderRadius: '9999px',
                  boxShadow: '0 4px 24px 0 rgba(226,85,123,0.18)',
                  width: '56px',
                  height: '56px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: dragging ? 'none' : 'background 0.2s, color 0.2s, box-shadow 0.2s',
                  backdropFilter: 'blur(4px)',
                  animation: dragging ? 'none' : 'pulse-fab 1.5s infinite',
                  touchAction: 'none',
                  cursor: dragging ? 'grabbing' : 'grab',
                  userSelect: 'none',
                  // Positioning logic
                  ...(typeof pos.x === 'number' && pos.x !== 0 || typeof pos.y === 'number' && pos.y !== 0
                    ? {
                        left: typeof pos.x === 'number' && pos.x !== 0 ? pos.x : undefined,
                        top: typeof pos.y === 'number' && pos.y !== 0 ? pos.y : undefined,
                      }
                    : {
                        bottom: '3.5cm',
                        right: '1cm',
                      }),
                } as React.CSSProperties;
                return (
                  <button
                    ref={btnRef}
                    style={style}
                    aria-label="Login"
                    onPointerDown={onPointerDown}
                    onTouchStart={onPointerDown}
                  >
                    <User className="w-7 h-7" />
                    <style>{`
                      @keyframes pulse-fab {
                        0% { box-shadow: 0 4px 24px 0 rgba(226,85,123,0.18), 0 0 0 0 rgba(226,85,123,0.18); }
                        70% { box-shadow: 0 4px 24px 0 rgba(226,85,123,0.18), 0 0 0 12px rgba(226,85,123,0.10); }
                        100% { box-shadow: 0 4px 24px 0 rgba(226,85,123,0.18), 0 0 0 0 rgba(226,85,123,0.0); }
                      }
                    `}</style>
                  </button>
                );
              })()}
            </DialogTrigger>
            <DialogContent className="max-w-md p-0 bg-white/90 shadow-emotional rounded-3xl overflow-hidden relative">
              {/* Animated emotional background */}
              <div className="absolute inset-0 w-full h-full z-0 animate-gradient bg-gradient-to-br from-pink-200 via-yellow-100 to-pink-300 opacity-90 pointer-events-none select-none" />
              {/* Floating hearts animation */}
              <div className="absolute inset-0 w-full h-full z-0 pointer-events-none select-none">
                {[...Array(7)].map((_, i) => (
                  <span
                    key={i}
                    className={`absolute heart-anim heart-${i}`}
                    style={{
                      left: `${10 + i * 12}%`,
                      animationDelay: `${i * 0.7}s`,
                    }}
                  >
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="#e2557b" opacity="0.7">
                      <path d="M12 21s-6.7-5.6-9.3-8.2C-1.2 9.2 2.4 3.6 7.5 5.1c2.1.6 3.5 2.6 4.5 4.1 1-1.5 2.4-3.5 4.5-4.1C21.6 3.6 25.2 9.2 21.3 12.8 18.7 15.4 12 21 12 21z" />
                    </svg>
                  </span>
                ))}
              </div>
              <div className="relative z-10 p-8">
                <Tabs defaultValue="login">
                  <TabsList className="w-full flex justify-center mb-6 bg-emotional/10">
                    <TabsTrigger value="login">Login</TabsTrigger>
                    <TabsTrigger value="otp">Forgot Password / OTP</TabsTrigger>
                  </TabsList>
                  <TabsContent value="login">
                    <LoginForm />
                  </TabsContent>
                  <TabsContent value="otp">
                    <OTPForm />
                  </TabsContent>
                </Tabs>
              </div>
              {/* Animated gradient and hearts CSS */}
              <style>{`
                .animate-gradient {
                  background-size: 200% 200%;
                  animation: gradientMove 8s ease-in-out infinite;
                }
                @keyframes gradientMove {
                  0% { background-position: 0% 50%; }
                  50% { background-position: 100% 50%; }
                  100% { background-position: 0% 50%; }
                }
                .heart-anim {
                  animation: floatHeart 6s linear infinite;
                  opacity: 0.7;
                }
                @keyframes floatHeart {
                  0% { transform: translateY(100%) scale(0.8) rotate(-10deg); opacity: 0; }
                  10% { opacity: 0.7; }
                  50% { opacity: 0.9; }
                  100% { transform: translateY(-120%) scale(1.1) rotate(10deg); opacity: 0; }
                }
                .heart-0 { width: 28px; top: 80%; }
                .heart-1 { width: 22px; top: 85%; }
                .heart-2 { width: 32px; top: 90%; }
                .heart-3 { width: 26px; top: 88%; }
                .heart-4 { width: 24px; top: 83%; }
                .heart-5 { width: 30px; top: 86%; }
                .heart-6 { width: 20px; top: 92%; }
              `}</style>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </>
  );
};

// LoginForm and OTPForm components
function LoginForm() {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    // Mock logic: accept any non-empty identifier and password 'legacy123'
    if (!identifier || !password) {
      setError("Please enter your username, email, or phone and password.");
      return;
    }
    if (password !== "legacy123") {
      setError("Incorrect password. Try 'legacy123' or use OTP.");
      return;
    }
    // On success, redirect
    navigate("/profile");
  }
  return (
    <form className="flex flex-col gap-4 animate-fade-in" onSubmit={handleSubmit}>
      <div>
        <Label htmlFor="identifier">Username / Email / Phone</Label>
        <Input id="identifier" autoFocus placeholder="Enter your username, email, or phone" value={identifier} onChange={e => setIdentifier(e.target.value)} className="rounded-xl mt-1" />
      </div>
      <div>
        <Label htmlFor="password">Password</Label>
        <Input id="password" type="password" placeholder="Enter your password" value={password} onChange={e => setPassword(e.target.value)} className="rounded-xl mt-1" />
      </div>
      {error && <div className="text-destructive text-sm text-center mt-2 animate-fade-in">{error}</div>}
      <button type="submit" className="bg-emotional hover:bg-emotional/90 text-white rounded-xl py-3 text-lg font-semibold mt-2 transition-colors shadow-emotional">Login</button>
    </form>
  );
}

function OTPForm() {
  const [identifier, setIdentifier] = useState("");
  const [step, setStep] = useState<"request"|"verify">("request");
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);
  const navigate = useNavigate();
  function handleRequest(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (!identifier) {
      setError("Please enter your email or phone number.");
      return;
    }
    setSent(true);
    setStep("verify");
  }
  function handleVerify(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (otp !== "123456") {
      setError("Invalid OTP. Try 123456.");
      return;
    }
    navigate("/profile");
  }
  return (
    <div className="animate-fade-in">
      {step === "request" && (
        <form className="flex flex-col gap-4" onSubmit={handleRequest}>
          <div>
            <Label htmlFor="otp-identifier">Email or Phone</Label>
            <Input id="otp-identifier" placeholder="Enter your email or phone" value={identifier} onChange={e => setIdentifier(e.target.value)} className="rounded-xl mt-1" />
          </div>
          {error && <div className="text-destructive text-sm text-center mt-2 animate-fade-in">{error}</div>}
          <button type="submit" className="bg-emotional hover:bg-emotional/90 text-white rounded-xl py-3 text-lg font-semibold mt-2 transition-colors shadow-emotional">Send OTP</button>
        </form>
      )}
      {step === "verify" && (
        <form className="flex flex-col gap-4" onSubmit={handleVerify}>
          <div className="text-center text-lg">Enter the OTP sent to <span className="font-semibold">{identifier}</span></div>
          <InputOTP maxLength={6} value={otp} onChange={setOtp} className="mx-auto" />
          {error && <div className="text-destructive text-sm text-center mt-2 animate-fade-in">{error}</div>}
          <button type="submit" className="bg-emotional hover:bg-emotional/90 text-white rounded-xl py-3 text-lg font-semibold mt-2 transition-colors shadow-emotional">Verify & Login</button>
        </form>
      )}
    </div>
  );
}
