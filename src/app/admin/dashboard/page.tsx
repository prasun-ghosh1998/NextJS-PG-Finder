
import ChartSection from '@/components/adminDashboard/ChartSection'
import DashboardStats from '@/components/adminDashboard/DashboardStats'

const page = () => {
  return (
    <div>
      {/* <h1 className="text-2xl font-bold text-white mb-6">Platform Insights</h1> */}

      {/* Stats */}
      <DashboardStats />

      {/* Chart + Location */}

      <div className="flex gap-6">
        <ChartSection />
        {/* <LocationCard /> */}
      </div>

      {/* Table */}
      {/* <ActivityTable /> */}
    </div>
  )
}

export default page