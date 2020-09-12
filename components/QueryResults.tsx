import { BlockResult } from "../model/BlockMatches";
import RuleCard, { getRuleSummary } from "./RuleCard";

interface Props {
  results: BlockResult;
}

export default function QueryResults({ results }: Props) {
  return (
    <section className="bg-white px-8 py-5 flex flex-col w-full md:w-3/4 mx-auto mt-10 md:mt-0">
      <QueryResultsSummary results={results} />
      <div className="w-full pb-5 mb-5 border-b-2 border-color space-y-1">
        <QueryEffects results={results} />
      </div>
      <div className="w-full pb-5 mb-5 border-b-2 border-color space-y-2">
        <h3 className="font-bold">Rules in effect:</h3>
        {results.rules.map((match, i) => (
          <RuleCard match={match} isMatching={true} key={"matching-rule-" + i} />
        ))}
      </div>
      <div className="w-full pb-5 mb-5 border-b-2 border-color space-y-2">
        <h3 className="font-bold text-gray-500">Rules that match but are overpowered:</h3>
        {results.matchingIgnoredRules.map((match, i) => (
          <RuleCard match={match} isMatching={false} key={"overpowered-rule-" + i} />
        ))}
      </div>
    </section>
  );
}

function QueryResultsSummary({ results }: Props) {
  return (
    <section className="bg-white py-5 flex flex-col w-full mx-auto mt-10 md:mt-0">
      <div className="flex flex-row w-full pb-5 border-b-2 border-color">
        <QueryCount count={results.rules.length} label="rules in effect" dim={false} />
        {results.matchingIgnoredRules.length > 0 && (
          <QueryCount
            count={results.matchingIgnoredRules.length}
            label="overpowered matching rules"
            dim={true}
          />
        )}
      </div>
    </section>
  );
}

function QueryCount({
  count,
  label,
  dim
}: {
  count: string | number;
  label: string;
  dim: boolean;
}) {
  return (
    <div className="flex-1 border-r-2 border-color last:border-r-0 text-center">
      <h4 className={"text-3xl font-semibold" + (dim ? " text-gray-500 italic" : "")}>{count}</h4>
      <p className={"text-xs" + (dim ? " italic text-gray-500" : " text-gray-700")}>{label}</p>
    </div>
  );
}

function QueryEffects({ results }: Props) {
  return (
    <>
      <h2 className="font-bold">In the end, this resource will:</h2>
      <ul>
        {results.rules.map((match, i) => (
          <li key={"effect" + i}>
            {getRuleSummary(match.rule)}{" "}
            <a className="text-gray-500 italic" href={"#rule-" + match.ruleIndex}>
              #{match.ruleIndex}
            </a>
          </li>
        ))}
      </ul>
    </>
  );
}
