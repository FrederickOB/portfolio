import React from "react";
import Tabs from "../../components/Tabs/Tabs";

export default function Projects() {
  return (
    <main className="flex items-center justify-center w-screen h-full min-h-screen px-8 py-12 lg:py-24">
      <section className=" w-full max-w-[75rem] relative">
        <Tabs
          list={[
            { id: 1, name: "Front-End Dev" },
            { id: 2, name: "UI/UX " },
          ]}
        />
      </section>
    </main>
  );
}
