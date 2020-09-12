import { ResourceType } from "./BlockTypes";

export class BlockQuery {
  url: string;
  firstPartyUrl?: string;

  domain: string;

  resourceType: ResourceType;

  constructor(url: string, resourceType: ResourceType, firstPartyUrl?: string) {
    this.url = url.toLowerCase();
    this.resourceType = resourceType;
    this.firstPartyUrl = firstPartyUrl.toLowerCase();

    const mainURL = new URL(url);
    this.domain = mainURL.hostname.toLowerCase();
  }
}
