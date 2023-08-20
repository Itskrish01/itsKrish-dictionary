import React from "react";

const Meaning = ({ item }) => {
  return (
    <>
      <div className="mt-[3rem] flex items-center gap-6 w-full">
        <p className="p-0 font-bold  m-0 text-lg">{item.partOfSpeech}</p>
        <div className="flex-1 divider"></div>
      </div>
      <div className="mt-8">
        <p>Meaning -</p>
        <ul className="list-disc ml-10 mt-3 flex flex-col gap-4">
          {item.definitions.map((item, idx) => (
            <li key={idx}>{item.definition}</li>
          ))}
        </ul>
      </div>
      <div className="mt-8 flex flex-wrap gap-7">
        <p>Synonyms - </p>
        <h5 className="font-semibold flex flex-wrap gap-3 text-purple-500">
          {item.synonyms.length === 0
            ? "No synonyms"
            : item.synonyms.map((item, id) => <p key={id}>{item}</p>)}
        </h5>
      </div>
    </>
  );
};

export default Meaning;
