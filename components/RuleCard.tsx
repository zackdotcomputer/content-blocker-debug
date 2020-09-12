import { PropsWithChildren, useState } from "react";
import { RuleMatchResult } from "../model/BlockMatches";
import { ActionType } from "../model/BlockTypes";
import {
  ContentBlockerRule,
  ContentBlockerTrigger,
  TriggerComponents
} from "../model/ContentBlocker";

interface Props {
  match: RuleMatchResult;
  isMatching: boolean;
}

export default function RuleCard({ match, isMatching }: Props) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="rounded-box m-y-2 flex flex-col items-stretch" id={"rule-" + match.ruleIndex}>
      <div
        className={
          "flex flex-row font-semibold text-lg justify-between" + isMatching ? "" : "text-gray-600"
        }
        onClick={(_) => setIsExpanded(!isExpanded)}
      >
        <h4 className="font-semibold">{getRuleTitle(match.rule)}</h4>
        <h6 className="italic font-light">#{match.ruleIndex}</h6>
      </div>
      {isExpanded && (
        <div className="border-gray-500 border-t-2 p-t-3 m-t-3 flex flex-col space-y-2 items-stretch">
          <h5>Trigger Rules:</h5>
          {[
            TriggerComponents.urlFilter,
            TriggerComponents.ifDomains,
            TriggerComponents.unlessDomains,
            TriggerComponents.loadType,
            TriggerComponents.ifTopURL,
            TriggerComponents.unlessTopURL,
            TriggerComponents.resourceType
          ].map((component, i) => {
            <RuleComponent
              key={"rule-" + match.ruleIndex + "-component-" + i}
              component={component}
              matches={match.matchedComponents}
              trigger={match.rule.trigger}
            />;
          })}
        </div>
      )}
    </div>
  );
}

function RuleComponent({
  component,
  matches,
  trigger
}: {
  component: TriggerComponents;
  matches: TriggerComponents[];
  trigger: ContentBlockerTrigger;
}) {
  const displayable = getDisplayTriggerComponent(trigger, component);

  if (!displayable) {
    return <></>;
  }

  const isMatch = matches.indexOf(component) !== -1;
  const titleClass = isMatch ? "" : "text-gray-400";
  const bodyClass = isMatch ? "text-green-600" : "text-gray-300";

  return (
    <div>
      <h6 className={titleClass}>{getTriggerComponentTitle(component)}:</h6>
      <p className={bodyClass}>{displayable}</p>
    </div>
  );
}

function getDisplayTriggerComponent(
  trigger: ContentBlockerTrigger,
  component: TriggerComponents
): string | undefined {
  switch (component) {
    case TriggerComponents.ifDomains:
      return trigger.ifDomains?.join(", ");
    case TriggerComponents.unlessDomains:
      return trigger.unlessDomains?.join(", ");
    case TriggerComponents.ifTopURL:
      return trigger.ifTopURL?.join(", ");
    case TriggerComponents.unlessTopURL:
      return trigger.unlessTopURL?.join(", ");
    case TriggerComponents.loadType:
      return trigger.loadType?.join(", ");
    case TriggerComponents.resourceType:
      return trigger.resourceTypes?.join(", ");
    case TriggerComponents.urlFilter:
      return trigger.urlFilter.source;
  }
}

function getTriggerComponentTitle(component: TriggerComponents): string {
  switch (component) {
    case TriggerComponents.ifDomains:
      return "If Domain Matches";
    case TriggerComponents.unlessDomains:
      return "If Domain Doesn't Match";
    case TriggerComponents.ifTopURL:
      return "If Top URL Matches";
    case TriggerComponents.unlessTopURL:
      return "If Top URL Doesn't Match";
    case TriggerComponents.loadType:
      return "If Load Type Is";
    case TriggerComponents.resourceType:
      return "If Resource Type Is";
    case TriggerComponents.urlFilter:
      return "URL Must Match";
  }
}

export function getRuleSummary(rule: ContentBlockerRule): string {
  switch (rule.action.action) {
    case ActionType.block:
      return "Be blocked entirely";
    case ActionType.blockCookies:
      return "Not receive any cookies";
    case ActionType.ignorePreviousRules:
      return "Undo some matching rules";
    case ActionType.makeHttps:
      return "Be redirected to HTTPS";
    case ActionType.cssDisplayNone:
      return "Hide some CSS elements (see rule for details)";
  }
}

export function getRuleTitle(rule: ContentBlockerRule): string {
  switch (rule.action.action) {
    case ActionType.block:
      return "Block Site";
    case ActionType.blockCookies:
      return "Block Cookies";
    case ActionType.ignorePreviousRules:
      return "Ignore Previous Rules";
    case ActionType.makeHttps:
      return "Redirect to HTTPS";
    case ActionType.cssDisplayNone:
      return "Apply CSS display: none";
  }
}
