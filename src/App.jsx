import React, { useState } from 'react';
import { ShieldCheck, RefreshCw, AlertCircle, CheckCircle2, ChevronRight, Clock, Info, CheckCircle, ChevronDown, ChevronUp, AlertTriangle } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// --- MOCK DATA ---
const REFUND_SLA_STEPS = [
  { id: 1, label: "Request received", day: 1 },
  { id: 2, label: "Under review", day: 4 },
  { id: 3, label: "Refund approved, processing", day: 8 },
  { id: 4, label: "Completed", day: 10 }
];

const MOCK_SESSIONS = [
  { id: 11, label: "Session 11", scheduled: 45, actual: 45, date: "Oct 12" },
  { id: 12, label: "Session 12", scheduled: 45, actual: 45, date: "Oct 14" },
  { 
    id: 13, 
    label: "Session 13", 
    scheduled: 45, 
    actual: 28, 
    date: "Oct 16", 
    gap: { start: "4:15pm", end: "4:28pm", min: 13 }, 
    earlyEnd: "4:28pm", 
    startTime: "4:00pm" 
  },
];

const TABS = [
  { id: 'payment', label: 'Payment & Refund Clarity' },
  { id: 'session', label: 'Session Delivery Log' }
];

export default function App() {
  const [activeTab, setActiveTab] = useState('payment');
  const [isAfter, setIsAfter] = useState(false);

  return (
    <div className="min-h-screen bg-bhanzu-gray pb-12">

      <header className="bg-white border-b border-gray-200 sticky top-0 z-10 shadow-sm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-bhanzu-orange rounded-lg flex items-center justify-center text-white font-bold text-lg">B</div>
              <span className="font-bold text-xl text-bhanzu-navy">Bhanzu Trust Layer</span>
            </div>
            
            <div className="flex items-center gap-2 bg-gray-100 p-1 rounded-lg">
              <button
                onClick={() => setIsAfter(false)}
                className={cn(
                  "px-4 py-1.5 rounded-md text-sm font-medium transition-colors",
                  !isAfter ? "bg-white text-bhanzu-navy shadow" : "text-gray-500 hover:text-gray-900"
                )}
              >
                Before
              </button>
              <button
                onClick={() => setIsAfter(true)}
                className={cn(
                  "px-4 py-1.5 rounded-md text-sm font-medium transition-colors",
                  isAfter ? "bg-bhanzu-orange text-white shadow" : "text-gray-500 hover:text-gray-900"
                )}
              >
                After
              </button>
            </div>
          </div>
          
          <div className="flex gap-8 border-t border-gray-100 pt-1">
            {TABS.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "py-4 text-sm font-semibold transition-colors border-b-2",
                  activeTab === tab.id 
                    ? "border-bhanzu-orange text-bhanzu-orange" 
                    : "border-transparent text-gray-500 hover:text-gray-700"
                )}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 transition-all duration-300">
        {activeTab === 'payment' ? (
          <PaymentTab isAfter={isAfter} />
        ) : (
          <SessionTab isAfter={isAfter} />
        )}
      </main>
    </div>
  );
}

