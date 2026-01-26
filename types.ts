export interface Speaker {
  nameZh: string;
  nameEn: string;
  titleZh: string;
  titleEn: string;
  affiliationZh: string;
  affiliationEn: string;
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
  isModerator?: boolean; // For Session Moderator rows
}