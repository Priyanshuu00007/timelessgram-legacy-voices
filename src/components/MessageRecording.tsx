import React, { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Mic, StopCircle, CheckCircle, Trash2, FileText, Users, Calendar, Heart, Image as ImageIcon } from "lucide-react";

// Helper for formatting time
function formatTime(seconds: number) {
  const m = Math.floor(seconds / 60).toString().padStart(2, "0");
  const s = (seconds % 60).toString().padStart(2, "0");
  return `${m}:${s}`;
}

export const MessageRecording = () => {
  // Form state
  const [memoryType, setMemoryType] = useState("Story");
  const [recipients, setRecipients] = useState("");
  const [message, setMessage] = useState("");
  const [photo, setPhoto] = useState<string | null>(null);
  const [photoFile, setPhotoFile] = useState<File | null>(null);

  // Audio recording state
  const [isRecording, setIsRecording] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [recordingTime, setRecordingTime] = useState(0);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const timerRef = useRef<number | null>(null);
  const [audioError, setAudioError] = useState<string | null>(null);

  // Handle photo upload
  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPhotoFile(file);
      const reader = new FileReader();
      reader.onload = (ev) => setPhoto(ev.target?.result as string);
      reader.readAsDataURL(file);
    }
  };

  // Audio recording logic
  const startRecording = async () => {
    setAudioError(null);
    setAudioUrl(null);
    setAudioBlob(null);
    setRecordingTime(0);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new window.MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      const chunks: BlobPart[] = [];
      mediaRecorder.ondataavailable = (e) => chunks.push(e.data);
      mediaRecorder.onstop = () => {
        const blob = new Blob(chunks, { type: "audio/webm" });
        setAudioBlob(blob);
        setAudioUrl(URL.createObjectURL(blob));
      };
      mediaRecorder.start();
      setIsRecording(true);
      timerRef.current = setInterval(() => setRecordingTime((t) => t + 1), 1000);
    } catch (err) {
      setAudioError("Microphone access denied or unavailable.");
    }
  };

  const stopRecording = () => {
    mediaRecorderRef.current?.stop();
    setIsRecording(false);
    if (timerRef.current) clearInterval(timerRef.current);
  };

  const discardRecording = () => {
    setAudioUrl(null);
    setAudioBlob(null);
    setRecordingTime(0);
    setIsRecording(false);
    setAudioError(null);
  };

  // Responsive layout: form and preview
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fbeee6] via-[#f7d9c4] to-[#e7c6a7] py-8 font-[Poppins,sans-serif] transition-colors duration-500">
      <div className="container mx-auto px-4 lg:px-8 max-w-5xl">
        {/* Quote at the top */}
        <div className="text-center mb-6">
          <blockquote className="font-serif text-xl lg:text-2xl italic text-emotional mb-2 animate-fade-in">
            “Memories are timeless treasures of the heart.”
          </blockquote>
        </div>
        {/* Heading and subheading */}
        <div className="text-center mb-10">
          <h1 className="font-bold text-4xl lg:text-5xl mb-2 text-foreground tracking-tight" style={{ fontFamily: 'Poppins, Inter, Playfair Display, serif' }}>
            📜 Record Your Legacy
          </h1>
          <p className="text-lg lg:text-xl text-muted-foreground animate-fade-in-slow">
            Because your stories deserve to echo through time.
          </p>
        </div>
        {/* Main content: form + preview */}
        <div className="flex flex-col lg:flex-row gap-10">
          {/* Form Card */}
          <Card className="flex-1 bg-white/80 backdrop-blur shadow-lg rounded-2xl p-8 transition-shadow duration-300 hover:shadow-emotional">
            {/* Memory Type Dropdown */}
            <div className="mb-6">
              <Label htmlFor="memory-type" className="block text-base font-medium mb-2">Memory Type</Label>
              <Select value={memoryType} onValueChange={setMemoryType}>
                <SelectTrigger id="memory-type" className="w-full">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Story">Story</SelectItem>
                  <SelectItem value="Message">Message</SelectItem>
                  <SelectItem value="Advice">Advice</SelectItem>
                  <SelectItem value="Final Words">Final Words</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {/* Recipients Input with floating label */}
            <div className="mb-6 relative">
              <Input
                id="recipients"
                value={recipients}
                onChange={e => setRecipients(e.target.value)}
                placeholder=" "
                className="peer bg-background/60 border-accent/30 focus:border-emotional text-base rounded-lg shadow-sm transition-all duration-300"
                autoComplete="off"
              />
              <Label htmlFor="recipients" className="absolute left-3 top-2 text-muted-foreground text-base transition-all duration-200 pointer-events-none peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-base peer-focus:-top-4 peer-focus:text-sm peer-focus:text-emotional bg-white/80 px-1 rounded">
                <Users className="inline w-4 h-4 mr-1" /> Who should receive this message?
              </Label>
              <p className="text-xs text-muted-foreground mt-1 ml-1">(Optional: Add names or emails)</p>
            </div>
            {/* Photo Upload */}
            <div className="mb-6">
              <Label htmlFor="photo-upload" className="block text-base font-medium mb-2 flex items-center gap-2">
                <ImageIcon className="w-5 h-5" /> Memory Photo (optional)
              </Label>
              <Input
                id="photo-upload"
                type="file"
                accept="image/*"
                onChange={handlePhotoChange}
                className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-emotional/10 file:text-emotional hover:file:bg-emotional/20 transition-all duration-200"
              />
              {photo && (
                <div className="mt-3 flex items-center gap-3 animate-fade-in">
                  <Avatar className="h-16 w-16">
                    <AvatarImage src={photo} alt="Memory preview" />
                    <AvatarFallback>IMG</AvatarFallback>
                  </Avatar>
                  <span className="text-sm text-muted-foreground">Preview</span>
                </div>
              )}
            </div>
            {/* Message Input (floating label) */}
            <div className="mb-6 relative">
              <Textarea
                id="message"
                value={message}
                onChange={e => setMessage(e.target.value)}
                placeholder=" "
                className="peer min-h-[120px] bg-background/60 border-accent/30 focus:border-emotional text-base rounded-lg shadow-sm transition-all duration-300 resize-none"
              />
              <Label htmlFor="message" className="absolute left-3 top-2 text-muted-foreground text-base transition-all duration-200 pointer-events-none peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-base peer-focus:-top-4 peer-focus:text-sm peer-focus:text-emotional bg-white/80 px-1 rounded">
                <FileText className="inline w-4 h-4 mr-1" /> Your message
              </Label>
              <p className="text-xs text-muted-foreground mt-1 ml-1">Share your story, message, or advice…</p>
            </div>
            {/* Audio Recording UI */}
            <div className="mb-8">
              <Label className="block text-base font-medium mb-2 flex items-center gap-2">
                <Mic className="w-5 h-5" /> Voice Message (optional)
              </Label>
              <div className="flex items-center gap-4">
                {!isRecording && !audioUrl && (
                  <Button type="button" variant="emotional" size="icon" className="rounded-full shadow transition-transform duration-200 hover:scale-110" onClick={startRecording}>
                    <Mic className="w-6 h-6" />
                  </Button>
                )}
                {isRecording && (
                  <>
                    <Button type="button" variant="destructive" size="icon" className="rounded-full animate-pulse" onClick={stopRecording}>
                      <StopCircle className="w-6 h-6" />
                    </Button>
                    <span className="font-mono text-lg text-emotional animate-blink">{formatTime(recordingTime)}</span>
                  </>
                )}
                {audioUrl && !isRecording && (
                  <>
                    <audio src={audioUrl} controls className="h-10" />
                    <Button type="button" variant="secondary" size="icon" className="rounded-full" onClick={discardRecording}>
                      <Trash2 className="w-5 h-5" />
                    </Button>
                  </>
                )}
                {audioError && <span className="text-destructive text-sm ml-2">{audioError}</span>}
              </div>
            </div>
            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mt-6">
              <Button type="button" variant="outline" size="lg" className="rounded-full font-semibold transition-all duration-200 hover:shadow-emotional">
                Save as Draft
              </Button>
              <Button type="button" variant="secondary" size="lg" className="rounded-full font-semibold transition-all duration-200 hover:shadow-emotional">
                Preview Message
              </Button>
              <Button type="submit" variant="hero" size="lg" className="rounded-full font-bold bg-gradient-to-r from-teal-400 via-violet-500 to-pink-400 text-white shadow-lg hover:scale-105 hover:shadow-xl transition-all duration-300 flex items-center gap-2">
                <Heart className="w-5 h-5" /> Complete & Secure
              </Button>
            </div>
          </Card>
          {/* Preview Card */}
          <div className="flex-1 max-w-md mx-auto lg:mx-0">
            <Card className="bg-white/90 shadow-xl rounded-2xl p-8 flex flex-col items-center text-center animate-fade-in-slow">
              <div className="mb-4">
                {photo ? (
                  <Avatar className="h-20 w-20 mx-auto mb-2">
                    <AvatarImage src={photo} alt="Memory preview" />
                    <AvatarFallback>IMG</AvatarFallback>
                  </Avatar>
                ) : (
                  <Avatar className="h-20 w-20 mx-auto mb-2 bg-muted">
                    <AvatarFallback>
                      <ImageIcon className="w-10 h-10 text-muted-foreground" />
                    </AvatarFallback>
                  </Avatar>
                )}
              </div>
              <div className="mb-2">
                <span className="inline-block px-3 py-1 rounded-full bg-emotional/10 text-emotional text-xs font-semibold mb-2 transition-all duration-200">
                  {memoryType}
                </span>
              </div>
              <h3 className="font-serif text-2xl font-bold mb-2 text-foreground" style={{ fontFamily: 'Playfair Display, serif' }}>
                {message ? message.slice(0, 60) + (message.length > 60 ? "…" : "") : "Your message preview will appear here."}
              </h3>
              <div className="text-muted-foreground text-sm mb-2">
                {recipients ? `For: ${recipients}` : "No recipients specified."}
              </div>
              {audioUrl && (
                <audio src={audioUrl} controls className="w-full my-2" />
              )}
              <div className="mt-4">
                <span className="text-xs text-muted-foreground">This is how your legacy will appear to your loved ones.</span>
              </div>
            </Card>
          </div>
        </div>
        {/* Security Notice */}
        <div className="mt-10 bg-card/60 backdrop-blur rounded-lg p-6 text-center shadow-inner animate-fade-in">
          <p className="text-muted-foreground">
            🔒 Your messages are encrypted with bank-level security and stored safely until needed.
          </p>
        </div>
      </div>
      {/* Animations */}
      <style>{`
        .animate-fade-in { animation: fadeIn 1s ease; }
        .animate-fade-in-slow { animation: fadeIn 1.8s ease; }
        .animate-blink { animation: blink 1s steps(2, start) infinite; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: none; } }
        @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0.3; } }
      `}</style>
    </div>
  );
};