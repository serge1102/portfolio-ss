export interface LexResponse {
  sessionId: string;
  messages: LexResponseMessage[];
  endOfConversation: boolean;
}

export interface Button {
  text: string;
  value: string;
}

export interface LexResponseMessage {
  content?: string;
  contentType?: string;
  buttons?: Button[];
  imageUrl?: string;
  subtitle?: string;
  title?: string;
}
