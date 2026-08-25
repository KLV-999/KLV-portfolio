'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
  Search,
  Mic,
  MicOff,
  ChevronDown,
  Globe,
  Shield,
  Youtube,
  MessageSquare,
  Mail,
  MessageCircle,
  Github,
  Linkedin,
} from 'lucide-react';
import { CornerBrackets } from '../ui/CornerBrackets';

interface QuickApp {
  name: string;
  url: string;
  icon: React.FC<{ className?: string }>;
}

const QUICK_APPS: QuickApp[] = [
  { name: 'Gmail', url: 'https://mail.google.com/', icon: Mail },
  { name: 'YouTube', url: 'https://www.youtube.com/', icon: Youtube },
  { name: 'WhatsApp', url: 'https://web.whatsapp.com/', icon: MessageCircle },
  { name: 'GitHub', url: 'https://github.com/', icon: Github },
  { name: 'LinkedIn', url: 'https://www.linkedin.com/', icon: Linkedin },
];

interface SearchEngine {
  id: 'google' | 'brave' | 'youtube' | 'whatsapp';
  name: string;
  url: string;
  icon: React.FC<{ className?: string }>;
}

const SEARCH_ENGINES: SearchEngine[] = [
  {
    id: 'google',
    name: 'Google',
    url: 'https://www.google.com/search?q=',
    icon: Globe,
  },
  {
    id: 'brave',
    name: 'Brave',
    url: 'https://search.brave.com/search?q=',
    icon: Shield,
  },
  {
    id: 'youtube',
    name: 'YouTube',
    url: 'https://www.youtube.com/results?search_query=',
    icon: Youtube,
  },
  {
    id: 'whatsapp',
    name: 'WhatsApp',
    url: 'https://wa.me/?text=',
    icon: MessageSquare,
  },
];

