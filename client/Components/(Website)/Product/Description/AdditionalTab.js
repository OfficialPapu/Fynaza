import * as React from "react"
import { TabsContent } from "@/Components/ui/tabs"
import { Card, CardContent } from "@/Components/ui/card"
import { useProduct } from '@/Components/(Website)/Product/ProductContext'

const AdditionalTab = () => {
    const { Product } = useProduct();
    return (
        <TabsContent value="additional" className="mt-6">
            <Card className="border-none">
                <CardContent className="p-6">
                    <div className="grid grid-cols-1 gap-4">
                        {
                            Object.keys(Product.Specifications.CustomAttributes).length > 0 ?
                                Product.Specifications.CustomAttributes.map((item, index) => (
                                    <div
                                        key={index}
                                        className="grid grid-cols-1 md:grid-cols-2 gap-2 p-4 rounded-lg hover:bg-gray-50 transition-colors"
                                    >
                                        <div className="font-medium text-black">{item.Key}</div>
                                        <div className="text-gray-600">{item.Value}</div>
                                    </div>
                                ))
                                :
                                <div className="pl-4">Not Available</div>
                        }
                    </div>
                </CardContent>
            </Card>
        </TabsContent>
    )
}

export default AdditionalTab
