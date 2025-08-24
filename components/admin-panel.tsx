"use client"

import type React from "react"

import { JSX, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Upload, ImageIcon, Play, Settings, FileText, Users, BarChart3, Save, X, Plus, CheckCircle } from "lucide-react"

export interface AdminPanelProps {
  onClose: () => void
  onHeroImageUpdate: (url: string) => void
  onAboutImageUpdate: (url: string) => void
  onServiceImageUpdate: (serviceId: string, imageUrl: string) => void
  onServiceVideoUpdate: (serviceId: string, videoUrl: string) => void
  onLogoUpdate: (url: string) => void
  onContactPhoneUpdate: (phone: string) => void
  onContactEmailUpdate: (email: string) => void
  onContactAddressUpdate: (address: string) => void
  onWhatsappUpdate: (number: string) => void
  services: Array<{ id: string; icon: JSX.Element; title: string; description: string }>
}

export default function AdminPanel({
  onClose,
  onHeroImageUpdate,
  onAboutImageUpdate,
  onServiceImageUpdate,
  onServiceVideoUpdate,
  onLogoUpdate,
  onContactPhoneUpdate,
  onContactEmailUpdate,
  onContactAddressUpdate,
  onWhatsappUpdate,
  services,
}: AdminPanelProps) {
  const [activeTab, setActiveTab] = useState("content")
  const [heroTitle, setHeroTitle] = useState("Secure Your Peace of Mind")
  const [heroSubtitle, setHeroSubtitle] = useState(
    "Puremetrix Engineering provides comprehensive security solutions for medium to large enterprises. From safes and vault doors to advanced biometric systems, we protect what matters most.",
  )
  const [phone, setPhone] = useState("+263 4 123 4567")
  const [email, setEmail] = useState("info@puremetrix.co.zw")
  const [address, setAddress] = useState("Harare, Zimbabwe")
  const [notification, setNotification] = useState("")

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>, type: string, serviceId?: string) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const result = e.target?.result as string

        switch (type) {
          case "hero":
            onHeroImageUpdate(result)
            localStorage.setItem("heroImage", result)
            showNotification("Hero image updated successfully!")
            break
          case "about":
            onAboutImageUpdate(result)
            localStorage.setItem("aboutImage", result)
            showNotification("About image updated successfully!")
            break
          case "logo":
            onLogoUpdate(result)
            localStorage.setItem("companyLogo", result)
            showNotification("Company logo updated successfully!")
            break
          case "service-image":
            if (serviceId) {
              onServiceImageUpdate(serviceId, result)
              showNotification(`Service image updated for ${services.find((s) => s.id === serviceId)?.title}!`)
            }
            break
          case "service-video":
            if (serviceId) {
              onServiceVideoUpdate(serviceId, result)
              showNotification(`Service video updated for ${services.find((s) => s.id === serviceId)?.title}!`)
            }
            break
        }
      }
      reader.readAsDataURL(file)
    }
  }

  const showNotification = (message: string) => {
    setNotification(message)
    setTimeout(() => setNotification(""), 3000)
  }

  const handleSaveHeroContent = () => {
    localStorage.setItem("heroTitle", heroTitle)
    localStorage.setItem("heroSubtitle", heroSubtitle)
    showNotification("Hero content saved successfully!")
  }

  const handleSaveContactInfo = () => {
    localStorage.setItem("contactPhone", phone)
    localStorage.setItem("contactEmail", email)
    localStorage.setItem("contactAddress", address)
    showNotification("Contact information updated successfully!")
  }

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      {notification && (
        <div className="fixed top-4 right-4 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-2 z-60">
          <CheckCircle className="h-5 w-5" />
          {notification}
        </div>
      )}

      <Card className="w-full max-w-7xl max-h-[95vh] overflow-hidden shadow-2xl border-0 bg-white">
        <CardHeader className="bg-gradient-to-r from-blue-900 via-blue-800 to-slate-900 text-white">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-3xl font-bold flex items-center gap-3">
                <Settings className="h-8 w-8 text-yellow-400" />
                Admin Dashboard
              </CardTitle>
              <CardDescription className="text-blue-100 text-lg">
                Manage your website content, media, and settings
              </CardDescription>
            </div>
            <Button variant="ghost" size="sm" onClick={onClose} className="text-white hover:bg-white/20 p-2">
              <X className="h-6 w-6" />
            </Button>
          </div>
        </CardHeader>

        <CardContent className="p-0 overflow-y-auto max-h-[calc(95vh-140px)]">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-4 rounded-none border-b bg-slate-50 h-14">
              <TabsTrigger
                value="content"
                className="flex items-center gap-2 text-base font-semibold data-[state=active]:bg-blue-600 data-[state=active]:text-white"
              >
                <FileText className="h-5 w-5" />
                Content
              </TabsTrigger>
              <TabsTrigger
                value="media"
                className="flex items-center gap-2 text-base font-semibold data-[state=active]:bg-blue-600 data-[state=active]:text-white"
              >
                <ImageIcon className="h-5 w-5" />
                Media
              </TabsTrigger>
              <TabsTrigger
                value="services"
                className="flex items-center gap-2 text-base font-semibold data-[state=active]:bg-blue-600 data-[state=active]:text-white"
              >
                <Plus className="h-5 w-5" />
                Services
              </TabsTrigger>
              <TabsTrigger
                value="analytics"
                className="flex items-center gap-2 text-base font-semibold data-[state=active]:bg-blue-600 data-[state=active]:text-white"
              >
                <BarChart3 className="h-5 w-5" />
                Analytics
              </TabsTrigger>
            </TabsList>

            <TabsContent value="content" className="p-8 space-y-8">
              <div className="grid lg:grid-cols-2 gap-8">
                <Card className="shadow-lg border-0 bg-gradient-to-br from-white to-slate-50">
                  <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-t-lg">
                    <CardTitle className="text-xl flex items-center gap-2">
                      <FileText className="h-5 w-5" />
                      Hero Section
                    </CardTitle>
                    <CardDescription className="text-blue-100">Update the main hero content</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6 p-6">
                    <div>
                      <Label htmlFor="hero-title" className="text-base font-semibold text-slate-700">
                        Main Title
                      </Label>
                      <Input
                        id="hero-title"
                        value={heroTitle}
                        onChange={(e) => setHeroTitle(e.target.value)}
                        className="mt-2 border-slate-300 focus:border-blue-500 text-base"
                      />
                    </div>
                    <div>
                      <Label htmlFor="hero-subtitle" className="text-base font-semibold text-slate-700">
                        Subtitle
                      </Label>
                      <Textarea
                        id="hero-subtitle"
                        value={heroSubtitle}
                        onChange={(e) => setHeroSubtitle(e.target.value)}
                        rows={4}
                        className="mt-2 border-slate-300 focus:border-blue-500 text-base"
                      />
                    </div>
                    <Button
                      onClick={handleSaveHeroContent}
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3"
                    >
                      <Save className="h-5 w-5 mr-2" />
                      Save Hero Content
                    </Button>
                  </CardContent>
                </Card>

                <Card className="shadow-lg border-0 bg-gradient-to-br from-white to-slate-50">
                  <CardHeader className="bg-gradient-to-r from-green-600 to-green-700 text-white rounded-t-lg">
                    <CardTitle className="text-xl flex items-center gap-2">
                      <Users className="h-5 w-5" />
                      Company Information
                    </CardTitle>
                    <CardDescription className="text-green-100">
                      Update contact details and company info
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6 p-6">
                    <div>
                      <Label htmlFor="phone" className="text-base font-semibold text-slate-700">
                        Phone Number
                      </Label>
                      <Input
                        id="phone"
                        value={phone}
                        onChange={e => {
                          setPhone(e.target.value)
                          onContactPhoneUpdate(e.target.value)
                          localStorage.setItem("contactPhone", e.target.value)
                        }}
                        placeholder="Enter company phone"
                        className="mt-2 border-slate-300 focus:border-green-500 text-base"
                      />
                    </div>
                    <div>
                      <Label htmlFor="email" className="text-base font-semibold text-slate-700">
                        Email Address
                      </Label>
                      <Input
                        id="email"
                        value={email}
                        onChange={e => {
                          setEmail(e.target.value)
                          onContactEmailUpdate(e.target.value)
                          localStorage.setItem("contactEmail", e.target.value)
                        }}
                        placeholder="Enter company email"
                        className="mt-2 border-slate-300 focus:border-green-500 text-base"
                      />
                    </div>
                    <div>
                      <Label htmlFor="address" className="text-base font-semibold text-slate-700">
                        Address
                      </Label>
                      <Input
                        id="address"
                        value={address}
                        onChange={e => {
                          setAddress(e.target.value)
                          onContactAddressUpdate(e.target.value)
                          localStorage.setItem("contactAddress", e.target.value)
                        }}
                        placeholder="Enter company address"
                        className="mt-2 border-slate-300 focus:border-green-500 text-base"
                      />
                    </div>
                    <Button
                      onClick={handleSaveContactInfo}
                      className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3"
                    >
                      <Save className="h-5 w-5 mr-2" />
                      Update Contact Info
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="media" className="p-8 space-y-8">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                <Card className="border-2 border-dashed border-blue-300 hover:border-blue-500 transition-colors bg-gradient-to-br from-blue-50 to-white">
                  <CardContent className="flex flex-col items-center justify-center p-8 text-center">
                    <Upload className="h-16 w-16 text-blue-500 mb-4" />
                    <h3 className="font-bold mb-2 text-lg text-slate-900">Upload Hero Image</h3>
                    <p className="text-sm text-slate-600 mb-6">Upload a new hero section image</p>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleFileUpload(e, "hero")}
                      className="hidden"
                      id="hero-upload"
                    />
                    <Button asChild className="bg-blue-600 hover:bg-blue-700 font-semibold">
                      <label htmlFor="hero-upload" className="cursor-pointer">
                        <ImageIcon className="h-4 w-4 mr-2" />
                        Choose Hero Image
                      </label>
                    </Button>
                  </CardContent>
                </Card>

                <Card className="border-2 border-dashed border-purple-300 hover:border-purple-500 transition-colors bg-gradient-to-br from-purple-50 to-white">
                  <CardContent className="flex flex-col items-center justify-center p-8 text-center">
                    <Upload className="h-16 w-16 text-purple-500 mb-4" />
                    <h3 className="font-bold mb-2 text-lg text-slate-900">Upload About Image</h3>
                    <p className="text-sm text-slate-600 mb-6">Upload company/team image</p>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleFileUpload(e, "about")}
                      className="hidden"
                      id="about-upload"
                    />
                    <Button asChild className="bg-purple-600 hover:bg-purple-700 font-semibold">
                      <label htmlFor="about-upload" className="cursor-pointer">
                        <ImageIcon className="h-4 w-4 mr-2" />
                        Choose About Image
                      </label>
                    </Button>
                  </CardContent>
                </Card>

                <Card className="shadow-lg border-0 bg-gradient-to-br from-yellow-50 to-white">
                  <CardHeader className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white rounded-t-lg">
                    <CardTitle className="text-lg">Company Logo</CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="aspect-square bg-slate-100 rounded-lg flex items-center justify-center mb-4 border-2 border-dashed border-slate-300">
                      <ImageIcon className="h-16 w-16 text-slate-400" />
                    </div>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleFileUpload(e, "logo")}
                      className="hidden"
                      id="logo-upload"
                    />
                    <Button asChild className="w-full bg-yellow-500 hover:bg-yellow-600 font-semibold">
                      <label htmlFor="logo-upload" className="cursor-pointer">
                        <Upload className="h-4 w-4 mr-2" />
                        Update Logo
                      </label>
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="services" className="p-8 space-y-8">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-2xl font-bold text-slate-900">Manage Services</h3>
                  <p className="text-slate-600 text-lg">Add images and videos to your security services</p>
                </div>
              </div>

              <div className="grid gap-6">
                {services.map((service, index) => (
                  <Card key={index} className="shadow-lg border-0 bg-gradient-to-r from-white to-slate-50">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-6">
                        <div className="flex items-center gap-4">
                          <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center">
                            <ImageIcon className="h-8 w-8 text-blue-600" />
                          </div>
                          <div>
                            <h4 className="font-bold text-xl text-slate-900">{service.title}</h4>
                            <p className="text-slate-600 max-w-md">{service.description}</p>
                          </div>
                        </div>
                        <Badge variant="secondary" className="bg-green-100 text-green-800 font-semibold">
                          Active
                        </Badge>
                      </div>

                      <div className="flex gap-4">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleFileUpload(e, "service-image", service.id)}
                          className="hidden"
                          id={`service-image-${service.id}`}
                        />
                        <Button
                          asChild
                          variant="outline"
                          className="border-blue-300 text-blue-600 hover:bg-blue-50 bg-transparent"
                        >
                          <label htmlFor={`service-image-${service.id}`} className="cursor-pointer">
                            <ImageIcon className="h-4 w-4 mr-2" />
                            Add Image
                          </label>
                        </Button>

                        <input
                          type="file"
                          accept="video/*"
                          onChange={(e) => handleFileUpload(e, "service-video", service.id)}
                          className="hidden"
                          id={`service-video-${service.id}`}
                        />
                        <Button
                          asChild
                          variant="outline"
                          className="border-purple-300 text-purple-600 hover:bg-purple-50 bg-transparent"
                        >
                          <label htmlFor={`service-video-${service.id}`} className="cursor-pointer">
                            <Play className="h-4 w-4 mr-2" />
                            Add Video
                          </label>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="analytics" className="p-8 space-y-8">
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card className="shadow-lg border-0 bg-gradient-to-br from-blue-50 to-white">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-slate-600 font-medium">Total Visitors</p>
                        <p className="text-3xl font-bold text-slate-900">12,543</p>
                        <p className="text-sm text-green-600 font-medium">+12% this month</p>
                      </div>
                      <Users className="h-12 w-12 text-blue-600" />
                    </div>
                  </CardContent>
                </Card>

                <Card className="shadow-lg border-0 bg-gradient-to-br from-green-50 to-white">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-slate-600 font-medium">Page Views</p>
                        <p className="text-3xl font-bold text-slate-900">45,231</p>
                        <p className="text-sm text-green-600 font-medium">+8% this month</p>
                      </div>
                      <BarChart3 className="h-12 w-12 text-green-600" />
                    </div>
                  </CardContent>
                </Card>

                <Card className="shadow-lg border-0 bg-gradient-to-br from-yellow-50 to-white">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-slate-600 font-medium">Contact Forms</p>
                        <p className="text-3xl font-bold text-slate-900">234</p>
                        <p className="text-sm text-green-600 font-medium">+15% this month</p>
                      </div>
                      <FileText className="h-12 w-12 text-yellow-600" />
                    </div>
                  </CardContent>
                </Card>

                <Card className="shadow-lg border-0 bg-gradient-to-br from-purple-50 to-white">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-slate-600 font-medium">Conversion Rate</p>
                        <p className="text-3xl font-bold text-slate-900">3.2%</p>
                        <p className="text-sm text-green-600 font-medium">+0.5% this month</p>
                      </div>
                      <BarChart3 className="h-12 w-12 text-purple-600" />
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card className="shadow-lg border-0">
                <CardHeader className="bg-gradient-to-r from-slate-800 to-slate-900 text-white rounded-t-lg">
                  <CardTitle className="text-xl">Recent Activity</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    {[
                      "New contact form submission from ABC Corp",
                      "Hero image updated successfully",
                      "Service description modified for CCTV Systems",
                      "New user visited pricing page",
                      "WhatsApp contact button clicked 15 times today",
                    ].map((activity, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-4 p-4 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors"
                      >
                        <div className="w-3 h-3 bg-blue-500 rounded-full flex-shrink-0"></div>
                        <p className="text-slate-700 font-medium">{activity}</p>
                        <span className="text-sm text-slate-500 ml-auto">{index + 1}h ago</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
