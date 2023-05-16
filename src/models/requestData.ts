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

export interface IUserContact {
  name: string;
  avatar: string;
  chatId: string;
}