"use client";

import Image from "next/image";
import { useSession } from "@/utils/useSession";

const Biography = () => {
  const { user } = useSession();

  return (
    <div className="flex items-center justify-start w-2/4 lg:w-72 p-5 gap-x-2.5 text-black dark:text-white bg-white dark:bg-zinc-700 shadow-normal rounded-2xl select-none">
      <Image
        className="w-14 h-14 md:w-16 md:h-16 lg:w-20 lg:h-20 p-1 border border-gray-300 rounded-full"
        src={user?.image || "/image/comment/avatar.png"}
        alt="avatar"
        width={80}
        height={80}
        sizes="(min-width: 768px)"
        priority
      />
      <h4 className="font-MorabbaLight text-lg md:text-xl lg:text-2xl">
        {user?.first_name} {user?.last_name}
      </h4>
    </div>
  );
};

export default Biography;
