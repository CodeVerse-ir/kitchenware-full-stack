const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen sm:mt-20 gap-y-5 background">
      <div className="font-DanaMedium text-sm sm:text-xl text-zinc-700 dark:text-white  ">404</div>
      <div className="font-DanaMedium text-sm sm:text-xl text-zinc-700 dark:text-white">
        صفحه مورد نظر یافت نشد !
      </div>
      <svg
        className="sm:hidden"
        width="152"
        height="134"
        viewBox="0 0 152 134"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clipPath="url(#clip0_2049_32045)">
          <path
            d="M75.9988 133.77C113.105 133.77 143.185 103.825 143.185 66.8851C143.185 29.9455 113.105 0 75.9988 0C38.8928 0 8.8125 29.9455 8.8125 66.8851C8.8125 103.825 38.8928 133.77 75.9988 133.77Z"
            fill="white"
          />
          <path
            d="M75.9988 133.77C113.105 133.77 143.185 103.825 143.185 66.8851C143.185 29.9455 113.105 0 75.9988 0C38.8928 0 8.8125 29.9455 8.8125 66.8851C8.8125 103.825 38.8928 133.77 75.9988 133.77Z"
            fill="#ffedd5"
          />
          <path
            d="M32.3338 89.6027L0.203125 89.5057L0.335326 46.0525L22.5529 46.1195L32.4359 56.0181L32.3338 89.6027Z"
            fill="white"
          />
          <path
            d="M22.5535 46.1194L22.5234 55.988L32.4365 56.0179L22.5535 46.1194Z"
            fill="#fed7aa"
          />
          <path
            d="M32.6396 56.0057C32.6384 55.9879 32.6349 55.9703 32.6292 55.9534C32.6269 55.9468 32.6253 55.9405 32.6224 55.934C32.6129 55.9119 32.5993 55.8916 32.5825 55.8743L22.6995 45.9758C22.6822 45.9587 22.6618 45.9449 22.6396 45.935C22.6334 45.9324 22.627 45.9301 22.6205 45.9281C22.6034 45.9221 22.5855 45.9186 22.5673 45.9175C22.563 45.9175 22.5592 45.9148 22.5549 45.9148L0.337461 45.8486C0.283186 45.8486 0.231133 45.8701 0.192755 45.9083C0.154376 45.9465 0.132815 45.9983 0.132815 46.0524L0 89.505C0 89.559 0.0215609 89.6108 0.0599394 89.649C0.098318 89.6872 0.150371 89.7087 0.204646 89.7087L32.3341 89.8063C32.3883 89.8063 32.4404 89.7848 32.4788 89.7466C32.5172 89.7084 32.5387 89.6566 32.5387 89.6026L32.641 56.0179C32.6421 56.0141 32.6398 56.0102 32.6396 56.0057ZM22.7566 46.612L27.3202 51.181L31.944 55.8122L22.7296 55.7843L22.7566 46.612ZM0.409292 89.3025L0.540266 46.2567L22.3484 46.3225L22.3191 55.9874C22.3191 56.0414 22.3407 56.0932 22.379 56.1314C22.4174 56.1696 22.4695 56.1911 22.5237 56.1911L32.2322 56.2204L32.1313 89.3976L0.409292 89.3025Z"
            fill="#353535"
          />
          <path
            d="M97.8388 87.8637L54.0234 87.7315L54.2037 28.4758L84.501 28.5673L97.9781 42.0655L97.8388 87.8637Z"
            fill="white"
          />
          <path
            d="M84.5019 28.5674L84.4609 42.0249L97.979 42.0656L84.5019 28.5674Z"
            fill="#fed7aa"
          />
          <path
            d="M98.1812 42.0534C98.1801 42.0356 98.1767 42.0181 98.171 42.0012C98.1687 41.9945 98.1669 41.9882 98.164 41.9809C98.1545 41.9588 98.141 41.9385 98.1243 41.9212L84.6472 28.4229C84.6298 28.4059 84.6095 28.3921 84.5872 28.3822C84.5809 28.3793 84.5747 28.3777 84.5682 28.3755C84.551 28.3696 84.5331 28.3659 84.515 28.3647C84.5107 28.3647 84.5068 28.3622 84.5025 28.3622L54.2052 28.2708C54.151 28.2708 54.0989 28.2922 54.0605 28.3304C54.0222 28.3686 54.0006 28.4204 54.0006 28.4745L53.8203 87.7301C53.8203 87.7841 53.8419 87.836 53.8802 87.8742C53.9186 87.9124 53.9707 87.9338 54.025 87.9338L97.8397 88.0661C97.8939 88.0661 97.946 88.0446 97.9844 88.0064C98.0228 87.9682 98.0443 87.9164 98.0443 87.8623L98.1837 42.0642C98.1837 42.0617 98.1814 42.0579 98.1812 42.0534ZM84.7047 29.0598L97.4852 41.8605L84.6658 41.8217L84.7047 29.0598ZM54.2296 87.5284L54.4087 28.6802L84.2966 28.7705L84.2557 42.0243C84.2557 42.0783 84.2772 42.1301 84.3156 42.1683C84.354 42.2065 84.406 42.228 84.4603 42.228L97.7738 42.2687L97.6356 87.6594L54.2296 87.5284Z"
            fill="#353535"
          />
          <path
            d="M151.693 89.6027L119.562 89.5057L119.695 46.0525L141.912 46.1195L151.795 56.0181L151.693 89.6027Z"
            fill="white"
          />
          <path
            d="M141.913 46.1194L141.883 55.988L151.796 56.0179L141.913 46.1194Z"
            fill="#fed7aa"
          />
          <path
            d="M151.998 56.0058C151.997 55.988 151.994 55.9704 151.988 55.9534C151.986 55.9469 151.984 55.9406 151.981 55.9341C151.972 55.912 151.958 55.8918 151.941 55.8744L142.058 45.9758C142.041 45.9588 142.021 45.945 141.999 45.9351C141.992 45.9322 141.986 45.9304 141.979 45.9282C141.962 45.9222 141.944 45.9187 141.926 45.9176C141.922 45.9176 141.918 45.9149 141.914 45.9149L119.696 45.8479C119.642 45.8479 119.59 45.8694 119.552 45.9076C119.513 45.9458 119.492 45.9976 119.492 46.0516L119.359 89.5049C119.359 89.5589 119.381 89.6107 119.419 89.6489C119.458 89.6871 119.51 89.7086 119.564 89.7086L151.695 89.8056C151.749 89.8056 151.801 89.7841 151.839 89.7459C151.878 89.7077 151.899 89.6559 151.899 89.6018L152.002 56.0172C152.001 56.0142 151.999 56.0103 151.998 56.0058ZM142.116 46.6121L146.678 51.1811L151.303 55.8123L142.088 55.7843L142.116 46.6121ZM119.769 89.3026L119.9 46.2568L141.708 46.3226L141.679 55.9875C141.679 56.0415 141.7 56.0933 141.739 56.1315C141.777 56.1697 141.829 56.1912 141.883 56.1912L151.592 56.2205L151.491 89.3977L119.769 89.3026Z"
            fill="#353535"
          />
          <path
            d="M98.0423 42.5512C92.8196 36.5818 85.429 32.9222 77.496 32.3773C69.563 31.8323 61.7375 34.4467 55.7408 39.6454C45.7221 48.3318 42.6434 62.7733 48.2554 74.7682C49.3823 77.1717 50.8271 79.4143 52.5515 81.4362L52.9199 81.8708L25.4581 110.884C24.9559 111.422 24.6879 112.136 24.7125 112.871C24.7371 113.605 25.0524 114.3 25.5895 114.804C26.1267 115.307 26.8421 115.579 27.5799 115.56C28.3176 115.541 29.0177 115.232 29.5276 114.701L56.9827 85.6921L57.4414 86.034C63.3661 90.4581 70.726 92.5428 78.1029 91.8862C85.4797 91.2296 92.3515 87.8783 97.3939 82.4781C102.436 77.0778 105.293 70.0107 105.413 62.6386C105.533 55.2665 102.907 48.1111 98.0431 42.5512H98.0423ZM99.764 63.8262C99.3389 69.9558 96.5956 75.6972 92.087 79.8931C87.5784 84.0891 81.6397 86.4278 75.4678 86.4378C74.8979 86.4378 74.3261 86.4174 73.7525 86.3766C69.7462 86.1059 65.8689 84.8552 62.4645 82.7354C59.0601 80.6155 56.2338 77.6922 54.2361 74.2244C52.2385 70.7567 51.1313 66.8519 51.0127 62.8561C50.8941 58.8604 51.7678 54.8972 53.5563 51.3182C55.3448 47.7391 57.9928 44.6547 61.2655 42.3385C64.5383 40.0222 68.3346 38.5458 72.3178 38.04C76.3011 37.5343 80.3481 38.0149 84.1001 39.4392C87.852 40.8635 91.193 43.1875 93.8266 46.2051C95.9365 48.6061 97.5476 51.3996 98.5667 54.4241C99.5858 57.4486 99.9927 60.6442 99.764 63.8262Z"
            fill="#fb923c"
          />
        </g>
        <defs>
          <clipPath id="clip0_2049_32045">
            <rect width="152" height="134" fill="white" />
          </clipPath>
        </defs>
      </svg>

      <svg
        className="hidden sm:inline-block"
        width="390"
        height="345"
        viewBox="0 0 390 345"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clipPath="url(#clip0_1921_48401)">
          <path
            d="M194.999 344.408C290.205 344.408 367.385 267.31 367.385 172.204C367.385 77.0984 290.205 0 194.999 0C99.7931 0 22.6133 77.0984 22.6133 172.204C22.6133 267.31 99.7931 344.408 194.999 344.408Z"
            fill="white"
          />
          <path
            d="M194.999 344.408C290.205 344.408 367.385 267.31 367.385 172.204C367.385 77.0984 290.205 0 194.999 0C99.7931 0 22.6133 77.0984 22.6133 172.204C22.6133 267.31 99.7931 344.408 194.999 344.408Z"
            fill="#ffedd5"
          />
          <path
            d="M82.9639 230.693L0.523438 230.444L0.862638 118.568L57.8683 118.74L83.2259 144.226L82.9639 230.693Z"
            fill="white"
          />
          <path
            d="M57.8702 118.74L57.793 144.148L83.2278 144.225L57.8702 118.74Z"
            fill="#fed7aa"
          />
          <path
            d="M83.7464 144.194C83.7432 144.148 83.7342 144.103 83.7196 144.059C83.7138 144.042 83.7096 144.026 83.7023 144.009C83.6777 143.952 83.643 143.9 83.5999 143.856L58.2422 118.371C58.1976 118.327 58.1455 118.291 58.0884 118.266C58.0724 118.259 58.0561 118.253 58.0396 118.248C57.9955 118.232 57.9496 118.223 57.903 118.221C57.892 118.221 57.882 118.214 57.871 118.214L0.865855 118.043C0.726595 118.043 0.593039 118.098 0.494568 118.197C0.396097 118.295 0.340776 118.429 0.340776 118.568L0 230.442C0 230.581 0.0553206 230.715 0.153792 230.813C0.252263 230.911 0.385819 230.967 0.525079 230.967L82.9624 231.218C83.1017 231.218 83.2352 231.163 83.3337 231.064C83.4322 230.966 83.4875 230.832 83.4875 230.693L83.75 144.225C83.7527 144.215 83.7469 144.205 83.7464 144.194ZM58.3887 120.009L70.098 131.772L81.9616 143.696L58.3194 143.624L58.3887 120.009ZM1.05016 229.921L1.38621 119.094L57.3412 119.263L57.2661 144.147C57.2661 144.286 57.3214 144.419 57.4199 144.518C57.5184 144.616 57.6519 144.671 57.7912 144.671L82.7009 144.747L82.4421 230.166L1.05016 229.921Z"
            fill="#353535"
          />
          <path
            d="M251.03 226.216L138.609 225.876L139.072 73.3147L216.808 73.5502L251.388 108.303L251.03 226.216Z"
            fill="white"
          />
          <path
            d="M216.808 73.5503L216.703 108.198L251.388 108.303L216.808 73.5503Z"
            fill="#fed7aa"
          />
          <path
            d="M251.907 108.272C251.904 108.226 251.895 108.181 251.88 108.137C251.875 108.12 251.87 108.104 251.863 108.085C251.838 108.028 251.804 107.976 251.761 107.931L217.181 73.1784C217.137 73.1346 217.084 73.0991 217.027 73.0735C217.011 73.0662 216.995 73.062 216.978 73.0562C216.934 73.041 216.888 73.0317 216.842 73.0284C216.831 73.0284 216.821 73.0221 216.81 73.0221L139.074 72.7866C138.934 72.7866 138.801 72.8419 138.702 72.9403C138.604 73.0386 138.549 73.172 138.549 73.3111L138.086 225.872C138.086 226.011 138.141 226.145 138.24 226.243C138.338 226.342 138.472 226.397 138.611 226.397L251.03 226.737C251.17 226.737 251.303 226.682 251.402 226.584C251.5 226.485 251.555 226.352 251.555 226.213L251.913 108.3C251.913 108.293 251.907 108.283 251.907 108.272ZM217.329 74.8181L250.121 107.775L217.229 107.675L217.329 74.8181ZM139.136 225.353L139.596 73.8409L216.282 74.0733L216.177 108.197C216.177 108.336 216.232 108.469 216.33 108.568C216.429 108.666 216.562 108.721 216.702 108.721L250.861 108.826L250.507 225.69L139.136 225.353Z"
            fill="#353535"
          />
          <path
            d="M389.214 230.693L306.773 230.443L307.113 118.568L364.118 118.74L389.476 144.225L389.214 230.693Z"
            fill="white"
          />
          <path
            d="M364.12 118.74L364.043 144.148L389.478 144.225L364.12 118.74Z"
            fill="#fed7aa"
          />
          <path
            d="M389.995 144.194C389.992 144.148 389.983 144.103 389.969 144.059C389.963 144.042 389.958 144.026 389.951 144.009C389.926 143.952 389.892 143.9 389.849 143.855L364.491 118.37C364.446 118.327 364.394 118.291 364.337 118.266C364.321 118.258 364.305 118.253 364.288 118.248C364.244 118.232 364.198 118.223 364.152 118.22C364.141 118.22 364.131 118.214 364.12 118.214L307.114 118.041C306.975 118.041 306.841 118.096 306.743 118.195C306.645 118.293 306.589 118.426 306.589 118.566L306.25 230.441C306.25 230.581 306.305 230.714 306.404 230.812C306.502 230.911 306.636 230.966 306.775 230.966L389.216 231.216C389.355 231.216 389.488 231.16 389.587 231.062C389.685 230.964 389.741 230.83 389.741 230.691L390.003 144.223C390.001 144.215 389.995 144.205 389.995 144.194ZM364.639 120.009L376.344 131.772L388.21 143.696L364.568 143.624L364.639 120.009ZM307.301 229.921L307.637 119.094L363.592 119.263L363.517 144.147C363.517 144.286 363.572 144.419 363.67 144.518C363.769 144.616 363.902 144.671 364.042 144.671L388.951 144.747L388.693 230.166L307.301 229.921Z"
            fill="#353535"
          />
          <path
            d="M251.559 109.554C238.159 94.1849 219.196 84.7627 198.842 83.3597C178.487 81.9567 158.409 88.6878 143.022 102.072C117.316 124.437 109.417 161.618 123.816 192.501C126.708 198.689 130.415 204.462 134.839 209.668L135.785 210.787L65.3232 285.485C64.0347 286.871 63.3471 288.71 63.4103 290.6C63.4734 292.491 64.2824 294.28 65.6606 295.577C67.0388 296.874 68.8744 297.574 70.7673 297.524C72.6602 297.475 74.4566 296.679 75.7649 295.312L146.209 220.626L147.386 221.506C162.587 232.896 181.471 238.263 200.399 236.573C219.326 234.883 236.958 226.254 249.896 212.351C262.833 198.447 270.162 180.252 270.47 161.271C270.777 142.291 264.042 123.868 251.561 109.554H251.559ZM255.977 164.329C254.886 180.11 247.847 194.892 236.279 205.695C224.711 216.498 209.474 222.52 193.638 222.545C192.176 222.545 190.708 222.493 189.236 222.388C178.957 221.691 169.009 218.471 160.274 213.013C151.539 207.555 144.287 200.029 139.162 191.101C134.036 182.173 131.195 172.119 130.891 161.831C130.587 151.544 132.828 141.34 137.417 132.125C142.006 122.911 148.8 114.969 157.198 109.006C165.595 103.043 175.335 99.2414 185.556 97.9392C195.776 96.6371 206.159 97.8745 215.786 101.541C225.413 105.209 233.985 111.192 240.742 118.961C246.156 125.143 250.29 132.335 252.905 140.122C255.519 147.909 256.563 156.136 255.977 164.329Z"
            fill="#fb923c"
          />
        </g>
        <defs>
          <clipPath id="clip0_1921_48401">
            <rect width="390" height="345" fill="white" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
};

export default NotFound;
