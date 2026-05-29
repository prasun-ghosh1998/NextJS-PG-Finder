export default function StatCard({ title, value, growth }: any) {
  return (
    <div className="bg-white p-5 rounded-xl w-full">
      <p className="text-sm text-gray-400">{title}</p>
      <h2 className="text-2xl font-bold text-black mt-2">{value}</h2>
      <p className="text-green-600 text-sm mt-2">{growth}</p>
      <div className="h-1 bg-gray-700 mt-3 rounded-full">
        <div className="w-2/3 h-1 bg-gradient-to-r from-green-600 via-green-500 to-green-400 rounded-full"></div>
      </div>
    </div>
  );
}
