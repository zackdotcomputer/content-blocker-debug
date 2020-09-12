import { useCallback, useRef, useState } from "react";

interface Props {
  onBeginDebug: (any) => Promise<{}>;
}

export default function ProblemSolution({ onBeginDebug }: Props) {
  const fileInputRef = useRef(null);
  const [error, setError] = useState<string | undefined>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSubmit = useCallback(async () => {
    setIsLoading(true);

    const uploadedFile = fileInputRef.current.files[0];

    const { error } = (await onBeginDebug(uploadedFile).catch((r) => ({ error: r }))) as {
      error?: string;
    };

    setIsLoading(false);
    setError(error);
  }, [fileInputRef, onBeginDebug, setError]);

  return (
    <section className="text-gray-700 body-font overflow-hidden">
      <div className="container px-5 py-24 mx-auto">
        <div className="flex flex-wrap -m-12">
          <div className="p-12 md:w-1/2 flex flex-col items-start">
            <span className="inline-block py-1 px-3 rounded bg-indigo-100 text-indigo-500 text-sm font-medium tracking-widest">
              Problem
            </span>
            <h2 className="sm:text-3xl text-2xl title-font font-medium text-gray-900 mt-4 mb-4">
              Safari content blockers are impossible to debug
            </h2>
            <p className="leading-relaxed mb-8">
              The{" "}
              <a href="https://developer.apple.com/documentation/safariservices/creating_a_content_blocker">
                content blocker
              </a>{" "}
              JSON definition files for large projects like AdGuard can be thousands of lines long
              and when a site fails to load, all you're told is that it was "blocked by a content
              blocker" with no way to debug.
            </p>
          </div>
          <div className="p-12 md:w-1/2 flex flex-col items-start">
            <span className="inline-block py-1 px-3 rounded bg-indigo-100 text-indigo-500 text-sm font-medium tracking-widest">
              Solution
            </span>
            <h2 className="sm:text-3xl text-2xl title-font font-medium text-gray-900 mt-4 mb-4">
              A simple debugger
            </h2>
            <p className="leading-relaxed mb-8">
              This site will load your content blocker from disk or URL, entirely in localstorage so
              nothing is ever logged to a remote site. It then lets you plug in URLs and see quickly
              which rules match.
            </p>
            <form
              className="rounded-box flex flex-col md:ml-auto w-full mt-10 md:mt-0"
              onSubmit={(e) => {
                e.preventDefault();
                handleSubmit();
              }}
            >
              <h2 className="text-gray-900 text-lg font-medium title-font mb-5">
                Select your blocker JSON
              </h2>
              <input
                className="bg-white rounded border border-color focus:outline-none focus:border-indigo-500 text-base px-4 py-2 mb-4"
                id="blocker-json"
                name="blocker-json"
                accept="application/json"
                type="file"
                ref={fileInputRef}
              />
              {isLoading ? (
                <p className="text-gray-500 italic">Loading...</p>
              ) : (
                <input type="submit" className="btn-blue" value="Get started" />
              )}
              {error && <p className="text-red-700">{error}</p>}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
