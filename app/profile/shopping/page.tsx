// components
import MainBody from "@/components/profilePage/MainBody";

const Shopping = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full p-5 text-black dark:text-white bg-white dark:bg-zinc-700 shadow-normal rounded-2xl">
      {/* <!-- Header --> */}
      <div className="flex flex-col items-start justify-center w-full">
        <h4 className="font-MorabbaMedium text-lg md:text-xl lg:text-2xl">
          سبد خرید
        </h4>
        {/* <!-- Line --> */}
        <div className="w-full h-px my-5 bg-gray-300"></div>

        <MainBody />
      </div>
    </div>
  );
};

export default Shopping;
