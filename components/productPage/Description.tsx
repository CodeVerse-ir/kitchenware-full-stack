interface SubText {
  paragraph: string;
}

interface SubDescription {
  title: string;
  text: SubText[];
}

interface DescriptionProps {
  description: SubDescription[];
}

const Description: React.FC<DescriptionProps> = ({ description }) => {
  return (
    <div className="flex flex-col w-full mt-2.5 p-5 md:p-10 text-sm md:text-base lg:text-lg text-black dark:text-white bg-white dark:bg-zinc-700 shadow-normal rounded-2xl gap-y-6">
      {description.map((item, index) => {
        return (
          <div key={index} className="">
            <h4 className="font-DanaBold mb-4 text-base md:text-lg lg:text-xl">
              {item.title}
            </h4>
            {item.text.map((text, index) => {
              return (
                <p key={index} className="mb-4">
                  {text.paragraph}
                </p>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export default Description;
