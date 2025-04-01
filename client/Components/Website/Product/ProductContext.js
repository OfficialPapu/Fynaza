"use client"
import React, { createContext, use, useContext, useEffect, useState } from 'react'
import axios from "@/lib/axios";
import { Home, Box } from "lucide-react"
import { useParams } from 'next/navigation';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { useSnackbar } from 'notistack';

const ProductContext = createContext();
export const ProductProvider = ({ children }) => {
    const isAuth = useSelector((state) => state.Login.isAuth);
    const UserID = useSelector((state) => state.Login?.UserDetails?.UserID);
    const router = useRouter();
    const { Slug } = useParams();
    const [Rating, setRating] = useState(0);
    const [Comment, setComment] = useState("");
    const [Reviews, setReviews] = useState([]);
    const { enqueueSnackbar: ShowNotification } = useSnackbar();
    const [BreadcrumbView, setBreadcrumbView] = useState([
        { label: "Home", href: "/", icon: <Home className="w-3 h-3 sm:w-4 sm:h-4" /> },
        { label: "Product", href: "#", icon: <Box className="w-3 h-3 sm:w-4 sm:h-4" /> },
        { label: "", href: "" },
    ])

    const [Product, setProduct] = useState([]);
    const BASE_IMAGES_PATH = process.env.NEXT_PUBLIC_BASE_IMAGES_PATH;

    async function GetProductInfo() {
        const response = await axios.get('api/product/' + Slug);
        const result = response.data;
        setBreadcrumbView((prv) =>
            prv.map((item, index) =>
                index === 2 ? { ...item, label: result[0].Name } : item
            )
        );
        setProduct(result[0]);
    }

    useEffect(() => {
        GetProductInfo();
    }, [])



    const handleShare = () => {
        if (navigator.share) {
            navigator
                .share({
                    title: "Skechers Women's Slip-Ins Summits - 25% OFF",
                    text: "Check out these awesome sneakers! Now only $59.99 (was $79.99)",
                    url: window.location.href,
                })
                .catch(console.error)
        } else {
            alert("Sharing is not supported on this browser, but you can copy this link: " + window.location.href)
        }
    }

    const AddReview = async () => {
        try {
            if (!isAuth) {
                router.push("/auth/login");
                return;
            }
            if (Rating == 0 || Comment == "") {
                ShowNotification('Please rate the product', { variant: 'error' });
                return;
            }
            const response = await axios.post('api/product/review/add', { UserID, ProductID: Product._id, Rating, Comment });
            if (response.status == 201) {
                GetReviews();
                setRating(0);
                setComment("");
                ShowNotification('Success! Review added', { variant: 'success' });
            }
        } catch (error) {
            if (error.status == 400) {
                ShowNotification('Review allowed only once!', { variant: 'error' });
            } else {
                ShowNotification('Something went wrong', { variant: 'error' });
            }
        }
    }

    const GetReviews = async () => {
        const response = await axios.get('api/product/review/' + Product._id);
        const result = response.data;
        setReviews(result);
    }

    useEffect(() => {
        GetReviews();
    }, [Product])

    return (

        <>
            <ProductContext.Provider value={{ BreadcrumbView, Product, Slug, BASE_IMAGES_PATH, handleShare, AddReview, Rating, setRating, Comment, setComment, Reviews }} >{children}</ProductContext.Provider >
        </>

    );
}
export const useProduct = () => useContext(ProductContext);
