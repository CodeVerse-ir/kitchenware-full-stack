import Image from "next/image";
import contact from "/public/image/blogs/contact.png";

const SectionContactUs = () => {
  return (
    <>
      <section className="contact-us mb-8 md:mb-20">
        <div className="container">
          <div className="flex flex-col items-center md:flex-row">
            {/* <!-- image --> */}
            <div className="h-auto w-72 md:min-w-80 md:ml-5">
              <Image
                src={contact}
                className="rotate-[25deg]"
                alt="contact"
              ></Image>
            </div>
            {/* <!-- text --> */}
            <div className="text-zinc-700 dark:text-white">
              <h4 className="font-MorabbaMedium text-2xl md:text-4xl xl:text-5xl">
                فروشگاه لوازم آشپزخانه کبیری
              </h4>
              <sub className="top-2 font-MorabbaLight text-lg md:text-2xl xl:text-3xl">
                کیفیت کالا را از ما بخواهید ...
              </sub>
              <div className="text-3xl tracking-widest text-zinc-700 dar:text-gray-400 my-5">
                ...
              </div>
              <p className="text-justify text-base font-thin md:text-xl xl:text-2xl">
                مزه و لذت آشپزی را به خانه خود بیاورید ! از تخته‌های برش تا
                ماشین‌های رنده و دستگاه‌های آشپزی حرفه‌ای، ما همه چیز برای
                تجربه‌ی شیرین‌ترین غذاها و خوراکی‌ها را داریم. با ما همراه باشید
                و لذت آشپزی را با لوازم اشپزخانه متنوع و باکیفیت، به زندگی خود
                بیاورید.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default SectionContactUs;
