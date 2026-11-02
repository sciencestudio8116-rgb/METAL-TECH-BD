import React, { useState, useMemo } from 'react';
import { ALLOY_DATABASE, Alloy } from '../data/siteData';
import { Search, Filter, RotateCcw, Download, ArrowRight, ShieldCheck, ChevronDown, Check } from 'lucide-react';

interface AlloyFinderProps {
  onSelectAlloyForQuote: (alloyName: string) => void;
  onOpenAlloyGuideDownload: () => void;
}

export const AlloyFinder: React.FC<AlloyFinderProps> = ({ 
  onSelectAlloyForQuote,
  onOpenAlloyGuideDownload,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFamily, setSelectedFamily] = useState<string>('All');
  const [selectedProcess, setSelectedProcess] = useState<string>('All');
  const [selectedAttribute, setSelectedAttribute] = useState<string>('All');
  const [expandedAlloyId, setExpandedAlloyId] = useState<string | null>(null);

  // Extract unique families
  const families = ['All', 'Stainless Steel', 'Nickel-Base Superalloy', 'Cobalt-Base', 'Copper-Base & Bronze', 'Wear-Resistant'];
  const processes = ['All', 'Centrifugal Casting', 'Sand Casting', 'Investment Casting'];
  const attributes = ['All', 'Corrosion', 'Heat', 'Wear', 'Cryogenic'];

  const filteredAlloys = useMemo(() => {
    return ALLOY_DATABASE.filter(alloy => {
      // Search text match
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch = !query || 
        alloy.name.toLowerCase().includes(query) ||
        alloy.castUNS.toLowerCase().includes(query) ||
        alloy.castGrade.toLowerCase().includes(query) ||
        alloy.castASTM.toLowerCase().includes(query) ||
        alloy.equivalentDIN.toLowerCase().includes(query) ||
        alloy.description.toLowerCase().includes(query);

      // Family match
      const matchesFamily = selectedFamily === 'All' || alloy.family === selectedFamily;

      // Process match
      const matchesProcess = selectedProcess === 'All' || 
        alloy.suitableProcesses.some(p => p.includes(selectedProcess) || selectedProcess.includes(p));

      // Attribute match
      const matchesAttr = selectedAttribute === 'All' ||
        alloy.keyAttributes.some(attr => attr.toLowerCase().includes(selectedAttribute.toLowerCase())) ||
        alloy.description.toLowerCase().includes(selectedAttribute.toLowerCase());

      return matchesSearch && matchesFamily && matchesProcess && matchesAttr;
    });
  }, [searchQuery, selectedFamily, selectedProcess, selectedAttribute]);

  const handleReset = () => {
    setSearchQuery('');
    setSelectedFamily('All');
    setSelectedProcess('All');
    setSelectedAttribute('All');
  };

  return (
    <div className="space-y-6">
      {/* Intro Action Bar */}
      <div className="bg-slate-50 border border-[#D9DCE1] rounded-sm p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <h2 className="text-base sm:text-lg font-bold text-[#0F1B2D] m-0">
            Non-Ferrous, Stainless & Specialty Alloys Guide
          </h2>
          <p className="text-xs text-slate-600 m-0 max-w-2xl leading-relaxed">
            Search our comprehensive database of high-integrity casting alloys. View verified chemical compositions, mechanical properties, and ASTM / DIN equivalents.
          </p>
        </div>
        <button
          onClick={onOpenAlloyGuideDownload}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#1D4ED8] hover:bg-[#163A9E] text-white text-xs font-bold rounded-sm transition-colors cursor-pointer shrink-0"
        >
          <Download className="w-4 h-4" />
          <span>Download 2026 Alloy Guide (PDF)</span>
        </button>
      </div>

      {/* Filter and Search Controls Bar */}
      <div className="bg-white border border-[#D9DCE1] rounded-sm p-4 sm:p-6 shadow-xs space-y-4">
        <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by alloy name, UNS (e.g. J92900), ASTM, DIN (1.4408), or keyword..."
              className="w-full pl-10 pr-4 py-2.5 text-sm border border-slate-300 rounded-sm focus:outline-hidden focus:border-[#1D4ED8]"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-700"
              >
                Clear
              </button>
            )}
          </div>

          {/* Reset Action */}
          <button
            onClick={handleReset}
            className="flex items-center justify-center gap-1.5 px-4 py-2.5 text-xs font-semibold text-slate-600 hover:text-slate-900 border border-slate-300 rounded-sm hover:bg-slate-50 transition-colors whitespace-nowrap cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset All Filters</span>
          </button>
        </div>

        {/* Filter Selectors Row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 border-t border-slate-100">
          {/* Family Filter */}
          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">
              Alloy Family
            </label>
            <select
              value={selectedFamily}
              onChange={(e) => setSelectedFamily(e.target.value)}
              className="w-full px-3 py-2 text-xs border border-slate-300 rounded-sm bg-white focus:outline-hidden focus:border-[#1D4ED8]"
            >
              {families.map(f => (
                <option key={f} value={f}>{f === 'All' ? 'All Alloy Families' : f}</option>
              ))}
            </select>
          </div>

          {/* Process Filter */}
          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">
              Casting Process
            </label>
            <select
              value={selectedProcess}
              onChange={(e) => setSelectedProcess(e.target.value)}
              className="w-full px-3 py-2 text-xs border border-slate-300 rounded-sm bg-white focus:outline-hidden focus:border-[#1D4ED8]"
            >
              {processes.map(p => (
                <option key={p} value={p}>{p === 'All' ? 'All Casting Processes' : p}</option>
              ))}
            </select>
          </div>

          {/* Property Requirement */}
          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">
              Service Condition
            </label>
            <select
              value={selectedAttribute}
              onChange={(e) => setSelectedAttribute(e.target.value)}
              className="w-full px-3 py-2 text-xs border border-slate-300 rounded-sm bg-white focus:outline-hidden focus:border-[#1D4ED8]"
            >
              <option value="All">All Operating Conditions</option>
              <option value="Corrosion">Severe Corrosion / Acid Service</option>
              <option value="Heat">High Temperature / Furnace (600°C+)</option>
              <option value="Wear">Abrasion, Cavitation & Galling Wear</option>
              <option value="Cryogenic">Cryogenic Impact Toughness (-196°C)</option>
            </select>
          </div>
        </div>

        {/* Results Counter and Active Filter Tags */}
        <div className="flex items-center justify-between text-xs text-slate-500 pt-1">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-800 tabular-nums">{filteredAlloys.length}</span>
            <span>alloys matching your technical criteria</span>
          </div>
          {(selectedFamily !== 'All' || selectedProcess !== 'All' || selectedAttribute !== 'All' || searchQuery) && (
            <div className="text-xs text-[#1D4ED8] font-medium">
              Filters active · <button onClick={handleReset} className="underline hover:text-[#163A9E]">Clear all</button>
            </div>
          )}
        </div>
      </div>

      {/* Alloy Cards Grid */}
      {filteredAlloys.length === 0 ? (
        <div className="bg-white border border-[#D9DCE1] rounded-sm p-12 text-center space-y-4">
          <p className="text-base text-slate-600 font-medium">
            No standard alloy grades matched your exact search query.
          </p>
          <p className="text-xs text-slate-500 max-w-md mx-auto">
            Metal Tech BD specializes in tailored customer chemistries. Our in-house AOD metallurgical team can melt custom specifications.
          </p>
          <button
            onClick={() => onSelectAlloyForQuote('Custom Formulation')}
            className="px-5 py-2.5 bg-[#1D4ED8] text-white text-xs font-bold rounded-sm hover:bg-[#163A9E]"
          >
            Inquire About Custom Alloy Melts
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {filteredAlloys.map((alloy) => {
            const isExpanded = expandedAlloyId === alloy.id;
            return (
              <div 
                key={alloy.id}
                className="bg-white border border-[#D9DCE1] rounded-sm shadow-xs hover:shadow-md transition-shadow duration-200 overflow-hidden"
              >
                {/* Main Card Header */}
                <div className="p-6 border-b border-slate-100 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2.5 text-xs">
                      <span className="font-bold text-[#1D4ED8] uppercase tracking-wider">{alloy.family}</span>
                      <span className="text-slate-300">·</span>
                      <span className="text-slate-500">Wrought Equiv: <strong className="text-slate-700">{alloy.wroughtEquiv}</strong></span>
                    </div>
                    <h2 className="text-xl sm:text-2xl font-bold text-[#0F1B2D] m-0">
                      {alloy.name}
                    </h2>
                    <p className="text-xs text-[#5B6470] max-w-2xl m-0 leading-relaxed">
                      {alloy.description}
                    </p>
                  </div>

                  {/* Quick Specs Pill Box (Design Constitution: clean metadata) */}
                  <div className="flex flex-wrap lg:flex-col lg:items-end gap-1.5 text-xs text-slate-600 shrink-0">
                    <div><span className="text-slate-400">Cast UNS:</span> <strong className="text-slate-800">{alloy.castUNS}</strong></div>
                    <div><span className="text-slate-400">ASTM Spec:</span> <strong className="text-slate-800">{alloy.castASTM}</strong></div>
                    <div><span className="text-slate-400">DIN / EN:</span> <strong className="text-slate-800">{alloy.equivalentDIN}</strong></div>
                  </div>
                </div>

                {/* Key Attributes & Suitable Processes */}
                <div className="px-6 py-3 bg-slate-50 border-b border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs">
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-slate-600">
                    <span className="font-semibold text-slate-700">Suitable For:</span>
                    {alloy.suitableProcesses.map(proc => (
                      <span key={proc} className="text-[#1D4ED8] font-medium">✓ {proc}</span>
                    ))}
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setExpandedAlloyId(isExpanded ? null : alloy.id)}
                      className="text-[#1D4ED8] hover:text-[#163A9E] font-bold flex items-center gap-1 cursor-pointer"
                    >
                      <span>{isExpanded ? 'Hide Specifications' : 'View Full Chemical & Mechanical Data'}</span>
                      <ChevronDown className={`w-3.5 h-3.5 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                    </button>
                  </div>
                </div>

                {/* Expanded Detailed Metallurgy Tables */}
                {isExpanded && (
                  <div className="p-6 space-y-6 bg-white animate-in fade-in duration-150">
                    {/* 2-Column Split: Chemistry & Mechanical */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      {/* Chemical Composition Table */}
                      <div className="space-y-2">
                        <div className="flex items-center justify-between pb-1 border-b border-slate-200">
                          <h4 className="text-xs font-bold uppercase tracking-wider text-[#0F1B2D]">
                            Chemical Composition (% by Weight)
                          </h4>
                          <span className="text-[11px] text-slate-400">OES Certified</span>
                        </div>
                        <div className="overflow-x-auto">
                          <table className="w-full text-xs text-left">
                            <thead>
                              <tr className="border-b border-slate-200 text-slate-400">
                                <th className="py-1.5 font-semibold">Element</th>
                                <th className="py-1.5 font-semibold">Min %</th>
                                <th className="py-1.5 font-semibold">Max %</th>
                                <th className="py-1.5 font-semibold">Typical</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                              {alloy.composition.map((comp, idx) => (
                                <tr key={idx} className="hover:bg-slate-50">
                                  <td className="py-1.5 font-medium text-slate-800">{comp.element}</td>
                                  <td className="py-1.5 tabular-nums text-slate-600">{comp.min !== undefined ? `${comp.min}%` : '—'}</td>
                                  <td className="py-1.5 tabular-nums text-slate-600">{comp.max !== undefined ? `${comp.max}%` : '—'}</td>
                                  <td className="py-1.5 text-slate-600">{comp.typical || '—'}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>

                      {/* Mechanical Properties Table */}
                      <div className="space-y-2">
                        <div className="flex items-center justify-between pb-1 border-b border-slate-200">
                          <h4 className="text-xs font-bold uppercase tracking-wider text-[#0F1B2D]">
                            Minimum Mechanical Properties
                          </h4>
                          <span className="text-[11px] text-slate-400">Room Temp (20°C)</span>
                        </div>
                        <div className="overflow-x-auto">
                          <table className="w-full text-xs text-left">
                            <tbody className="divide-y divide-slate-100">
                              <tr>
                                <td className="py-2 text-slate-500 font-medium">Tensile Strength (Rm)</td>
                                <td className="py-2 font-bold text-slate-800 tabular-nums">{alloy.mechanical.tensileStrengthMpa} MPa (min)</td>
                              </tr>
                              <tr>
                                <td className="py-2 text-slate-500 font-medium">Yield Strength (0.2% Rp0.2)</td>
                                <td className="py-2 font-bold text-slate-800 tabular-nums">{alloy.mechanical.yieldStrengthMpa} MPa (min)</td>
                              </tr>
                              <tr>
                                <td className="py-2 text-slate-500 font-medium">Elongation in 50mm (A5)</td>
                                <td className="py-2 font-bold text-slate-800 tabular-nums">{alloy.mechanical.elongationPct}% (min)</td>
                              </tr>
                              <tr>
                                <td className="py-2 text-slate-500 font-medium">Hardness</td>
                                <td className="py-2 font-bold text-slate-800 tabular-nums">{alloy.mechanical.hardnessHB} HB</td>
                              </tr>
                              <tr>
                                <td className="py-2 text-slate-500 font-medium">Standard Heat Treatment</td>
                                <td className="py-2 text-slate-700">{alloy.mechanical.condition}</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>

                    {/* Typical Applications Row */}
                    <div className="p-3 bg-slate-50 rounded text-xs space-y-1">
                      <strong className="text-slate-800">Typical Components & Service Applications:</strong>
                      <div className="flex flex-wrap gap-2 text-slate-600">
                        {alloy.applications.map((app, idx) => (
                          <span key={idx} className="bg-white px-2 py-0.5 border border-slate-200 rounded-sm">
                            {app}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Bottom Card Actions */}
                <div className="p-4 bg-white border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    <span>EN 10204 Type 3.1 Certified Test Certificates Available</span>
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => onSelectAlloyForQuote(alloy.name)}
                      className="px-4 py-2 bg-[#1D4ED8] hover:bg-[#163A9E] text-white text-xs font-bold rounded-sm transition-colors cursor-pointer"
                    >
                      Request a Quote for {alloy.castGrade}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
