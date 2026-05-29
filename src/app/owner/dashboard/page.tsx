
import StatsCards from "@/components/ownerDashboard/StatesCard";
import TopUsers from "@/components/ownerDashboard/TopUsers";

const OwnerDashboardPage = () => {
  return (
    <>
      <div className="mt-10">
        <StatsCards />
        
      </div>

      <div className="mt-10">
        <TopUsers/>
      </div>
    </>
  );
};

export default OwnerDashboardPage;
