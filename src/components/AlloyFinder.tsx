import React, { useState, useMemo } from 'react';
import { ALLOY_DATABASE, Alloy } from '../data/siteData';
import { Search, RotateCcw, Download, ArrowRight, ShieldCheck, X } from 'lucide-react';

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
    <div className="space-y-8">
      {/* Intro Action Bar */}
      <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xs">
        <div className="space-y-1.5">
          <h2 className="text-base sm:text-lg font-bold text-[#0F1B2D] m-0">
            Non-Ferrous, Stainless & Specialty Alloys Guide
          </h2>
          <p className="text-xs text-slate-600 m-0 max-w-2xl leading-relaxed">
            Search our comprehensive database of high-integrity casting alloys. View verified chemical compositions, mechanical properties, and ASTM / DIN equivalents.
          </p>
        </div>
        <button
          onClick={onOpenAlloyGuideDownload}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#1D4ED8] hover:bg-[#163A9E] text-white text-xs font-bold rounded-lg transition-colors cursor-pointer shrink-0"
        >
          <Download className="w-4 h-4" />
          <span>Download 2026 Alloy Guide (PDF)</span>
        </button>
      </div>

      {/* Filter and Search Controls Bar */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 sm:p-6 shadow-xs space-y-4">
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

      {/* Alloy Square Boxes Grid */}
      {filteredAlloys.length === 0 ? (
        <div className="bg-white border border-[#D9DCE1] rounded-xl p-12 text-center space-y-4">
          <p className="text-base text-slate-600 font-medium">
            No standard alloy grades matched your exact search query.
          </p>
          <p className="text-xs text-slate-500 max-w-md mx-auto">
            Metal Tech BD specializes in tailored customer chemistries. Our in-house AOD metallurgical team can melt custom specifications.
          </p>
          <button
            onClick={() => onSelectAlloyForQuote('Custom Formulation')}
            className="px-5 py-2.5 bg-[#1D4ED8] text-white text-xs font-bold rounded-lg hover:bg-[#163A9E] cursor-pointer"
          >
            Inquire About Custom Alloy Melts
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAlloys.map((alloy) => (
            <div
              key={alloy.id}
              className="aspect-square rounded-xl border border-slate-200 hover:border-[#1D4ED8] hover:ring-1 hover:ring-[#1D4ED8]/20 bg-white p-5 sm:p-6 flex flex-col justify-between shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden group"
            >
              {/* Top Content: Family, Name, and Justified Description */}
              <div className="space-y-2 min-h-0">
                <div className="flex items-center justify-between gap-2 text-[11px]">
                  <span className="font-bold text-[#1D4ED8] uppercase tracking-wider truncate">
                    {alloy.family}
                  </span>
                  <span className="font-semibold text-slate-500 shrink-0">
                    UNS {alloy.castUNS}
                  </span>
                </div>

                <h2 className="text-base sm:text-lg font-bold text-[#0F1B2D] group-hover:text-[#1D4ED8] transition-colors m-0 leading-snug">
                  {alloy.name}
                </h2>

                <div className="w-10 h-[2px] bg-[#004B87] rounded-full group-hover:w-14 transition-all duration-300" />

                <p className="text-[11.5px] sm:text-xs text-[#5B6470] m-0 leading-relaxed text-justify">
                  {alloy.description}
                </p>
              </div>

              {/* Bottom Footer: Standards & Actions */}
              <div className="pt-3 border-t border-slate-100 space-y-2.5 shrink-0">
                <div className="flex items-center justify-between gap-2 text-[11px] text-slate-500">
                  <span className="truncate">
                    <strong className="text-slate-700">ASTM:</strong> {alloy.castASTM}
                  </span>
                  <span className="shrink-0">
                    <strong className="text-slate-700">Equiv:</strong> {alloy.wroughtEquiv}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setExpandedAlloyId(alloy.id)}
                    className="flex-1 px-3 py-2 bg-slate-50 hover:bg-slate-100 border border-slate-200 text-[#0F1B2D] text-[11px] font-bold rounded-lg transition-colors cursor-pointer text-center"
                  >
                    View Specs
                  </button>
                  <button
                    onClick={() => onSelectAlloyForQuote(alloy.name)}
                    className="flex-1 inline-flex items-center justify-center gap-1 px-3 py-2 bg-[#1D4ED8] hover:bg-[#163A9E] text-white text-[11px] font-bold rounded-lg transition-colors cursor-pointer"
                  >
                    <span>Quote</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Alloy Technical Datasheet Modal */}
      {(() => {
        const selectedAlloy: Alloy | undefined = expandedAlloyId
          ? ALLOY_DATABASE.find(a => a.id === expandedAlloyId)
          : undefined;
        if (!selectedAlloy) return null;

        return (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-[2px]"
            onClick={() => setExpandedAlloyId(null)}
          >
            <div
              className="w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-white rounded-xl shadow-2xl border border-slate-200"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="sticky top-0 z-10 bg-white px-6 py-5 border-b border-slate-200 flex items-start justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex flex-wrap items-center gap-2 text-xs">
                    <span className="font-bold text-[#1D4ED8] uppercase tracking-wider">
                      {selectedAlloy.family}
                    </span>
                    <span className="text-slate-300">·</span>
                    <span className="text-slate-600">
                      Cast UNS: <strong className="text-slate-800">{selectedAlloy.castUNS}</strong>
                    </span>
                    <span className="text-slate-300">·</span>
                    <span className="text-slate-600">
                      ASTM: <strong className="text-slate-800">{selectedAlloy.castASTM}</strong>
                    </span>
                    <span className="text-slate-300">·</span>
                    <span className="text-slate-600">
                      DIN/EN: <strong className="text-slate-800">{selectedAlloy.equivalentDIN}</strong>
                    </span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-[#0F1B2D] m-0">
                    {selectedAlloy.name}
                  </h3>
                </div>

                <button
                  onClick={() => setExpandedAlloyId(null)}
                  className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
                  aria-label="Close alloy specifications"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-6 space-y-6">
                <p className="text-sm text-[#5B6470] m-0 leading-relaxed text-justify">
                  {selectedAlloy.description}
                </p>

                <div className="px-4 py-2.5 bg-slate-50 rounded-lg border border-slate-200/80 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-600">
                  <span className="font-semibold text-slate-700">Suitable Casting Processes:</span>
                  {selectedAlloy.suitableProcesses.map(proc => (
                    <span key={proc} className="text-[#1D4ED8] font-medium">✓ {proc}</span>
                  ))}
                </div>

                {/* 2-Column Split: Chemistry & Mechanical */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Chemical Composition Table */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between pb-1 border-b border-slate-200">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-[#0F1B2D] m-0">
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
                          {selectedAlloy.composition.map((comp, idx) => (
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
                      <h4 className="text-xs font-bold uppercase tracking-wider text-[#0F1B2D] m-0">
                        Minimum Mechanical Properties
                      </h4>
                      <span className="text-[11px] text-slate-400">Room Temp (20°C)</span>
                    </div>
                    <div className="overflow-x-auto">
                      <table className="w-full text-xs text-left">
                        <tbody className="divide-y divide-slate-100">
                          <tr>
                            <td className="py-2 text-slate-500 font-medium">Tensile Strength (Rm)</td>
                            <td className="py-2 font-bold text-slate-800 tabular-nums">{selectedAlloy.mechanical.tensileStrengthMpa} MPa (min)</td>
                          </tr>
                          <tr>
                            <td className="py-2 text-slate-500 font-medium">Yield Strength (0.2% Rp0.2)</td>
                            <td className="py-2 font-bold text-slate-800 tabular-nums">{selectedAlloy.mechanical.yieldStrengthMpa} MPa (min)</td>
                          </tr>
                          <tr>
                            <td className="py-2 text-slate-500 font-medium">Elongation in 50mm (A5)</td>
                            <td className="py-2 font-bold text-slate-800 tabular-nums">{selectedAlloy.mechanical.elongationPct}% (min)</td>
                          </tr>
                          <tr>
                            <td className="py-2 text-slate-500 font-medium">Hardness</td>
                            <td className="py-2 font-bold text-slate-800 tabular-nums">{selectedAlloy.mechanical.hardnessHB} HB</td>
                          </tr>
                          <tr>
                            <td className="py-2 text-slate-500 font-medium">Standard Heat Treatment</td>
                            <td className="py-2 text-slate-700">{selectedAlloy.mechanical.condition}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>

                {/* Typical Applications Row */}
                <div className="p-4 bg-slate-50 rounded-lg border border-slate-200/70 text-xs space-y-2">
                  <strong className="text-slate-800 block">Typical Components &amp; Service Applications:</strong>
                  <div className="flex flex-wrap gap-2 text-slate-600">
                    {selectedAlloy.applications.map((app, idx) => (
                      <span key={idx} className="bg-white px-2.5 py-1 border border-slate-200 rounded-md">
                        {app}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>EN 10204 Type 3.1 Certified Test Certificates Available</span>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setExpandedAlloyId(null)}
                    className="px-4 py-2 border border-slate-300 bg-white hover:bg-slate-100 text-slate-700 text-xs font-semibold rounded-lg transition-colors cursor-pointer"
                  >
                    Close
                  </button>
                  <button
                    onClick={() => {
                      const alloyName = selectedAlloy.name;
                      setExpandedAlloyId(null);
                      onSelectAlloyForQuote(alloyName);
                    }}
                    className="px-5 py-2 bg-[#1D4ED8] hover:bg-[#163A9E] text-white text-xs font-bold rounded-lg transition-colors cursor-pointer"
                  >
                    Request a Quote for {selectedAlloy.castGrade}
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      })()}
    </div>
  );
};
