"use client"
import * as React from "react"
import { Tabs } from "@/Components/ui/tabs"
import AdditionalTab from "./Description/AdditionalTab"
import ReviewTab from "./Description/ReviewTab"
import DescriptionTab from "./Description/DescriptionTab"
import TabsListComp from "./Description/TabsList"

export default function ProductDescription() {

    return (
        <Tabs defaultValue="description" className="w-full">
            <TabsListComp />
            <DescriptionTab />
            <AdditionalTab />
            <ReviewTab />

        </Tabs>
    )
}

