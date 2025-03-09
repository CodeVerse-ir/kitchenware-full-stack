"use client";

interface SubmitBtnProps {
  title: string;
  style: string;
  isPending: boolean;
}

const SubmitBtn: React.FC<SubmitBtnProps> = ({ title, style, isPending }) => {
  return (
    <button
      type="submit"
      disabled={isPending}
      className={`${style} flex items-center justify-center`}
    >
      {!isPending ? (
        title
      ) : (
        <div className="flex items-center justify-center gap-x-2">
          <div>منتظر بمانید</div>
          <div className="loading-container">
            <div className="dot"></div>
            <div className="dot"></div>
            <div className="dot"></div>
          </div>
        </div>
      )}
    </button>
  );
};

export default SubmitBtn;
