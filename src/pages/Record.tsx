import { Navigation } from "@/components/Navigation";
import { MessageRecording } from "@/components/MessageRecording";
import { Footer } from "@/components/Footer";

const Record = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main className="pt-16">
        <MessageRecording />
      </main>
      <Footer />
    </div>
  );
};

export default Record;