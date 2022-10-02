import { Button } from './lexResponse';
export interface Conversation {
  userInput: boolean;
  comment?: string;
  buttons?: Button[];
}
