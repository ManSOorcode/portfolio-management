import RoutesNavigate from "./routes/RoutesNavigate";

function App() {
  return (
    // <Router>
    //   <div className="flex">
    //     {/* Sidebar */}
    //     <nav className="w-60 h-screen bg-gray-100 p-4">
    //       <ul>
    //         <li>
    //           <Link to="/">Home</Link>
    //         </li>
    //         <li>
    //           <Link to="/portfolio">Portfolio</Link>
    //         </li>
    //       </ul>
    //     </nav>

    //     {/* Content */}
    //     <div className="flex-1 p-6 container mb-20">
    //       <Routes>
    //         <Route path="/" element={<HomePages />} />
    //         <Route path="/portfolio" element={<Portfolio />} />
    //       </Routes>
    //     </div>
    //   </div>
    // </Router>
    <RoutesNavigate />
  );
}

export default App;
