import { axiosFetch } from "@/utils/axios_fetch";
import { cookies } from "next/headers";

// components
import CreateAddress from "@/components/profilePage/CreateAddress";
import Address from "@/components/profilePage/Address";
import { redirect } from "next/navigation";

interface AddressesGet {
  message: string;
  addresses: {
    id: string;
    title: string;
    mobile_number: string;
    postal_code: string;
    state: string;
    city: string;
    address_details: string;
  }[];
}

const Addresses = async () => {
  // cookies
  const cookieStore = await cookies();
  const token = cookieStore.get("token");

  if (!token) {
    redirect("/auth/login");
  }

  const tokenValue = token.value;

  const { data } = await axiosFetch<AddressesGet>({
    fetchType: "get",
    url: "profile/address",
    token: tokenValue,
  });  

  return (
    <div className="flex flex-col items-start justify-start w-full p-5 text-black dark:text-white bg-white dark:bg-zinc-700 shadow-normal rounded-2xl">
      {/* <!-- Header --> */}
      <CreateAddress />

      {/* <!-- Body --> */}
      <div className="flex flex-col items-center justify-center w-full">
        {data &&
          data.addresses.map((address, index) => {
            return (
              <Address
                key={address.id}
                data={{
                  index: index + 1,
                  id: address.id,
                  title: address.title,
                  mobile_number: address.mobile_number,
                  postal_code: address.postal_code,
                  state: address.state,
                  city: address.city,
                  address_details: address.address_details,
                }}
              />
            );
          })}
      </div>
    </div>
  );
};

export default Addresses;
