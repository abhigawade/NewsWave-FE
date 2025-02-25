"use client"

import React from "react"
import { useTheme } from "next-themes"
import { Sun, Moon, Newspaper, Globe } from "lucide-react"

const AboutUs = () => {
  const { theme, setTheme } = useTheme()

  React.useEffect(() => {
    setTheme("dark")
  }, [setTheme])

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 transition-colors duration-300">
      <div className="container mx-auto px-4 py-12">
        <header className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">About NewsWave</h1>
          <p className="text-xl md:text-2xl text-gray-400">Your Gateway to Global News</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <FeatureCard
            icon={<Newspaper className="w-12 h-12" />}
            title="Curated Content"
            description="We aggregate news from trusted sources worldwide, bringing you a diverse range of perspectives."
          />
          <FeatureCard
            icon={<Globe className="w-12 h-12" />}
            title="Global Coverage"
            description="Stay informed about events from every corner of the globe with our comprehensive coverage."
          />
        </div>

        <section className="mt-16 text-center">
          <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
          <p className="text-lg max-w-2xl mx-auto">
            At NewsWave, we believe in the power of information. Our mission is to provide easy access to high-quality
            news from around the world, empowering our readers to stay informed and make better decisions.
          </p>
        </section>

        <section className="mt-16">
          <h2 className="text-3xl font-bold mb-6 text-center">Meet Our Team</h2>
          <div className="flex justify-center">
            <TeamMember name="Abhishek Gawade" role="Fullstack Developer" image="/placeholder.svg?height=200&width=200" />
          </div>
        </section>

        <div className="mt-16 text-center">
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full transition-colors duration-300"
          >
            {theme === "dark" ? <Sun className="inline-block mr-2" /> : <Moon className="inline-block mr-2" />}
            Toggle {theme === "dark" ? "Light" : "Dark"} Mode
          </button>
        </div>
      </div>
    </div>
  )
}

const FeatureCard = ({ icon, title, description }) => (
  <div className="bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
    <div className="text-blue-400 mb-4">{icon}</div>
    <h3 className="text-xl font-semibold mb-2">{title}</h3>
    <p className="text-gray-400">{description}</p>
  </div>
)

const TeamMember = ({ name, role, image }) => (
  <div className="bg-gray-800 p-6 rounded-lg shadow-md text-center max-w-sm">
    <img src={image || "/placeholder.svg"} alt={name} className="w-32 h-32 rounded-full mx-auto mb-4 object-cover" />
    <h3 className="text-xl font-semibold mb-1">{name}</h3>
    <p className="text-gray-400">{role}</p>
  </div>
)

export default AboutUs

