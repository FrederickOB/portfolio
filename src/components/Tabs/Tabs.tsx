import { QueryData, useGetProjects, useGetUIUX } from "@/api";
import { Tab } from "@headlessui/react";
import ProjectCards from "../Cards/ProjectCards";
import Heading from "../Heading/Heading";
import Modal from "../Modal/Modal";
import { useThemeColor } from "@/context/ColorThemeContext";

function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(" ");
}

export interface List {
  id: number;
  name: string;
}

interface TabProps {
  list: List[];
}
export default function Tabs({ list }: TabProps) {
  const { projects } = useGetProjects();
  const { color } = useThemeColor();
  const { uiux } = useGetUIUX();
  // useSta

  return (
    <>
      {/* <Modal /> */}
      <div className="relative w-full">
        <Tab.Group>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <Heading text="My Portfolio" />
            <Tab.List
              className={`flex w-full h-full p-1 space-x-1 ${color.bg} rounded-full`}
            >
              <div className="flex items-center w-full h-full">
                {list.map((item: List, idx: number) => (
                  <Tab
                    key={item.id || idx}
                    className={({ selected }) =>
                      classNames(
                        "w-full min-w-[5rem] lg:min-w-[8rem]  lg:py-2.5 text-xs lg:text-sm font-medium leading-5 rounded-full",
                        "ring-white ring-opacity-60 ring-offset-2  focus:outline-none ",
                        selected
                          ? `bg-white shadow  ${color.text} `
                          : "text-blue-100 hover:bg-white/[0.12] hover:text-white"
                      )
                    }
                  >
                    <p>{item.name}</p>
                  </Tab>
                ))}
              </div>
            </Tab.List>
          </div>
          <Tab.Panels className="mt-3 lg:mt-8">
            <Tab.Panel className="grid grid-cols-1 gap-8 lg:grid-cols-3">
              {projects && projects.length > 0
                ? projects.map((item: QueryData) => (
                    <ProjectCards
                      key={item.id}
                      title={item.title}
                      description={item.description}
                      stack={item.stack}
                      picture={item.image}
                    />
                  ))
                : null}
            </Tab.Panel>
            <Tab.Panel className="grid grid-cols-1 gap-8 lg:grid-cols-3">
              {uiux && uiux.length > 0
                ? uiux.map((item: QueryData) => (
                    <ProjectCards
                      key={item.id}
                      title={item.title}
                      description={item.description}
                      stack={item.stack}
                      picture={item.image}
                    />
                  ))
                : null}
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </div>
    </>
  );
}
