export default function StatCard({ title, value, growth }: any) {
  return (
    <div className="bg-[#1A2236] p-5 rounded-xl w-full">
      <p className="text-sm text-gray-400">{title}</p>
      <h2 className="text-2xl font-bold mt-2">{value}</h2>
      <p className="text-green-400 text-sm mt-2">{growth}</p>
      <div className="h-1 bg-gray-700 mt-3 rounded-full">
        <div className="w-2/3 h-1 bg-purple-400 rounded-full"></div>
      </div>
    </div>
  );
}
