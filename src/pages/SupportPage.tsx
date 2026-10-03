import { useState } from 'react';
import { Link } from 'react-router-dom';
import { MessageSquare, Plus, Clock, CheckCircle2, AlertCircle, XCircle, Send, X } from 'lucide-react';
import { useAuth } from '../context/AppContext';
import { Badge } from '../components/Layout';

interface Ticket {
  id: string;
  subject: string;
  category: string;
  status: 'open' | 'in-progress' | 'resolved' | 'closed';
  priority: 'low' | 'medium' | 'high';
  createdAt: string;
  lastUpdate: string;
  messages: { from: 'user' | 'support'; text: string; time: string }[];
}

const DEMO_TICKETS: Ticket[] = [
  {
    id: 't1',
    subject: 'Cannot upload documents for verification',
    category: 'Account',
    status: 'in-progress',
    priority: 'medium',
    createdAt: '2026-01-14',
    lastUpdate: '2026-01-15',
    messages: [
      { from: 'user', text: 'I am trying to upload my citizenship certificate but the upload fails every time. Please help.', time: '2026-01-14 10:30 AM' },
      { from: 'support', text: 'Hi, we apologize for the inconvenience. Could you please try clearing your browser cache and attempting again? Also, ensure the file is under 5MB.', time: '2026-01-14 2:15 PM' },
      { from: 'user', text: 'Tried that but still not working. I am using Chrome on mobile.', time: '2026-01-15 9:00 AM' },
    ],
  },
  {
    id: 't2',
    subject: 'Inspection report not showing on listing',
    category: 'Listing',
    status: 'resolved',
    priority: 'low',
    createdAt: '2026-01-10',
    lastUpdate: '2026-01-11',
    messages: [
      { from: 'user', text: 'My inspection was completed 3 days ago but the report is not visible on my listing.', time: '2026-01-10 3:00 PM' },
      { from: 'support', text: 'The inspection report has been linked to your listing. Please refresh the page and it should now be visible.', time: '2026-01-11 11:00 AM' },
    ],
  },
];

