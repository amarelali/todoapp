import Button from "./ui/Button";

interface IProps {
  page: number;
  pageCount: number;
  onClickPrev:()=>void;
  onClickNext:()=>void;
}
const Pagination = ({ page =1 , pageCount,onClickPrev,onClickNext }: IProps) => {

  return (
    <div className="flex justify-center space-x-1 mb-3">
      <Button
        className="p-2 bg-[#E48700] disabled:bg-[#e4870070] text-white rounded-l-lg rounded-r-none flex gap-2 w-[70px] h-fit"
        onClick={onClickPrev}
        disabled={page === 1 }
        fullWidth={false}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6.75 15.75 3 12m0 0 3.75-3.75M3 12h18"
          />
        </svg>
        Prev
      </Button>
      <Button
        className={`p-2 bg-[#E48700] disabled:bg-[#e4870070] text-white rounded-r-lg rounded-l-none flex gap-2 w-[70px] h-fit `}
        onClick={onClickNext}
        disabled={page === pageCount || pageCount === 0}
        fullWidth={false}

      >
        Next
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3"
          />
        </svg>
      </Button>
    </div>
  );
};
export default Pagination;
