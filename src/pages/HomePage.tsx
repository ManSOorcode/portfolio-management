import BlogList from "../components/BlogList";

const HomePage = () => {
  const blogs = [
    {
      date: "Apr 18, 2024",
      title: "CM Fixed Income: Exiting Banking & PSU to Add a New Gilt Fund",
      description:
        "We are increasing the duration of our Fixed Income portfolio to capitalize on potential rate cuts and maximize returns in the current market environment.",
    },
    {
      date: "Apr 05, 2024",
      title: "Craftsman Automation: Poised for Growth Amid Temporary Headwinds",
      description:
        "Craftsman Automation excels in making precise parts for automotive and industrial sectors, positioning itself for significant growth as market conditions improve.",
    },
    {
      date: "Mar 22, 2024",
      title:
        "Tech Sector Analysis: AI Revolution Reshaping Investment Strategies",
      description:
        "Exploring how artificial intelligence is transforming traditional investment approaches and creating new opportunities in the technology sector.",
    },
    {
      date: "Mar 10, 2024",
      title: "Sustainable Investing: The Future of Portfolio Management",
      description:
        "An in-depth look at ESG criteria and how sustainable investing practices are becoming essential for long-term portfolio success.",
    },
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="mb-12 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl p-8 md:p-12 text-white shadow-xl">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Welcome to My Portfolio
        </h1>
        <p className="text-xl text-blue-100 max-w-2xl">
          Explore insights on investment strategies, market analysis, and
          financial wisdom to help you make informed decisions.
        </p>
        <div className="mt-8 flex flex-wrap gap-4">
          <button className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors shadow-lg">
            Get Started
          </button>
          <button className="border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors">
            Learn More
          </button>
        </div>
      </section>

      {/* Stats Section */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="text-3xl font-bold text-blue-600 mb-2">150+</div>
          <div className="text-gray-600">Articles Published</div>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="text-3xl font-bold text-indigo-600 mb-2">50K+</div>
          <div className="text-gray-600">Monthly Readers</div>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="text-3xl font-bold text-purple-600 mb-2">5+</div>
          <div className="text-gray-600">Years Experience</div>
        </div>
      </section>

      {/* Blog Section */}
      <section>
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Latest Posts
            </h2>
            <p className="text-gray-600">
              Stay updated with our recent insights and analysis
            </p>
          </div>
          <button className="hidden md:block text-blue-600 font-medium hover:text-blue-700">
            View All →
          </button>
        </div>
        <BlogList blogs={blogs} />
      </section>
    </div>
  );
};

export default HomePage;
