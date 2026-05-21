import BookingRequests from "@/components/ownerDashboard/BookingRequests"
import StatsCards from "@/components/ownerDashboard/StatesCard"


const OwnerDashboardPage= () => {
  return (
    <div>

      <div className="mt-10">
        <StatsCards />
      </div>

      <div className="grid xl:grid-cols-1 gap-8 mt-10">
        <BookingRequests />

        {/* <VerificationCard /> */}
      </div>
    </div>
  )
}

export default OwnerDashboardPage