export const SearchConsole: React.FC = () => {
  const [selectedEngine, setSelectedEngine] = useState<SearchEngine>(SEARCH_ENGINES[0]);
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
  const [query, setQuery] = useState<string>('');
  const [isListening, setIsListening] = useState<boolean>(false);
  const [speechSupported, setSpeechSupported] = useState<boolean>(true);
  const [isFocused, setIsFocused] = useState<boolean>(false);

  const dropdownRef = useRef<HTMLDivElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const recognitionRef = useRef<any>(null);

  // Initialize Web Speech API
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = true;
      recognition.lang = 'en-US';

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      recognition.onresult = (event: any) => {
        const transcript = Array.from(event.results)
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          .map((result: any) => result[0].transcript)
          .join('');
        setQuery(transcript);
      };

      recognition.onerror = () => {
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = recognition;
    } else {
      setSpeechSupported(false);
    }

    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleListening = () => {
    if (!speechSupported || !recognitionRef.current) return;

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      try {
        recognitionRef.current.start();
        setIsListening(true);
      } catch {
        setIsListening(false);
      }
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    const targetUrl = selectedEngine.url + encodeURIComponent(query.trim());
    window.open(targetUrl, '_blank', 'noopener,noreferrer');
  };

  const SelectedIcon = selectedEngine.icon;

  return (
    <div className="w-full max-w-[620px] mx-auto relative z-20">
      <form
        onSubmit={handleSearchSubmit}
        className={`relative flex items-center gap-2 p-1.5 sm:p-2 rounded-2xl glass-panel transition-all duration-300 ${
          isFocused || dropdownOpen
            ? 'glass-panel-cyan shadow-[0_0_25px_rgba(0,229,255,0.25)] border-cyan/60'
            : 'border-white/10 hover:border-cyan/30'
        }`}
      >
        <CornerBrackets active={isFocused || dropdownOpen} size={10} />

        {/* Left Side: Engine Dropdown Selector */}
        <div className="relative" ref={dropdownRef}>
          <button
            type="button"
            onClick={() => setDropdownOpen((prev) => !prev)}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-space-bg/80 hover:bg-cyan/10 border border-white/10 hover:border-cyan/40 text-cyan transition-all text-xs font-mono tracking-wider"
            title={`Active Search Engine: ${selectedEngine.name}`}
          >
            <SelectedIcon className="w-4 h-4 text-cyan" />
            <span className="hidden sm:inline font-bold">{selectedEngine.name}</span>
            <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${dropdownOpen ? 'rotate-180 text-cyan' : 'text-gray-400'}`} />
          </button>

          {/* Engine Dropdown Menu */}
          {dropdownOpen && (
            <div className="absolute top-full left-0 mt-2 w-44 rounded-xl glass-panel-cyan border border-cyan/40 p-1.5 shadow-[0_10px_30px_rgba(0,0,0,0.8)] z-50">
              <div className="text-[9px] font-mono text-cyan/70 px-2 py-1 uppercase tracking-widest border-b border-cyan/20 mb-1">
                // SELECT COMMAND ENGINE
              </div>
              {SEARCH_ENGINES.map((engine) => {
                const Icon = engine.icon;
                const isSelected = engine.id === selectedEngine.id;
                return (
                  <button
                    key={engine.id}
                    type="button"
                    onClick={() => {
                      setSelectedEngine(engine);
                      setDropdownOpen(false);
                    }}
                    className={`w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-xs font-mono transition-all text-left ${
                      isSelected
                        ? 'bg-cyan/20 text-cyan font-bold border border-cyan/40'
                        : 'text-gray-300 hover:bg-space-hover hover:text-cyan'
                    }`}
                  >
                    <Icon className={`w-4 h-4 ${isSelected ? 'text-cyan' : 'text-gray-400'}`} />
                    <span>{engine.name}</span>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Center: Search Input */}
        <div className="flex-1 relative flex items-center">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder="Search the archive..."
            className="w-full bg-transparent border-none outline-none text-xs sm:text-sm font-mono text-gray-100 placeholder-gray-500 px-2 py-1 focus:ring-0"
          />
        </div>

        {/* Right Side: Microphone Web Speech Button */}
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={toggleListening}
            disabled={!speechSupported}
            aria-label={
              speechSupported
                ? isListening
                  ? 'Stop voice search'
                  : 'Search by voice'
                : 'Voice search unavailable in this browser'
            }
            aria-pressed={isListening}
            title={
              speechSupported
                ? isListening
                  ? 'Listening... Click to stop'
                  : 'Click for Voice Search'
                : 'Web Speech API not supported in this browser'
            }
            className={`relative p-2 rounded-xl transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan ${
              isListening
                ? 'bg-cyan/20 text-cyan border border-cyan shadow-[0_0_15px_#00E5FF]'
                : speechSupported
                ? 'text-gray-400 hover:text-cyan hover:bg-cyan/10'
                : 'text-gray-600 cursor-not-allowed opacity-50'
            }`}
          >
            {isListening ? (
              <>
                <Mic className="w-4 h-4 text-cyan animate-pulse" aria-hidden="true" />
                <span className="absolute -inset-1 rounded-xl border border-cyan animate-ping opacity-50 pointer-events-none" />
              </>
            ) : speechSupported ? (
              <Mic className="w-4 h-4" aria-hidden="true" />
            ) : (
              <MicOff className="w-4 h-4" aria-hidden="true" />
            )}
          </button>

          {/* Submit Icon Button */}
          <button
            type="submit"
            className="p-2 rounded-xl bg-cyan text-black font-bold hover:bg-white hover:shadow-[0_0_15px_#00E5FF] transition-all"
            title="Execute Command Search"
          >
            <Search className="w-4 h-4" />
          </button>
        </div>
      </form>

      {/* Quick-launch App Shortcuts */}
      <div
        className="flex items-center justify-center gap-3 mt-3 flex-wrap"
        role="group"
        aria-label="Quick app shortcuts"
      >
        {QUICK_APPS.map((app) => {
          const Icon = app.icon;
          return (
            <a
              key={app.name}
              href={app.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Open ${app.name}`}
              title={app.name}
              className="flex items-center justify-center w-9 h-9 rounded-full bg-space-bg/80 border border-white/10 text-gray-400 hover:text-cyan hover:border-cyan/50 hover:shadow-[0_0_12px_rgba(0,229,255,0.35)] transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan"
            >
              <Icon className="w-4 h-4" />
            </a>
          );
        })}
      </div>
    </div>
  );
};
