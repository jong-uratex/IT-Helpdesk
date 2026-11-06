export type UserRole = 'employee' | 'admin';

export interface UratexUser {
  id: string;
  name: string;
  email: string;
  department: string;
  location: string;
  role: UserRole;
  avatarInitials: string;
}

export type TicketPriority = 'Critical' | 'High' | 'Medium' | 'Low';
export type TicketStatus = 'Open' | 'In Progress' | 'Resolved';
export type TicketCategory =
  | 'Network & VPN'
  | 'SAP / ERP System'
  | 'Hardware & Peripherals'
  | 'Microsoft 365 & Email'
  | 'Account & Access'
  | 'Printer & Scanner';

export interface TicketUpdate {
  id: string;
  authorName: string;
  authorRole: UserRole | 'robbie';
  message: string;
  timestamp: string;
}

export interface SupportTicket {
  id: string;
  title: string;
  description: string;
  category: TicketCategory;
  priority: TicketPriority;
  status: TicketStatus;
  reporterName: string;
  reporterEmail: string;
  department: string;
  location: string;
  assignedTo: string;
  createdAt: string;
  updatedAt: string;
  robbieTranscriptSummary?: string;
  updates: TicketUpdate[];
}

export interface RobbieChatMessage {
  id: string;
  sender: 'user' | 'robbie';
  text: string;
  timestamp: string;
  shouldEscalate?: boolean;
  suggestedTicket?: {
    title: string;
    category: TicketCategory;
    priority: TicketPriority;
    summary: string;
  };
}
