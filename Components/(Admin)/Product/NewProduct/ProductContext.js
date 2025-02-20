"use client";
import React, { createContext, useContext, useState } from 'react'
const ProductContext = createContext();
export const ProductProvider = ({ children }) => {
    const [product, setProduct] = useState({
        SKU: "",
        Name: "",
        Description: "",
        Category: "",
        Brand: "Generic",
        Price: 0,
        Discount: {
            Percentage: 0,
            ValidUntil: "",
        },
        Stock: {
            Quantity: 0,
        },
        Media: {
            Images: [],
            Videos: [],
        },
        Specifications: {
            Color: "",
            Size: "",
            Weight: "",
            CustomAttributes: [],
        },
        ShippingDetails: {
            Weight: 0,
            Dimensions: {
                Length: 0,
                Width: 0,
                Height: 0,
            },
        },
    })

    const [uploadProgress, setUploadProgress] = useState(0)

    const handleInputChange = (e) => {
        setProduct({ ...product, [e.target.name]: e.target.value })
    }

    const handleNestedInputChange = (path, key, value) => {
        setProduct((prevProduct) => ({
            ...prevProduct,
            [path]: {
                ...prevProduct[path],
                ...(typeof key === "string" ? { [key]: value } : key),
            },
        }))
    }

    const handleSelectInputChange = (path, value) => {
        setProduct((prevProduct) => ({
            ...prevProduct,
            [path]: value,
        }))
    }

    const removeMedia = (type, index) => {
        setProduct((prevProduct) => ({
            ...prevProduct,
            Media: {
                ...prevProduct.Media,
                [type]: prevProduct.Media[type].filter((_, i) => i !== index),
            },
        }))
    }

    const handleMediaUpload = (type, e) => {
        const files = Array.from(e.target.files); // Convert FileList to an Array
        setProduct((prevProduct) => ({
            ...prevProduct,
            Media: {
                ...prevProduct.Media,
                [type]: files,
            },
        }));
        // const newMedia = [];

        // files.forEach((file) => {
        //     const reader = new FileReader();

        //     reader.onload = (e) => {
        //         newMedia.push({ Url: e.target.result, Name: file.name });

        //         // If all files are read, update state
        //         if (newMedia.length === files.length) {
        //             setProduct((prevProduct) => ({
        //                 ...prevProduct,
        //                 Media: {
        //                     ...prevProduct.Media,
        //                     [type]: [...prevProduct.Media[type], ...newMedia],
        //                 },
        //             }));
        //         }
        //     };

        //     reader.onprogress = (e) => {
        //         if (e.lengthComputable) {
        //             const progress = (e.loaded / e.total) * 100;
        //             setUploadProgress(progress);
        //         }
        //     };

        //     reader.readAsDataURL(file);
        // });
    };


    const updateCustomAttribute = (index, key, value) => {
        setProduct((prevProduct) => ({
            ...prevProduct,
            Specifications: {
                ...prevProduct.Specifications,
                CustomAttributes: prevProduct.Specifications.CustomAttributes.map((attr, i) =>
                    i === index ? { ...attr, [key]: value } : attr,
                ),
            },
        }))
    }

    const addCustomAttribute = () => {
        setProduct((prevProduct) => ({
            ...prevProduct,
            Specifications: {
                ...prevProduct.Specifications,
                CustomAttributes: [...prevProduct.Specifications.CustomAttributes, { Key: "", Value: "" }],
            },
        }))
    }

    const removeCustomAttribute = (index) => {
        setProduct((prevProduct) => ({
            ...prevProduct,
            Specifications: {
                ...prevProduct.Specifications,
                CustomAttributes: prevProduct.Specifications.CustomAttributes.filter((_, i) => i !== index),
            },
        }))
    }

    return (

        <>
            <ProductContext.Provider value={{
                product, setProduct, uploadProgress, setUploadProgress, handleInputChange, handleNestedInputChange, removeMedia,
                handleMediaUpload, updateCustomAttribute, addCustomAttribute, removeCustomAttribute, handleSelectInputChange
            }} >{children}</ProductContext.Provider >
        </>

    );
}

export const useProduct = () => useContext(ProductContext);
