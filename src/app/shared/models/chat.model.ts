export class ChatMessageModel {
  id?: string;
  authorId: string;
  text: string;
  posted: string;
}

export class ChatModel {
  id: string;
  mesages: ChatMessageModel[];
  documentId: string;
}
