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
    <div
      className={
        "rounded-box m-y-2 flex flex-col items-stretch space-y-4" +
        (isMatching ? "" : " opacity-50") +
        (isExpanded ? "" : " cursor-pointer")
      }
      id={"rule-" + match.ruleIndex}
      onClick={isExpanded ? undefined : (_) => setIsExpanded(true)}
    >
      <h4
        className="cursor-pointer flex flex-row font-semibold justify-between"
        onClick={(_) => setIsExpanded(!isExpanded)}
      >
        <span
          className={"font-semibold pr-2" + (!!match.overpoweredByIndex ? " line-through" : "")}
        >
          {getRuleTitle(match.rule)}
        </span>{" "}
        {!!match.overpoweredByIndex && (
          <span>
            Overpowered by{" "}
            <a href={"#rule-" + match.overpoweredByIndex}>#{match.overpoweredByIndex}</a>
          </span>
        )}
        <span className="italic font-light text-right flex-grow text-gray-600">
          #{match.ruleIndex}
        </span>
      </h4>
      {isExpanded && (
        <>
          <div className="border-color border-t-2 pt-3 mt-3 flex flex-col space-y-2 items-stretch">
            {[
              TriggerComponents.urlFilter,
              TriggerComponents.ifDomains,
              TriggerComponents.unlessDomains,
              TriggerComponents.loadType,
              TriggerComponents.ifTopURL,
              TriggerComponents.unlessTopURL,
              TriggerComponents.resourceType
            ].map((component, i) => (
              <RuleComponent
                key={"rule-" + match.ruleIndex + "-component-" + i}
                component={component}
                matches={match.matchedComponents}
                trigger={match.rule.trigger}
              />
            ))}
          </div>
          {match.rule.action.action === ActionType.cssDisplayNone && (
            <div className="w-full">
              <RuleSelectors selectors={match.rule.action.selector} />
            </div>
          )}
        </>
      )}
    </div>
  );
}

function RuleSelectors({ selectors }: { selectors: string[] | undefined }) {
  if (!selectors) {
    return <></>;
  }

  const maxSelectors = 10;

  const leftover = selectors.length - maxSelectors;

  const toRender: string[] = leftover > 0 ? selectors.slice(0, maxSelectors) : selectors;

  return (
    <>
      <h6 className="text-gray-600">Hide elements matching:</h6>
      <ul>
        {toRender.map((selector, i) => (
          <li key={"selector-" + i}>{selector}</li>
        ))}
        {leftover > 0 && <li className="italic">And {leftover} more...</li>}
      </ul>
    </>
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
  const bodyClass = isMatch ? "text-green-600" : "text-gray-600";

  return (
    <div>
      <h6 className="text-gray-600">{getTriggerComponentTitle(component)}:</h6>
      <p className={"font-semibold " + bodyClass}>{displayable}</p>
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
      return "/" + trigger.urlFilter.source + "/i";
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
      return "If URL Matches";
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
      return "Hide Elements with CSS";
  }
}
