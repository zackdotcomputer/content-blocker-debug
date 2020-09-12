export enum ResourceType {
  document = "document",
  image = "image",
  stylesheet = "style-sheet",
  script = "script",
  font = "font",
  raw = "raw",
  svg = "svg-document",
  media = "media",
  popup = "popup"
}

export enum LoadType {
  firstParty = "first-party",
  thirdParty = "third-party"
}

export enum ActionType {
  block = "block",
  blockCookies = "block-cookies",
  cssDisplayNone = "css-display-none",
  ignorePreviousRules = "ignore-previous-rules",
  makeHttps = "make-https"
}
export function isActionType(test: any): test is ActionType {
  return Object.values(ActionType).indexOf(test) !== -1;
}
