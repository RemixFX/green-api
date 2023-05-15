import { IMessageWithUserData, IUserData } from "../models/requestData";

function checkResponse<T>(res: {ok: boolean; json: () => Promise<T>}): Promise<T> {
  if (res.ok) {
    return res.json() as Promise<T>
  }
  return res.json().then((message) => Promise.reject(message))
}

export function getStateInstance ({idInstance, apiTokenInstance}: IUserData) {
  return fetch(`https://api.green-api.com/waInstance${idInstance}/getStateInstance/${apiTokenInstance}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
  })
  .then(checkResponse)
}

export function SendMessage ({...props}: IMessageWithUserData) {
  return fetch(`https://api.green-api.com/waInstance${props.idInstance}/SendMessage/${props.apiTokenInstance}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ 
      chatId: props.chatId + '@c.us',
      message: "I use Green-API to send this message to you!",
      quotedMessageId: props.quotedMessageId,
      archiveChat: props.archiveChat,
      linkPreview: props.linkPreview,
     })
  })
  .then(checkResponse)
}
