/** @jsxImportSource react */
import { useState, useEffect } from 'react';

interface Pattern {
  name: string;
  path: string;
  content?: string;
}

interface PatternSelectorProps {
  onSelect: (content: string) => void;
  currentCode?: string;
}

const LOCAL_STORAGE_KEY = 'dj_karbonkel_patterns';

export default function PatternSelector({ onSelect, currentCode }: PatternSelectorProps) {
  const [patterns, setPatterns] = useState<Pattern[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Load both predefined and local patterns
    Promise.all([
      fetch('/patterns/index.json').then(res => res.json()),
      Promise.resolve(JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) || '[]'))
    ]).then(([predefined, local]) => {
      setPatterns([...predefined, ...local]);
    }).catch(err => console.error('Error loading patterns:', err));
  }, []);

  const handleSelect = async (path: string) => {
    setLoading(true);
    try {
      const pattern = patterns.find(p => p.path === path);
      if (pattern?.content) {
        // Local pattern
        onSelect(pattern.content);
      } else {
        // Predefined pattern
        const response = await fetch(path);
        const content = await response.text();
        onSelect(content);
      }
    } catch (err) {
      console.error('Error loading pattern:', err);
    }
    setLoading(false);
  };

  const handleSave = () => {
    if (!currentCode) return;
    
    const timestamp = new Date().toISOString().slice(0, 19).replace('T', ' ');
    const newPattern = {
      name: `DJ KARBONKEL - ${timestamp}`,
      path: `local_${Date.now()}`,
      content: currentCode
    };

    const localPatterns = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) || '[]');
    localPatterns.push(newPattern);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(localPatterns));

    setPatterns(prev => [...prev, newPattern]);
  };

  return (
    <div className="flex items-center space-x-2">
      <select
        className="bg-slate-800 text-white px-4 py-2 rounded-md border border-slate-600"
        onChange={(e) => handleSelect(e.target.value)}
        disabled={loading}
      >
        <option value="">Select a pattern...</option>
        {patterns.map((pattern) => (
          <option key={pattern.path} value={pattern.path}>
            {pattern.name}
          </option>
        ))}
      </select>
      <button
        onClick={handleSave}
        className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded-md"
        title="Save current pattern"
      >
        Save
      </button>
      {loading && (
        <span className="ml-2 text-sm text-slate-400">Loading...</span>
      )}
    </div>
  );
} 