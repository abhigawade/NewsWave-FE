import { useNavigate } from "react-router-dom"
import { Newspaper, Globe, Home, ArrowRight, ExternalLink, User } from "lucide-react"

const AboutUs = ({ theme }) => {
  const navigate = useNavigate()
  const isDark = theme === "dark"

  return (
    <div
      className={`min-h-screen ${isDark ? "bg-gray-900 text-gray-200" : "bg-gray-50 text-gray-900"} transition-colors duration-300`}
    >
      {/* Home Button in top left corner */}
      <div className="absolute top-4 left-4 z-10">
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white font-medium rounded-lg shadow-md hover:bg-blue-700 transition-all duration-300 hover:shadow-lg"
        >
          <Home className="w-4 h-4" />
          <span>Home</span>
        </button>
      </div>

      {/* Hero Section with Background */}
      <div
        className={`relative overflow-hidden ${
          isDark
            ? "bg-gradient-to-br from-gray-900 via-blue-900/20 to-gray-900"
            : "bg-gradient-to-br from-blue-50 via-indigo-50 to-white"
        }`}
      >
        <div className={`absolute inset-0 ${isDark ? "opacity-10" : "opacity-5"}`}>
          <div
            className={`absolute inset-0 ${isDark ? "bg-grid-white/[0.2]" : "bg-grid-black/[0.1]"} [mask-image:linear-gradient(0deg,transparent,rgba(255,255,255,1),transparent)]`}
          ></div>
        </div>
        <div className="container mx-auto px-4 py-20">
          <header className="text-center relative z-10">
            <div className="inline-block mb-4">
              <span
                className={`inline-block px-4 py-1 rounded-full text-sm font-medium ${
                  isDark ? "bg-blue-900/30 text-blue-300" : "bg-blue-100 text-blue-700"
                }`}
              >
                About Us
              </span>
            </div>
            <h1
              className={`text-5xl md:text-6xl font-bold mb-4 ${
                isDark
                  ? "bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500"
                  : "bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-700"
              }`}
            >
              About NewsWave
            </h1>
            <p className={`text-xl md:text-2xl ${isDark ? "text-gray-300" : "text-gray-600"} max-w-2xl mx-auto`}>
              Your Gateway to Global News
            </p>
          </header>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Features Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16 mt-8">
          <FeatureCard
            icon={<Newspaper className="w-12 h-12" />}
            title="Curated Content"
            description="We aggregate news from trusted sources worldwide, bringing you a diverse range of perspectives."
            theme={theme}
          />
          <FeatureCard
            icon={<Globe className="w-12 h-12" />}
            title="Global Coverage"
            description="Stay informed about events from every corner of the globe with our comprehensive coverage."
            theme={theme}
          />
        </div>

        {/* Mission Section with Decorative Elements */}
        <section className="relative mt-24 mb-24">
          <div className={`absolute inset-0 ${isDark ? "bg-blue-900/10" : "bg-blue-50"} rounded-2xl -z-10`}></div>
          <div className="absolute inset-0 overflow-hidden -z-10">
            <div
              className={`absolute -top-1/2 -right-1/2 w-96 h-96 rounded-full ${
                isDark ? "bg-blue-600/10" : "bg-blue-200/50"
              }`}
            ></div>
            <div
              className={`absolute -bottom-1/2 -left-1/2 w-96 h-96 rounded-full ${
                isDark ? "bg-purple-600/10" : "bg-purple-200/50"
              }`}
            ></div>
          </div>
          <div className="p-8 md:p-12 text-center">
            <div className="inline-block mb-4">
              <span
                className={`inline-block px-4 py-1 rounded-full text-sm font-medium ${
                  isDark ? "bg-blue-900/30 text-blue-300" : "bg-blue-100 text-blue-700"
                }`}
              >
                Our Purpose
              </span>
            </div>
            <h2 className={`text-3xl md:text-4xl font-bold mb-6 ${isDark ? "text-white" : "text-gray-900"}`}>
              Our Mission
            </h2>
            <p
              className={`text-lg md:text-xl max-w-3xl mx-auto ${
                isDark ? "text-gray-300" : "text-gray-700"
              } leading-relaxed`}
            >
              At NewsWave, we believe in the power of information. Our mission is to provide easy access to high-quality
              news from around the world, empowering our readers to stay informed and make better decisions.
            </p>
            <div className="mt-8 flex justify-center">
              <a
                href="#"
                className={`group inline-flex items-center gap-2 px-6 py-3 rounded-lg ${
                  isDark
                    ? "bg-blue-600/20 hover:bg-blue-600/30 text-blue-300"
                    : "bg-blue-100 hover:bg-blue-200 text-blue-700"
                } transition-all duration-300`}
              >
                Learn more about our values
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="mt-24">
          <div className="text-center mb-12">
            <div className="inline-block mb-4">
              <span
                className={`inline-block px-4 py-1 rounded-full text-sm font-medium ${
                  isDark ? "bg-blue-900/30 text-blue-300" : "bg-blue-100 text-blue-700"
                }`}
              >
                Our People
              </span>
            </div>
            <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${isDark ? "text-white" : "text-gray-900"}`}>
              Meet Our Team
            </h2>
            <p className={`max-w-2xl mx-auto ${isDark ? "text-gray-400" : "text-gray-600"}`}>
              The passionate individuals behind NewsWave dedicated to bringing you the best news experience.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-8">
            <TeamMember
              name="Abhishek Gawade"
              role="Fullstack Developer"
              image="/placeholder.svg?height=200&width=200"
              theme={theme}
              linkedin="#"
              github="#"
            />
            {/* You can add more team members here */}
          </div>
        </section>

        {/* Footer Section */}
        <footer className="mt-24 text-center">
          <p className={`${isDark ? "text-gray-400" : "text-gray-600"}`}>
            © {new Date().getFullYear()} NewsWave. All rights reserved.
          </p>
        </footer>
      </div>
    </div>
  )
}

const FeatureCard = ({ icon, title, description, theme }) => {
  const isDark = theme === "dark"

  return (
    <div
      className={`group p-8 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 ${
        isDark
          ? "bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700"
          : "bg-white border border-gray-100"
      }`}
    >
      <div
        className={`inline-flex items-center justify-center w-16 h-16 rounded-lg mb-6 ${
          isDark ? "bg-blue-900/30 text-blue-400" : "bg-blue-100 text-blue-600"
        } group-hover:scale-110 transition-transform duration-300`}
      >
        {icon}
      </div>
      <h3
        className={`text-2xl font-bold mb-3 ${
          isDark ? "text-white" : "text-gray-900"
        } group-hover:text-blue-500 transition-colors`}
      >
        {title}
      </h3>
      <p className={isDark ? "text-gray-400" : "text-gray-600"}>{description}</p>
    </div>
  )
}

const TeamMember = ({ name, role, image, theme, linkedin, github }) => {
  const isDark = theme === "dark"

  return (
    <div
      className={`group p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 text-center max-w-xs ${
        isDark
          ? "bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700"
          : "bg-white border border-gray-100"
      }`}
    >
      <div className="relative mb-6 mx-auto w-40 h-40 rounded-full overflow-hidden group-hover:scale-105 transition-transform duration-300">
        <div
          className={`absolute inset-0 rounded-full ${
            isDark
              ? "bg-gradient-to-br from-blue-600/20 to-purple-600/20"
              : "bg-gradient-to-br from-blue-100 to-purple-100"
          }`}
        ></div>

        {/* Profile Image with Fallback */}
        {image ? (
          <img
            src={image || "/placeholder.svg"}
            alt={name}
            className="absolute inset-0 w-full h-full object-cover rounded-full p-1"
            onError={(e) => {
              e.target.style.display = "none"
              document.getElementById(`profile-fallback-${name.replace(/\s+/g, "-")}`).style.display = "flex"
            }}
          />
        ) : null}

        {/* Fallback Profile Logo */}
        <div
          id={`profile-fallback-${name.replace(/\s+/g, "-")}`}
          className={`absolute inset-0 w-full h-full rounded-full p-1 flex items-center justify-center ${
            image ? "hidden" : "flex"
          } ${isDark ? "bg-blue-900/30" : "bg-blue-100"}`}
        >
          <div
            className={`flex items-center justify-center w-full h-full rounded-full ${
              isDark ? "bg-gray-800 text-blue-400" : "bg-white text-blue-600"
            }`}
          >
            <User className="w-16 h-16" />
            <div className="absolute inset-0 rounded-full border-2 border-dashed border-opacity-50 animate-spin-slow"></div>
          </div>
        </div>

        {/* Profile Initial */}
        <div
          className={`absolute bottom-0 right-0 w-10 h-10 rounded-full flex items-center justify-center ${
            isDark ? "bg-blue-600 text-white" : "bg-blue-500 text-white"
          } text-lg font-bold border-2 ${isDark ? "border-gray-800" : "border-white"}`}
        >
          {name.charAt(0)}
        </div>
      </div>

      <h3
        className={`text-xl font-bold mb-1 ${
          isDark ? "text-white" : "text-gray-900"
        } group-hover:text-blue-500 transition-colors`}
      >
        {name}
      </h3>
      <p className={`mb-4 ${isDark ? "text-gray-400" : "text-gray-600"}`}>{role}</p>

      {/* Social Links */}
      {(linkedin || github) && (
        <div className="flex justify-center gap-3 mt-4">
          {linkedin && (
            <a
              href={linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className={`p-2 rounded-full ${
                isDark ? "bg-gray-700 hover:bg-gray-600 text-blue-400" : "bg-gray-100 hover:bg-gray-200 text-blue-600"
              } transition-colors`}
              aria-label={`${name}'s LinkedIn`}
            >
              <ExternalLink className="w-4 h-4" />
            </a>
          )}
          {github && (
            <a
              href={github}
              target="_blank"
              rel="noopener noreferrer"
              className={`p-2 rounded-full ${
                isDark ? "bg-gray-700 hover:bg-gray-600 text-blue-400" : "bg-gray-100 hover:bg-gray-200 text-blue-600"
              } transition-colors`}
              aria-label={`${name}'s GitHub`}
            >
              <ExternalLink className="w-4 h-4" />
            </a>
          )}
        </div>
      )}
    </div>
  )
}

export default AboutUs

