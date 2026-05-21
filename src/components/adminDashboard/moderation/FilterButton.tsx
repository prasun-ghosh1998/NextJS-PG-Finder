interface Props {
  text: string;
  active: boolean;
  onClick: () => void;
}

const FilterButton = ({
  text,
  active,
  onClick,
}: Props) => {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-lg text-sm flex items-center gap-2 transition ${
        active
          ? "bg-indigo-500 text-white"
          : "bg-[#111827] text-gray-300 hover:bg-[#1F2937]"
      }`}
    >
      {text}
    </button>
  );
};

export default FilterButton;