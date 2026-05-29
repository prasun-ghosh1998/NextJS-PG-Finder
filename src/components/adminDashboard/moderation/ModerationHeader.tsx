import FilterButton from "./FilterButton";

interface Props {
  selectedFilter: string;
  setSelectedFilter: (
    value: string
  ) => void;

  total: number;
}

const ModerationHeader = ({
  selectedFilter,
  setSelectedFilter,
  total,
}: Props) => {
  return (
    <div className="flex justify-between items-center mb-8">
      <div>
        <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-950 via-gray-700 to-gray-500 bg-clip-text text-transparent">
          Listing Moderation
        </h1>

        <p className="text-gray-400 text-sm">
          Reviewing {total} properties
          awaiting approval.
        </p>
      </div>

      {/* FILTERS */}

      <div className="flex gap-3">
        <FilterButton
          text="All Types"
          active={
            selectedFilter === "ALL"
          }
          onClick={() =>
            setSelectedFilter("ALL")
          }
        />

        <FilterButton
          text="PGs"
          active={
            selectedFilter === "PG"
          }
          onClick={() =>
            setSelectedFilter("PG")
          }
        />

        <FilterButton
          text="Flats"
          active={
            selectedFilter === "FLAT"
          }
          onClick={() =>
            setSelectedFilter("FLAT")
          }
        />
      </div>
    </div>
  );
};

export default ModerationHeader;