import { Link } from "react-router-dom";
import { Award, BookOpen, Briefcase, Layers } from "lucide-react";

const sections = [
  {
    name: "Manage Experience",
    path: "/experiences/list",
    bgColor: "bg-blue-500",
    hoverColor: "hover:bg-blue-700",
    Icon: Briefcase,
  },
  {
    name: "Manage Projects",
    path: "/projects/list",
    bgColor: "bg-green-500",
    hoverColor: "hover:bg-green-700",
    Icon: Layers,
  },
  {
    name: "Manage Blogs",
    path: "/blogs/list",
    bgColor: "bg-yellow-500",
    hoverColor: "hover:bg-yellow-700",
    Icon: BookOpen,
  },
  {
    name: "Manage Skills",
    path: "/skills/list",
    bgColor: "bg-red-500",
    hoverColor: "hover:bg-red-700",
    Icon: Award,
  },
];

const Homepage = () => {
  return (
    <div className="text-center">
      <h2 className="text-3xl font-bold mb-6">Welcome to the Admin Panel</h2>
      <p className="mb-6">Use the navigation links to manage your portfolio.</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {sections.map((section, index) => (
          <Link
            key={index}
            to={section.path}
            className={`block p-4 ${section.bgColor} text-white rounded-lg shadow-lg transform transition-transform hover:-translate-y-1 ${section.hoverColor}`}
          >
            <div className="flex items-center justify-center space-x-3">
              <section.Icon className="w-6 h-6" />
              <div className="text-2xl font-semibold">{section.name}</div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Homepage;
