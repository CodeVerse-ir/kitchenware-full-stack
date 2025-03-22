// components
import FileUpload from "@/components/profilePage/FileUpload";
import Information from "@/components/profilePage/Information";

const Profile = () => {
  return (
    <div className="flex flex-col items-start justify-start w-full p-5 text-black dark:text-white bg-white dark:bg-zinc-700 shadow-normal rounded-2xl">
      {/* <!-- Header --> */}
      <div className="flex flex-col items-start justify-center w-full">
        <h4 className="font-MorabbaMedium text-lg md:text-xl lg:text-2xl">
          اطلاعات شخصی
        </h4>
        {/* <!-- Line --> */}
        <div className="w-full h-px my-5 bg-gray-300"></div>
      </div>

      {/* <!-- Body --> */}
      <div className="flex flex-col xl:flex-row items-center xl:items-start justify-center w-full gap-x-10">
        <Information
          data={{
            first_name: "محمد",
            last_name: "کبیری",
            birthdate: "1380/08/25",
            nickname: "گل",
          }}
        />

        <FileUpload />
      </div>
    </div>
  );
};

export default Profile;
