import { useState } from "react";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { motion } from "framer-motion";
import { User, Brain, Shield, Users, Plus, Edit2 } from "lucide-react";

const mockUser = {
  name: "Priya Sharma",
  avatar: "https://ui-avatars.com/api/?name=Priya+Sharma&background=F9E6E6&color=8B2635&size=128",
  quote: "Your memories live on...",
};

const mockVaults = [
  { id: 1, title: "My Childhood", updated: "2024-06-01", description: "Stories from my early years." },
  { id: 2, title: "Graduation Day", updated: "2024-05-20", description: "A day to remember." },
];
const mockGuardians = [
  { id: 1, name: "Amit Sharma", contact: "+91 9876543210", relation: "Brother" },
  { id: 2, name: "Sunita Sharma", contact: "+91 9123456780", relation: "Mother" },
];
const mockPersons = [
  { id: 1, name: "Rohit Verma", relation: "Friend" },
  { id: 2, name: "Meera Patel", relation: "Mentor" },
];

export default function Profile() {
  const [vaults, setVaults] = useState(mockVaults);
  const [guardians, setGuardians] = useState(mockGuardians);
  const [persons, setPersons] = useState(mockPersons);
  // For brevity, editing logic is omitted but can be added as modal/inline forms

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-blue-100 to-purple-100 font-[Poppins,sans-serif]">
      <div className="max-w-3xl mx-auto py-12 px-4">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }} className="flex flex-col items-center mb-10">
          <img src={mockUser.avatar} alt="Profile" className="w-24 h-24 rounded-full shadow-emotional mb-4 border-4 border-emotional/30" />
          <h1 className="font-serif text-3xl font-bold text-emotional mb-1">{mockUser.name}</h1>
          <p className="italic text-muted-foreground text-lg">{mockUser.quote}</p>
        </motion.div>
        {/* Collapsible Sections */}
        <Accordion type="multiple" className="space-y-6">
          {/* Memory Vaults */}
          <AccordionItem value="vaults">
            <AccordionTrigger className="text-xl font-semibold flex items-center gap-2"><Brain className="w-5 h-5" /> Memory Vaults</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-4">
                {vaults.map(vault => (
                  <motion.div key={vault.id} whileHover={{ scale: 1.02 }} className="transition-transform">
                    <Card className="p-4 flex flex-col gap-2 bg-white/80 shadow-emotional rounded-xl">
                      <div className="flex justify-between items-center">
                        <div>
                          <div className="font-bold text-lg">{vault.title}</div>
                          <div className="text-sm text-muted-foreground">{vault.description}</div>
                        </div>
                        <Button size="icon" variant="ghost"><Edit2 className="w-4 h-4" /></Button>
                      </div>
                      <div className="text-xs text-right text-muted-foreground">🕒 Last updated: {vault.updated}</div>
                    </Card>
                  </motion.div>
                ))}
                <Button className="mt-2 w-full bg-emotional/90 hover:bg-emotional text-white rounded-xl flex gap-2 items-center justify-center"><Plus className="w-4 h-4" /> Add Vault</Button>
              </div>
            </AccordionContent>
          </AccordionItem>
          {/* Guardians List */}
          <AccordionItem value="guardians">
            <AccordionTrigger className="text-xl font-semibold flex items-center gap-2"><Shield className="w-5 h-5" /> Guardians List</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-4">
                {guardians.map(g => (
                  <motion.div key={g.id} whileHover={{ scale: 1.02 }} className="transition-transform">
                    <Card className="p-4 flex flex-col gap-2 bg-white/80 shadow-emotional rounded-xl">
                      <div className="flex justify-between items-center">
                        <div>
                          <div className="font-bold text-lg">{g.name}</div>
                          <div className="text-sm text-muted-foreground">{g.relation} • {g.contact}</div>
                        </div>
                        <Button size="icon" variant="ghost"><Edit2 className="w-4 h-4" /></Button>
                      </div>
                    </Card>
                  </motion.div>
                ))}
                <Button className="mt-2 w-full bg-emotional/90 hover:bg-emotional text-white rounded-xl flex gap-2 items-center justify-center"><Plus className="w-4 h-4" /> Add Guardian</Button>
              </div>
            </AccordionContent>
          </AccordionItem>
          {/* Persons List */}
          <AccordionItem value="persons">
            <AccordionTrigger className="text-xl font-semibold flex items-center gap-2"><Users className="w-5 h-5" /> Persons List</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-4">
                {persons.map(p => (
                  <motion.div key={p.id} whileHover={{ scale: 1.02 }} className="transition-transform">
                    <Card className="p-4 flex flex-col gap-2 bg-white/80 shadow-emotional rounded-xl">
                      <div className="flex justify-between items-center">
                        <div>
                          <div className="font-bold text-lg">{p.name}</div>
                          <div className="text-sm text-muted-foreground">{p.relation}</div>
                        </div>
                        <Button size="icon" variant="ghost"><Edit2 className="w-4 h-4" /></Button>
                      </div>
                    </Card>
                  </motion.div>
                ))}
                <Button className="mt-2 w-full bg-emotional/90 hover:bg-emotional text-white rounded-xl flex gap-2 items-center justify-center"><Plus className="w-4 h-4" /> Add Person</Button>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
} 