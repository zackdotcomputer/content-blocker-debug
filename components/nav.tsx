import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import Link from "next/link";
import React from "react";

export default function Nav() {
  return (
    <header className="text-gray-700 body-font">
      <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center justify-between">
        <Link href="/">
          <a className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0 flex-grow">
            <img src="/img/noun_Bug Spray_3511853.svg" width={60} height={60} />
            <span className="ml-3 text-xl">Content Blocker Debugger</span>
          </a>
        </Link>
        <a
          href="https://github.com/zackdotcomputer/content-blocker-debug"
          rel="external"
          className="mr-5 opacity-75 hover:opacity-100"
        >
          <FontAwesomeIcon icon={faGithub} /> Site source
        </a>
        <Link href="/#new">
          <a className="inline-flex items-center bg-gray-200 border-0 py-1 px-3 focus:outline-none hover:bg-gray-300 rounded text-base mt-4 md:mt-0">
            Start new
            <svg
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="w-4 h-4 ml-1"
              viewBox="0 0 24 24"
            >
              <path d="M5 12h14M12 5l7 7-7 7"></path>
            </svg>
          </a>
        </Link>
      </div>
    </header>
  );
}
