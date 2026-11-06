import React, { useState, useEffect, useCallback } from 'react';
import { GoogleSignIn } from './components/GoogleSignIn';
import { UserDashboard } from './components/UserDashboard';
import { AdminDashboard } from './components/AdminDashboard';
import {
  UratexUser,
  SupportTicket,
  TicketCategory,
  TicketPriority,
  TicketStatus,
} from './types';

export function App() {
  const [user, setUser] = useState<UratexUser | null>(null);
  const [viewMode, setViewMode] = useState<'user' | 'admin'>('user');
  const [tickets, setTickets] = useState<SupportTicket[]>([]);

  const fetchTickets = useCallback(async () => {
    try {
      const res = await fetch('/api/tickets');
      if (res.ok) {
        const data = await res.json();
        setTickets(data.tickets || []);
      }
    } catch {
      // Ignore transient network errors during polling
    }
  }, []);

  useEffect(() => {
    fetchTickets();
    const interval = setInterval(fetchTickets, 5000);
    return () => clearInterval(interval);
  }, [fetchTickets]);

  const handleSignIn = (authenticatedUser: UratexUser) => {
    setUser(authenticatedUser);
    setViewMode(authenticatedUser.role === 'admin' ? 'admin' : 'user');
  };

  const handleSignOut = () => {
    setUser(null);
    setViewMode('user');
  };

  const handleCreateTicket = async (ticketData: {
    title: string;
    description: string;
    category: TicketCategory;
    priority: TicketPriority;
    robbieTranscriptSummary?: string;
  }): Promise<SupportTicket> => {
    const res = await fetch('/api/tickets', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...ticketData,
        reporterName: user?.name || 'Uratex Employee',
        reporterEmail: user?.email || 'employee@uratex.com.ph',
        department: user?.department || 'Operations',
        location: user?.location || 'Plant 1 - Valenzuela',
      }),
    });
    const data = await res.json();
    setTickets((prev) => [data.ticket, ...prev]);
    return data.ticket;
  };

  const handleUpdateTicket = async (
    id: string,
    updates: { status?: TicketStatus; priority?: TicketPriority; assignedTo?: string }
  ) => {
    const res = await fetch(`/api/tickets/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updates),
    });
    if (res.ok) {
      const data = await res.json();
      setTickets((prev) => prev.map((t) => (t.id === id ? data.ticket : t)));
    }
  };

  const handleAddTicketUpdate = async (id: string, message: string) => {
    const res = await fetch(`/api/tickets/${id}/updates`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        authorName: user?.name || 'IT Support',
        authorRole: 'admin',
        message,
      }),
    });
    if (res.ok) {
      const data = await res.json();
      setTickets((prev) => prev.map((t) => (t.id === id ? data.ticket : t)));
    }
  };

  if (!user) {
    return <GoogleSignIn onSignIn={handleSignIn} />;
  }

  if (viewMode === 'admin') {
    return (
      <AdminDashboard
        user={user}
        tickets={tickets}
        onUpdateTicket={handleUpdateTicket}
        onAddTicketUpdate={handleAddTicketUpdate}
        onSwitchToUser={() => setViewMode('user')}
        onSignOut={handleSignOut}
      />
    );
  }

  return (
    <UserDashboard
      user={user}
      tickets={tickets}
      onCreateTicket={handleCreateTicket}
      onSwitchToAdmin={() => setViewMode('admin')}
      onSignOut={handleSignOut}
    />
  );
}

export default App;
