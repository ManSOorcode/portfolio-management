import PortfolioGraph from "../components/PortfolioGraph";
import calculateStats from "../utils/calculateStats";
import rawData from "../data/portfolioData.json";

const PortfolioPage = () => {
  const { stats, metrics } = calculateStats(rawData);

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-3">
          Portfolio Statistics
        </h1>
        <div className="flex items-center gap-2">
          <h2 className="text-xl text-gray-700 font-medium">
            Quant Active Fund Gr
          </h2>
          <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
            Active
          </span>
        </div>
        <p className="text-sm text-gray-500 mt-2">
          Performance Period:{" "}
          <span className="font-medium">24 May 2015 - 24 April 2024</span>
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div
            key={index}
            className={`${stat.bg} rounded-xl p-6 border border-gray-100 hover:shadow-lg transition-shadow`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-2xl">{stat.icon}</span>
            </div>
            <div className="text-sm text-gray-600 mb-2">{stat.label}</div>
            <div className={`text-3xl font-bold ${stat.color}`}>
              {stat.value}
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {metrics.map((metric, index) => (
          <div
            key={index}
            className={`${metric.bg} rounded-xl p-6 border border-gray-100 hover:shadow-lg transition-shadow`}
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center shadow-sm">
                <span className="text-2xl">{metric.icon}</span>
              </div>
              <h3 className="font-semibold text-gray-900">{metric.title}</h3>
            </div>
            <p className="text-3xl font-bold text-gray-900 mb-1">
              {metric.value}
            </p>
            <p className="text-sm text-gray-600">{metric.subtitle}</p>
          </div>
        ))}
      </div>

      <PortfolioGraph />
    </div>
  );
};

export default PortfolioPage;
