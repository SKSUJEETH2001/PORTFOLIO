import React, { useState, useRef } from "react";
import { 
  Ship, 
  Anchor, 
  Truck, 
  Plane, 
  Package, 
  MapPin, 
  Briefcase, 
  GraduationCap, 
  Award, 
  Sparkles, 
  Download, 
  Upload, 
  Printer, 
  BookOpen, 
  CheckCircle, 
  Plus, 
  Trash2, 
  RefreshCw, 
  FileText, 
  Linkedin, 
  Mail, 
  Phone,
  ChevronRight,
  Info,
  AlertCircle
} from "lucide-react";
import { PortfolioData, ThemeType } from "./types";
import { TEMPLATES, GUIDES } from "./data";

export default function App() {
  // Setup default state using the "maritime" template
  const [portfolio, setPortfolio] = useState<PortfolioData>({
    ...TEMPLATES.maritime.data
  });
  
  const [selectedTheme, setSelectedTheme] = useState<ThemeType>("editorial-ivory");
  const [activeGuide, setActiveGuide] = useState<number | null>(0);
  
  // AI Tuner status states
  const [isTuning, setIsTuning] = useState<string | null>(null); // tracks id/field being tuned
  const [tuningFeedback, setTuningFeedback] = useState<{ enhancedText: string; improvements: string[] } | null>(null);
  const [tuningError, setTuningError] = useState<string | null>(null);

  // File import ref
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Template Loader
  const handleLoadTemplate = (key: string) => {
    if (window.confirm(`Load "${TEMPLATES[key].label}"? This will overwrite your current draft.`)) {
      setPortfolio(JSON.parse(JSON.stringify(TEMPLATES[key].data)));
    }
  };

  // State update helpers
  const updatePersonal = (field: keyof PortfolioData["personal"], value: string) => {
    setPortfolio(prev => ({
      ...prev,
      personal: { ...prev.personal, [field]: value }
    }));
  };

  const updateEducation = (field: keyof PortfolioData["education"], value: any) => {
    setPortfolio(prev => ({
      ...prev,
      education: { ...prev.education, [field]: value }
    }));
  };

  // Internships array managers
  const updateInternship = (id: string, field: string, value: any) => {
    setPortfolio(prev => ({
      ...prev,
      internships: prev.internships.map(item => 
        item.id === id ? { ...item, [field]: value } : item
      )
    }));
  };

  const addInternship = () => {
    const newItem = {
      id: "int-" + Date.now(),
      company: "New Logistics Company",
      role: "Trainee Officer",
      duration: "May 2026 - July 2026",
      description: ["Conordinated cargo consolidation audits under warehouse dispatch supervisor guidance."]
    };
    setPortfolio(prev => ({
      ...prev,
      internships: [...prev.internships, newItem]
    }));
  };

  const removeInternship = (id: string) => {
    setPortfolio(prev => ({
      ...prev,
      internships: prev.internships.filter(item => item.id !== id)
    }));
  };

  const addInternshipBullet = (intId: string) => {
    setPortfolio(prev => ({
      ...prev,
      internships: prev.internships.map(item => {
        if (item.id === intId) {
          return {
            ...item,
            description: [...item.description, "New key logistics achievement or operational responsibility details."]
          };
        }
        return item;
      })
    }));
  };

  const updateInternshipBullet = (intId: string, bulletIndex: number, value: string) => {
    setPortfolio(prev => ({
      ...prev,
      internships: prev.internships.map(item => {
        if (item.id === intId) {
          const newDesc = [...item.description];
          newDesc[bulletIndex] = value;
          return { ...item, description: newDesc };
        }
        return item;
      })
    }));
  };

  const removeInternshipBullet = (intId: string, bulletIndex: number) => {
    setPortfolio(prev => ({
      ...prev,
      internships: prev.internships.map(item => {
        if (item.id === intId) {
          return {
            ...item,
            description: item.description.filter((_, idx) => idx !== bulletIndex)
          };
        }
        return item;
      })
    }));
  };

  // Projects array managers
  const updateProject = (id: string, field: string, value: any) => {
    setPortfolio(prev => ({
      ...prev,
      projects: prev.projects.map(item => 
        item.id === id ? { ...item, [field]: value } : item
      )
    }));
  };

  const addProject = () => {
    const newItem = {
      id: "proj-" + Date.now(),
      title: "New Supply Chain Project",
      role: "Logistics Coordinator",
      description: "Analyzed material stockouts and lead time fluctuations within a simulated local manufacturer framework, suggesting buffer stock policies.",
      methods: ["Lead Time Optimization", "Safety Stock Planning"]
    };
    setPortfolio(prev => ({
      ...prev,
      projects: [...prev.projects, newItem]
    }));
  };

  const removeProject = (id: string) => {
    setPortfolio(prev => ({
      ...prev,
      projects: prev.projects.filter(item => item.id !== id)
    }));
  };

  const handleUpdateProjectMethods = (projId: string, valueString: string) => {
    const arr = valueString.split(",").map(m => m.trim()).filter(m => m !== "");
    setPortfolio(prev => ({
      ...prev,
      projects: prev.projects.map(item => 
        item.id === projId ? { ...item, methods: arr } : item
      )
    }));
  };

  // Skills string list manager
  const handleUpdateSkills = (valueString: string) => {
    const list = valueString.split(",").map(s => s.trim()).filter(s => s !== "");
    setPortfolio(prev => ({
      ...prev,
      skills: list
    }));
  };

  // Certifications list managers
  const updateCert = (id: string, field: string, value: string) => {
    setPortfolio(prev => ({
      ...prev,
      certifications: prev.certifications.map(item => 
        item.id === id ? { ...item, [field]: value } : item
      )
    }));
  };

  const addCert = () => {
    const newItem = {
      id: "cert-" + Date.now(),
      name: "New Professional Logistics Certification",
      issuer: "Logistics Institute",
      year: "2026"
    };
    setPortfolio(prev => ({
      ...prev,
      certifications: [...prev.certifications, newItem]
    }));
  };

  const removeCert = (id: string) => {
    setPortfolio(prev => ({
      ...prev,
      certifications: prev.certifications.filter(item => item.id !== id)
    }));
  };

  // AI Tuner: Call server endpoint to optimize shipping/logistics bullet points or bios
  const handleTuneWithAI = async (text: string, type: "bullet" | "summary", targetId?: string, bulletIndex?: number) => {
    const tuneKey = targetId ? `${targetId}-${bulletIndex ?? 'main'}` : 'bio';
    setIsTuning(tuneKey);
    setTuningFeedback(null);
    setTuningError(null);

    try {
      const response = await fetch("/api/gemini/optimize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text,
          type,
          focus: portfolio.personal.focusArea
        })
      });

      if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        throw new Error(errData.error || "Failed to optimize text with AI");
      }

      const data = await response.json();
      
      if (data.enhancedText) {
        setTuningFeedback({
          enhancedText: data.enhancedText,
          improvements: data.improvements || ["Optimized shipping language & structure."]
        });

        // Update the state with optimized text
        if (type === "summary") {
          updatePersonal("bio", data.enhancedText);
        } else if (type === "bullet" && targetId !== undefined) {
          if (bulletIndex !== undefined) {
            // It's an internship bullet point
            updateInternshipBullet(targetId, bulletIndex, data.enhancedText);
          } else {
            // It's a project description
            updateProject(targetId, "description", data.enhancedText);
          }
        }
      } else {
        throw new Error("No enhanced text was returned by the AI.");
      }
    } catch (err: any) {
      console.error(err);
      setTuningError(err.message || "An unexpected error occurred during optimization.");
    } finally {
      setIsTuning(null);
    }
  };

  // Export JSON file
  const handleExportJSON = () => {
    const dataStr = JSON.stringify(portfolio, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = `${portfolio.personal.name.replace(/\s+/g, '_')}_Logistics_Portfolio.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  // Import JSON file
  const handleImportJSON = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const file = files[0];
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target?.result as string);
        if (parsed && parsed.personal && parsed.education && parsed.skills) {
          setPortfolio(parsed);
          alert("Portfolio data imported successfully!");
        } else {
          alert("Invalid portfolio format. Please verify the file contains 'personal', 'education', and 'skills' parameters.");
        }
      } catch (err) {
        alert("Error parsing JSON file. Please check if the file is valid.");
      }
    };
    reader.readAsText(file);
  };

  // Print function
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col font-sans selection:bg-cyan-500 selection:text-slate-900">
      
      {/* Dynamic Shipping Header Banner (Hidden on print) */}
      <header className="bg-gradient-to-r from-slate-900 via-slate-800 to-indigo-950 border-b border-slate-800 py-6 px-4 md:px-8 no-print">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-xl shadow-lg shadow-cyan-500/10 text-slate-950">
              <Ship className="h-7 w-7" />
            </div>
            <div>
              <h1 className="text-2xl font-bold font-display tracking-tight text-white flex items-center gap-2">
                BBA Shipping & Logistics Portfolio Builder
              </h1>
              <p className="text-slate-400 text-xs mt-0.5 max-w-xl">
                A highly interactive portfolio architect & advice center designed exclusively for fresher BBA logistics graduates to build recruiter-ready resumes and showcase shipping competence.
              </p>
            </div>
          </div>
          
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-slate-950 font-medium rounded-lg hover:from-cyan-400 hover:to-blue-400 transition-all text-xs flex items-center gap-1.5 shadow-lg shadow-cyan-500/15"
            >
              <Printer className="h-4 w-4" /> Print / Save as PDF
            </button>
            <button
              onClick={handleExportJSON}
              className="px-3 py-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 rounded-lg transition-all text-xs flex items-center gap-1"
            >
              <Download className="h-4 w-4" /> Export Data
            </button>
            <button
              onClick={() => fileInputRef.current?.click()}
              className="px-3 py-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 rounded-lg transition-all text-xs flex items-center gap-1"
            >
              <Upload className="h-4 w-4" /> Import Data
            </button>
            <input 
              type="file" 
              ref={fileInputRef} 
              onChange={handleImportJSON} 
              accept=".json" 
              className="hidden" 
            />
          </div>
        </div>
      </header>

      {/* Main Screen Layout (Grid on Large Screens, Stacked on Mobile) */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 md:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* LEFT COLUMN: Controls, Guidelines, Inputs (Columns 1-7, hidden on print) */}
        <div className="lg:col-span-7 flex flex-col gap-6 no-print">
          
          {/* Section 1: Template Selection & Advice Guide */}
          <div className="bg-slate-800/95 border border-slate-700/60 rounded-2xl p-5 shadow-xl shadow-slate-950/20">
            <div className="flex items-center gap-2 mb-4 border-b border-slate-700/50 pb-3">
              <RefreshCw className="h-5 w-5 text-cyan-400" />
              <h2 className="font-display font-semibold text-white text-md">
                1. Select Industry-Focused Focus Area
              </h2>
            </div>
            
            <p className="text-slate-300 text-xs mb-3">
              Shipping & logistics is highly specialized. Load one of our curated fresher templates below to see ideal skills, courses, and sample achievements:
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mb-4">
              {Object.entries(TEMPLATES).map(([key, item]) => (
                <button
                  key={key}
                  onClick={() => handleLoadTemplate(key)}
                  className="p-3 bg-slate-900/60 hover:bg-slate-900/90 border border-slate-700/50 hover:border-cyan-500/50 text-left rounded-xl transition-all cursor-pointer group"
                >
                  <p className="font-medium text-xs text-white group-hover:text-cyan-400 transition-colors">
                    {item.label}
                  </p>
                  <p className="text-[10px] text-slate-400 mt-1 line-clamp-2">
                    {item.description}
                  </p>
                </button>
              ))}
            </div>

            {/* Interactive Logistics Guidance Section */}
            <div className="bg-slate-900/40 border border-slate-700/40 rounded-xl p-4">
              <div className="flex items-center justify-between cursor-pointer" onClick={() => setActiveGuide(activeGuide === null ? 0 : null)}>
                <div className="flex items-center gap-2">
                  <BookOpen className="h-4.5 w-4.5 text-blue-400" />
                  <span className="text-xs font-semibold text-slate-200">How to Create a Shipping & Logistics Portfolio (Advice & Guide)</span>
                </div>
                <ChevronRight className={`h-4 w-4 text-slate-400 transition-transform duration-200 ${activeGuide !== null ? 'rotate-90' : ''}`} />
              </div>
              
              {activeGuide !== null && (
                <div className="mt-3 space-y-4 max-h-[300px] overflow-y-auto pr-1">
                  {GUIDES.map((guide, idx) => (
                    <div key={idx} className="border-t border-slate-800 pt-2.5 first:border-none first:pt-0">
                      <h4 className="text-xs font-medium text-cyan-300 flex items-center gap-1">
                        {guide.title}
                      </h4>
                      <p className="text-[11px] text-slate-300 mt-1 leading-relaxed whitespace-pre-line">
                        {guide.content}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Section 2: Personal & Contact Information */}
          <div className="bg-slate-800/95 border border-slate-700/60 rounded-2xl p-5 shadow-xl shadow-slate-950/20">
            <div className="flex items-center gap-2 mb-4 border-b border-slate-700/50 pb-3">
              <FileText className="h-5 w-5 text-cyan-400" />
              <h2 className="font-display font-semibold text-white text-md">
                2. Personal Details & Career Focus
              </h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] font-medium text-slate-300 uppercase tracking-wider mb-1">Full Name</label>
                <input
                  type="text"
                  value={portfolio.personal.name}
                  onChange={(e) => updatePersonal("name", e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-cyan-500 transition-all"
                  placeholder="e.g. Rahul Nair"
                />
              </div>

              <div>
                <label className="block text-[11px] font-medium text-slate-300 uppercase tracking-wider mb-1">Focus Sector</label>
                <input
                  type="text"
                  value={portfolio.personal.focusArea}
                  onChange={(e) => updatePersonal("focusArea", e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-cyan-500 transition-all"
                  placeholder="e.g. Maritime Cargo & Port Operations"
                />
              </div>

              <div>
                <label className="block text-[11px] font-medium text-slate-300 uppercase tracking-wider mb-1">Email Address</label>
                <input
                  type="email"
                  value={portfolio.personal.email}
                  onChange={(e) => updatePersonal("email", e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-cyan-500 transition-all"
                  placeholder="e.g. name@logistics.com"
                />
              </div>

              <div>
                <label className="block text-[11px] font-medium text-slate-300 uppercase tracking-wider mb-1">Phone Number</label>
                <input
                  type="text"
                  value={portfolio.personal.phone}
                  onChange={(e) => updatePersonal("phone", e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-cyan-500 transition-all"
                  placeholder="e.g. +91 98765 43210"
                />
              </div>

              <div>
                <label className="block text-[11px] font-medium text-slate-300 uppercase tracking-wider mb-1">LinkedIn Profile</label>
                <input
                  type="text"
                  value={portfolio.personal.linkedin}
                  onChange={(e) => updatePersonal("linkedin", e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-cyan-500 transition-all"
                  placeholder="linkedin.com/in/username"
                />
              </div>

              <div>
                <label className="block text-[11px] font-medium text-slate-300 uppercase tracking-wider mb-1">Location</label>
                <input
                  type="text"
                  value={portfolio.personal.location}
                  onChange={(e) => updatePersonal("location", e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-cyan-500 transition-all"
                  placeholder="e.g. Mumbai, India"
                />
              </div>
            </div>

            <div className="mt-4">
              <div className="flex justify-between items-center mb-1">
                <label className="block text-[11px] font-medium text-slate-300 uppercase tracking-wider">
                  Professional Summary / Career Bio
                </label>
                <button
                  onClick={() => handleTuneWithAI(portfolio.personal.bio, "summary")}
                  disabled={isTuning === 'bio'}
                  className="px-2 py-0.5 bg-gradient-to-r from-purple-500/20 to-cyan-500/20 hover:from-purple-500/40 hover:to-cyan-500/40 text-[10px] border border-purple-500/40 text-purple-200 rounded-md transition-all flex items-center gap-1 cursor-pointer disabled:opacity-50"
                >
                  <Sparkles className="h-3 w-3 text-cyan-300 animate-pulse" />
                  {isTuning === 'bio' ? "Tuning..." : "AI Professional Bio Tune"}
                </button>
              </div>
              <textarea
                value={portfolio.personal.bio}
                onChange={(e) => updatePersonal("bio", e.target.value)}
                rows={4}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-cyan-500 transition-all resize-none"
                placeholder="A compelling paragraph summarizing your education, core logistics skills, and operations passion."
              />
            </div>
          </div>

          {/* Section 3: BBA Shipping & Logistics Education */}
          <div className="bg-slate-800/95 border border-slate-700/60 rounded-2xl p-5 shadow-xl shadow-slate-950/20">
            <div className="flex items-center gap-2 mb-4 border-b border-slate-700/50 pb-3">
              <GraduationCap className="h-5 w-5 text-cyan-400" />
              <h2 className="font-display font-semibold text-white text-md">
                3. Education Details
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] font-medium text-slate-300 uppercase tracking-wider mb-1">Degree Title</label>
                <input
                  type="text"
                  value={portfolio.education.degree}
                  onChange={(e) => updateEducation("degree", e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-cyan-500 transition-all"
                  placeholder="e.g. BBA in Shipping & Logistics"
                />
              </div>

              <div>
                <label className="block text-[11px] font-medium text-slate-300 uppercase tracking-wider mb-1">Institution / University</label>
                <input
                  type="text"
                  value={portfolio.education.institution}
                  onChange={(e) => updateEducation("institution", e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-cyan-500 transition-all"
                  placeholder="e.g. Indian Maritime University"
                />
              </div>

              <div>
                <label className="block text-[11px] font-medium text-slate-300 uppercase tracking-wider mb-1">Graduation Year</label>
                <input
                  type="text"
                  value={portfolio.education.graduationYear}
                  onChange={(e) => updateEducation("graduationYear", e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-cyan-500 transition-all"
                  placeholder="e.g. 2026"
                />
              </div>

              <div>
                <label className="block text-[11px] font-medium text-slate-300 uppercase tracking-wider mb-1">GPA / Score (Optional)</label>
                <input
                  type="text"
                  value={portfolio.education.gpa}
                  onChange={(e) => updateEducation("gpa", e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-cyan-500 transition-all"
                  placeholder="e.g. 8.6 / 10.0"
                />
              </div>
            </div>

            <div className="mt-4">
              <label className="block text-[11px] font-medium text-slate-300 uppercase tracking-wider mb-1">
                Relevant Coursework / Modules (comma-separated)
              </label>
              <input
                type="text"
                value={portfolio.education.coursework.join(", ")}
                onChange={(e) => {
                  const arr = e.target.value.split(",").map(c => c.trim()).filter(c => c !== "");
                  updateEducation("coursework", arr);
                }}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-cyan-500 transition-all"
                placeholder="e.g. Containerization, Maritime Operations, Inland Freight forwarding, Port Logistics"
              />
              <p className="text-[10px] text-slate-400 mt-1">
                Note: Highlight courses that prove your core theoretical understanding of cargo flows and transport structures.
              </p>
            </div>
          </div>

          {/* Section 4: Internships / Industrial Port Visits */}
          <div className="bg-slate-800/95 border border-slate-700/60 rounded-2xl p-5 shadow-xl shadow-slate-950/20">
            <div className="flex items-center justify-between mb-4 border-b border-slate-700/50 pb-3">
              <div className="flex items-center gap-2">
                <Briefcase className="h-5 w-5 text-cyan-400" />
                <h2 className="font-display font-semibold text-white text-md">
                  4. Internships & Practical Visits
                </h2>
              </div>
              <button
                onClick={addInternship}
                className="px-2.5 py-1 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-medium rounded-md text-xs flex items-center gap-1 transition-all cursor-pointer"
              >
                <Plus className="h-3.5 w-3.5" /> Add New
              </button>
            </div>

            {portfolio.internships.length === 0 ? (
              <p className="text-slate-400 text-xs italic py-4 text-center">
                No internships or visits added. Port/warehouse visits are highly valuable to showcase!
              </p>
            ) : (
              <div className="space-y-6">
                {portfolio.internships.map((int, intIdx) => (
                  <div key={int.id} className="bg-slate-900/40 p-4 rounded-xl border border-slate-700/50 relative">
                    <button
                      onClick={() => removeInternship(int.id)}
                      className="absolute top-4 right-4 text-slate-400 hover:text-red-400 transition-colors p-1"
                      title="Remove Internship"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-3">
                      <div className="md:col-span-2">
                        <label className="block text-[10px] font-medium text-slate-400 uppercase mb-0.5">Company / Terminal Name</label>
                        <input
                          type="text"
                          value={int.company}
                          onChange={(e) => updateInternship(int.id, "company", e.target.value)}
                          className="w-full bg-slate-950 border border-slate-700 rounded-lg px-2.5 py-1 text-xs text-white focus:outline-none focus:border-cyan-500"
                          placeholder="e.g. DP World Gateway"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-medium text-slate-400 uppercase mb-0.5">Duration</label>
                        <input
                          type="text"
                          value={int.duration}
                          onChange={(e) => updateInternship(int.id, "duration", e.target.value)}
                          className="w-full bg-slate-950 border border-slate-700 rounded-lg px-2.5 py-1 text-xs text-white focus:outline-none focus:border-cyan-500"
                          placeholder="e.g. May - July 2025"
                        />
                      </div>
                      <div className="md:col-span-3">
                        <label className="block text-[10px] font-medium text-slate-400 uppercase mb-0.5">Your Role / Title</label>
                        <input
                          type="text"
                          value={int.role}
                          onChange={(e) => updateInternship(int.id, "role", e.target.value)}
                          className="w-full bg-slate-950 border border-slate-700 rounded-lg px-2.5 py-1 text-xs text-white focus:outline-none focus:border-cyan-500"
                          placeholder="e.g. Port Operations Intern"
                        />
                      </div>
                    </div>

                    <div className="mt-3">
                      <div className="flex justify-between items-center mb-1.5">
                        <label className="block text-[10px] font-medium text-slate-400 uppercase">
                          Responsibilities & Key Accomplishments
                        </label>
                        <button
                          onClick={() => addInternshipBullet(int.id)}
                          className="text-[10px] text-cyan-400 hover:text-cyan-300 font-medium flex items-center gap-0.5 cursor-pointer"
                        >
                          <Plus className="h-3 w-3" /> Add Bullet Point
                        </button>
                      </div>

                      <div className="space-y-2">
                        {int.description.map((bullet, bulletIdx) => {
                          const tuneKey = `${int.id}-${bulletIdx}`;
                          return (
                            <div key={bulletIdx} className="flex gap-2 items-start">
                              <span className="text-slate-500 text-xs mt-2">•</span>
                              <div className="flex-1">
                                <input
                                  type="text"
                                  value={bullet}
                                  onChange={(e) => updateInternshipBullet(int.id, bulletIdx, e.target.value)}
                                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-2.5 py-1 text-xs text-white focus:outline-none focus:border-cyan-500"
                                  placeholder="Describe operation responsibilities, systems used (e.g., TOS, WMS, Excel)"
                                />
                              </div>
                              <div className="flex gap-1">
                                <button
                                  onClick={() => handleTuneWithAI(bullet, "bullet", int.id, bulletIdx)}
                                  disabled={isTuning === tuneKey}
                                  title="Tune Bullet Point with Logistics AI Specialist"
                                  className="p-1 bg-purple-500/10 hover:bg-purple-500/30 border border-purple-500/30 text-purple-200 rounded-lg transition-all cursor-pointer disabled:opacity-50"
                                >
                                  <Sparkles className="h-3.5 w-3.5" />
                                </button>
                                <button
                                  onClick={() => removeInternshipBullet(int.id, bulletIdx)}
                                  className="p-1 text-slate-400 hover:text-red-400"
                                  title="Delete Bullet"
                                >
                                  <Trash2 className="h-3.5 w-3.5" />
                                </button>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Section 5: Academic Projects */}
          <div className="bg-slate-800/95 border border-slate-700/60 rounded-2xl p-5 shadow-xl shadow-slate-950/20">
            <div className="flex items-center justify-between mb-4 border-b border-slate-700/50 pb-3">
              <div className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-cyan-400" />
                <h2 className="font-display font-semibold text-white text-md">
                  5. Academic & Research Projects
                </h2>
              </div>
              <button
                onClick={addProject}
                className="px-2.5 py-1 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-medium rounded-md text-xs flex items-center gap-1 transition-all cursor-pointer"
              >
                <Plus className="h-3.5 w-3.5" /> Add New
              </button>
            </div>

            {portfolio.projects.length === 0 ? (
              <p className="text-slate-400 text-xs italic py-4 text-center">
                No projects added. Research papers or supply chain projects are ideal to showcase analytical skills.
              </p>
            ) : (
              <div className="space-y-6">
                {portfolio.projects.map((proj) => (
                  <div key={proj.id} className="bg-slate-900/40 p-4 rounded-xl border border-slate-700/50 relative">
                    <button
                      onClick={() => removeProject(proj.id)}
                      className="absolute top-4 right-4 text-slate-400 hover:text-red-400 transition-colors p-1"
                      title="Remove Project"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                      <div>
                        <label className="block text-[10px] font-medium text-slate-400 uppercase mb-0.5">Project Title</label>
                        <input
                          type="text"
                          value={proj.title}
                          onChange={(e) => updateProject(proj.id, "title", e.target.value)}
                          className="w-full bg-slate-950 border border-slate-700 rounded-lg px-2.5 py-1 text-xs text-white focus:outline-none focus:border-cyan-500"
                          placeholder="e.g. Cold Chain Shipping Analysis"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-medium text-slate-400 uppercase mb-0.5">Your Role</label>
                        <input
                          type="text"
                          value={proj.role}
                          onChange={(e) => updateProject(proj.id, "role", e.target.value)}
                          className="w-full bg-slate-950 border border-slate-700 rounded-lg px-2.5 py-1 text-xs text-white focus:outline-none focus:border-cyan-500"
                          placeholder="e.g. Lead Student Researcher"
                        />
                      </div>
                    </div>

                    <div className="mt-3">
                      <div className="flex justify-between items-center mb-1">
                        <label className="block text-[10px] font-medium text-slate-400 uppercase">
                          Project Description & Findings
                        </label>
                        <button
                          onClick={() => handleTuneWithAI(proj.description, "bullet", proj.id)}
                          disabled={isTuning === `${proj.id}-main`}
                          className="px-2 py-0.5 bg-gradient-to-r from-purple-500/10 to-cyan-500/10 hover:from-purple-500/20 hover:to-cyan-500/20 text-[10px] border border-purple-500/30 text-purple-200 rounded-md transition-all flex items-center gap-1 cursor-pointer disabled:opacity-50"
                        >
                          <Sparkles className="h-3 w-3 text-cyan-300 animate-pulse" />
                          Optimize Description
                        </button>
                      </div>
                      <textarea
                        value={proj.description}
                        onChange={(e) => updateProject(proj.id, "description", e.target.value)}
                        rows={3}
                        className="w-full bg-slate-950 border border-slate-700 rounded-lg px-2.5 py-1 text-xs text-white focus:outline-none focus:border-cyan-500 resize-none"
                        placeholder="Detail the case study, dry port bottle neck, liner scheduling, or route matrix you engineered."
                      />
                    </div>

                    <div className="mt-3">
                      <label className="block text-[10px] font-medium text-slate-400 uppercase mb-0.5">
                        Analytical Methods / Concepts Used (comma-separated)
                      </label>
                      <input
                        type="text"
                        value={proj.methods.join(", ")}
                        onChange={(e) => handleUpdateProjectMethods(proj.id, e.target.value)}
                        className="w-full bg-slate-950 border border-slate-700 rounded-lg px-2.5 py-1 text-xs text-white focus:outline-none focus:border-cyan-500"
                        placeholder="e.g. EOQ Model, ABC Classification, Queuing Theory, Risk Matrices"
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Section 6: Core Skills & Logistics Competency */}
          <div className="bg-slate-800/95 border border-slate-700/60 rounded-2xl p-5 shadow-xl shadow-slate-950/20">
            <div className="flex items-center gap-2 mb-4 border-b border-slate-700/50 pb-3">
              <Award className="h-5 w-5 text-cyan-400" />
              <h2 className="font-display font-semibold text-white text-md">
                6. Core Skills & Technologies
              </h2>
            </div>

            <div>
              <label className="block text-[11px] font-medium text-slate-300 uppercase tracking-wider mb-1">
                Logistics & Tech Competencies (comma-separated)
              </label>
              <textarea
                value={portfolio.skills.join(", ")}
                onChange={(e) => handleUpdateSkills(e.target.value)}
                rows={3}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-cyan-500 transition-all"
                placeholder="e.g. Vessel Stowage, Bill of Lading, Incoterms 2020, Port Slot Allocation, SAP MM, Advanced Excel, Demurrage Calculation"
              />
              <p className="text-[10px] text-slate-400 mt-1">
                Tip: Mix theoretical methodologies (like routing optimization or safety stock calculations) with technical software (WMS, SAP ERP, or dispatch databases) and key logistics regulations.
              </p>
            </div>
          </div>

          {/* Section 7: Certifications */}
          <div className="bg-slate-800/95 border border-slate-700/60 rounded-2xl p-5 shadow-xl shadow-slate-950/20">
            <div className="flex items-center justify-between mb-4 border-b border-slate-700/50 pb-3">
              <div className="flex items-center gap-2">
                <Award className="h-5 w-5 text-cyan-400" />
                <h2 className="font-display font-semibold text-white text-md">
                  7. Professional Certifications
                </h2>
              </div>
              <button
                onClick={addCert}
                className="px-2.5 py-1 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-medium rounded-md text-xs flex items-center gap-1 transition-all cursor-pointer"
              >
                <Plus className="h-3.5 w-3.5" /> Add Certification
              </button>
            </div>

            {portfolio.certifications.length === 0 ? (
              <p className="text-slate-400 text-xs italic py-4 text-center">
                No professional certifications added. Adding ASCM, IATA, or customs academy clearances is highly recommended.
              </p>
            ) : (
              <div className="space-y-4">
                {portfolio.certifications.map((cert) => (
                  <div key={cert.id} className="bg-slate-900/40 p-3.5 rounded-xl border border-slate-700/50 relative grid grid-cols-1 md:grid-cols-12 gap-3 items-end">
                    <button
                      onClick={() => removeCert(cert.id)}
                      className="absolute top-2 right-2 text-slate-400 hover:text-red-400 transition-colors p-1"
                      title="Remove Certification"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>

                    <div className="md:col-span-5">
                      <label className="block text-[10px] font-medium text-slate-400 uppercase mb-0.5">Certification Title</label>
                      <input
                        type="text"
                        value={cert.name}
                        onChange={(e) => updateCert(cert.id, "name", e.target.value)}
                        className="w-full bg-slate-950 border border-slate-700 rounded-lg px-2.5 py-1 text-xs text-white focus:outline-none"
                        placeholder="e.g. Certified Supply Chain Analyst"
                      />
                    </div>

                    <div className="md:col-span-4">
                      <label className="block text-[10px] font-medium text-slate-400 uppercase mb-0.5">Issuing Authority</label>
                      <input
                        type="text"
                        value={cert.issuer}
                        onChange={(e) => updateCert(cert.id, "issuer", e.target.value)}
                        className="w-full bg-slate-950 border border-slate-700 rounded-lg px-2.5 py-1 text-xs text-white focus:outline-none"
                        placeholder="e.g. ISCEA Institute"
                      />
                    </div>

                    <div className="md:col-span-3">
                      <label className="block text-[10px] font-medium text-slate-400 uppercase mb-0.5">Year</label>
                      <input
                        type="text"
                        value={cert.year}
                        onChange={(e) => updateCert(cert.id, "year", e.target.value)}
                        className="w-full bg-slate-950 border border-slate-700 rounded-lg px-2.5 py-1 text-xs text-white focus:outline-none"
                        placeholder="e.g. 2025"
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>

        {/* RIGHT COLUMN: Live Theme Controls & Professional Resume Canvas Preview */}
        <div className="lg:col-span-5 flex flex-col gap-4 lg:sticky lg:top-4">
          
          {/* Theme & Preview Controller (Hidden on print) */}
          <div className="bg-slate-800 border border-slate-700/60 rounded-2xl p-4 shadow-xl no-print">
            <div className="flex items-center justify-between gap-2 border-b border-slate-700/50 pb-2.5 mb-3">
              <span className="text-xs font-semibold text-slate-200 uppercase tracking-wider flex items-center gap-1.5">
                <Sliders className="h-4 w-4 text-cyan-400" /> Style & Theme Settings
              </span>
              <span className="text-[10px] bg-cyan-500/10 text-cyan-400 font-mono px-2 py-0.5 rounded-full border border-cyan-500/20">
                A4 Compliant
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-300">Theme layout:</span>
              <div className="flex items-center gap-1.5 flex-1 justify-end">
                <button
                  onClick={() => setSelectedTheme("editorial-ivory")}
                  className={`px-2.5 py-1 text-[11px] font-medium rounded-lg transition-all cursor-pointer ${selectedTheme === 'editorial-ivory' ? 'bg-amber-100 text-amber-950 shadow-md shadow-amber-500/10 border border-amber-200' : 'bg-slate-900 text-slate-400 border border-slate-800'}`}
                >
                  📰 Editorial Ivory
                </button>
                <button
                  onClick={() => setSelectedTheme("ocean-marine")}
                  className={`px-2.5 py-1 text-[11px] font-medium rounded-lg transition-all cursor-pointer ${selectedTheme === 'ocean-marine' ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/10' : 'bg-slate-900 text-slate-400 border border-slate-800'}`}
                >
                  🌊 Ocean Marine
                </button>
                <button
                  onClick={() => setSelectedTheme("cargo-steel")}
                  className={`px-2.5 py-1 text-[11px] font-medium rounded-lg transition-all cursor-pointer ${selectedTheme === 'cargo-steel' ? 'bg-slate-500 text-white shadow-md shadow-slate-500/10' : 'bg-slate-900 text-slate-400 border border-slate-800'}`}
                >
                  ⛓️ Cargo Steel
                </button>
                <button
                  onClick={() => setSelectedTheme("royal-freight")}
                  className={`px-2.5 py-1 text-[11px] font-medium rounded-lg transition-all cursor-pointer ${selectedTheme === 'royal-freight' ? 'bg-emerald-600 text-white shadow-md shadow-emerald-500/10' : 'bg-slate-900 text-slate-400 border border-slate-800'}`}
                >
                  👑 Royal Freight
                </button>
              </div>
            </div>

            {/* AI Optimization Success Panel */}
            {tuningFeedback && (
              <div className="mt-3.5 bg-purple-950/40 border border-purple-500/30 p-3 rounded-xl animate-fade-in relative">
                <button 
                  onClick={() => setTuningFeedback(null)} 
                  className="absolute top-2 right-2 text-slate-400 hover:text-white text-xs px-1"
                >
                  ✕
                </button>
                <div className="flex items-center gap-1.5 mb-1.5 text-purple-200 font-medium text-xs">
                  <Sparkles className="h-4 w-4 text-purple-400" />
                  <span>AI Logistics Wording Enhanced!</span>
                </div>
                <div className="space-y-1">
                  {tuningFeedback.improvements.map((imp, idx) => (
                    <p key={idx} className="text-[10px] text-slate-300 flex items-start gap-1">
                      <span className="text-cyan-400 font-bold">•</span>
                      <span>{imp}</span>
                    </p>
                  ))}
                </div>
              </div>
            )}

            {/* AI Optimization Error Panel */}
            {tuningError && (
              <div className="mt-3.5 bg-red-950/40 border border-red-500/30 p-3 rounded-xl flex items-start gap-2 text-xs">
                <AlertCircle className="h-4 w-4 text-red-400 shrink-0 mt-0.5" />
                <div>
                  <span className="text-red-200 font-semibold">Tuning Notice</span>
                  <p className="text-[10px] text-slate-300 mt-0.5 leading-normal">{tuningError}</p>
                </div>
              </div>
            )}
          </div>

          {/* THE LIVE PORTFOLIO CANVAS PREVIEW CONTAINER */}
          {/* This block is targeted for PRINTING to A4 page via CSS media queries */}
          <div className={`print-container rounded-2xl shadow-2xl p-6 border min-h-[842px] max-w-[595px] w-full mx-auto flex flex-col transition-all duration-300 ${selectedTheme === "editorial-ivory" ? "bg-[#FAF9F6] text-[#1A1A1A] border-slate-400" : "bg-white text-slate-900 border-slate-200"}`} id="portfolio-preview-canvas">
            
            {/* Theme Style Class Selectors wrapper */}
            <div className={`flex-1 flex flex-col ${getThemeStyles(selectedTheme).container}`}>
              
              {/* Header block */}
              <div className={`p-6 rounded-xl relative ${getThemeStyles(selectedTheme).headerBg}`}>
                {/* Visual Ship/Anchor element decoration */}
                <div className="absolute right-5 top-5 opacity-10">
                  <Ship className="h-20 w-20" />
                </div>

                <div className="flex items-center gap-1.5 mb-1">
                  <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${getThemeStyles(selectedTheme).badgeColor}`}>
                    BBA Logistics Graduate
                  </span>
                  <span className="text-[10px] text-slate-500 font-semibold">•</span>
                  <span className="text-[10px] text-slate-500 font-mono tracking-widest uppercase">
                    Portfolio
                  </span>
                </div>

                <h3 className={`font-bold tracking-tight uppercase ${selectedTheme === "editorial-ivory" ? "text-4xl font-black font-serif text-[#1A1A1A] leading-[0.9] pt-2" : "text-2xl font-display text-slate-900"}`}>
                  {portfolio.personal.name || "Arjun Mehta"}
                </h3>
                
                <p className={`text-xs font-semibold mt-1 font-display ${getThemeStyles(selectedTheme).focusText}`}>
                  Focus: {portfolio.personal.focusArea || "Maritime Cargo & Port Operations"}
                </p>

                {/* Contacts grid */}
                <div className="grid grid-cols-2 gap-2 mt-4 text-[10px] text-slate-600 border-t border-slate-200/60 pt-3">
                  {portfolio.personal.email && (
                    <span className="flex items-center gap-1.5 overflow-hidden text-ellipsis whitespace-nowrap">
                      <Mail className="h-3 w-3 text-slate-400 shrink-0" />
                      {portfolio.personal.email}
                    </span>
                  )}
                  {portfolio.personal.phone && (
                    <span className="flex items-center gap-1.5">
                      <Phone className="h-3 w-3 text-slate-400 shrink-0" />
                      {portfolio.personal.phone}
                    </span>
                  )}
                  {portfolio.personal.linkedin && (
                    <span className="flex items-center gap-1.5 overflow-hidden text-ellipsis whitespace-nowrap">
                      <Linkedin className="h-3 w-3 text-slate-400 shrink-0" />
                      {portfolio.personal.linkedin}
                    </span>
                  )}
                  {portfolio.personal.location && (
                    <span className="flex items-center gap-1.5">
                      <MapPin className="h-3 w-3 text-slate-400 shrink-0" />
                      {portfolio.personal.location}
                    </span>
                  )}
                </div>
              </div>

              {/* Bio Summary Section */}
              {portfolio.personal.bio && (
                <div className="mt-5 px-1">
                  <p className="text-[11px] text-slate-700 leading-relaxed italic border-l-2 border-slate-300 pl-3">
                    "{portfolio.personal.bio}"
                  </p>
                </div>
              )}

              {/* Divided Core Content */}
              <div className="mt-6 grid grid-cols-1 md:grid-cols-12 gap-5 flex-1">
                
                {/* Left Side Content Column (Education, Skills, Certs) */}
                <div className="md:col-span-5 flex flex-col gap-5">
                  
                  {/* Education Component */}
                  <div>
                    <h4 className={`text-xs font-bold uppercase tracking-widest mb-2 border-b pb-1 flex items-center gap-1.5 ${getThemeStyles(selectedTheme).sidebarTitle}`}>
                      <GraduationCap className="h-3.5 w-3.5 shrink-0" /> Education
                    </h4>
                    
                    <div className={getThemeStyles(selectedTheme).card}>
                      <p className="text-[11px] font-bold text-slate-900 leading-snug">
                        {portfolio.education.degree || "BBA in Shipping & Logistics"}
                      </p>
                      <p className="text-[10px] text-slate-600 mt-0.5">
                        {portfolio.education.institution || "Indian Maritime University"}
                      </p>
                      <div className="flex justify-between items-center mt-1.5 text-[9px] text-slate-500 font-medium">
                        <span>Class of {portfolio.education.graduationYear || "2026"}</span>
                        {portfolio.education.gpa && (
                          <span className="bg-slate-200/60 px-1.5 py-0.5 rounded">CGPA: {portfolio.education.gpa}</span>
                        )}
                      </div>
                    </div>

                    {/* Coursework tag list */}
                    {portfolio.education.coursework.length > 0 && (
                      <div className="mt-2 px-1">
                        <p className="text-[9px] font-semibold text-slate-500 uppercase tracking-wider">Logistics Core Modules:</p>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {portfolio.education.coursework.map((course, idx) => (
                            <span key={idx} className={getThemeStyles(selectedTheme).badge}>
                              {course}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Skills Tag Cloud */}
                  {portfolio.skills.length > 0 && (
                    <div>
                      <h4 className={`text-xs font-bold uppercase tracking-widest mb-2 border-b pb-1 flex items-center gap-1.5 ${getThemeStyles(selectedTheme).sidebarTitle}`}>
                        <Award className="h-3.5 w-3.5 shrink-0" /> Competencies
                      </h4>
                      <div className="flex flex-wrap gap-1">
                        {portfolio.skills.map((skill, idx) => (
                          <span 
                            key={idx} 
                            className={`text-[9px] font-semibold px-2 py-0.5 rounded-full border flex items-center gap-0.5 ${getThemeStyles(selectedTheme).skillBadge}`}
                          >
                            <CheckCircle className="h-2 w-2 shrink-0" /> {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Certifications Block */}
                  {portfolio.certifications.length > 0 && (
                    <div>
                      <h4 className={`text-xs font-bold uppercase tracking-widest mb-2 border-b pb-1 flex items-center gap-1.5 ${getThemeStyles(selectedTheme).sidebarTitle}`}>
                        <Award className="h-3.5 w-3.5 shrink-0" /> Certifications
                      </h4>
                      <div className="space-y-2">
                        {portfolio.certifications.map((cert) => (
                          <div key={cert.id} className={getThemeStyles(selectedTheme).card}>
                            <p className="text-[10px] font-semibold text-slate-900 leading-tight">{cert.name}</p>
                            <div className="flex justify-between items-center text-[8.5px] text-slate-500 mt-1">
                              <span>{cert.issuer}</span>
                              <span className="font-mono">{cert.year}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                </div>

                {/* Right Side Content Column (Internships, Projects) */}
                <div className="md:col-span-7 flex flex-col gap-5">
                  
                  {/* Practical Experience Block */}
                  <div>
                    <h4 className={`text-xs font-bold uppercase tracking-widest mb-2 border-b pb-1 flex items-center gap-1.5 ${getThemeStyles(selectedTheme).sidebarTitle}`}>
                      <Briefcase className="h-3.5 w-3.5 shrink-0" /> Internships & Industrial Visits
                    </h4>
                    
                    {portfolio.internships.length === 0 ? (
                      <p className="text-slate-400 text-[10px] italic py-2">No practical operations visits catalogued.</p>
                    ) : (
                      <div className="space-y-3.5">
                        {portfolio.internships.map((int) => (
                          <div key={int.id} className="print-avoid-break">
                            <div className="flex justify-between items-start gap-1">
                              <div>
                                <p className="text-[11px] font-bold text-slate-900">{int.role}</p>
                                <p className="text-[10px] font-semibold text-slate-600">{int.company}</p>
                              </div>
                              <span className={`text-[8.5px] whitespace-nowrap px-1.5 py-0.5 border ${selectedTheme === "editorial-ivory" ? "bg-transparent text-slate-800 border-slate-900 font-sans tracking-wide rounded-none" : "bg-slate-100 text-slate-500 border-slate-200 rounded font-mono"}`}>
                                {int.duration}
                              </span>
                            </div>

                            <ul className="list-disc list-outside pl-4 space-y-1 mt-1.5">
                              {int.description.map((bullet, idx) => (
                                <li key={idx} className="text-[10px] text-slate-700 leading-normal">
                                  {bullet}
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Academic / Case Study Projects Block */}
                  {portfolio.projects.length > 0 && (
                    <div className="print-avoid-break mt-1">
                      <h4 className={`text-xs font-bold uppercase tracking-widest mb-2 border-b pb-1 flex items-center gap-1.5 ${getThemeStyles(selectedTheme).sidebarTitle}`}>
                        <FileText className="h-3.5 w-3.5 shrink-0" /> Academic Projects & Case Studies
                      </h4>
                      
                      <div className="space-y-3">
                        {portfolio.projects.map((proj) => (
                          <div key={proj.id} className={getThemeStyles(selectedTheme).card}>
                            <div className="flex justify-between items-center gap-2">
                              <p className="text-[11px] font-bold text-slate-900 leading-snug">{proj.title}</p>
                              <span className={`text-[8.5px] font-semibold px-1.5 py-0.5 uppercase ${selectedTheme === "editorial-ivory" ? "bg-slate-900 text-[#FAF9F6] rounded-none font-sans" : "bg-slate-200/50 text-slate-600 rounded"}`}>
                                {proj.role}
                              </span>
                            </div>
                            
                            <p className="text-[10px] text-slate-700 mt-1 leading-normal">
                              {proj.description}
                            </p>

                            {/* Project methods and models */}
                            {proj.methods.length > 0 && (
                              <div className="flex flex-wrap gap-1 mt-2 items-center">
                                <span className="text-[8px] font-bold text-slate-400 uppercase tracking-wider">Models:</span>
                                {proj.methods.map((method, mIdx) => (
                                  <span key={mIdx} className={getThemeStyles(selectedTheme).badge}>
                                    {method}
                                  </span>
                                ))}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                </div>

              </div>

              {/* Dynamic Footer Block with QR code mock / verify stamp */}
              <div className="border-t border-slate-200 mt-8 pt-4 flex justify-between items-center text-[8.5px] text-slate-400 font-medium">
                <span className="flex items-center gap-1">
                  <Anchor className="h-3 w-3 text-slate-300" /> BBA Shipping & Logistics Portfolio
                </span>
                <span>Verified Candidate Dossier</span>
              </div>

            </div>

          </div>

        </div>

      </main>

      {/* Humble professional credit footer */}
      <footer className="mt-auto py-6 bg-slate-950 border-t border-slate-900 text-center text-xs text-slate-500 no-print">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-2">
          <span>&copy; 2026 BBA Shipping & Logistics Portfolio Hub</span>
          <span className="flex items-center gap-1.5 text-[11px]">
            Powered by <Sparkles className="h-3.5 w-3.5 text-cyan-400 animate-pulse" /> Gemini AI Resume Tuner
          </span>
        </div>
      </footer>

    </div>
  );
}

// Sliders stub to fix lack of import in code
function Sliders({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <line x1="4" x2="4" y1="21" y2="14" />
      <line x1="4" x2="4" y1="10" y2="3" />
      <line x1="12" x2="12" y1="21" y2="12" />
      <line x1="12" x2="12" y1="8" y2="3" />
      <line x1="20" x2="20" y1="21" y2="16" />
      <line x1="20" x2="20" y1="12" y2="3" />
      <line x1="2" x2="6" y1="14" y2="14" />
      <line x1="10" x2="14" y1="8" y2="8" />
      <line x1="18" x2="22" y1="16" y2="16" />
    </svg>
  );
}

// Styles builder based on the selected theme for the resume
function getThemeStyles(theme: ThemeType) {
  switch (theme) {
    case "editorial-ivory":
      return {
        container: "font-serif text-[#1A1A1A]",
        headerBg: "bg-transparent border-b-4 border-slate-900 rounded-none pb-4",
        badgeColor: "bg-slate-900 text-[#FAF9F6] border border-slate-900 px-2 py-0.5 font-sans tracking-widest text-[9px] rounded-none font-bold uppercase",
        focusText: "text-slate-800 font-serif italic text-xs mt-1.5",
        sidebarTitle: "text-slate-900 font-serif font-black uppercase tracking-[0.15em] border-b-4 border-slate-900 pb-1.5",
        skillBadge: "bg-transparent text-slate-900 border border-slate-900 font-sans rounded-none px-2 py-0.5 text-[8.5px] uppercase tracking-wider font-semibold",
        card: "bg-transparent p-3 rounded-none border border-slate-900",
        badge: "bg-transparent text-slate-900 border border-slate-900 font-sans text-[8px] uppercase font-bold tracking-wider rounded-none px-1.5 py-0.5",
        textMuted: "text-slate-600 font-serif"
      };
    case "ocean-marine":
      return {
        container: "font-sans text-slate-800",
        headerBg: "bg-cyan-50/70 border border-cyan-100",
        badgeColor: "bg-cyan-500/10 text-cyan-700 border border-cyan-300/30",
        focusText: "text-cyan-700",
        sidebarTitle: "text-cyan-700 border-cyan-200",
        skillBadge: "bg-cyan-50 text-cyan-800 border-cyan-200",
        card: "bg-slate-50 p-2.5 rounded-lg border border-slate-100",
        badge: "bg-slate-100 text-[8.5px] font-medium text-slate-700 px-1.5 py-0.5 rounded border border-slate-200/50",
        textMuted: "text-slate-600"
      };
    case "cargo-steel":
      return {
        container: "font-mono text-slate-900",
        headerBg: "bg-slate-100 border border-slate-200",
        badgeColor: "bg-slate-900/10 text-slate-800 border border-slate-400/30",
        focusText: "text-slate-700",
        sidebarTitle: "text-slate-800 border-slate-300",
        skillBadge: "bg-slate-100 text-slate-800 border-slate-200",
        card: "bg-slate-50 p-2.5 rounded-lg border border-slate-100",
        badge: "bg-slate-200/60 text-slate-700 text-[8.5px] font-medium px-1.5 py-0.2 rounded",
        textMuted: "text-slate-600"
      };
    case "royal-freight":
      return {
        container: "font-sans text-slate-800",
        headerBg: "bg-emerald-50/70 border border-emerald-100",
        badgeColor: "bg-emerald-600/10 text-emerald-800 border border-emerald-300/30",
        focusText: "text-emerald-700",
        sidebarTitle: "text-emerald-700 border-emerald-200",
        skillBadge: "bg-emerald-50 text-emerald-800 border-emerald-200",
        card: "bg-slate-50 p-2.5 rounded-lg border border-slate-100",
        badge: "bg-emerald-100 text-[8.5px] font-medium text-emerald-800 px-1.5 py-0.5 rounded border border-emerald-200/50",
        textMuted: "text-slate-600"
      };
    default:
      return {
        container: "font-sans text-slate-800",
        headerBg: "bg-slate-50 border border-slate-200",
        badgeColor: "bg-slate-200 text-slate-700 border-slate-300",
        focusText: "text-slate-700",
        sidebarTitle: "text-slate-800 border-slate-300",
        skillBadge: "bg-slate-100 text-slate-800 border-slate-200",
        card: "bg-slate-50 p-2.5 rounded-lg border border-slate-100",
        badge: "bg-slate-100 text-[8.5px] font-medium text-slate-700 px-1.5 py-0.5 rounded border border-slate-200/50",
        textMuted: "text-slate-600"
      };
  }
}
