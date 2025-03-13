import React from 'react'
import { TabsContent } from "@/Components/ui/tabs"
import { Card, CardContent } from "@/Components/ui/card"
import { useProduct } from '@/Components/(Website)/Product/ProductContext'
const DescriptionTab = () => {
    const { Product } = useProduct();
    return (
        <TabsContent value="description" className="mt-6">
            <Card className="border-none">
                <CardContent className="p-6">
                    <div className="prose prose-sm sm:prose lg:prose-lg xl:prose-xl" dangerouslySetInnerHTML={{ __html: Product.Description }}></div>
                </CardContent>
            </Card>
        </TabsContent>
    )
}

export default DescriptionTab
