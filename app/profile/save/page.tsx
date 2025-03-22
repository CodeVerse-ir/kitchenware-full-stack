import CardProduct from "@/components/profilePage/CardProduct";

const Save = () => {
  return (
    <div className="flex flex-col items-start justify-start w-full p-5 text-black dark:text-white bg-white dark:bg-zinc-700 shadow-normal rounded-2xl">
      {/* <!-- Header --> */}
      <div className="flex flex-col items-start justify-center w-full">
        <h4 className="font-MorabbaMedium text-lg md:text-xl lg:text-2xl">
          ذخیره شده ها
        </h4>
        {/* <!-- Line --> */}
        <div className="w-full h-px my-5 bg-gray-300"></div>
      </div>

      {/* <!-- Body  --> */}
      <div className="grid grid-cols-2 xl:grid-cols-3 gap-3.5 md:gap-5">
        <CardProduct />
      </div>
    </div>
  );
};

export default Save;
