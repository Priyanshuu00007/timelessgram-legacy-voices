import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Select } from '../components/ui/select';

// Progress bar component (unchanged)
const ProgressBar = ({ step, total }: { step: number; total: number }) => (
  <div className="w-full flex flex-col items-center mb-8">
    <div className="flex items-center gap-2 mb-2">
      {[...Array(total)].map((_, i) => (
        <motion.div
          key={i}
          className={`h-2 rounded-full transition-all duration-500 ${i < step ? 'bg-gradient-to-r from-pink-300 via-yellow-200 to-blue-200' : 'bg-gray-200'} `}
          style={{ width: 40, opacity: i < step ? 1 : 0.5 }}
          initial={{ scale: 0.8 }}
          animate={{ scale: i < step ? 1.1 : 1 }}
        />
      ))}
    </div>
    <span className="text-xs text-gray-500 tracking-wide">Step {step} of {total}</span>
  </div>
);

// Personal Info + Verification Step
const PersonalInfoStep: React.FC<{ onNext: () => void }> = ({ onNext }) => {
  // For demo: local state for dynamic fields
  const [username, setUsername] = React.useState('');
  const [usernameError, setUsernameError] = React.useState('');
  const [emails, setEmails] = React.useState(['']);
  const [phones, setPhones] = React.useState(['']);
  const [whatsapps, setWhatsapps] = React.useState(['']);
  const [guardians, setGuardians] = React.useState([
    { name: '', phone: '', email: '', relationship: '' }
  ]);
  const [password, setPassword] = React.useState('');
  const [showPassword, setShowPassword] = React.useState(false);
  const [emailOTP, setEmailOTP] = React.useState('');
  const [phoneOTP, setPhoneOTP] = React.useState('');
  const [emailOTPSent, setEmailOTPSent] = React.useState(false);
  const [phoneOTPSent, setPhoneOTPSent] = React.useState(false);
  const [emailVerified, setEmailVerified] = React.useState(false);
  const [phoneVerified, setPhoneVerified] = React.useState(false);

  // Handlers for dynamic fields
  const addField = (arr: any[], setArr: any) => setArr([...arr, '']);
  const updateField = (arr: any[], setArr: any, idx: number, value: string) => {
    const copy = [...arr];
    copy[idx] = value;
    setArr(copy);
  };
  const addGuardian = () => setGuardians([...guardians, { name: '', phone: '', email: '', relationship: '' }]);
  const updateGuardian = (idx: number, key: string, value: string) => {
    const copy = [...guardians];
    copy[idx][key] = value;
    setGuardians(copy);
  };

  // Simulate uniqueness check (replace with real API call)
  const checkUsernameUnique = () => {
    if (username.trim().toLowerCase() === 'taken') {
      setUsernameError('This username is already taken.');
    } else {
      setUsernameError('');
    }
  };

  // Simulate OTP send/verify (replace with real API calls)
  const sendEmailOTP = () => setEmailOTPSent(true);
  const sendPhoneOTP = () => setPhoneOTPSent(true);
  const verifyEmailOTP = () => setEmailVerified(emailOTP === '123456');
  const verifyPhoneOTP = () => setPhoneVerified(phoneOTP === '123456');

  return (
    <motion.div
      className="min-h-screen w-full flex flex-col items-center justify-center bg-gradient-sepia px-2 py-4 sm:px-4 sm:py-12"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 40 }}
      transition={{ duration: 0.7 }}
    >
      <div className="w-full max-w-lg mx-auto flex flex-col items-center px-2 sm:px-0">
        <ProgressBar step={2} total={6} />
        <motion.h2
          className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-center text-emotional mb-2 drop-shadow-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          About You
        </motion.h2>
        <motion.p
          className="text-sm sm:text-md md:text-lg text-center text-muted-foreground mb-8 max-w-xl font-light"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.7 }}
        >
          This is your legacy. Tell us who you are, so your words can be delivered with love and trust.
        </motion.p>
        <motion.div
          className="w-full bg-card rounded-2xl shadow-xl p-6 mb-8 flex flex-col gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.7 }}
        >
          <div className="flex flex-col gap-4">
            {/* Username */}
            <div>
              <Label htmlFor="username" className="text-emotional font-medium">Username <span className="text-xs text-muted-foreground">(unique, for login)</span></Label>
              <div className="flex gap-2 items-center">
                <Input id="username" placeholder="e.g. priya123" className="mt-1" value={username} onChange={e => setUsername(e.target.value)} onBlur={checkUsernameUnique} />
                <Button variant="outline" type="button" onClick={checkUsernameUnique}>Check</Button>
              </div>
              {usernameError && <div className="text-xs text-destructive mt-1">{usernameError}</div>}
            </div>
            {/* Password */}
            <div>
              <Label htmlFor="password" className="text-emotional font-medium">Password</Label>
              <div className="flex gap-2 items-center">
                <Input id="password" type={showPassword ? 'text' : 'password'} placeholder="Create a password" className="mt-1" value={password} onChange={e => setPassword(e.target.value)} />
                <Button variant="outline" type="button" onClick={() => setShowPassword(v => !v)}>{showPassword ? 'Hide' : 'Show'}</Button>
              </div>
              <div className="text-xs text-muted-foreground mt-1">Password will be required for login. If you forget it, you can log in via OTP to your primary email or phone.</div>
            </div>
            {/* Primary Email with OTP */}
            <div>
              <Label className="text-emotional font-medium">Primary Email</Label>
              <div className="flex gap-2 items-center">
                <Input placeholder="e.g. priya@email.com" className="mt-1" value={emails[0]} onChange={e => updateField(emails, setEmails, 0, e.target.value)} />
                <Button variant="outline" type="button" disabled={emailVerified} onClick={sendEmailOTP}>{emailOTPSent ? (emailVerified ? 'Verified' : 'Resend OTP') : 'Send OTP'}</Button>
              </div>
              {emailOTPSent && !emailVerified && (
                <div className="flex gap-2 items-center mt-2">
                  <Input type="text" placeholder="Enter OTP" value={emailOTP} onChange={e => setEmailOTP(e.target.value)} className="w-32" maxLength={6} />
                  <Button variant="outline" type="button" onClick={verifyEmailOTP}>Verify</Button>
                  <span className="text-xs text-muted-foreground">(Try 123456)</span>
                </div>
              )}
              {emailVerified && <div className="text-xs text-green-600 mt-1">Email verified!</div>}
            </div>
            {/* Primary Phone with OTP */}
            <div>
              <Label className="text-emotional font-medium">Primary Phone</Label>
              <div className="flex gap-2 items-center">
                <Input placeholder="e.g. +91 9876543210" className="mt-1" value={phones[0]} onChange={e => updateField(phones, setPhones, 0, e.target.value)} />
                <Button variant="outline" type="button" disabled={phoneVerified} onClick={sendPhoneOTP}>{phoneOTPSent ? (phoneVerified ? 'Verified' : 'Resend OTP') : 'Send OTP'}</Button>
              </div>
              {phoneOTPSent && !phoneVerified && (
                <div className="flex gap-2 items-center mt-2">
                  <Input type="text" placeholder="Enter OTP" value={phoneOTP} onChange={e => setPhoneOTP(e.target.value)} className="w-32" maxLength={6} />
                  <Button variant="outline" type="button" onClick={verifyPhoneOTP}>Verify</Button>
                  <span className="text-xs text-muted-foreground">(Try 123456)</span>
                </div>
              )}
              {phoneVerified && <div className="text-xs text-green-600 mt-1">Phone verified!</div>}
            </div>
            <div>
              <Label htmlFor="name" className="text-emotional font-medium">Full Name</Label>
              <Input id="name" placeholder="e.g. Priya Sharma" className="mt-1" />
            </div>
            <div>
              <Label htmlFor="dob" className="text-emotional font-medium">Date of Birth</Label>
              <Input id="dob" type="date" className="mt-1" />
            </div>
            {/* Emails */}
            <div>
              <Label className="text-emotional font-medium">Email Address(es)</Label>
              {emails.map((email, i) => (
                <Input
                  key={i}
                  placeholder={i === 0 ? 'e.g. priya@email.com' : 'Add another email'}
                  className="mt-1 mb-2"
                  value={email}
                  onChange={e => updateField(emails, setEmails, i, e.target.value)}
                />
              ))}
              {emails.length < 3 && (
                <Button variant="outline" className="mt-1" onClick={() => addField(emails, setEmails)}>
                  + Add Email
                </Button>
              )}
            </div>
            {/* Phones */}
            <div>
              <Label className="text-emotional font-medium">Phone Number(s)</Label>
              {phones.map((phone, i) => (
                <Input
                  key={i}
                  placeholder={i === 0 ? 'e.g. +91 9876543210' : 'Add another phone'}
                  className="mt-1 mb-2"
                  value={phone}
                  onChange={e => updateField(phones, setPhones, i, e.target.value)}
                />
              ))}
              {phones.length < 3 && (
                <Button variant="outline" className="mt-1" onClick={() => addField(phones, setPhones)}>
                  + Add Phone
                </Button>
              )}
            </div>
            {/* WhatsApp */}
            <div>
              <Label className="text-emotional font-medium">WhatsApp Number(s)</Label>
              {whatsapps.map((wa, i) => (
                <Input
                  key={i}
                  placeholder={i === 0 ? 'e.g. +91 9876543210' : 'Add another WhatsApp'}
                  className="mt-1 mb-2"
                  value={wa}
                  onChange={e => updateField(whatsapps, setWhatsapps, i, e.target.value)}
                />
              ))}
              {whatsapps.length < 3 && (
                <Button variant="outline" className="mt-1" onClick={() => addField(whatsapps, setWhatsapps)}>
                  + Add WhatsApp
                </Button>
              )}
            </div>
          </div>
          {/* Guardians */}
          <div className="mt-6">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-emotional font-semibold">Your Guardians</span>
              <span className="text-xs text-muted-foreground">(Trusted contacts who will help us deliver your legacy)</span>
            </div>
            <p className="text-xs text-muted-foreground mb-2">Nominate 1–3 people you trust. Each must have a phone number (required) and optionally an email. They will help us confirm your passing and activate your legacy vault.</p>
            <div className="flex flex-col gap-4">
              {guardians.map((g, i) => (
                <div key={i} className="flex flex-col md:flex-row gap-2 md:gap-4 bg-emotional/10 rounded-xl p-3 shadow-sm border-accent">
                  <Input
                    placeholder="Guardian's Name"
                    className="mb-1 md:mb-0"
                    value={g.name}
                    onChange={e => updateGuardian(i, 'name', e.target.value)}
                  />
                  <Input
                    placeholder="Phone Number (required)"
                    className="mb-1 md:mb-0"
                    value={g.phone}
                    onChange={e => updateGuardian(i, 'phone', e.target.value)}
                    required
                  />
                  <Input
                    placeholder="Email (optional)"
                    className="mb-1 md:mb-0"
                    value={g.email}
                    onChange={e => updateGuardian(i, 'email', e.target.value)}
                  />
                  <Input
                    placeholder="Relationship (e.g. Sister, Friend)"
                    value={g.relationship}
                    onChange={e => updateGuardian(i, 'relationship', e.target.value)}
                  />
                </div>
              ))}
              {guardians.length < 3 && (
                <Button variant="outline" className="mt-2" onClick={addGuardian}>
                  + Add Guardian
                </Button>
              )}
            </div>
          </div>
        </motion.div>
        <Button
          className="text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 rounded-full bg-gradient-emotional text-white shadow-xl font-semibold tracking-wide hover:scale-105 transition-transform w-full sm:w-auto"
          onClick={onNext}
        >
          Continue
        </Button>
      </div>
    </motion.div>
  );
};

