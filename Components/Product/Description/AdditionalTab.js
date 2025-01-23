import * as React from "react"
import { TabsContent } from "@/Components/ui/tabs"
import { Card, CardContent } from "@/Components/ui/card"

const AdditionalTab = () => {
    return (
        <TabsContent value="additional" className="mt-6">
            <Card className="border-none">
                <CardContent className="p-6">
                    <div className="grid grid-cols-1 gap-4">
                        {[
                            { label: "Stand Up", value: '35"L x 24"W x 37-45"H(front to back wheel)' },
                            { label: "Folded (w/o wheels)", value: '32.5"L x 18.5"W x 16.5"H' },
                            { label: "Frame", value: "Aluminum" },
                            { label: "Weight Capacity", value: "60 LBS" },
                            { label: "Colors", value: "Black, Blue, Red, White" },
                        ].map((item, index) => (
                            <div
                                key={index}
                                className="grid grid-cols-1 md:grid-cols-2 gap-2 p-4 rounded-lg hover:bg-gray-50 transition-colors"
                            >
                                <div className="font-medium text-black">{item.label}</div>
                                <div className="text-gray-600">{item.value}</div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </TabsContent>
    )
}

export default AdditionalTab
