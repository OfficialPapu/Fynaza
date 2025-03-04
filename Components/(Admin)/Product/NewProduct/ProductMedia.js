"use client"
import { X, ImageIcon, Video } from "lucide-react"
import Image from "next/image"
import { Button } from "@/Components/ui/button"
import { Input } from "@/Components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/Components/ui/tabs"
import { ScrollArea } from "@/Components/ui/scroll-area"
import { Progress } from "@/Components/ui/progress"
import { useProduct } from "@/Components/(Admin)/Product/Context/ProductContext"

const ProductMedia = () => {
    const { uploadProgress, removeMedia, handleMediaUpload, previews, errors, handleErrorClear } = useProduct();
    return (
        <Card>
            <CardHeader>
                <CardTitle>Product Media</CardTitle>
            </CardHeader>
            <CardContent>
                <Tabs defaultValue="images" className="w-full">
                    <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="images">Images</TabsTrigger>
                        <TabsTrigger value="videos">Videos</TabsTrigger>
                    </TabsList>
                    <TabsContent value="images" className="space-y-4 mt-4">
                        <ScrollArea className="w-full rounded-md border p-4">
                            <div className="h-[200px] gap-4 flex md:items-start md:justify-start justify-center flex-wrap">
                                {previews?.Media?.Images?.length > 0 &&
                                    previews.Media.Images.map((image, index) => (
                                        <div key={index} className="relative h-[200px] w-[200px]">
                                            <Image
                                                src={image}
                                                alt={`preview-${index}`}
                                                fill
                                                className="object-cover rounded-lg border"
                                            />
                                            <Button
                                                type="button"
                                                variant="destructive"
                                                size="xs"
                                                className="absolute top-2 right-2"
                                                onClick={() => removeMedia("Images", index)}
                                            >
                                                <X className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    ))
                                }

                                <div className={`flex aspect-square items-center justify-center rounded-lg border-2 border-dashed h-[200px] w-[200px] ${errors.Images ? "border-red-500" : "border-gray-300"}`}>
                                    <label htmlFor="ProductImage" className="cursor-pointer text-center">
                                        <ImageIcon className="mx-auto h-8 w-8 text-gray-400" />
                                        <span className="mt-2 block text-sm text-gray-600">Upload Image</span>
                                        <Input
                                            id="ProductImage"
                                            type="file"
                                            className="hidden"
                                            accept="image/*"
                                            multiple
                                            onChange={(e) => { handleMediaUpload("Images", e); handleErrorClear("Images"); }}
                                            name="Images"
                                        />
                                    </label>
                                </div>
                            </div>
                            {errors.Images && <p className="text-red-500 text-sm text-center w-[200px] mt-3">{errors.Images}</p>}
                        </ScrollArea>
                    </TabsContent>
                    <TabsContent value="videos" className="space-y-4 mt-4">
                        <ScrollArea className="w-full rounded-md border p-4">
                            <div className="h-[200px] gap-4 flex md:items-start md:justify-start justify-center flex-wrap">
                                {previews?.Media?.Videos?.length > 0 &&
                                    previews.Media.Videos.map((video, index) => (
                                        <div key={index} className="relative h-[200px] w-[200px]">
                                            <video src={video} className="w-full h-full object-cover rounded-lg" controls />
                                            <Button
                                                type="button"
                                                variant="destructive"
                                                size="xs"
                                                className="absolute top-2 right-2"
                                                onClick={() => removeMedia("Videos", index)}
                                            >
                                                <X className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    ))}
                                <div className="flex aspect-video items-center justify-center rounded-lg border-2 border-dashed h-[200px] w-[200px]">
                                    <label htmlFor="video-upload" className="cursor-pointer text-center">
                                        <Video className="mx-auto h-8 w-8 text-gray-400" />
                                        <span className="mt-2 block text-sm text-gray-600">Upload Video</span>
                                        <Input
                                            id="video-upload"
                                            type="file"
                                            className="hidden"
                                            accept="video/*"
                                            multiple
                                            name="Videos"
                                            onChange={(e) => handleMediaUpload("Videos", e)}
                                        />
                                    </label>
                                </div>
                            </div>
                        </ScrollArea>
                    </TabsContent>
                </Tabs>
                {uploadProgress > 0 && uploadProgress < 100 && (
                    <div className="mt-4">
                        <Progress value={uploadProgress} className="w-full" />
                    </div>
                )}
            </CardContent>
        </Card>
    )
}

export default ProductMedia