export default function SupportPage() {
  const { currentUser } = useAuth();
  const [tickets, setTickets] = useState<Ticket[]>(DEMO_TICKETS);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState<string | null>(null);
  const [newMessage, setNewMessage] = useState('');
  const [newTicket, setNewTicket] = useState({ subject: '', category: '', message: '', priority: 'medium' });

  const selectedTicketData = tickets.find(t => t.id === selectedTicket);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'open': return <Badge variant="warning">Open</Badge>;
      case 'in-progress': return <Badge variant="info">In Progress</Badge>;
      case 'resolved': return <Badge variant="success">Resolved</Badge>;
      case 'closed': return <Badge>Closed</Badge>;
      default: return <Badge>{status}</Badge>;
    }
  };

  const createTicket = () => {
    if (!newTicket.subject || !newTicket.category || !newTicket.message) return;
    const ticket: Ticket = {
      id: `t${Date.now()}`,
      subject: newTicket.subject,
      category: newTicket.category,
      status: 'open',
      priority: newTicket.priority as any,
      createdAt: new Date().toISOString().split('T')[0],
      lastUpdate: new Date().toISOString().split('T')[0],
      messages: [{ from: 'user', text: newTicket.message, time: new Date().toLocaleString() }],
    };
    setTickets([ticket, ...tickets]);
    setShowCreateModal(false);
    setNewTicket({ subject: '', category: '', message: '', priority: 'medium' });
  };

  const sendMessage = () => {
    if (!newMessage || !selectedTicketData) return;
    setTickets(prev => prev.map(t =>
      t.id === selectedTicket
        ? { ...t, messages: [...t.messages, { from: 'user', text: newMessage, time: new Date().toLocaleString() }], lastUpdate: new Date().toISOString().split('T')[0] }
        : t
    ));
    setNewMessage('');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Support</h1>
          <p className="text-sm text-gray-500">Get help with your account, listings, or transactions</p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="bg-blue-600 text-white px-4 py-2.5 rounded-xl text-sm font-medium hover:bg-blue-700 flex items-center gap-2"
        >
          <Plus className="w-4 h-4" /> New Ticket
        </button>
      </div>

      {/* Quick Help */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        {[
          { icon: MessageSquare, label: 'FAQ', desc: 'Common questions', action: () => window.location.href = '/faq' },
          { icon: AlertCircle, label: 'Report Issue', desc: 'Report a problem', action: () => setShowCreateModal(true) },
          { icon: CheckCircle2, label: 'Verification', desc: 'Account verification', action: () => window.location.href = '/profile' },
          { icon: Clock, label: 'Status', desc: 'Check ticket status', action: () => alert('Your tickets are listed below.') },
        ].map((item, i) => (
          <button 
            key={i} 
            onClick={item.action}
            className="p-3 bg-white border border-gray-200 rounded-xl hover:border-blue-300 hover:shadow-sm transition-all text-left"
          >
            <item.icon className="w-5 h-5 text-blue-600 mb-2" />
            <p className="text-sm font-medium text-gray-900">{item.label}</p>
            <p className="text-xs text-gray-500">{item.desc}</p>
          </button>
        ))}
      </div>

      {/* Tickets List */}
      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
        <div className="px-5 py-3 border-b border-gray-100 flex items-center justify-between">
          <h3 className="font-semibold text-gray-900">My Tickets</h3>
          <span className="text-xs text-gray-500">{tickets.length} tickets</span>
        </div>
        {tickets.length === 0 ? (
          <div className="text-center py-12">
            <MessageSquare className="w-10 h-10 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500">No support tickets</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {tickets.map(ticket => (
              <button
                key={ticket.id}
                onClick={() => setSelectedTicket(ticket.id)}
                className={`w-full text-left p-4 hover:bg-gray-50 transition-colors ${selectedTicket === ticket.id ? 'bg-blue-50' : ''}`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="text-sm font-medium text-gray-900 truncate">{ticket.subject}</p>
                      {getStatusBadge(ticket.status)}
                    </div>
                    <p className="text-xs text-gray-500">{ticket.category} • Created {ticket.createdAt}</p>
                    <p className="text-xs text-gray-600 mt-1 line-clamp-1">{ticket.messages[ticket.messages.length - 1].text}</p>
                  </div>
                  <span className="text-xs text-gray-400 whitespace-nowrap">{ticket.lastUpdate}</span>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Ticket Detail Modal */}
      {selectedTicketData && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full max-h-[85vh] flex flex-col">
            <div className="p-5 border-b border-gray-100 flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-gray-900">{selectedTicketData.subject}</h3>
                <div className="flex items-center gap-2 mt-1">
                  {getStatusBadge(selectedTicketData.status)}
                  <span className="text-xs text-gray-500">{selectedTicketData.category}</span>
                </div>
              </div>
              <button onClick={() => setSelectedTicket(null)} className="p-2 hover:bg-gray-100 rounded-lg">
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-5 space-y-3">
              {selectedTicketData.messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.from === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-xs rounded-2xl px-4 py-2.5 ${
                    msg.from === 'user'
                      ? 'bg-blue-600 text-white rounded-br-md'
                      : 'bg-gray-100 text-gray-900 rounded-bl-md'
                  }`}>
                    <p className="text-sm">{msg.text}</p>
                    <p className={`text-xs mt-1 ${msg.from === 'user' ? 'text-blue-200' : 'text-gray-500'}`}>{msg.time}</p>
                  </div>
                </div>
              ))}
            </div>
            {selectedTicketData.status !== 'closed' && (
              <div className="p-4 border-t border-gray-100">
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={newMessage}
                    onChange={e => setNewMessage(e.target.value)}
                    placeholder="Type your message..."
                    className="flex-1 py-2.5 px-4 bg-gray-50 border border-gray-200 rounded-xl text-sm outline-none focus:border-blue-500"
                    onKeyDown={e => e.key === 'Enter' && sendMessage()}
                  />
                  <button onClick={sendMessage} className="p-2.5 bg-blue-600 text-white rounded-xl hover:bg-blue-700">
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Create Ticket Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full">
            <div className="p-5 border-b border-gray-100 flex items-center justify-between">
              <h3 className="font-semibold text-gray-900">New Support Ticket</h3>
              <button onClick={() => setShowCreateModal(false)} className="p-2 hover:bg-gray-100 rounded-lg">
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>
            <div className="p-5 space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-1.5">Category</label>
                <select
                  value={newTicket.category}
                  onChange={e => setNewTicket({ ...newTicket, category: e.target.value })}
                  className="w-full py-2.5 px-3 border border-gray-200 rounded-xl text-sm outline-none focus:border-blue-500"
                >
                  <option value="">Select category</option>
                  <option value="Account">Account Issues</option>
                  <option value="Listing">Listing Problems</option>
                  <option value="Payment">Payment Issues</option>
                  <option value="Inspection">Inspection Related</option>
                  <option value="Passport">Vehicle Passport</option>
                  <option value="Technical">Technical Issue</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-1.5">Subject</label>
                <input
                  type="text"
                  value={newTicket.subject}
                  onChange={e => setNewTicket({ ...newTicket, subject: e.target.value })}
                  placeholder="Brief description of your issue"
                  className="w-full py-2.5 px-3 border border-gray-200 rounded-xl text-sm outline-none focus:border-blue-500"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-1.5">Priority</label>
                <select
                  value={newTicket.priority}
                  onChange={e => setNewTicket({ ...newTicket, priority: e.target.value })}
                  className="w-full py-2.5 px-3 border border-gray-200 rounded-xl text-sm outline-none focus:border-blue-500"
                >
                  <option value="low">Low - General question</option>
                  <option value="medium">Medium - Need help soon</option>
                  <option value="high">High - Urgent issue</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-1.5">Message</label>
                <textarea
                  value={newTicket.message}
                  onChange={e => setNewTicket({ ...newTicket, message: e.target.value })}
                  placeholder="Describe your issue in detail..."
                  className="w-full py-2.5 px-3 border border-gray-200 rounded-xl text-sm outline-none focus:border-blue-500 resize-none h-28"
                />
              </div>
              <div className="flex gap-3 pt-2">
                <button onClick={() => setShowCreateModal(false)} className="flex-1 border border-gray-200 py-2.5 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50">
                  Cancel
                </button>
                <button
                  onClick={createTicket}
                  disabled={!newTicket.subject || !newTicket.category || !newTicket.message}
                  className="flex-1 bg-blue-600 text-white py-2.5 rounded-xl text-sm font-medium hover:bg-blue-700 disabled:opacity-50"
                >
                  Submit Ticket
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
