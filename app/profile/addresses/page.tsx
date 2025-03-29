// components
import CreateAddress from "@/components/profilePage/CreateAddress";
import Address from "@/components/profilePage/Address";

const Addresses = () => {
  return (
    <div className="flex flex-col items-start justify-start w-full p-5 text-black dark:text-white bg-white dark:bg-zinc-700 shadow-normal rounded-2xl">
      {/* <!-- Header --> */}
      <CreateAddress />

      {/* <!-- Body --> */}
      <div className="flex flex-col items-center justify-center w-full">
        <Address />
      </div>
    </div>
  );
};

export default Addresses;
