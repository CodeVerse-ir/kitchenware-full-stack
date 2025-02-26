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
          <span className="loading loading-dots loading-md"></span>
        </div>
      )}
    </button>
  );
};

export default SubmitBtn;
