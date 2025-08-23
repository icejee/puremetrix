"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import AdminLogin from "@/components/admin-login"
import AdminPanel from "@/components/admin-panel"
import {
  Shield,
  Lock,
  Camera,
  Bell,
  Fingerprint,
  Key,
  Building,
  Phone,
  Mail,
  MapPin,
  Facebook,
  MessageCircle,
  Users,
  Award,
  CheckCircle,
  Star,
} from "lucide-react"

export default function PuremetrixWebsite() {
  const [showAdminLogin, setShowAdminLogin] = useState(false)
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false)
  const [showAdminPanel, setShowAdminPanel] = useState(false)

  const [heroImage, setHeroImage] = useState("")
  const [aboutImage, setAboutImage] = useState("")
  const [serviceImages, setServiceImages] = useState<{ [key: string]: string }>({})
  const [serviceVideos, setServiceVideos] = useState<{ [key: string]: string }>({})
  const [companyLogo, setCompanyLogo] = useState("")

  useEffect(() => {
    const savedHeroImage = localStorage.getItem("heroImage")
    const savedAboutImage = localStorage.getItem("aboutImage")
    const savedServiceImages = localStorage.getItem("serviceImages")
    const savedServiceVideos = localStorage.getItem("serviceVideos")
    const savedLogo = localStorage.getItem("companyLogo")

    if (savedHeroImage) setHeroImage(savedHeroImage)
    if (savedAboutImage) setAboutImage(savedAboutImage)
    if (savedServiceImages) setServiceImages(JSON.parse(savedServiceImages))
    if (savedServiceVideos) setServiceVideos(JSON.parse(savedServiceVideos))
    if (savedLogo) setCompanyLogo(savedLogo)
  }, [])

  const handleAdminClick = () => {
    if (isAdminAuthenticated) {
      setShowAdminPanel(true)
    } else {
      setShowAdminLogin(true)
    }
  }

  const handleAdminLogin = () => {
    setIsAdminAuthenticated(true)
    setShowAdminLogin(false)
    setShowAdminPanel(true)
  }

  const handleAdminLogout = () => {
    setIsAdminAuthenticated(false)
    setShowAdminPanel(false)
  }

  const services = [
    {
      id: "safes",
      icon: <Lock className="h-8 w-8" />,
      title: "Money Safes & Vault Doors",
      description:
        "High-security safes and vault doors manufactured to international standards for maximum protection of valuables.",
    },
    {
      id: "guns",
      icon: <Shield className="h-8 w-8" />,
      title: "Gun Cabinets",
      description:
        "Secure firearm storage solutions designed to meet legal requirements and ensure safe weapon storage.",
    },
    {
      id: "cctv",
      icon: <Camera className="h-8 w-8" />,
      title: "CCTV Systems",
      description: "Advanced surveillance systems with digital recording and remote monitoring capabilities.",
    },
    {
      id: "alarms",
      icon: <Bell className="h-8 w-8" />,
      title: "Intruder Alarms",
      description: "Comprehensive alarm systems with 24/7 monitoring and instant alert notifications.",
    },
    {
      id: "biometric",
      icon: <Fingerprint className="h-8 w-8" />,
      title: "Biometric Access Controls",
      description: "State-of-the-art biometric systems for secure access control and identity verification.",
    },
    {
      id: "locksmith",
      icon: <Key className="h-8 w-8" />,
      title: "Locksmith Services",
      description: "Professional locksmith services including installation, repair, and emergency lockout assistance.",
    },
    {
      id: "strongroom",
      icon: <Building className="h-8 w-8" />,
      title: "Strong Room Doors",
      description: "Heavy-duty strong room doors engineered for maximum security in commercial applications.",
    },
  ]

  const values = [
    {
      icon: <Users className="h-6 w-6" />,
      title: "Teamwork",
      description: "Collaborative approach to deliver excellence",
    },
    {
      icon: <CheckCircle className="h-6 w-6" />,
      title: "Integrity",
      description: "Honest and transparent business practices",
    },
    {
      icon: <Award className="h-6 w-6" />,
      title: "Quality",
      description: "Uncompromising standards in all our products",
    },
    { icon: <Star className="h-6 w-6" />, title: "Innovation", description: "Cutting-edge technology solutions" },
    { icon: <Shield className="h-6 w-6" />, title: "Reliability", description: "Dependable service you can trust" },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 text-white sticky top-0 z-50 shadow-lg backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                {companyLogo ? (
                  <img
                    src={companyLogo || "/placeholder.png"}
                    alt="Puremetrix Logo"
                    className="h-10 w-10 object-contain"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement
                      target.style.display = "none"
                      target.nextElementSibling?.classList.remove("hidden")
                    }}
                  />
                ) : null}
                <Shield className={`h-8 w-8 text-yellow-400 ${companyLogo ? "hidden" : ""}`} />
                <span className="text-xl font-bold bg-gradient-to-r from-white to-yellow-200 bg-clip-text text-transparent">
                  Puremetrix Engineering
                </span>
              </div>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a href="#services" className="hover:text-yellow-400 transition-colors font-medium">
                Services
              </a>
              <a href="#about" className="hover:text-yellow-400 transition-colors font-medium">
                About
              </a>
              <a href="#contact" className="hover:text-yellow-400 transition-colors font-medium">
                Contact
              </a>
              <Button
                variant="outline"
                size="sm"
                onClick={handleAdminClick}
                className="border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-blue-900 bg-transparent font-medium"
              >
                {isAdminAuthenticated ? "Admin Panel" : "Admin Login"}
              </Button>
              {isAdminAuthenticated && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleAdminLogout}
                  className="text-white/80 hover:text-white hover:bg-white/10"
                >
                  Logout
                </Button>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-slate-900 text-white py-24 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)`,
              backgroundSize: "20px 20px",
            }}
          ></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <Badge className="bg-yellow-400 text-blue-900 font-semibold px-4 py-2 text-sm">
                Leading Security Provider in Zimbabwe
              </Badge>
              <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
                Secure Your{" "}
                <span className="bg-gradient-to-r from-yellow-400 to-yellow-200 bg-clip-text text-transparent">
                  Peace of Mind
                </span>
              </h1>
              <p className="text-xl leading-relaxed text-blue-100 max-w-2xl">
                Puremetrix Engineering provides comprehensive security solutions for medium to large enterprises. From
                safes and vault doors to advanced biometric systems, we protect what matters most.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  className="bg-yellow-400 text-blue-900 hover:bg-yellow-300 font-semibold px-8 py-4 text-lg"
                >
                  Get Quote
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-white text-white hover:bg-white hover:text-blue-900 bg-transparent font-semibold px-8 py-4 text-lg"
                >
                  View Services
                </Button>
              </div>
            </div>
            <div className="relative">
              {heroImage ? (
                <img
                  src={heroImage || "/placeholder.png"}
                  alt="Security solutions"
                  className="rounded-2xl shadow-2xl w-full h-96 object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement
                    target.style.display = "none"
                    target.nextElementSibling?.classList.remove("hidden")
                  }}
                />
              ) : null}
              <div
                className={`bg-gradient-to-br from-blue-700 to-blue-600 rounded-2xl shadow-2xl w-full h-96 flex items-center justify-center ${heroImage ? "hidden" : ""}`}
              >
                <div className="text-center">
                  <Shield className="h-24 w-24 text-yellow-400 mx-auto mb-4" />
                  <p className="text-blue-100">Upload hero image via admin panel</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-24 bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-slate-900">Our Security Solutions</h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              Comprehensive security products and services designed to protect your business, assets, and people.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Card
                key={index}
                className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg hover:-translate-y-2 bg-white"
              >
                <CardHeader className="pb-4">
                  <div className="text-blue-600 mb-4 group-hover:text-yellow-500 transition-colors">{service.icon}</div>
                  <CardTitle className="text-xl font-bold text-slate-900 group-hover:text-blue-900 transition-colors">
                    {service.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <CardDescription className="text-base text-slate-600 leading-relaxed">
                    {service.description}
                  </CardDescription>

                  {serviceImages[service.id] && (
                    <img
                      src={serviceImages[service.id] || "/placeholder.png"}
                      alt={service.title}
                      className="w-full h-48 object-cover rounded-lg"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement
                        target.style.display = "none"
                      }}
                    />
                  )}

                  {serviceVideos[service.id] && (
                    <video
                      src={serviceVideos[service.id]}
                      controls
                      className="w-full h-48 object-cover rounded-lg"
                      onError={(e) => {
                        const target = e.target as HTMLVideoElement
                        target.style.display = "none"
                      }}
                    />
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <h2 className="text-4xl lg:text-5xl font-bold text-slate-900">About Puremetrix Engineering</h2>
              <p className="text-lg leading-relaxed text-slate-600">
                Puremetrix Engineering (Pvt) Ltd is an electronic security integration company wholly dedicated to the
                security needs of medium to large enterprises. We manufacture, supply and maintain security products.
              </p>
              <p className="text-lg leading-relaxed text-slate-600">
                Our establishment was inspired by technology migration from analogue systems to digital systems as per
                global security standards. We are in partnership with Badger Distribution and deliver proven security
                solutions that protect people and assets nationwide.
              </p>

              <div className="space-y-8">
                <div className="bg-gradient-to-r from-blue-50 to-yellow-50 p-6 rounded-xl">
                  <h3 className="text-2xl font-bold mb-4 text-blue-900">Our Vision</h3>
                  <ul className="space-y-3 text-slate-700">
                    <li className="flex items-start space-x-2">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>Provide professional technical services</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>Design and manufacture security products of high quality</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>Set standards for quality, value and technical innovation</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>Provide product support with highly trained technicians</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-gradient-to-r from-yellow-50 to-blue-50 p-6 rounded-xl">
                  <h3 className="text-2xl font-bold mb-4 text-blue-900">Our Mission</h3>
                  <p className="text-slate-700 leading-relaxed">
                    Puremetrix undertakes to be the leading security service provider in Zimbabwe through providing
                    security products and services to our clients under one roof, ultimately the safety and security of
                    the client's staff, premises, assets and the general public is our highest priority.
                  </p>
                </div>
              </div>
            </div>

            <div className="relative">
              {aboutImage ? (
                <img
                  src={aboutImage || "/placeholder.png"}
                  alt="Security installation team"
                  className="rounded-2xl shadow-xl w-full h-96 object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement
                    target.style.display = "none"
                    target.nextElementSibling?.classList.remove("hidden")
                  }}
                />
              ) : null}
              <div
                className={`bg-gradient-to-br from-blue-100 to-yellow-100 rounded-2xl shadow-xl w-full h-96 flex items-center justify-center ${aboutImage ? "hidden" : ""}`}
              >
                <div className="text-center">
                  <Building className="h-24 w-24 text-blue-600 mx-auto mb-4" />
                  <p className="text-slate-600">Upload company image via admin panel</p>
                </div>
              </div>
            </div>
          </div>

          {/* Values */}
          <div className="mt-24">
            <h3 className="text-4xl font-bold text-center mb-12 text-slate-900">Our Values</h3>
            <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-6">
              {values.map((value, index) => (
                <Card
                  key={index}
                  className="text-center p-6 hover:shadow-lg transition-shadow bg-gradient-to-b from-white to-slate-50 border-0 shadow-md"
                >
                  <div className="text-blue-600 mb-4 flex justify-center">{value.icon}</div>
                  <h4 className="font-bold mb-2 text-slate-900">{value.title}</h4>
                  <p className="text-sm text-slate-600 leading-relaxed">{value.description}</p>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-slate-900">Get In Touch</h2>
            <p className="text-xl text-slate-600">Ready to secure your business? Contact us for a consultation.</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-16">
            <div className="space-y-8">
              <h3 className="text-3xl font-bold text-slate-900">Contact Information</h3>
              <div className="space-y-6">
                <div className="flex items-center space-x-4 p-4 bg-white rounded-xl shadow-md">
                  <div className="bg-blue-100 p-3 rounded-full">
                    <Phone className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900">Phone</p>
                    <p className="text-slate-600">+263 4 123 4567</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4 p-4 bg-white rounded-xl shadow-md">
                  <div className="bg-blue-100 p-3 rounded-full">
                    <Mail className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900">Email</p>
                    <p className="text-slate-600">info@puremetrix.co.zw</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4 p-4 bg-white rounded-xl shadow-md">
                  <div className="bg-blue-100 p-3 rounded-full">
                    <MapPin className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900">Address</p>
                    <p className="text-slate-600">Harare, Zimbabwe</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="text-xl font-bold text-slate-900">Connect With Us</h4>
                <div className="flex space-x-4">
                  <Button
                    className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3"
                    onClick={() => window.open("https://wa.me/2634123456", "_blank")}
                  >
                    <MessageCircle className="h-5 w-5 mr-2" />
                    WhatsApp
                  </Button>
                  <Button
                    className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3"
                    onClick={() => window.open("https://facebook.com/puremetrix", "_blank")}
                  >
                    <Facebook className="h-5 w-5 mr-2" />
                    Facebook
                  </Button>
                </div>
              </div>
            </div>

            <Card className="p-8 shadow-xl border-0 bg-white">
              <h3 className="text-3xl font-bold mb-6 text-slate-900">Send us a Message</h3>
              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold mb-2 text-slate-700">Name</label>
                    <Input placeholder="Your name" className="border-slate-200 focus:border-blue-500" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2 text-slate-700">Company</label>
                    <Input placeholder="Company name" className="border-slate-200 focus:border-blue-500" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2 text-slate-700">Email</label>
                  <Input type="email" placeholder="your@email.com" className="border-slate-200 focus:border-blue-500" />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2 text-slate-700">Phone</label>
                  <Input placeholder="Your phone number" className="border-slate-200 focus:border-blue-500" />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2 text-slate-700">Message</label>
                  <Textarea
                    placeholder="Tell us about your security needs..."
                    rows={4}
                    className="border-slate-200 focus:border-blue-500"
                  />
                </div>
                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 text-lg">
                  Send Message
                </Button>
              </form>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-slate-900 via-blue-900 to-slate-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="md:col-span-2 space-y-4">
              <div className="flex items-center space-x-3">
                {companyLogo ? (
                  <img
                    src={companyLogo || "/placeholder.png"}
                    alt="Puremetrix Logo"
                    className="h-10 w-10 object-contain"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement
                      target.style.display = "none"
                      target.nextElementSibling?.classList.remove("hidden")
                    }}
                  />
                ) : null}
                <Shield className={`h-8 w-8 text-yellow-400 ${companyLogo ? "hidden" : ""}`} />
                <span className="text-2xl font-bold bg-gradient-to-r from-white to-yellow-200 bg-clip-text text-transparent">
                  Puremetrix Engineering
                </span>
              </div>
              <p className="text-slate-300 leading-relaxed max-w-md">
                Leading security service provider in Zimbabwe, dedicated to protecting your business, assets, and people
                with innovative security solutions.
              </p>
              <p className="text-sm text-slate-400">In partnership with Badger Distribution</p>
            </div>

            <div>
              <h4 className="font-bold mb-4 text-yellow-400">Services</h4>
              <ul className="space-y-2 text-sm text-slate-300">
                <li className="hover:text-white transition-colors cursor-pointer">Money Safes</li>
                <li className="hover:text-white transition-colors cursor-pointer">Vault Doors</li>
                <li className="hover:text-white transition-colors cursor-pointer">CCTV Systems</li>
                <li className="hover:text-white transition-colors cursor-pointer">Intruder Alarms</li>
                <li className="hover:text-white transition-colors cursor-pointer">Biometric Access</li>
                <li className="hover:text-white transition-colors cursor-pointer">Locksmith Services</li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-4 text-yellow-400">Company</h4>
              <ul className="space-y-2 text-sm text-slate-300">
                <li className="hover:text-white transition-colors cursor-pointer">About Us</li>
                <li className="hover:text-white transition-colors cursor-pointer">Our Vision</li>
                <li className="hover:text-white transition-colors cursor-pointer">Our Mission</li>
                <li className="hover:text-white transition-colors cursor-pointer">Contact</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-slate-700 mt-12 pt-8 text-center">
            <p className="text-sm text-slate-400">© 2024 Puremetrix Engineering (Pvt) Ltd. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {showAdminLogin && <AdminLogin onLogin={handleAdminLogin} onCancel={() => setShowAdminLogin(false)} />}

      {showAdminPanel && (
        <AdminPanel
          onClose={() => setShowAdminPanel(false)}
          onHeroImageUpdate={setHeroImage}
          onAboutImageUpdate={setAboutImage}
          onServiceImageUpdate={(serviceId: string, imageUrl: string) => {
            const updated = { ...serviceImages, [serviceId]: imageUrl }
            setServiceImages(updated)
            localStorage.setItem("serviceImages", JSON.stringify(updated))
          }}
          onServiceVideoUpdate={(serviceId: string, videoUrl: string) => {
            const updated = { ...serviceVideos, [serviceId]: videoUrl }
            setServiceVideos(updated)
            localStorage.setItem("serviceVideos", JSON.stringify(updated))
          }}
          onLogoUpdate={setCompanyLogo}
          services={services}
        />
      )}
    </div>
  )
}
