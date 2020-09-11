export default class RootContentBlocker {
  rules: ContentBlockerRule[];

  constructor(deserialized: any) {
    if (typeof deserialized !== typeof [{}]) {
      throw "Content blocker root object must be an array";
    }

    const contents = deserialized as Object[];

    this.rules = contents.map(
      (rawRule): ContentBlockerRule => {
        const trigger = rawRule["trigger"];
        const action = rawRule["action"];

        if (!trigger || !action) {
          throw "Content rule missing " + (!trigger ? "a trigger" : "an action");
        }

        return {
          trigger: new ContentBlockerTrigger(trigger),
          action: new ContentBlockerAction(action)
        };
      }
    );
  }
}

export interface ContentBlockerRule {
  action: ContentBlockerAction;
  trigger: ContentBlockerTrigger;
}

enum ResourceType {
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

enum LoadType {
  firstParty = "first-party",
  thirdParty = "third-party"
}

export class ContentBlockerTrigger {
  urlFilter: RegExp;

  ifDomains?: String[];
  unlessDomains?: String[];

  ifTopURL?: String[];
  unlessTopURL?: String[];

  resourceTypes?: ResourceType[];

  loadType?: LoadType[];

  constructor(rawTrigger: Object) {
    const rawFilter = rawTrigger["url-filter"];

    if (!rawFilter) {
      throw "Triggers all must have url-filter keys";
    }

    const isCaseSensitive = rawTrigger["url-filter-is-case-sensitive"] || false;

    this.ifDomains = rawTrigger["if-domain"];
    this.unlessDomains = rawTrigger["unless-domain"];

    if (this.ifDomains && this.unlessDomains) {
      throw "Cannot have a rule that defines both if-domain AND unless-domain";
    } else if (this.ifDomains && typeof this.ifDomains !== typeof []) {
      throw "if-domain must be an array";
    } else if (this.unlessDomains && typeof this.unlessDomains !== typeof []) {
      throw "unless-domain must be an array";
    }

    this.ifTopURL = rawTrigger["if-top-url"];
    this.unlessTopURL = rawTrigger["unless-top-url"];

    if (this.ifTopURL && this.unlessTopURL) {
      throw "Cannot have a rule that defines both if-top-url AND unless-top-url";
    } else if (this.ifTopURL && typeof this.ifTopURL !== typeof []) {
      throw "if-top-url must be an array";
    } else if (this.unlessTopURL && typeof this.unlessTopURL !== typeof []) {
      throw "unless-top-url must be an array";
    }

    const rawResources = rawTrigger["resource-type"];

    if (rawResources && typeof rawResources !== typeof []) {
      throw "resource-type has to be an array";
    }

    const invalidResourceIndex =
      rawResources?.indexOf((v: any) => {
        return !(v in ResourceType);
      }) ?? -1;

    if (invalidResourceIndex !== -1) {
      throw "resource-type contained invalid type " + rawResources[invalidResourceIndex];
    }

    this.resourceTypes = rawResources;

    this.loadType = rawTrigger["load-type"];

    if (
      this.loadType &&
      this.loadType !== [LoadType.firstParty] &&
      this.loadType !== [LoadType.thirdParty]
    ) {
      throw "load-type must be missing, first-party, or third-party. Cannot be " + this.loadType;
    }

    this.urlFilter = RegExp(rawFilter, isCaseSensitive ? "" : "i");
  }
}

enum ActionType {
  block = "block",
  blockCookies = "block-cookies",
  cssDisplayNone = "css-display-none",
  ignorePreviousRules = "ignore-previous-rules",
  makeHttps = "make-https"
}
function isActionType(test: any): test is ActionType {
  return Object.values(ActionType).indexOf(test) !== -1;
}

export class ContentBlockerAction {
  action: ActionType;
  selector?: string;

  constructor(rawAction: Object) {
    this.selector = rawAction["selector"];
    this.action = rawAction["type"];

    if (!isActionType(this.action)) {
      throw "a rule's .action.type must be a valid value. Got invalid action type: " + this.action;
    }

    if (this.action === ActionType.cssDisplayNone && !this.selector) {
      throw "If a rule action type is css-display-none, the selector field is not optional.";
    }
  }
}
