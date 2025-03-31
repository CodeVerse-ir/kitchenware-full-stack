"use client";

interface ShoppingHeaderProps {
  step: number;
}

const ShoppingHeader: React.FC<ShoppingHeaderProps> = ({ step }) => {
  return (
    <div className="hidden md:flex items-center justify-center w-full gap-x-3">
      <div
        className={`flex items-center justify-center gap-x-1 text-sm lg:text-base ${
          step === 1
            ? "text-orange-500 font-DanaBold"
            : "text-orange-300 font-DanaMedium"
        }`}
      >
        <div className="flex flex-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-4 md:size-5 lg:size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
            />
          </svg>
        </div>

        <div>سبد خرید</div>
      </div>
      {/* line */}
      <div className="text-orange-500">
        {step === 1 ? (
          <svg
            width="204"
            height="1"
            viewBox="0 0 204 1"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <line
              x1="203.5"
              y1="0.5"
              x2="0.5"
              y2="0.5"
              stroke="url(#paint0_linear_6825_4188)"
              strokeLinecap="round"
              strokeDasharray="4 4"
            />
            <defs>
              <linearGradient
                id="paint0_linear_6825_4188"
                x1="204"
                y1="0"
                x2="0"
                y2="0"
                gradientUnits="userSpaceOnUse"
              >
                <stop offset="0.485754" stopColor="currentColor" />
                <stop offset="0.501641" stopColor="#9ca3af" />
              </linearGradient>
            </defs>
          </svg>
        ) : (
          <svg
            width="200"
            height="1"
            viewBox="0 0 200 1"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <line
              x1="199.5"
              y1="0.5"
              x2="0.5"
              y2="0.5"
              stroke="currentColor"
              strokeLinecap="round"
              strokeDasharray="4 4"
            />
          </svg>
        )}
      </div>
      <div
        className={`flex items-center justify-center gap-x-1 text-sm lg:text-base ${
          (step === 1 && "text-gray-400 font-DanaMedium") ||
          (step === 2 && "text-orange-500 font-DanaBold") ||
          (step === 3 && "text-orange-300 font-DanaMedium")
        }`}
      >
        <div className="flex flex-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-4 md:size-5 lg:size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 2.192V16.5A2.25 2.25 0 0 1 18 18.75h-2.25m-7.5-10.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75m-7.5-10.5h6.375c.621 0 1.125.504 1.125 1.125v9.375m-8.25-3 1.5 1.5 3-3.75"
            />
          </svg>
        </div>

        <div>تکمیل اطلاعات</div>
      </div>
      {/* line */}
      <div className="">
        {step === 2 ? (
          <svg
            width="204"
            height="1"
            viewBox="0 0 204 1"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="text-orange-500"
          >
            <line
              x1="203.5"
              y1="0.5"
              x2="0.5"
              y2="0.5"
              stroke="url(#paint0_linear_6825_4188)"
              strokeLinecap="round"
              strokeDasharray="4 4"
            />
            <defs>
              <linearGradient
                id="paint0_linear_6825_4188"
                x1="204"
                y1="0"
                x2="0"
                y2="0"
                gradientUnits="userSpaceOnUse"
              >
                <stop offset="0.485754" stopColor="currentColor" />
                <stop offset="0.501641" stopColor="#9ca3af" />
              </linearGradient>
            </defs>
          </svg>
        ) : (
          <svg
            width="200"
            height="1"
            viewBox="0 0 200 1"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={`${step === 1 ? "text-gray-400" : "text-orange-500"}`}
          >
            <line
              x1="199.5"
              y1="0.5"
              x2="0.5"
              y2="0.5"
              stroke="currentColor"
              strokeLinecap="round"
              strokeDasharray="4 4"
            />
          </svg>
        )}
      </div>
      <div
        className={`flex items-center justify-center gap-x-1 text-sm lg:text-base ${
          step === 3
            ? "text-orange-500 font-DanaBold"
            : "text-gray-400 font-DanaMedium"
        }`}
      >
        <div className="flex flex-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-4 md:size-5 lg:size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Z"
            />
          </svg>
        </div>

        <div>پرداخت</div>
      </div>
    </div>
  );
};

export default ShoppingHeader;
