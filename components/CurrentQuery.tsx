import { BlockQuery } from "../model/BlockQuery";

interface Props {
  query: BlockQuery;
  onStartNewQuery: VoidFunction;
}

export default function CurrentQuery({ query, onStartNewQuery }: Props) {
  return (
    <div className="bg-white px-8 py-5 flex flex-col w-full md:w-3/4 mx-auto mt-10 md:mt-0 items-center space-y-2">
      <h2 className="text-xl">
        Showing results for{" "}
        <a href={query.url} target="_blank" rel="external nofollow">
          {query.url}
        </a>
      </h2>
      <button className="btn-blue w-full md:w-1/2" onClick={onStartNewQuery}>
        Start new debug
      </button>
    </div>
  );
}
