import React from "react";

function page() {
  return (
    <section>
      <section>Waiting for opponenet move...</section>
      <div className="flex justify-center">
        <div className="grid grid-cols-3 text-5xl font-medium text-seconday">
          {[" ", " ", " ", " ", "X", "O", " ", " ", " "].map((value, index) => (
            <div
              key={index}
              className={`flex items-center justify-center w-16 h-16 border-1 bg-white border-gray-400`}
            >
              {value}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default page;
