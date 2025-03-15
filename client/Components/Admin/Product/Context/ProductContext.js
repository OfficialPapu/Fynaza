
"use client";
import { TipTapProvider, useTipTap } from "@/Components/Admin/Product/Context/TipTapContext";
import React, { createContext, useContext, useEffect, useState } from 'react'
import { useSnackbar } from 'notistack';
import axios from "@/lib/axios";

const ProductContext = createContext();
export const ProductProvider = ({ children }) => {
    const { enqueueSnackbar: ShowNotification } = useSnackbar();
    const [product, setProduct] = useState({
        SKU: "",
        Name: "",
        Category: "",
        Brand: "Fynaza",
        Price: "",
        Discount: {
            Percentage: "",
            ValidUntil: "",
        },
        Stock: {
            Quantity: "",
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

    const { editor } = useTipTap();
    const [categories, setCategories] = useState([]);
    const [errors, setErrors] = useState({});
    const [previews, setPreviews] = useState({
        Media: {
            Images: [],
            Videos: [],
        }
    });
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

        setPreviews((prev) => ({
            ...prev,
            Media: {
                ...prev.Media,
                [type]: prev.Media[type].filter((_, i) => i !== index),
            },
        }));
    }

    const handleMediaUpload = (type, e) => {
        const files = Array.from(e.target.files);
        const newPreviews = files.map((file) => URL.createObjectURL(file));


        setPreviews((prev) => (
            {
                Media: {
                    ...prev,
                    [type]: [...(prev[type] || []), ...newPreviews],
                }
            }
        ));

        setProduct((prevProduct) => ({
            ...prevProduct,
            Media: {
                ...prevProduct.Media,
                [type]: files,
            },
        }));

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


    const validateForm = () => {
        const newErrors = {};
        if (!product.SKU) newErrors.SKU = "SKU is required";
        if (!product.Name) newErrors.Name = "Product Name is required";
        if (!product.Category) newErrors.Category = "Category is required";
        if (!product.Price) newErrors.Price = "Price is required";
        if (!product.Stock.Quantity) newErrors.StockQuantity = "Stock is required";
        if (!product.Media.Images || product.Media.Images.length === 0) newErrors.Images = "At least one image is required";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleErrorClear = (field) => {
        setErrors((prevErrors) => {
            const newErrors = { ...prevErrors };
            delete newErrors[field];
            return newErrors;
        });
    };

    const convertObjectToFormData = (obj, formData = new FormData(), parentKey = '') => {
        for (let key in obj) {
            if (obj.hasOwnProperty(key)) {
                const value = obj[key];
                const formKey = parentKey ? `${parentKey}[${key}]` : key;

                if (typeof value === 'object' && !Array.isArray(value)) {
                    convertObjectToFormData(value, formData, formKey);
                } else if (Array.isArray(value)) {
                    value.forEach((item, index) => {
                        if (typeof item === 'object' && !Array.isArray(item)) {
                            for (let subKey in item) {
                                if (item.hasOwnProperty(subKey)) {
                                    formData.append(`${formKey}[${index}][${subKey}]`, item[subKey]);
                                }
                            }
                        } else {
                            formData.append(`${formKey}[${index}]`, item);
                        }
                    });
                } else {
                    formData.append(formKey, value);
                }
            }
        }
    };


    const convertBase64ToFile = (base64String, filename) => {
        const arr = base64String.split(",");
        const mime = arr[0].match(/:(.*?);/)[1];
        const bstr = atob(arr[1]);
        let n = bstr.length;
        const u8arr = new Uint8Array(n);
        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }
        return new File([u8arr], filename, { type: mime });
    };

    const resetForm = () => {
        setProduct({
            SKU: "",
            Name: "",
            Category: "",
            Brand: "Fynaza",
            Price: "",
            Discount: {
                Percentage: "",
                ValidUntil: "",
            },
            Stock: {
                Quantity: "",
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
        });
        setPreviews({
            Media: {
                Images: [],
                Videos: [],
            }
        });
        editor.commands.clearContent();
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;
        let formData = new FormData();
        let uploadedImages = [];
        let tiptapContent = editor.getJSON();

        tiptapContent.content.forEach((node, index) => {
            if (node.type === "image" && node.attrs.src.startsWith("data:image")) {
                const file = convertBase64ToFile(node.attrs.src, `wysiwyg-image-${index}.png`);
                formData.append("WysiwygImages", file);
                uploadedImages.push({ index, placeholder: node.attrs.src });
            }
        });

        if (uploadedImages.length > 0) {
            try {
                const response = await axios.post(`api/product/tiptap/upload`, formData, {
                    headers: { "Content-Type": "multipart/form-data" },
                });

                if (response.data.success) {
                    uploadedImages.forEach((img, idx) => {
                        tiptapContent.content.forEach((node) => {
                            if (node.type === "image" && node.attrs.src === img.placeholder) {
                                node.attrs.src = response.data.urls[idx];
                            }
                        });
                    });
                    formData.delete("WysiwygImages");
                }
            } catch (error) {
                ShowNotification('Image upload failed.', { variant: 'error' });
                return;
            }
        }
        convertObjectToFormData(product, formData);
        formData.append("Description", editor.getHTML());

        product.Media.Images.forEach((image) => {
            formData.append("Images", image);
        });

        product.Media.Videos.forEach((video) => {
            formData.append("Videos", video);
        });
        try {
            const response = await axios.post(`api/product/add`, formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            if (response.data.success) {
                resetForm();
                ShowNotification('Product created successfully!', { variant: 'success' });
            } else {
                ShowNotification('Failed to create product.', { variant: 'error' });
            }
        } catch (error) {
            ShowNotification('Failed to create product.', { variant: 'error' });
        }
    };

    async function GetCategories() {
        const response = await axios.get('api/categories');
        const result = response.data;
        setCategories(result);
    }

    useEffect(() => {
        GetCategories();
    }, [])

    return (

        <>
            <ProductContext.Provider value={{
                product, setProduct, uploadProgress, setUploadProgress, handleInputChange, handleNestedInputChange, removeMedia,
                handleMediaUpload, updateCustomAttribute, addCustomAttribute, removeCustomAttribute, handleSelectInputChange, previews, errors, setErrors, handleErrorClear, validateForm, convertObjectToFormData, convertBase64ToFile, handleSubmit, categories
            }} >{children}</ProductContext.Provider >
        </>

    );
}

export const useProduct = () => useContext(ProductContext);
