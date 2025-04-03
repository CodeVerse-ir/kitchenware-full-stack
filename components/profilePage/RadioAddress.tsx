interface Address {
  id: string;
  title: string;
  isDefault: boolean;
}

interface RadioAddressProps {
  address: Address[];
  selectedAddress: string;
  handleAddressChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const RadioAddress: React.FC<RadioAddressProps> = ({
  address,
  selectedAddress,
  handleAddressChange,
}) => {
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
            value={item.id}
            className="size-3.5 cursor-pointer"
            checked={selectedAddress === item.id}
            onChange={handleAddressChange}
          />
          <span>{item.title}</span>
        </label>
      ))}
    </div>
  );
};

export default RadioAddress;
