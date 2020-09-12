import { useRef, useState } from "react";
import { BlockQuery } from "../model/BlockQuery";
import { ResourceType } from "../model/BlockTypes";

interface Props {
  query?: BlockQuery;
  onSetQuery: (BlockQuery) => void;
  onCloseQuery: VoidFunction;
}

export default function QueryBuilder({ query, onSetQuery, onCloseQuery }: Props) {
  const [isThirdParty, setIsThirdParty] = useState(false);

  const [primaryURL, setPrimaryURL] = useState("");
  const [parentURL, setParentURL] = useState("");
  const [documentType, setDocumentType] = useState(ResourceType.document);

  const formRef = useRef<HTMLFormElement>(null);

  const hasExistingQuery = query !== undefined;

  const buildQuery = () => {
    if (formRef.current.checkValidity()) {
      onSetQuery({
        url: primaryURL,
        resourceType: documentType,
        firstPartyURL: isThirdParty ? parentURL : undefined
      });
    }
  };

  return (
    <>
      <section className="bg-gray-200 rounded-lg px-8 py-5 flex flex-col w-full md:w-3/4 mx-auto mt-10 md:mt-0">
        <form
          className="space-y-4"
          ref={formRef}
          onSubmit={(e) => {
            e.preventDefault();
            buildQuery();
          }}
        >
          <div className="flex flex-row justify-between">
            <h4 className="font-bold">Debug a load</h4>
            {hasExistingQuery && <button onClick={onCloseQuery}>Cancel</button>}
          </div>
          <div className="form-row">
            <label htmlFor="primary-url">URL:</label>
            <input
              type="text"
              name="primary-url"
              required={true}
              onChange={(e) => {
                setPrimaryURL(e.target.value);
              }}
            />
          </div>
          <div className="form-row">
            <div>
              <input
                type="checkbox"
                name="is-third-party"
                checked={isThirdParty}
                onChange={(e) => {
                  setIsThirdParty(!isThirdParty);
                }}
              />
              <label
                htmlFor="is-third-party"
                onClick={() => {
                  setIsThirdParty(!isThirdParty);
                }}
              >
                Is loading as third party resource?
              </label>
            </div>
          </div>
          {isThirdParty && (
            <div className="form-row">
              <label htmlFor="root-url">Parent resource URL:</label>
              <input
                type="text"
                name="root-url"
                required={true}
                onChange={(e) => {
                  setParentURL(e.target.value);
                }}
              />
            </div>
          )}
          <div className="form-row">
            <label htmlFor="resource-type">Resource type:</label>
            <select
              name="resource-type"
              onChange={(e) => {
                setDocumentType(e.target.value as ResourceType);
              }}
            >
              {Object.values(ResourceType).map((type: string) => (
                <option value={type} key={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-row justify-center">
            <input className="btn-blue" type="submit" value="Go" />
          </div>
        </form>
      </section>
      {hasExistingQuery && <hr className="mt-10 mb-4" />}
    </>
  );
}
