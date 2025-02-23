"use client";

import { AppProgressBar as ProgressBar } from "next-nprogress-bar";

const NextNprogress = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <>
      {children}
      <ProgressBar
        height="4px"
        color="#f97316"
        options={{ showSpinner: true }}
        shallowRouting
      />
    </>
  );
};

export default NextNprogress;
