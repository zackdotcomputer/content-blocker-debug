import Nav from "../components/nav";
import React, { useContext, useEffect, useState } from "react";
import { BlockerContext } from "../model/BlockerContext";
import { useRouter } from "next/router";
import { BlockQuery, BlockResult } from "../model/BlockQuery";
import QueryResults from "../components/QueryResults";
import QueryBuilder from "../components/QueryBuilder";
import CurrentQuery from "../components/CurrentQuery";

export default function DebugPage() {
  const [blocker, _] = useContext(BlockerContext);
  const router = useRouter();

  const [query, setQuery] = useState<BlockQuery | undefined>(undefined);
  const [results, setResults] = useState<BlockResult | undefined>(undefined);

  const [editingQuery, setEditingQuery] = useState(false);

  useEffect(() => {
    setResults(undefined);

    if (query) {
      blocker.query(query).then((r) => {
        setResults(r);
      });
    }
  }, [query, setResults]);

  if (typeof window === "undefined") {
    return <div>Loading...</div>;
  }

  if (!blocker) {
    router.push("/");
    return <></>;
  }

  return (
    <div>
      <Nav />
      <div className="text-gray-700 body-font overflow-hidden">
        <div className="container pb-5 mx-auto">
          <section className="text-3xl text-center py-12">
            <h2>Debugging {blocker.rules.length} rules</h2>
          </section>
          {(!query || editingQuery) && (
            <QueryBuilder
              query={query}
              onSetQuery={setQuery}
              onCloseQuery={() => setEditingQuery(false)}
            />
          )}
          {query && (
            <CurrentQuery
              query={query}
              onStartNewQuery={() => {
                setEditingQuery(true);
              }}
            />
          )}
          {query && !results && <div>Loading...</div>}
          {results && <QueryResults results={results} />}
        </div>
      </div>
    </div>
  );
}
