import React, { useState, useEffect } from 'react';
import { fetchHistory } from '../utils/api';
import { History, Search, Filter, Trash2, Eye, Calendar, Sparkles } from 'lucide-react';

const HistoryPage = ({ setActiveTab }) => {
  const [historyItems, setHistoryItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = async () => {
    const data = await fetchHistory();
    setHistoryItems(data);
  };

  const filteredItems = historyItems.filter(item => {
    const matchesSearch = (item.student_name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
                          (item.top_role || '').toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'All' || item.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const deleteItem = (id) => {
    setHistoryItems(prev => prev.filter(i => i.id !== id));
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 py-4">
      {/* Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 text-xs font-semibold">
          <History className="w-3.5 h-3.5 text-blue-500" />
          <span>Audit Log & Prediction Records</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white">
          Prediction History
        </h1>
        <p className="text-sm text-gray-500 dark:text-slate-400 max-w-xl mx-auto">
          Historical log of machine learning predictions generated across sessions.
        </p>
      </div>

      {/* Filter & Search Bar */}
      <div className="glass-card rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Search */}
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 absolute left-3.5 top-3 text-gray-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search candidate or role..."
            className="w-full glass-input pl-10 pr-4 py-2 rounded-xl text-sm"
          />
        </div>

        {/* Filter Dropdown */}
        <div className="flex items-center space-x-2 w-full sm:w-auto">
          <Filter className="w-4 h-4 text-gray-400" />
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="glass-input px-3 py-2 rounded-xl text-sm w-full sm:w-auto"
          >
            <option value="All">All Categories</option>
            <option value="High Chance">High Chance (&gt;75%)</option>
            <option value="Medium Chance">Medium Chance (50-75%)</option>
            <option value="Low Chance">Low Chance (&lt;50%)</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="glass-card rounded-3xl overflow-hidden border border-gray-200 dark:border-slate-800 shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-700 dark:text-slate-300">
            <thead className="bg-gray-50 dark:bg-slate-800/80 text-xs uppercase text-gray-400 font-extrabold border-b border-gray-200 dark:border-slate-800">
              <tr>
                <th className="px-6 py-4">Date & Time</th>
                <th className="px-6 py-4">Candidate</th>
                <th className="px-6 py-4">Probability</th>
                <th className="px-6 py-4">Status Category</th>
                <th className="px-6 py-4">Expected CTC</th>
                <th className="px-6 py-4">Matched Role</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-slate-800/60">
              {filteredItems.length > 0 ? (
                filteredItems.map((item) => {
                  let badgeColor = 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300';
                  if (item.category === 'Medium Chance') {
                    badgeColor = 'bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300';
                  } else if (item.category === 'Low Chance') {
                    badgeColor = 'bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300';
                  }

                  return (
                    <tr key={item.id} className="hover:bg-gray-50/50 dark:hover:bg-slate-800/40 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap text-xs font-medium text-gray-500 dark:text-slate-400">
                        {item.date}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap font-bold text-gray-900 dark:text-white">
                        {item.student_name || 'Student Candidate'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap font-black text-blue-600 dark:text-blue-400 text-base">
                        {item.probability}%
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${badgeColor}`}>
                          {item.category}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap font-semibold text-emerald-600 dark:text-emerald-400 text-xs">
                        {item.salary_range}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap font-semibold text-gray-800 dark:text-slate-200">
                        {item.top_role}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right space-x-2">
                        <button
                          onClick={() => setSelectedItem(item)}
                          className="p-1.5 rounded-lg text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-950/40"
                          title="View Details"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => deleteItem(item.id)}
                          className="p-1.5 rounded-lg text-red-500 hover:bg-red-50 dark:hover:bg-red-950/40"
                          title="Delete Record"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="7" className="text-center py-8 text-xs text-gray-400">
                    No prediction records match your search query.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Details Modal */}
      {selectedItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="glass-card rounded-3xl p-6 max-w-lg w-full space-y-6 border border-gray-200 dark:border-slate-800 shadow-2xl bg-white dark:bg-slate-900">
            <div className="flex justify-between items-center pb-3 border-b border-gray-100 dark:border-slate-800">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">Prediction Details</h3>
              <button
                onClick={() => setSelectedItem(null)}
                className="text-gray-400 hover:text-gray-600 text-xl font-bold"
              >
                ×
              </button>
            </div>

            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">Candidate:</span>
                <span className="font-bold">{selectedItem.student_name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Placement Probability:</span>
                <span className="font-extrabold text-blue-600">{selectedItem.probability}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Status Category:</span>
                <span className="font-bold text-emerald-600">{selectedItem.category}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Expected Package:</span>
                <span className="font-bold text-emerald-600">{selectedItem.salary_range}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Matched Career Role:</span>
                <span className="font-bold">{selectedItem.top_role}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Selected Skills:</span>
                <span className="font-semibold text-xs text-blue-500">{selectedItem.skills?.join(', ') || 'N/A'}</span>
              </div>
            </div>

            <button
              onClick={() => setSelectedItem(null)}
              className="w-full py-2.5 rounded-xl bg-blue-600 text-white font-bold text-xs"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default HistoryPage;
