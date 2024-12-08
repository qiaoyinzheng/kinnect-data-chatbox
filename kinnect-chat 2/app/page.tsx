"use client"

import * as React from "react"
import { Building2, Heart, Hospital, LineChart, Share2, ShoppingBag, Trophy, Users2 } from 'lucide-react'
import { useChat } from 'ai/react'

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FileUpload } from "@/components/file-upload"

const industries = [
  {
    id: "main",
    name: "Main Guide",
    icon: Users2,
    description: "General assistance and guidance",
    welcome: "Welcome to Kinnect Data Solutions! I can assist you with general data needs or guide you to specialized solutions tailored for your industry."
  },
  {
    id: "healthcare",
    name: "Healthcare",
    icon: Hospital,
    description: "Patient records, medical research, and compliance tracking",
    welcome: "Ask me about managing patient records, organizing research data, or ensuring compliance with healthcare regulations. Simply type your need, and I'll guide you."
  },
  {
    id: "finance",
    name: "Finance",
    icon: LineChart,
    description: "Financial reporting, budget tracking, and investment management",
    welcome: "I specialize in handling financial data. Whether it's budget tracking, investment management, or generating financial reports, just let me know what you need."
  },
  {
    id: "government",
    name: "Government",
    icon: Building2,
    description: "Census data, public policy, and municipal records",
    welcome: "Looking for help with government-related data? I can assist with census data, public policy organization, or managing municipal records."
  },
  {
    id: "retail",
    name: "Retail",
    icon: ShoppingBag,
    description: "Inventory, sales trends, and customer insights",
    welcome: "Retail data is my specialty. Type your request to learn about inventory, sales trends, or customer insights."
  },
  {
    id: "nonprofit",
    name: "Not-for-Profit",
    icon: Heart,
    description: "Donor management, volunteer tracking, and grant reporting",
    welcome: "I can help with donor management, volunteer organization, or grant reporting. Share your needs to get started."
  },
  {
    id: "sports",
    name: "Sports",
    icon: Trophy,
    description: "Performance metrics, game stats, and fan engagement",
    welcome: "For sports-related data, ask me about performance metrics, game stats, or fan engagement analysis."
  },
  {
    id: "social",
    name: "Social Media",
    icon: Share2,
    description: "Engagement tracking, trends, and influencer impact",
    welcome: "I specialize in analyzing social media trends, engagement data, and influencer impact. Let me know what you'd like to explore."
  },
]

export default function ChatInterface() {
  const [selectedIndustry, setSelectedIndustry] = React.useState<string>("main")
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
    api: '/api/chat',
    initialMessages: [
      {
        id: 'welcome',
        role: 'assistant',
        content: industries[0].welcome,
      },
    ],
  })

  React.useEffect(() => {
    const industry = industries.find(i => i.id === selectedIndustry)
    if (industry) {
      const systemMessage = {
        id: 'system-' + Date.now(),
        role: 'system',
        content: `You are a specialized AI assistant for ${industry.name} data solutions. ${industry.welcome}`,
      }
      handleSubmit(undefined, { messages: [systemMessage] })
    }
  }, [selectedIndustry, handleSubmit])

  const handleFileSelect = (file: File) => {
    const message = `I've uploaded a file named ${file.name}. Please help me analyze its contents and provide insights.`
    handleSubmit(undefined, { messages: [{ id: 'file-' + Date.now(), role: 'user', content: message }] })
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[300px_1fr] max-w-[1400px] mx-auto">
      <Card className="h-[calc(100vh-8rem)] overflow-hidden flex flex-col">
        <CardHeader>
          <CardTitle>Industries</CardTitle>
          <CardDescription>Select your industry for specialized assistance</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-2">
            {industries.map((industry) => {
              const Icon = industry.icon
              return (
                <Button
                  key={industry.id}
                  variant={selectedIndustry === industry.id ? "default" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => setSelectedIndustry(industry.id)}
                >
                  <Icon className="mr-2 h-4 w-4" />
                  {industry.name}
                </Button>
              )
            })}
          </div>
        </CardContent>
      </Card>
      <div className="grid gap-6">
        <Card className="h-[calc(100vh-8rem)] overflow-hidden flex flex-col">
          <Tabs defaultValue="chat">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>AI Data Solutions Chat</CardTitle>
                <TabsList>
                  <TabsTrigger value="chat">Chat</TabsTrigger>
                  <TabsTrigger value="guide">Guide</TabsTrigger>
                </TabsList>
              </div>
              <CardDescription>
                {selectedIndustry
                  ? `Specialized assistance for ${industries.find(i => i.id === selectedIndustry)?.name} industry`
                  : "General data solutions assistance"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <TabsContent value="chat" className="mt-0">
                <div className="flex h-[calc(100vh-16rem)] flex-col justify-between overflow-hidden">
                  <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className={cn(
                          "flex w-max max-w-[75%] flex-col gap-2 rounded-lg px-3 py-2 text-sm",
                          message.role === "user"
                            ? "ml-auto bg-primary text-primary-foreground"
                            : "bg-muted"
                        )}
                      >
                        {message.content}
                      </div>
                    ))}
                  </div>
                  <div className="p-4 border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                    <div className="space-y-4">
                      <FileUpload onFileSelect={handleFileSelect} />
                      <form onSubmit={handleSubmit} className="flex gap-2">
                        <Input
                          value={input}
                          onChange={handleInputChange}
                          placeholder="Type your message..."
                          className="flex-1"
                          disabled={isLoading}
                        />
                        <Button type="submit" disabled={isLoading}>
                          Send
                        </Button>
                      </form>
                    </div>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="guide" className="mt-0">
                <div className="space-y-6">
                  <div className="grid gap-2">
                    <h3 className="text-lg font-medium">Welcome to Kinnect Data Solutions!</h3>
                    <p className="text-sm text-muted-foreground">
                      I can assist you with general data needs or guide you to specialized solutions tailored for your industry.
                    </p>
                  </div>
                  <div className="grid gap-2">
                    <h3 className="text-lg font-medium">Features</h3>
                    <ul className="grid gap-2 text-sm text-muted-foreground">
                      <li>• Industry Selector: Select your specialized sector from the sidebar</li>
                      <li>• Getting Started Guide: Step-by-step guidance for system interaction</li>
                      <li>• Sub-Sector Chatboxes: Tailored support for each industry</li>
                      <li>• File Upload: Support for data analysis and processing</li>
                    </ul>
                  </div>
                  <div className="grid gap-2">
                    <h3 className="text-lg font-medium">Getting Started</h3>
                    <ol className="grid gap-2 text-sm text-muted-foreground list-decimal pl-4">
                      <li>Select your industry from the left sidebar</li>
                      <li>Upload your data files for analysis</li>
                      <li>Ask questions specific to your needs</li>
                      <li>Receive tailored guidance and solutions</li>
                    </ol>
                  </div>
                </div>
              </TabsContent>
            </CardContent>
          </Tabs>
        </Card>
      </div>
    </div>
  )
}

