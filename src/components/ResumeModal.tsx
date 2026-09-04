import React, { useState, useRef, useCallback } from 'react';
import {
  X,
  Download,
  Printer,
  Mail,
  Github,
  MapPin,
  Award,
  GraduationCap,
  Briefcase,
  Cpu,
  Loader2,
  Check,
} from 'lucide-react';
import html2canvas from 'html2canvas-pro';
import jsPDF from 'jspdf';
import { PERSONAL_INFO } from '../data/portfolioData';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ResumeModal({ isOpen, onClose }: ResumeModalProps) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const resumeRef = useRef<HTMLDivElement>(null);

  // 1. Direct PDF Generation & Download
  const handleSavePDF = useCallback(async () => {
    if (!resumeRef.current || isGenerating) return;
    setIsGenerating(true);

    try {
      const element = resumeRef.current;

      // Temporarily expand scroll constraints for complete capture
      const originalOverflow = element.style.overflow;
      const originalMaxHeight = element.style.maxHeight;
      element.style.overflow = 'visible';
      element.style.maxHeight = 'none';

      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff',
        windowWidth: 1024,
      });

      // Restore original styling
      element.style.overflow = originalOverflow;
      element.style.maxHeight = originalMaxHeight;

      const imgData = canvas.toDataURL('image/jpeg', 0.98);
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
      });

      const pageWidth = 210; // A4 standard width (mm)
      const pageHeight = 297; // A4 standard height (mm)
      const margin = 10;
      const contentWidth = pageWidth - margin * 2;
      const contentHeight = (canvas.height * contentWidth) / canvas.width;

      if (contentHeight <= pageHeight - margin * 2) {
        // Fits comfortably on a single A4 page
        pdf.addImage(imgData, 'JPEG', margin, margin, contentWidth, contentHeight);
      } else {
        // Multi-page slicing
        let heightLeft = contentHeight;
        let position = margin;

        pdf.addImage(imgData, 'JPEG', margin, position, contentWidth, contentHeight);
        heightLeft -= (pageHeight - margin * 2);

        while (heightLeft > 0) {
          position -= (pageHeight - margin * 2);
          pdf.addPage();
          pdf.addImage(imgData, 'JPEG', margin, position, contentWidth, contentHeight);
          heightLeft -= (pageHeight - margin * 2);
        }
      }

      pdf.save('Ekjot_Singh_Nagpal_CV.pdf');
      setIsSaved(true);
      setTimeout(() => setIsSaved(false), 3500);
    } catch (err) {
      console.error('Direct PDF export error, falling back to print dialog:', err);
      window.print();
    } finally {
      setIsGenerating(false);
    }
  }, [isGenerating]);

  // 2. Browser Print Dialog (Clean @media print stylesheet isolates #printable-resume)
  const handlePrint = useCallback(() => {
    try {
      window.print();
    } catch (err) {
      console.warn('Native window.print failed, attempting iframe print:', err);
      if (resumeRef.current) {
        const printFrame = document.createElement('iframe');
        printFrame.style.position = 'fixed';
        printFrame.style.right = '0';
        printFrame.style.bottom = '0';
        printFrame.style.width = '0';
        printFrame.style.height = '0';
        printFrame.style.border = '0';
        printFrame.style.visibility = 'hidden';
        document.body.appendChild(printFrame);

        const doc = printFrame.contentDocument || printFrame.contentWindow?.document;
        if (doc) {
          doc.open();
          doc.write(`
            <!DOCTYPE html>
            <html>
              <head>
                <title>Ekjot_Singh_Nagpal_CV</title>
                <style>
                  @page { margin: 15mm; size: A4 portrait; }
                  body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; color: #111; margin: 0; padding: 0; line-height: 1.5; }
                </style>
              </head>
              <body>
                ${resumeRef.current.innerHTML}
              </body>
            </html>
          `);
          doc.close();

          setTimeout(() => {
            printFrame.contentWindow?.focus();
            printFrame.contentWindow?.print();
            setTimeout(() => {
              if (document.body.contains(printFrame)) {
                document.body.removeChild(printFrame);
              }
            }, 2000);
          }, 300);
        }
      }
    }
  }, []);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-in fade-in duration-200 no-print"
      data-lenis-prevent
    >
      <div
        className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl overflow-hidden my-6 border border-neutral-200 max-h-[90vh] max-h-[90dvh] flex flex-col accelerate-gpu"
        data-lenis-prevent
      >
        {/* Header Bar - Hidden during printing */}
        <div className="p-4 sm:p-6 bg-neutral-900 text-white flex items-center justify-between border-b border-neutral-800 no-print flex-shrink-0">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-blue-500 inline-block" />
            <span className="text-xs font-mono tracking-wider uppercase text-neutral-300">
              Curriculum Vitae // SDE &amp; AI Practitioner
            </span>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            {/* Primary Action: Direct Save / Download PDF */}
            <button
              id="save-pdf-btn"
              onClick={handleSavePDF}
              disabled={isGenerating}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-xs font-bold text-white transition-all shadow-xs disabled:opacity-60 cursor-pointer"
              title="Generate and download PDF file"
            >
              {isGenerating ? (
                <>
                  <Loader2 size={14} className="animate-spin text-white" />
                  <span>Generating PDF...</span>
                </>
              ) : isSaved ? (
                <>
                  <Check size={14} className="text-emerald-300" />
                  <span>PDF Downloaded!</span>
                </>
              ) : (
                <>
                  <Download size={14} />
                  <span>Save PDF</span>
                </>
              )}
            </button>

            {/* Secondary Action: Print via System Dialog */}
            <button
              id="print-resume-btn"
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-xs font-semibold text-neutral-200 transition-colors cursor-pointer"
              title="Open browser print dialog"
            >
              <Printer size={14} />
              <span className="hidden sm:inline">Print</span>
            </button>

            {/* Close Modal */}
            <button
              id="close-resume-modal-btn"
              onClick={onClose}
              className="p-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-400 hover:text-white transition-colors cursor-pointer"
              aria-label="Close resume"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Resume Content Container (Printable & Export Target) */}
        <div
          id="printable-resume"
          ref={resumeRef}
          className="p-6 sm:p-10 overflow-y-auto space-y-8 text-neutral-900 font-sans bg-white"
          data-lenis-prevent
        >
          {/* Resume Header */}
          <div className="border-b border-neutral-200 pb-6 space-y-3">
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight uppercase text-neutral-950">
              {PERSONAL_INFO.name}
            </h2>
            <p className="text-sm font-semibold text-blue-700 tracking-wide">
              {PERSONAL_INFO.role}
            </p>
            <div className="flex flex-wrap items-center gap-4 text-xs text-neutral-600 font-medium">
              <span className="flex items-center gap-1">
                <MapPin size={13} className="text-neutral-400" />
                {PERSONAL_INFO.location}
              </span>
              <span>•</span>
              <a
                href={`mailto:${PERSONAL_INFO.email}`}
                className="flex items-center gap-1 hover:text-blue-600"
              >
                <Mail size={13} className="text-neutral-400" />
                {PERSONAL_INFO.email}
              </a>
              <span>•</span>
              <a
                href={PERSONAL_INFO.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 hover:text-blue-600"
              >
                <Github size={13} className="text-neutral-400" />
                github.com/Nagpal-11
              </a>
            </div>
          </div>

          {/* Education */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-neutral-500 font-bold border-b border-neutral-200 pb-1">
              <GraduationCap size={15} className="text-blue-600" />
              <span>EDUCATION</span>
            </div>
            <div className="flex flex-col sm:flex-row justify-between sm:items-baseline gap-1">
              <div>
                <h3 className="text-base font-bold text-neutral-900">
                  Mizoram University (Central University, NAAC 'A' Grade)
                </h3>
                <p className="text-sm text-neutral-700">
                  Bachelor of Technology (B.Tech) in Computer Engineering
                </p>
              </div>
              <span className="text-xs font-mono font-semibold text-neutral-500">
                2023 – 2027 (Final Year)
              </span>
            </div>
            <p className="text-xs text-neutral-600">
              Coursework: Data Structures &amp; Algorithms, Object-Oriented Programming, Database Management Systems, Operating Systems, Machine Learning Foundations, Software Engineering.
            </p>
          </div>

          {/* Experience & Grants */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-neutral-500 font-bold border-b border-neutral-200 pb-1">
              <Briefcase size={15} className="text-blue-600" />
              <span>EXPERIENCE &amp; GRANTS</span>
            </div>

            {/* Grant / Clinical AI Platform */}
            <div className="space-y-1.5">
              <div className="flex flex-col sm:flex-row justify-between sm:items-baseline gap-1">
                <div>
                  <h3 className="text-base font-bold text-neutral-900">
                    MeitY GENESIS Entrepreneur-in-Residence (EiR) Grantee
                  </h3>
                  <p className="text-sm font-semibold text-blue-700">
                    Clinical AI Platform — Healthcare Diagnostic Engine
                  </p>
                </div>
                <span className="text-xs font-mono font-semibold text-neutral-500">
                  Nov 2025 – Present
                </span>
              </div>
              <p className="text-xs text-neutral-600 leading-relaxed">
                • Awarded ₹5 Lakhs grant under the Ministry of Electronics and Information Technology (MeitY) GENESIS EiR initiative to pioneer an accessible healthcare triage assistant.<br />
                • Leading the technical architecture integrating fine-tuned LLaMA2 with a lightweight Flask backend and privacy-first data handling pipelines.
              </p>
            </div>

            {/* AI Club Lead */}
            <div className="space-y-1.5 pt-2">
              <div className="flex flex-col sm:flex-row justify-between sm:items-baseline gap-1">
                <div>
                  <h3 className="text-base font-bold text-neutral-900">
                    AI Club Coordinator
                  </h3>
                  <p className="text-sm text-neutral-700">
                    Mizoram University Student Technical Council
                  </p>
                </div>
                <span className="text-xs font-mono font-semibold text-neutral-500">
                  2024 – Present
                </span>
              </div>
              <p className="text-xs text-neutral-600 leading-relaxed">
                • Orchestrating workshops, coding competitions, and machine learning study groups for 150+ undergraduate engineering students.
              </p>
            </div>
          </div>

          {/* Key Projects */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-neutral-500 font-bold border-b border-neutral-200 pb-1">
              <Cpu size={15} className="text-blue-600" />
              <span>SELECTED PROJECTS</span>
            </div>

            {/* Project 1 */}
            <div className="space-y-1">
              <div className="flex justify-between items-baseline">
                <h4 className="text-sm font-bold text-neutral-900">
                  Interactive Sentiment Analysis Web App (Simple RNN)
                </h4>
                <span className="text-xs font-mono text-neutral-500">Python · TensorFlow · Keras</span>
              </div>
              <p className="text-xs text-neutral-600 leading-relaxed">
                • Designed and trained a custom Recurrent Neural Network (1,313,025 trainable parameters, ~5.01 MB footprint) achieving 94.23% classification accuracy.<br />
                • Implemented vocabulary tokenization and interactive real-time probability dashboard for live sentiment inference.
              </p>
            </div>

            {/* Project 2 */}
            <div className="space-y-1">
              <div className="flex justify-between items-baseline">
                <h4 className="text-sm font-bold text-neutral-900">
                  End-to-End Customer Churn Prediction (ANN)
                </h4>
                <span className="text-xs font-mono text-neutral-500">TensorFlow · Streamlit · Python</span>
              </div>
              <p className="text-xs text-neutral-600 leading-relaxed">
                • Built an Artificial Neural Network model trained on multi-attribute customer behavior to project churn risk in real time.<br />
                • Deployed on Streamlit Cloud with dynamic scenario sliders enabling business teams to run churn sensitivity simulations.
              </p>
            </div>

            {/* Project 3 */}
            <div className="space-y-1">
              <div className="flex justify-between items-baseline">
                <h4 className="text-sm font-bold text-neutral-900">
                  AI Healthcare Assistant (Conversational Triage)
                </h4>
                <span className="text-xs font-mono text-neutral-500">LLaMA2 · Flask · NLP</span>
              </div>
              <p className="text-xs text-neutral-600 leading-relaxed">
                • Developed patient symptom consultation engine with NLP entity extraction and structured clinical priority recommendations.
              </p>
            </div>
          </div>

          {/* Honors & Competitions */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-neutral-500 font-bold border-b border-neutral-200 pb-1">
              <Award size={15} className="text-blue-600" />
              <span>HONORS &amp; COMPETITIONS</span>
            </div>
            <ul className="text-xs text-neutral-700 space-y-1.5 list-disc list-inside">
              <li>
                <span className="font-bold">Winner, Yuvamanthan Hackathon 2025</span> — Organized by Mizoram University and Ministry of Education, Govt. of India (AI Healthcare Prototype).
              </li>
              <li>
                <span className="font-bold">1st Place, Case Study Competition (Oct 2025)</span> — Strategic expansion model for regional brand "Milk Candy".
              </li>
              <li>
                <span className="font-bold">State-Level Space Olympiad Qualifier</span> — Commended for high analytical problem-solving and mathematical aptitude.
              </li>
            </ul>
          </div>

          {/* Technical Skills */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-neutral-500 font-bold border-b border-neutral-200 pb-1">
              <span>TECHNICAL SKILLS</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div>
                <span className="font-bold text-neutral-900">Languages &amp; Systems:</span>
                <p className="text-neutral-600">Python, C, C++, SQL, HTML5, CSS3, JavaScript</p>
              </div>
              <div>
                <span className="font-bold text-neutral-900">Machine Learning / AI:</span>
                <p className="text-neutral-600">TensorFlow, Keras, PyTorch, ANN, Simple RNN, NLP, Tokenization, LLaMA2</p>
              </div>
              <div>
                <span className="font-bold text-neutral-900">Core Computer Science:</span>
                <p className="text-neutral-600">Data Structures &amp; Algorithms, Object-Oriented Programming (OOP), SDLC, Query Optimization</p>
              </div>
              <div>
                <span className="font-bold text-neutral-900">Frameworks &amp; Tools:</span>
                <p className="text-neutral-600">Flask, Streamlit, Git, GitHub, Scikit-Learn, Pandas, NumPy</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
