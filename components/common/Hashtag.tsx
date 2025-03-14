interface HashtagProps {
  text: string;
  isSelected: boolean;
  onClick: () => void;
}

const Hashtag: React.FC<HashtagProps> = ({ text, isSelected, onClick }) => {
  return (
    <div
      className={`flex items-center justify-center text-nowrap px-2 py-0.5 md:py-2 gap-x-1 font-Dana text-[10px] md:text-base ${
        isSelected ? "bg-orange-400 text-white" : "bg-orange-200 text-zinc-700"
      } rounded-4xl select-none cursor-pointer`}
      onClick={onClick}
    >
      {text}
    </div>
  );
};

export default Hashtag;
