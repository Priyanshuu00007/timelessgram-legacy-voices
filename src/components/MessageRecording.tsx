import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Video, Mic, FileText, Users, Calendar, Heart } from "lucide-react";

export const MessageRecording = () => {
  const [messageType, setMessageType] = useState("text");
  const [recipients, setRecipients] = useState("");
  const [message, setMessage] = useState("");

  return (
    <div className="min-h-screen bg-gradient-sepia py-12">
      <div className="container mx-auto px-6 lg:px-8 max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="font-serif text-4xl lg:text-5xl font-bold mb-4 text-foreground">
            Record Your Legacy
          </h1>
          <p className="text-xl text-muted-foreground">
            Take your time. Say what matters. Your words will live forever.
          </p>
        </div>

        <Card className="bg-card/80 backdrop-blur shadow-emotional p-8">
          {/* Message Type Selection */}
          <div className="mb-8">
            <Label className="text-lg font-serif mb-4 block">Choose your message format</Label>
            <Tabs value={messageType} onValueChange={setMessageType}>
              <TabsList className="grid w-full grid-cols-3 bg-muted/50">
                <TabsTrigger value="text" className="flex items-center gap-2">
                  <FileText className="w-4 h-4" />
                  Written Words
                </TabsTrigger>
                <TabsTrigger value="voice" className="flex items-center gap-2">
                  <Mic className="w-4 h-4" />
                  Voice Message
                </TabsTrigger>
                <TabsTrigger value="video" className="flex items-center gap-2">
                  <Video className="w-4 h-4" />
                  Video Message
                </TabsTrigger>
              </TabsList>

              <TabsContent value="text" className="mt-6">
                <div className="space-y-4">
                  <Label htmlFor="message" className="text-lg font-serif">Your message</Label>
                  <Textarea 
                    id="message"
                    placeholder="Dear loved ones, there are things I want you to know..."
                    className="min-h-[200px] bg-background/50 border-accent/30 focus:border-emotional resize-none text-lg leading-relaxed"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                  />
                  <p className="text-sm text-muted-foreground italic">
                    Take your time. There's no rush when it comes to love.
                  </p>
                </div>
              </TabsContent>

              <TabsContent value="voice" className="mt-6">
                <div className="bg-gradient-warm rounded-lg p-8 text-center">
                  <Mic className="w-16 h-16 mx-auto mb-4 text-emotional" />
                  <h3 className="font-serif text-xl mb-4">Record Your Voice</h3>
                  <p className="text-muted-foreground mb-6">
                    Speak from your heart. They'll treasure the sound of your voice forever.
                  </p>
                  <Button variant="emotional" size="lg">
                    <Mic className="w-5 h-5" />
                    Start Recording
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="video" className="mt-6">
                <div className="bg-gradient-warm rounded-lg p-8 text-center">
                  <Video className="w-16 h-16 mx-auto mb-4 text-emotional" />
                  <h3 className="font-serif text-xl mb-4">Record Your Video</h3>
                  <p className="text-muted-foreground mb-6">
                    Let them see your face one last time. Share your smile, your expressions, your love.
                  </p>
                  <Button variant="emotional" size="lg">
                    <Video className="w-5 h-5" />
                    Start Recording
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Recipients Section */}
          <div className="mb-8">
            <Label htmlFor="recipients" className="text-lg font-serif mb-4 block flex items-center gap-2">
              <Users className="w-5 h-5" />
              Who should receive this message?
            </Label>
            <Input 
              id="recipients"
              placeholder="Sarah (daughter), Michael (son), Emma (sister)..."
              className="bg-background/50 border-accent/30 focus:border-emotional text-lg"
              value={recipients}
              onChange={(e) => setRecipients(e.target.value)}
            />
            <p className="text-sm text-muted-foreground mt-2">
              Add their email addresses and we'll make sure they receive your message
            </p>
          </div>

          {/* Delivery Timing */}
          <div className="mb-8">
            <Label className="text-lg font-serif mb-4 block flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              When should this be delivered?
            </Label>
            <div className="bg-gradient-warm rounded-lg p-6">
              <div className="flex items-start gap-4">
                <div className="w-2 h-2 bg-emotional rounded-full mt-2"></div>
                <div>
                  <h4 className="font-semibold mb-2">After Verification of Departure</h4>
                  <p className="text-muted-foreground text-sm">
                    Every year, we check if you're still with us through a simple email. 
                    If we don't hear back after multiple attempts, we begin the gentle process 
                    of delivering your messages to your loved ones.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-between">
            <Button variant="outline" size="lg">
              Save as Draft
            </Button>
            
            <div className="flex gap-4">
              <Button variant="secondary" size="lg">
                Preview Message
              </Button>
              <Button variant="hero" size="lg">
                <Heart className="w-5 h-5" />
                Complete & Secure
              </Button>
            </div>
          </div>
        </Card>

        {/* Security Notice */}
        <div className="mt-8 bg-card/60 backdrop-blur rounded-lg p-6 text-center">
          <p className="text-muted-foreground">
            🔒 Your messages are encrypted with bank-level security and stored safely until needed.
          </p>
        </div>
      </div>
    </div>
  );
};