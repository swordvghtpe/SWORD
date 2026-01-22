
export interface Speaker {
  name: string;
  title: string;
  affiliation: string;
  imageUrl: string;
}

export interface AgendaItem {
  time: string;
  title: string;
  speaker?: string;
  moderator?: string;
  description?: string[];
  isBreak?: boolean;
  isSpecial?: boolean; // For Lunch, Prepare, etc.
}
