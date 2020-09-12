import { BlockQuery } from "./BlockQuery";
import { LoadType } from "./BlockTypes";
import { ContentBlockerRule, TriggerComponents } from "./ContentBlocker";

export interface BlockResult {
  rules: RuleMatchResult[];
  matchingIgnoredRules: RuleMatchResult[];
}

export interface RuleMatchResult {
  ruleIndex: number;
  rule: ContentBlockerRule;
  isMatch: boolean;
  matchedComponents: TriggerComponents[];
  overpoweredByIndex?: number;
}

export function ruleMatches(
  rule: ContentBlockerRule,
  ruleIndex: number,
  query: BlockQuery
): RuleMatchResult | undefined {
  const { trigger } = rule;

  let matches: TriggerComponents[] = [];

  // First check third/first party
  if ((trigger.loadType?.length ?? 0) > 0) {
    if (trigger.loadType.indexOf(LoadType.thirdParty) === -1 && query.firstPartyUrl !== undefined) {
      return undefined;
    }

    if (trigger.loadType.indexOf(LoadType.firstParty) === -1 && query.firstPartyUrl === undefined) {
      return undefined;
    }

    matches.push(TriggerComponents.loadType);
  }

  // If the trigger's resourceTypes are defined and don't contain the query's type, reject
  if ((trigger.resourceTypes?.length ?? 0) > 0) {
    if (trigger.resourceTypes.indexOf(query.resourceType) === -1) {
      return undefined;
    }

    matches.push(TriggerComponents.resourceType);
  }

  // After those easy boolean checks, actually do the regex test
  if (!trigger.urlFilter.test(query.url)) {
    return undefined;
  }

  matches.push(TriggerComponents.urlFilter);

  // Finally do domain matching
  if (trigger.ifDomains) {
    let matchingIfDomain = trigger.ifDomains.findIndex((pattern) =>
      domainPatternMatchesDomain(pattern, query.domain)
    );
    if (matchingIfDomain < 0) {
      return undefined;
    }

    matches.push(TriggerComponents.ifDomains);
  }

  if (trigger.unlessDomains) {
    let matchingUnlessDomain = trigger.unlessDomains.findIndex((pattern) =>
      domainPatternMatchesDomain(pattern, query.domain)
    );

    if (matchingUnlessDomain !== -1) {
      return undefined;
    }

    matches.push(TriggerComponents.unlessDomains);
  }

  // And top domain matching
  if (trigger.ifTopURL) {
    if (query.firstPartyUrl === undefined) {
      return undefined;
    }

    let matchingIfTop = trigger.ifTopURL.findIndex(
      (pattern) => query.firstPartyUrl.indexOf(pattern) !== -1
    );
    if (matchingIfTop < 0) {
      return undefined;
    }

    matches.push(TriggerComponents.ifTopURL);
  }

  if (trigger.unlessTopURL && query.firstPartyUrl !== undefined) {
    let matchingUnlessTop = trigger.unlessTopURL.findIndex(
      (pattern) => query.firstPartyUrl.indexOf(pattern) !== -1
    );

    if (matchingUnlessTop !== -1) {
      return undefined;
    }

    matches.push(TriggerComponents.unlessTopURL);
  }

  // If we passed all that, it's a match:
  return {
    ruleIndex,
    rule,
    isMatch: true,
    matchedComponents: matches
  };
}

function domainPatternMatchesDomain(pattern: string, domain: string): boolean {
  if (pattern.startsWith("*")) {
    const trimmedPattern = pattern.substring(pattern.lastIndexOf("*") + 1);
    return domain.endsWith(trimmedPattern);
  } else {
    return domain === pattern;
  }
}
