import { BsArrowRight } from "react-icons/bs";

export default function SwipeSlideCard({
  picture,
  title,
  description,
  stack,
  video,
}) {
  return (
    <div className="flex flex-col justify-start h-full ">
      <div className="bg-red-300 h-1/2">
        {video ? (
          <video src={video} muted autoPlay loop />
        ) : (
          <img src={picture} className="w-full h-[25rem]" />
        )}
      </div>
      <div className="px-6 py-4 space-y-4 text-white bg-black border-b-2 border-blue-400 border-x-2 rounded-b-xl">
        <div className="mt-4">
          <h3 className="text-2xl font-bold text-blue-400">{title}</h3>
        </div>
        <div className="inline-block ">
          <span className="block line-clamp-4">{description}</span>
        </div>
        <div className="flex space-x-4 text-4xl text-blue-400">{stack}</div>
        {/* <div className="flex justify-end">
          <button className="flex items-center py-2 pl-4 pr-5 text-base text-black transition-transform bg-blue-400 rounded-lg hover:scale-110">
            view
            <BsArrowRight className="ml-2" />
          </button>
        </div> */}
      </div>
    </div>
  );
}