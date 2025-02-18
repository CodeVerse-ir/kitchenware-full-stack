"use client";

interface OverlayPrpos {
  navbar: boolean;
  handleNavbar: (event: React.MouseEvent<HTMLDivElement>) => void;
}

const Overlay: React.FC<OverlayPrpos> = ({ navbar, handleNavbar }) => {
  return (
    <div
      className={`${
        navbar ? "visible opacity-100" : "invisible opacity-0"
      } overlay`}
      onClick={handleNavbar}
    ></div>
  );
};

export default Overlay;
