export interface IUserData {
  idInstance: string;
  apiTokenInstance: string;
}

export interface IMessageWithUserData extends IUserData {
  chatId: string;
  message: string;
  quotedMessageId?: string;
  archiveChat?: boolean;
  linkPreview?: boolean;
}