// Placeholders for other steps
const RecipientsStep: React.FC<{ onNext: () => void }> = ({ onNext }) => {
  const [recipients, setRecipients] = React.useState([
    { name: '', emails: [''], phones: [''] }
  ]);

  const addRecipient = () => setRecipients([...recipients, { name: '', emails: [''], phones: [''] }]);
  const updateRecipient = (idx: number, key: string, value: any) => {
    const copy = [...recipients];
    copy[idx][key] = value;
    setRecipients(copy);
  };
  const updateRecipientField = (idx: number, field: 'emails' | 'phones', arrIdx: number, value: string) => {
    const copy = [...recipients];
    copy[idx][field][arrIdx] = value;
    setRecipients(copy);
  };
  const addRecipientField = (idx: number, field: 'emails' | 'phones') => {
    const copy = [...recipients];
    copy[idx][field].push('');
    setRecipients(copy);
  };
  const removeRecipientField = (idx: number, field: 'emails' | 'phones', arrIdx: number) => {
    const copy = [...recipients];
    if (copy[idx][field].length === 1) return;
    copy[idx][field].splice(arrIdx, 1);
    setRecipients(copy);
  };
  const removeRecipient = (idx: number) => {
    if (recipients.length === 1) return;
    setRecipients(recipients.filter((_, i) => i !== idx));
  };

  return (
    <motion.div
      className="min-h-screen w-full flex flex-col items-center justify-center bg-gradient-sepia px-2 py-4 sm:px-4 sm:py-12"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 40 }}
      transition={{ duration: 0.7 }}
    >
      <div className="w-full max-w-lg mx-auto flex flex-col items-center px-2 sm:px-0">
        <ProgressBar step={3} total={6} />
        <motion.h2
          className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-center text-emotional mb-2 drop-shadow-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          Who Are You Leaving Messages For?
        </motion.h2>
        <motion.p
          className="text-sm sm:text-md md:text-lg text-center text-muted-foreground mb-8 max-w-xl font-light"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.7 }}
        >
          Add the people who will receive your words, memories, and love. Each recipient will have a special place in your legacy.
        </motion.p>
        <motion.div
          className="w-full flex flex-col gap-6 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.7 }}
        >
          <AnimatePresence>
            {recipients.map((r, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.5 }}
                className="flex items-center gap-4 bg-card rounded-2xl shadow-lg p-4 relative"
              >
                {/* Avatar/Initials */}
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-200 to-pink-200 flex items-center justify-center text-2xl font-bold text-emotional shadow-md">
                  {r.name ? r.name.split(' ').map(n => n[0]).join('').toUpperCase() : `P${i+1}`}
                </div>
                <div className="flex-1">
                  <Label className="text-emotional font-medium">Name</Label>
                  <Input
                    placeholder="e.g. My Daughter, Rahul, Mom"
                    className="mt-1 mb-2"
                    value={r.name}
                    onChange={e => updateRecipient(i, 'name', e.target.value)}
                  />
                  <Label className="text-emotional font-medium">Email Address(es)</Label>
                  {r.emails.map((email, eIdx) => (
                    <div key={eIdx} className="flex gap-2 mb-2">
                      <Input
                        placeholder={eIdx === 0 ? 'e.g. rahul@email.com' : 'Add another email'}
                        className="mt-1"
                        value={email}
                        onChange={e => updateRecipientField(i, 'emails', eIdx, e.target.value)}
                      />
                      {r.emails.length > 1 && (
                        <Button variant="destructive" size="sm" onClick={() => removeRecipientField(i, 'emails', eIdx)}>-</Button>
                      )}
                    </div>
                  ))}
                  {r.emails.length < 3 && (
                    <Button variant="outline" size="sm" className="mb-2" onClick={() => addRecipientField(i, 'emails')}>
                      + Add Email
                    </Button>
                  )}
                  <Label className="text-emotional font-medium">Phone Number(s)</Label>
                  {r.phones.map((phone, pIdx) => (
                    <div key={pIdx} className="flex gap-2 mb-2">
                      <Input
                        placeholder={pIdx === 0 ? 'e.g. +91 9876543210' : 'Add another phone'}
                        className="mt-1"
                        value={phone}
                        onChange={e => updateRecipientField(i, 'phones', pIdx, e.target.value)}
                      />
                      {r.phones.length > 1 && (
                        <Button variant="destructive" size="sm" onClick={() => removeRecipientField(i, 'phones', pIdx)}>-</Button>
                      )}
                    </div>
                  ))}
                  {r.phones.length < 3 && (
                    <Button variant="outline" size="sm" className="mb-2" onClick={() => addRecipientField(i, 'phones')}>
                      + Add Phone
                    </Button>
                  )}
                  <div className="text-xs text-muted-foreground mt-1">Nickname: Person {i+1}</div>
                </div>
                {recipients.length > 1 && (
                  <Button variant="destructive" className="ml-2" onClick={() => removeRecipient(i)}>
                    Remove
                  </Button>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
          {recipients.length < 10 && (
            <Button variant="outline" className="w-full" onClick={addRecipient}>
              + Add Recipient
            </Button>
          )}
        </motion.div>
        <Button
          className="text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 rounded-full bg-gradient-emotional text-white shadow-xl font-semibold tracking-wide hover:scale-105 transition-transform w-full sm:w-auto"
          onClick={onNext}
        >
          Continue
        </Button>
      </div>
    </motion.div>
  );
};

const VAULT_COLORS = [
  { name: 'Serene Blue', color: 'from-blue-200 to-blue-400', icon: '💙' },
  { name: 'Warm Sunset', color: 'from-pink-200 to-yellow-200', icon: '🌅' },
  { name: 'Starry Night', color: 'from-blue-900 to-indigo-400', icon: '🌌' },
  { name: 'Soft Gold', color: 'from-yellow-200 to-yellow-400', icon: '🌟' },
  { name: 'Gentle Green', color: 'from-green-200 to-green-400', icon: '🌿' },
];

const VaultsStep: React.FC<{ onNext: () => void }> = ({ onNext }) => {
  // The first vault is always 'After You' and cannot be removed or renamed
  const [vaults, setVaults] = React.useState([
    { name: 'After You', colorIdx: 3, fixed: true }, // Soft Gold, fixed
    { name: '', colorIdx: 0, fixed: false }
  ]);

  const addVault = () => setVaults([...vaults, { name: '', colorIdx: 0, fixed: false }]);
  const updateVault = (idx: number, key: string, value: any) => {
    if (vaults[idx].fixed && key === 'name') return; // Prevent renaming 'After You'
    const copy = [...vaults];
    copy[idx][key] = value;
    setVaults(copy);
  };
  const removeVault = (idx: number) => {
    if (vaults[idx].fixed) return; // Prevent removing 'After You'
    if (vaults.length === 2) return; // Always keep at least 'After You'
    setVaults(vaults.filter((_, i) => i !== idx));
  };

  return (
    <motion.div
      className="min-h-screen w-full flex flex-col items-center justify-center bg-gradient-sepia px-2 py-4 sm:px-4 sm:py-12"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 40 }}
      transition={{ duration: 0.7 }}
    >
      <div className="w-full max-w-lg mx-auto flex flex-col items-center px-2 sm:px-0">
        <ProgressBar step={4} total={6} />
        <motion.h2
          className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-center text-emotional mb-2 drop-shadow-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          Organize Your Legacy
        </motion.h2>
        <motion.p
          className="text-sm sm:text-md md:text-lg text-center text-muted-foreground mb-8 max-w-xl font-light"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.7 }}
        >
          Create vaults or folders for your messages. Each vault can hold memories for a special theme, occasion, or person.
        </motion.p>
        <motion.div
          className="w-full flex flex-col gap-6 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.7 }}
        >
          <AnimatePresence>
            {vaults.map((v, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.5 }}
                className={`flex items-center gap-4 bg-card rounded-2xl shadow-lg p-4 relative border-l-8 ${VAULT_COLORS[v.colorIdx].color}`}
                style={{ borderImage: 'linear-gradient(to bottom right, #a7c7e7, #fbc2eb) 1' }}
              >
                {/* Icon/Color */}
                <div className={`w-12 h-12 rounded-full flex items-center justify-center text-2xl font-bold shadow-md bg-gradient-to-br ${VAULT_COLORS[v.colorIdx].color}`}>
                  {VAULT_COLORS[v.colorIdx].icon}
                </div>
                <div className="flex-1">
                  <Label className="text-emotional font-medium">Vault Name</Label>
                  <Input
                    placeholder="e.g. Birthday Wishes, Life Advice"
                    className="mt-1 mb-2"
                    value={v.name}
                    onChange={e => updateVault(i, 'name', e.target.value)}
                    disabled={v.fixed}
                  />
                  {v.fixed && (
                    <div className="text-xs text-muted-foreground mt-1">This vault is required. Messages here will be delivered <b>1 year after your passing</b>.</div>
                  )}
                  <Label className="text-emotional font-medium">Mood/Color</Label>
                  <div className="flex gap-2 mt-1">
                    {VAULT_COLORS.map((c, cidx) => (
                      <button
                        key={cidx}
                        className={`w-7 h-7 rounded-full border-2 ${v.colorIdx === cidx ? 'border-accent' : 'border-transparent'} bg-gradient-to-br ${c.color}`}
                        aria-label={c.name}
                        onClick={() => updateVault(i, 'colorIdx', cidx)}
                        type="button"
                        disabled={v.fixed}
                      >
                        <span className="sr-only">{c.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
                <Button variant="outline" className="ml-2" disabled>
                  + Add Message
                </Button>
                {!v.fixed && vaults.length > 2 && (
                  <Button variant="destructive" className="ml-2" onClick={() => removeVault(i)}>
                    Remove
                  </Button>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
          {vaults.length < 10 && (
            <Button variant="outline" className="w-full" onClick={addVault}>
              + Add Vault
            </Button>
          )}
        </motion.div>
        <Button
          className="text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 rounded-full bg-gradient-emotional text-white shadow-xl font-semibold tracking-wide hover:scale-105 transition-transform w-full sm:w-auto"
          onClick={onNext}
        >
          Continue
        </Button>
      </div>
    </motion.div>
  );
};

// Remove 'Scheduled' from MESSAGE_TYPES
const MESSAGE_TYPES = [
  { label: 'Letter', icon: '✍️' },
  { label: 'Audio', icon: '🎤' },
  { label: 'Video', icon: '📹' }
];

const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];
const YEARS = Array.from({ length: 11 }, (_, i) => i); // 0-10 years after passing
const DAYS = Array.from({ length: 31 }, (_, i) => i + 1);

const MessagesStep: React.FC<{ onNext: () => void }> = ({ onNext }) => {
  // Placeholder vaults and recipients for demo
  const [vaults] = React.useState([
    { name: 'After You', colorIdx: 3, fixed: true },
    { name: 'Life Advice', colorIdx: 1, fixed: false },
  ]);
  const [recipients] = React.useState([
    { name: 'Rahul', contact: 'rahul@email.com' },
    { name: 'Mom', contact: '+91 9876543210' },
  ]);
  // Add files field to each message
  const [messages, setMessages] = React.useState([
    [
      { title: '', recipientIdx: 0, type: 0, year: 1, month: 0, day: 1, date: '', note: '', files: [] }
    ],
    [
      { title: '', recipientIdx: 1, type: 0, year: 0, month: 0, day: 1, date: '', note: '', files: [] }
    ]
  ]);

  const addMessage = (vaultIdx: number) => {
    const copy = [...messages];
    copy[vaultIdx].push({ title: '', recipientIdx: 0, type: 0, year: 0, month: 0, day: 1, date: '', note: '', files: [] });
    setMessages(copy);
  };
  const updateMessage = (vaultIdx: number, msgIdx: number, key: string, value: any) => {
    const copy = [...messages];
    copy[vaultIdx][msgIdx][key] = value;
    setMessages(copy);
  };
  const handleFileUpload = (vaultIdx: number, msgIdx: number, files: FileList | null) => {
    if (!files) return;
    const copy = [...messages];
    const arr = Array.from(files);
    copy[vaultIdx][msgIdx].files = [...(copy[vaultIdx][msgIdx].files || []), ...arr];
    setMessages(copy);
  };
  const removeFile = (vaultIdx: number, msgIdx: number, fileIdx: number) => {
    const copy = [...messages];
    copy[vaultIdx][msgIdx].files.splice(fileIdx, 1);
    setMessages(copy);
  };
  const removeMessage = (vaultIdx: number, msgIdx: number) => {
    const copy = [...messages];
    if (copy[vaultIdx].length === 1) return;
    copy[vaultIdx].splice(msgIdx, 1);
    setMessages(copy);
  };

  return (
    <motion.div
      className="min-h-screen w-full flex flex-col items-center justify-center bg-gradient-sepia px-2 py-4 sm:px-4 sm:py-12"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 40 }}
      transition={{ duration: 0.7 }}
    >
      <div className="w-full max-w-2xl mx-auto flex flex-col items-center px-1 sm:px-0">
        <ProgressBar step={5} total={6} />
        <motion.h2
          className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-center text-emotional mb-2 drop-shadow-lg break-words"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          Add Your Messages
        </motion.h2>
        <motion.p
          className="text-sm sm:text-md md:text-lg text-center text-muted-foreground mb-8 max-w-xl font-light"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.7 }}
        >
          Create heartfelt letters, audio, or video messages for your loved ones. Each message will be delivered at the perfect moment.
        </motion.p>
        <div className="w-full flex flex-col gap-8 mb-8 overflow-x-auto">
          {vaults.map((vault, vIdx) => (
            <motion.div
              key={vIdx}
              className="bg-card rounded-2xl shadow-xl p-3 sm:p-6 flex flex-col gap-y-4 min-w-0"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 * vIdx, duration: 0.7 }}
            >
              <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-3 mb-2 sm:mb-4 w-full">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-2xl font-bold shadow-md bg-gradient-to-br ${VAULT_COLORS[vault.colorIdx].color}`}>
                  {VAULT_COLORS[vault.colorIdx].icon}
                </div>
                <div className="font-semibold text-emotional text-lg break-words w-full">{vault.name}</div>
                <Button variant="outline" className="ml-auto w-full sm:w-auto" onClick={() => addMessage(vIdx)}>
                  + Add Message
                </Button>
              </div>
              <div className="flex flex-col gap-4 w-full">
                <AnimatePresence>
                  {messages[vIdx].map((msg, mIdx) => (
                    <motion.div
                      key={mIdx}
                      initial={{ opacity: 0, x: 40 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -40 }}
                      transition={{ duration: 0.5 }}
                      className="bg-emotional/10 rounded-xl p-3 sm:p-4 shadow flex flex-col gap-2 relative min-w-0"
                    >
                      <div className="flex flex-col sm:flex-row items-center gap-2 mb-2 w-full">
                        <span className="text-2xl">{MESSAGE_TYPES[msg.type].icon}</span>
                        <span className="font-medium text-emotional break-words w-full">{MESSAGE_TYPES[msg.type].label}</span>
                        {messages[vIdx].length > 1 && (
                          <Button variant="destructive" className="ml-auto w-full sm:w-auto" onClick={() => removeMessage(vIdx, mIdx)}>
                            Remove
                          </Button>
                        )}
                      </div>
                      <Label className="text-emotional font-medium">Title</Label>
                      <Input
                        placeholder="e.g. For your 18th birthday"
                        className="mb-1 w-full"
                        value={msg.title}
                        onChange={e => updateMessage(vIdx, mIdx, 'title', e.target.value)}
                      />
                      <Label className="text-emotional font-medium">Recipient</Label>
                      <select
                        className="mb-1 rounded-lg border border-accent px-2 py-1 w-full"
                        value={msg.recipientIdx}
                        onChange={e => updateMessage(vIdx, mIdx, 'recipientIdx', Number(e.target.value))}
                      >
                        {recipients.map((r, ridx) => (
                          <option key={ridx} value={ridx}>{r.name || `Person ${ridx+1}`}</option>
                        ))}
                      </select>
                      <Label className="text-emotional font-medium">Type</Label>
                      <div className="flex flex-col sm:flex-row gap-2 mb-1 w-full">
                        {MESSAGE_TYPES.map((t, tidx) => (
                          <button
                            key={tidx}
                            className={`px-3 py-1 rounded-full border-2 flex items-center gap-1 text-emotional font-semibold ${msg.type === tidx ? 'border-accent bg-accent/10' : 'border-transparent bg-white/60'} w-full sm:w-auto`}
                            onClick={() => updateMessage(vIdx, mIdx, 'type', tidx)}
                            type="button"
                          >
                            <span>{t.icon}</span> {t.label}
                          </button>
                        ))}
                      </div>
                      <Label className="text-emotional font-medium">Upload {MESSAGE_TYPES[msg.type].label} File(s)</Label>
                      <input
                        type="file"
                        multiple
                        accept={
                          msg.type === 0 ? '.txt,.pdf,.doc,.docx' :
                          msg.type === 1 ? 'audio/*' :
                          msg.type === 2 ? 'video/*' : '*/*'
                        }
                        className="mb-2 w-full"
                        onChange={e => handleFileUpload(vIdx, mIdx, e.target.files)}
                      />
                      {msg.files && msg.files.length > 0 && (
                        <div className="flex flex-col gap-1 mb-2 overflow-x-auto w-full">
                          {msg.files.map((file, fIdx) => (
                            <div key={fIdx} className="flex items-center gap-2 text-xs bg-white/60 rounded px-2 py-1 w-full">
                              <span className="truncate max-w-[120px] sm:max-w-[180px]">{file.name}</span>
                              <Button variant="destructive" size="sm" onClick={() => removeFile(vIdx, mIdx, fIdx)}>-</Button>
                            </div>
                          ))}
                        </div>
                      )}
                      <Label className="text-emotional font-medium">Occasion/Date</Label>
                      {vault.fixed ? (
                        <div className="mb-1 text-muted-foreground italic">1 year after confirmation of your passing (default)</div>
                      ) : (
                        <div className="flex flex-wrap gap-2 items-center mb-1 w-full">
                          <span className="text-xs text-muted-foreground">Deliver this message:</span>
                          <select
                            className="rounded-lg border border-accent px-2 py-1"
                            value={msg.year}
                            onChange={e => updateMessage(vIdx, mIdx, 'year', Number(e.target.value))}
                          >
                            {YEARS.map(y => (
                              <option key={y} value={y}>{y === 0 ? 'Same year' : `${y} year${y > 1 ? 's' : ''}`}</option>
                            ))}
                          </select>
                          <span className="text-xs text-muted-foreground">after my passing, on</span>
                          <select
                            className="rounded-lg border border-accent px-2 py-1"
                            value={msg.month}
                            onChange={e => updateMessage(vIdx, mIdx, 'month', Number(e.target.value))}
                          >
                            {MONTHS.map((m, idx) => (
                              <option key={m} value={idx}>{m}</option>
                            ))}
                          </select>
                          <select
                            className="rounded-lg border border-accent px-2 py-1"
                            value={msg.day}
                            onChange={e => updateMessage(vIdx, mIdx, 'day', Number(e.target.value))}
                          >
                            {DAYS.map(d => (
                              <option key={d} value={d}>{d}</option>
                            ))}
                          </select>
                        </div>
                      )}
                      <Input
                        placeholder="Or describe the occasion (optional)"
                        className="mb-1 w-full"
                        value={msg.date}
                        onChange={e => updateMessage(vIdx, mIdx, 'date', e.target.value)}
                        disabled={vault.fixed}
                      />
                      <Label className="text-emotional font-medium">Why I recorded this / My wishes for you</Label>
                      <textarea
                        className="rounded-lg border border-accent px-2 py-1 min-h-[60px] w-full"
                        placeholder="Share your heart..."
                        value={msg.note}
                        onChange={e => updateMessage(vIdx, mIdx, 'note', e.target.value)}
                      />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </motion.div>
          ))}
        </div>
        <Button
          className="text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 rounded-full bg-gradient-emotional text-white shadow-xl font-semibold tracking-wide hover:scale-105 transition-transform w-full sm:w-auto"
          onClick={onNext}
        >
          Continue
        </Button>
      </div>
    </motion.div>
  );
};

const PreviewStep: React.FC<{ onNext: () => void }> = ({ onNext }) => {
  // Placeholder vaults/messages/recipients for demo
  const vaults = [
    { name: 'Birthday Wishes', colorIdx: 0 },
    { name: 'Life Advice', colorIdx: 1 },
  ];
  const recipients = [
    { name: 'Rahul', contact: 'rahul@email.com' },
    { name: 'Mom', contact: '+91 9876543210' },
  ];
  const messages = [
    [
      { title: 'For your 18th birthday', recipientIdx: 0, type: 0, date: 'On your 18th birthday', note: 'I want you to know how proud I am.' }
    ],
    [
      { title: 'Advice for life', recipientIdx: 1, type: 1, date: 'Whenever you need it', note: 'Always trust yourself.' }
    ]
  ];
  const [showConfirm, setShowConfirm] = React.useState(false);

  return (
    <motion.div
      className="min-h-screen w-full flex flex-col items-center justify-center bg-gradient-sepia px-2 py-4 sm:px-4 sm:py-12"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 40 }}
      transition={{ duration: 0.7 }}
    >
      <div className="w-full max-w-2xl mx-auto flex flex-col items-center px-2 sm:px-0">
        <ProgressBar step={6} total={6} />
        <motion.h2
          className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-center text-emotional mb-2 drop-shadow-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          Preview Your Legacy
        </motion.h2>
        <motion.p
          className="text-sm sm:text-md md:text-lg text-center text-muted-foreground mb-8 max-w-xl font-light"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.7 }}
        >
          Here’s a glimpse of the memories and messages you’ll leave behind. You can always return to edit or add more.
        </motion.p>
        {/* Timeline Preview */}
        <div className="w-full flex flex-col gap-8 mb-8 overflow-x-auto">
          {vaults.map((vault, vIdx) => (
            <motion.div
              key={vIdx}
              className="relative pl-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 * vIdx, duration: 0.7 }}
            >
              {/* Vault icon and name */}
              <div className="absolute left-0 top-2 w-8 h-8 rounded-full flex items-center justify-center text-2xl font-bold shadow-md bg-gradient-to-br from-white to-blue-100 border-2 border-accent">
                {VAULT_COLORS[vault.colorIdx].icon}
              </div>
              <div className="font-semibold text-emotional text-lg mb-2">{vault.name}</div>
              <div className="flex flex-col gap-4 border-l-2 border-accent pl-6 overflow-x-auto">
                {messages[vIdx].map((msg, mIdx) => (
                  <div key={mIdx} className="relative">
                    <div className="absolute -left-7 top-2 w-4 h-4 rounded-full bg-blue-300 border-2 border-white"></div>
                    <div className="bg-white/80 rounded-xl shadow p-4 flex flex-col gap-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xl">{MESSAGE_TYPES[msg.type].icon}</span>
                        <span className="font-medium text-emotional">{msg.title}</span>
                      </div>
                      <div className="text-muted-foreground text-sm">To: {recipients[msg.recipientIdx]?.name || `Person ${msg.recipientIdx+1}`}</div>
                      <div className="text-muted-foreground text-xs">{msg.date}</div>
                      <div className="text-emotional text-sm mt-1 italic">{msg.note}</div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
        <Button
          className="text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 rounded-full bg-gradient-emotional text-white shadow-xl font-semibold tracking-wide hover:scale-105 transition-transform w-full sm:w-auto"
          onClick={() => setShowConfirm(true)}
        >
          Save My Legacy
        </Button>
        {/* Confirmation Modal */}
        {showConfirm && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-2xl shadow-2xl p-8 max-w-md mx-auto flex flex-col items-center"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
            >
              <div className="text-3xl mb-4">🔒</div>
              <div className="font-serif text-2xl font-bold text-emotional mb-2 text-center">Your words are now timeless.</div>
              <div className="text-muted-foreground text-center mb-6">They will be delivered with love, when the world is ready. You can return anytime to add or edit your legacy.</div>
              <Button className="w-full" onClick={() => setShowConfirm(false)}>
                Close
              </Button>
            </motion.div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

const SaveStep = () => <div />;

const WelcomeStep: React.FC<{ onNext: () => void }> = ({ onNext }) => (
  <div className="min-h-screen w-full flex flex-col items-center justify-center bg-gradient-sepia px-2 py-8 sm:px-4 sm:py-12">
    <div className="w-full max-w-lg mx-auto flex flex-col items-center px-2 sm:px-0">
      <ProgressBar step={1} total={6} />
      <motion.h1
        className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-center text-emotional mb-4 sm:mb-6 drop-shadow-lg break-words"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        Let your voice echo beyond time.
      </motion.h1>
      <motion.p
        className="text-base sm:text-lg md:text-xl text-center text-muted-foreground mb-8 max-w-xl font-light"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 1 }}
      >
        This is your space to leave messages, memories, and love for those who matter most. Your words will become a legacy, delivered with care when the time is right. Take your time, and let your heart guide you.
      </motion.p>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.2, duration: 0.7, type: 'spring', stiffness: 120 }}
      >
        <Button
          className="text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 rounded-full bg-gradient-emotional text-white shadow-xl font-semibold tracking-wide hover:scale-105 transition-transform w-full sm:w-auto"
          style={{ fontFamily: 'Inter, sans-serif', boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.18)' }}
          onClick={onNext}
        >
          Begin My Legacy
        </Button>
      </motion.div>
    </div>
  </div>
);

const CreateLegacy: React.FC = () => {
  const [step, setStep] = React.useState(0);

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      <AnimatePresence mode="wait">
        {step === 0 && <WelcomeStep onNext={() => setStep(1)} key="welcome" />}
        {step === 1 && <PersonalInfoStep onNext={() => setStep(2)} key="personal" />}
        {step === 2 && <RecipientsStep onNext={() => setStep(3)} key="recipients" />}
        {step === 3 && <VaultsStep onNext={() => setStep(4)} key="vaults" />}
        {step === 4 && <MessagesStep onNext={() => setStep(5)} key="messages" />}
        {step === 5 && <PreviewStep onNext={() => setStep(6)} key="preview" />}
        {step === 6 && <SaveStep key="save" />}
      </AnimatePresence>
    </div>
  );
};

export default CreateLegacy; 