interface Address {
  title: string;
  isDefault: boolean;
}

interface RadioAddressProps {
  address: Address[];
}

const RadioAddress: React.FC<RadioAddressProps> = ({ address }) => {
  return (
    <div className="flex flex-wrap items-center justify-between w-full gap-4 text-xs md:text-sm lg:text-base">
      {address.map((item, index) => (
        <label
          key={index}
          className="flex items-center justify-center gap-x-1 cursor-pointer"
        >
          <input
            type="radio"
            name="address"
            className="size-3.5 cursor-pointer"
            defaultChecked={item.isDefault}
          />
          <span>{item.title}</span>
        </label>
      ))}
    </div>
  );
};

export default RadioAddress;
