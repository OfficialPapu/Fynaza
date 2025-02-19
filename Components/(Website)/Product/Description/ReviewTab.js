import React from 'react'
import { Star } from "lucide-react"
import { TabsContent } from "@/Components/ui/tabs"
import { Textarea } from "@/Components/ui/textarea"
import { Button } from "@/Components/ui/button"
import { Card, CardContent } from "@/Components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/Components/ui/avatar"
const ReviewTab = () => {
    const [rating, setRating] = React.useState(0)
  return (
    <TabsContent value="reviews" className="mt-6">
    <div className="space-y-8">
        <Card className="border-none">
            <CardContent className="p-6">
                <div className="flex items-start gap-4">
                    <Avatar className="w-12 h-12">
                        <AvatarImage src="/placeholder.svg" />
                        <AvatarFallback>PK</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                            <div>
                                <h4 className="font-semibold text-black">Pham Tuan Kiet (K18 HL)</h4>
                                <p className="text-sm text-gray-500">2025-01-14</p>
                            </div>
                            <div className="flex gap-0.5">
                                {[...Array(5)].map((_, i) => (
                                    <Star
                                        key={i}
                                        className={`w-4 h-4 ${i === 0 ? "fill-yellow-400 text-yellow-400" : "fill-gray-200 text-gray-200"
                                            }`}
                                    />
                                ))}
                            </div>
                        </div>
                        <p className="text-gray-600 mt-2">wtf</p>
                    </div>
                </div>
            </CardContent>
        </Card>

        <Card className="border-none">
            <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-6">Write a Review</h3>
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-2">Rating</label>
                        <div className="flex gap-1">
                            {[...Array(5)].map((_, i) => (
                                <Star
                                    key={i}
                                    className={`w-6 h-6 cursor-pointer transition-colors ${i < rating
                                            ? "fill-yellow-400 text-yellow-400"
                                            : "fill-gray-200 text-gray-200 hover:fill-yellow-200 hover:text-yellow-200"
                                        }`}
                                    onClick={() => setRating(i + 1)}
                                />
                            ))}
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-2">Your Review</label>
                        <Textarea
                            placeholder="Share your thoughts about the product..."
                            className="min-h-[150px] resize-none"
                        />
                    </div>
                    <Button className="w-full sm:w-auto bg-black hover:bg-black/90 text-white">Submit Review</Button>
                </div>
            </CardContent>
        </Card>
    </div>
</TabsContent>
  )
}

export default ReviewTab