// --- TAB 1: PAYMENT & REFUND CLARITY ---
function PaymentTab({ isAfter }) {
  const [refundStatus, setRefundStatus] = useState('idle'); // idle, requested, processing
  const [simulatedDay, setSimulatedDay] = useState(0);

  const handleSimulateDays = () => {
    if (simulatedDay < 10) {
      setSimulatedDay(prev => prev + 3);
    } else {
      setSimulatedDay(10);
    }
  };

  const activeStep = REFUND_SLA_STEPS.slice().reverse().find(step => simulatedDay >= step.day) || { id: 0 };

  return (
    <div className="flex flex-col gap-8 animate-in fade-in duration-300">
      <div className="text-center space-y-2 mb-4">
        <h2 className="text-2xl font-bold text-bhanzu-navy">
          {isAfter ? "Flexible Commitment & Guaranteed SLA" : "Standard Enrollment Flow"}
        </h2>
        <p className="text-gray-500">
          {isAfter 
            ? "Tiered options reduce friction; clear SLAs build trust during offboarding." 
            : "High upfront commitment with opaque exit policies creates friction."}
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 items-start">
        {/* Left Col: Enrollment */}
        <div className="space-y-6">
          <h3 className="font-semibold text-lg text-bhanzu-navy">1. Enrollment Options</h3>
          
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden relative">
            {!isAfter ? (
              <div className="p-6 space-y-6">
                <div className="text-center space-y-1">
                  <h4 className="text-xl font-bold text-gray-900">Full Math Program</h4>
                  <p className="text-sm text-gray-500">12 months commitment</p>
                </div>
                <div className="text-center">
                  <span className="text-4xl font-extrabold text-gray-900">$3,000</span>
                </div>
                <ul className="space-y-3 text-sm text-gray-600">
                  <li className="flex gap-2"><CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" /> Full curriculum access</li>
                  <li className="flex gap-2"><CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" /> 1-on-1 tutoring</li>
                  <li className="flex gap-2"><CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" /> Progress reports</li>
                </ul>
                <button className="w-full py-3 bg-bhanzu-navy text-white rounded-xl font-semibold hover:bg-bhanzu-navy-light transition">
                  Pay Upfront
                </button>
              </div>
            ) : (
              <div className="flex flex-col">
                <div className="p-6 border-b border-gray-100 bg-orange-50/50 relative overflow-hidden">
                  <div className="absolute top-0 right-0 bg-bhanzu-orange text-white text-[10px] font-bold px-3 py-1 rounded-bl-lg uppercase tracking-wider">
                    Recommended Entry
                  </div>
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-xl font-bold text-bhanzu-orange">Starter Tier</h4>
                      <p className="text-sm text-gray-600">4-6 weeks pilot program</p>
                    </div>
                    <div>
                      <span className="text-3xl font-extrabold text-gray-900">$400</span>
                    </div>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" /> Full feature access</li>
                      <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" /> Assess child's engagement</li>
                    </ul>
                    <button className="w-full py-2.5 bg-bhanzu-orange hover:bg-bhanzu-orange-hover text-white rounded-xl font-semibold transition shadow-sm">
                      Start with $400
                    </button>
                  </div>
                </div>
                
                <div className="p-6 opacity-75 hover:opacity-100 transition">
                  <div className="flex justify-between items-center mb-2">
                    <div>
                      <h4 className="font-bold text-gray-900">Full Program</h4>
                      <p className="text-xs text-gray-500">12 months (Unlocks after starter)</p>
                    </div>
                    <div className="text-xl font-bold text-gray-900">$3,000</div>
                  </div>
                  <button disabled className="w-full py-2.5 bg-gray-100 text-gray-400 rounded-xl font-semibold cursor-not-allowed">
                    Pay Upfront (Locked)
                  </button>
                </div>
              </div>
            )}
          </div>
          
          {isAfter && (
            <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-4 flex gap-3 text-emerald-800 text-sm">
              <ShieldCheck className="w-5 h-5 shrink-0 text-emerald-600" />
              <div>
                <strong>Refund Policy SLA</strong>
                <p className="mt-1 opacity-90">Refund requests processed within 10 business days. No hidden fees.</p>
              </div>
            </div>
          )}
        </div>

        {/* Right Col: Refund Simulation */}
        <div className="space-y-6">
          <h3 className="font-semibold text-lg text-bhanzu-navy">2. Offboarding Experience</h3>
          
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-bold text-gray-900">Manage Subscription</h4>
                <p className="text-sm text-gray-500">Active since Oct 1, 2023</p>
              </div>
              {refundStatus === 'idle' && (
                <button 
                  onClick={() => {
                    setRefundStatus('requested');
                    setSimulatedDay(1);
                  }}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50 transition"
                >
                  Request Refund
                </button>
              )}
            </div>

            {refundStatus !== 'idle' && (
              <div className="border-t border-gray-100 pt-6 animate-in slide-in-from-top-2">
                {!isAfter ? (
                  <div className="space-y-4 text-center py-4">
                    <RefreshCw className="w-10 h-10 text-amber-500 mx-auto animate-spin-slow" />
                    <div>
                      <p className="font-semibold text-gray-900">Forwarded to appropriate team</p>
                      <p className="text-sm text-gray-500 mt-1">We will get back to you soon.</p>
                    </div>
                    
                    <button className="mt-4 px-4 py-2 bg-gray-100 text-gray-600 rounded-lg text-sm w-full font-medium">
                      Simulate 30 days passing
                    </button>
                    <p className="text-xs text-gray-400 italic">Status remains unchanged</p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <div className="relative">
                      {/* Vertical line */}
                      <div className="absolute left-3.5 top-2 bottom-2 w-0.5 bg-gray-100"></div>
                      
                      <div className="space-y-6 relative">
                        {REFUND_SLA_STEPS.map((step, idx) => {
                          const isActive = activeStep.id >= step.id;
                          const isCurrent = activeStep.id === step.id;
                          
                          return (
                            <div key={step.id} className={cn("flex gap-4", !isActive && "opacity-40")}>
                              <div className="relative z-10 flex flex-col items-center">
                                <div className={cn(
                                  "w-7 h-7 rounded-full flex items-center justify-center border-2 bg-white",
                                  isActive ? "border-emerald-500" : "border-gray-300",
                                  isCurrent && "ring-4 ring-emerald-50"
                                )}>
                                  {isActive ? (
                                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                                  ) : (
                                    <div className="w-2 h-2 rounded-full bg-gray-300" />
                                  )}
                                </div>
                              </div>
                              <div className="pt-0.5">
                                <p className={cn("font-medium text-sm", isActive ? "text-gray-900" : "text-gray-500")}>
                                  {step.label}
                                </p>
                                {isActive && (
                                  <p className="text-xs text-gray-500 mt-0.5">Day {step.day} • Timestamped</p>
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                    
                    <div className="bg-gray-50 rounded-xl p-4 flex flex-col items-center justify-center gap-3">
                      <p className="text-sm font-medium text-gray-600">Current Simulation: Day {simulatedDay}</p>
                      <button 
                        onClick={handleSimulateDays}
                        disabled={simulatedDay >= 10}
                        className="w-full py-2 bg-bhanzu-navy text-white rounded-lg text-sm font-medium hover:bg-bhanzu-navy-light disabled:opacity-50 disabled:cursor-not-allowed transition"
                      >
                        Simulate days passing
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}


// --- TAB 2: SESSION DELIVERY LOG ---
function SessionTab({ isAfter }) {
  const [complaintSubmitted, setComplaintSubmitted] = useState(false);
  const [expandedSession, setExpandedSession] = useState(null);

  const toggleExpand = (id) => {
    if (expandedSession === id) setExpandedSession(null);
    else setExpandedSession(id);
  };

  return (
    <div className="animate-in fade-in duration-300 max-w-sm mx-auto">
      <div className="text-center space-y-2 mb-6">
        <h2 className="text-2xl font-bold text-bhanzu-navy">
          {isAfter ? "Automated Delivery Intel" : "Manual Parent Tracking"}
        </h2>
      </div>

      {/* Mobile Phone Frame */}
      <div className="bg-gray-900 rounded-[2.5rem] p-3 shadow-2xl relative overflow-hidden">
        {/* Notch */}
        <div className="absolute top-0 inset-x-0 h-6 bg-gray-900 rounded-b-xl w-32 mx-auto z-20"></div>
        
        <div className="bg-gray-50 rounded-[2rem] h-[650px] overflow-hidden flex flex-col relative">
          
          <div className="bg-bhanzu-navy text-white pt-10 pb-4 px-6 shadow-md z-10 relative">
            <h3 className="font-bold text-lg">My Child's Progress</h3>
            <p className="text-xs text-blue-100 opacity-90">Class History</p>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Past Sessions</h4>
              
              {MOCK_SESSIONS.map(session => {
                const isShortfall = session.actual < 35;

                return (
                  <div key={session.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden transition-all">
                    {!isAfter ? (
                      // BEFORE STATE SESSION CARD
                      <div className="p-4 flex justify-between items-center">
                        <div>
                          <p className="font-medium text-gray-900">{session.label}</p>
                          <p className="text-xs text-gray-500">{session.date}</p>
                        </div>
                        <span className="text-xs font-medium px-2 py-1 bg-gray-100 text-gray-600 rounded">
                          Completed
                        </span>
                      </div>
                    ) : (
                      // AFTER STATE SESSION CARD
                      <div>
                        <div 
                          className="p-4 flex flex-col gap-3 cursor-pointer hover:bg-gray-50"
                          onClick={() => toggleExpand(session.id)}
                        >
                          <div className="flex justify-between items-start">
                            <div>
                              <p className="font-medium text-gray-900">{session.label}</p>
                              <p className="text-xs text-gray-500">{session.date}</p>
                            </div>
                            {isShortfall && (
                              <span className="text-[10px] font-bold px-2 py-0.5 bg-amber-100 text-amber-800 rounded-full flex items-center gap-1">
                                <AlertTriangle className="w-3 h-3" />
                                Credit Issued
                              </span>
                            )}
                          </div>
                          
                          <div className="flex gap-4 text-xs">
                            <div className="flex flex-col">
                              <span className="text-gray-400">Scheduled</span>
                              <span className="font-medium text-gray-700">{session.scheduled} min</span>
                            </div>
                            <div className="flex flex-col">
                              <span className="text-gray-400">Actual</span>
                              <span className={cn(
                                "font-bold flex items-center gap-1", 
                                isShortfall ? "text-amber-600" : "text-emerald-600"
                              )}>
                                {session.actual} min
                                {isShortfall ? <AlertCircle className="w-3.5 h-3.5" /> : <CheckCircle className="w-3.5 h-3.5" />}
                              </span>
                            </div>
                          </div>
                          
                          {isShortfall && (
                            <div className="flex justify-center border-t border-gray-50 pt-2 mt-1">
                              {expandedSession === session.id ? <ChevronUp className="w-4 h-4 text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
                            </div>
                          )}
                        </div>

                        {/* Expandable Details */}
                        {isAfter && expandedSession === session.id && isShortfall && (
                          <div className="px-4 pb-4 bg-gray-50 border-t border-gray-100 animate-in slide-in-from-top-2">
                            <div className="pt-3 relative">
                              <div className="absolute left-2.5 top-5 bottom-5 w-px bg-amber-200"></div>
                              <div className="space-y-4">
                                <div className="flex gap-3 relative z-10">
                                  <div className="w-5 h-5 rounded-full bg-emerald-100 border border-emerald-200 flex items-center justify-center shrink-0">
                                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
                                  </div>
                                  <div>
                                    <p className="text-xs font-medium text-gray-900">Started on time</p>
                                    <p className="text-[10px] text-gray-500">{session.startTime}</p>
                                  </div>
                                </div>
                                
                                <div className="flex gap-3 relative z-10">
                                  <div className="w-5 h-5 rounded-full bg-amber-100 border border-amber-200 flex items-center justify-center shrink-0">
                                    <div className="w-1.5 h-1.5 rounded-full bg-amber-500"></div>
                                  </div>
                                  <div>
                                    <p className="text-xs font-medium text-amber-800">Gap detected ({session.gap.min} min)</p>
                                    <p className="text-[10px] text-amber-600/80">{session.gap.start} - {session.gap.end}</p>
                                  </div>
                                </div>

                                <div className="flex gap-3 relative z-10">
                                  <div className="w-5 h-5 rounded-full bg-gray-200 border border-gray-300 flex items-center justify-center shrink-0">
                                    <div className="w-1.5 h-1.5 rounded-full bg-gray-500"></div>
                                  </div>
                                  <div>
                                    <p className="text-xs font-medium text-gray-900">Session ended early</p>
                                    <p className="text-[10px] text-gray-500">{session.earlyEnd}</p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Complaint Section (Before State) */}
            {!isAfter && (
              <div className="mt-8 bg-white p-4 rounded-xl shadow-sm border border-gray-200 space-y-3">
                <h4 className="text-sm font-bold text-gray-900">Report an Issue</h4>
                {!complaintSubmitted ? (
                  <>
                    <textarea 
                      className="w-full text-sm border border-gray-300 rounded-lg p-2 resize-none focus:ring-1 focus:ring-bhanzu-navy"
                      rows={3}
                      placeholder="Describe your issue here..."
                    ></textarea>
                    <button 
                      onClick={() => setComplaintSubmitted(true)}
                      className="w-full py-2 bg-bhanzu-navy text-white text-sm font-semibold rounded-lg"
                    >
                      Submit
                    </button>
                  </>
                ) : (
                  <div className="bg-gray-50 p-3 rounded-lg text-center space-y-2 border border-gray-100">
                    <CheckCircle className="w-6 h-6 text-emerald-500 mx-auto" />
                    <p className="text-xs text-gray-700 italic">"We will investigate and ensure it won't happen again."</p>
                    <button 
                      onClick={() => setComplaintSubmitted(false)}
                      className="text-xs text-bhanzu-navy font-medium underline mt-2"
                    >
                      Report another issue
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Stat Line Comparison outside phone frame */}
      <div className="mt-8 bg-white p-4 rounded-xl border border-gray-200 shadow-sm text-sm">
        <p className="text-gray-600 mb-2 border-b border-gray-100 pb-2">
          <strong className="text-gray-400 uppercase text-xs mr-2">Before</strong>
          Parent has to notice, document, and report each incident manually.
        </p>
        <p className="text-bhanzu-navy">
          <strong className="text-bhanzu-orange uppercase text-xs mr-2">After</strong>
          Automatically tracked, automatically credited. Zero parent effort.
        </p>
      </div>

    </div>
  );
}
