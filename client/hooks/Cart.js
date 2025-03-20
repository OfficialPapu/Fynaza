import { useDispatch, useSelector } from "react-redux";
import { AddToCart, RemoveFromCart, UpdateQuantity, ClearCart } from "@/Components/Website/Redux/Slices/CartSlice";
import { useSnackbar } from "notistack";
import { useRouter } from "next/navigation";
import axios from "@/lib/axios";
import { useEffect } from "react";

const useCartActions = () => {
    const { enqueueSnackbar: ShowNotification } = useSnackbar();
    const dispatch = useDispatch();
    const CartItems = useSelector((state) => state.Cart.CartItems);
    const isAuth = useSelector((state) => state.Login.isAuth);
    const UserID = useSelector((state) => state.Login?.UserDetails?.UserID);
    const BASE_IMAGES_PATH = process.env.NEXT_PUBLIC_BASE_IMAGES_PATH;
    const router = useRouter();

    const StoreInDb = async (Product, UserID) => { return (await axios.post("api/cart/add", { Product, UserID })).status }
    const RemoveFromDB = async (CartItemID, UserID) => {
        return (await axios.delete(`api/cart/remove/${CartItemID}`, { params: { UserID } })).status
    }
    const HandleAddToCart = async (Product, ReAddingItem = false) => {
        const isAlreadyInCart = IsProductInCart(Product.ID);
        if (!isAuth) {
            router.push("/auth/login");
            return;
        }
        if (isAlreadyInCart && !ReAddingItem) {
            ShowNotification('Oops! Already in your cart', { variant: 'error' });
            return;
        }
        const StatusCode = !ReAddingItem ? await StoreInDb(Product, UserID) : 201;
        if (StatusCode == 201) {
            dispatch(AddToCart({
                ProductID: Product.ID,
                CartItemID: ReAddingItem ? Product.CartItemID : null,
                Name: Product.Title,
                Price: Product.Price,
                Discount: Product.Discount,
                Image: Product.ImageUrl,
                Quantity: Product.Quantity,
                SlugUrl: Product.SlugUrl,
            }));
            !ReAddingItem ? ShowNotification('Success! Item added to cart', { variant: 'success' }) : "";
        } else {
            ShowNotification('Something went wrong', { variant: 'error' });
        }
    }

    const HandelRemoveFromCart = async (ProductID, CartItemID) => {
        const StatusCode = await RemoveFromDB(CartItemID, UserID);
        if (StatusCode == 200) {
            dispatch(RemoveFromCart({ ProductID }));
        } else {
            ShowNotification('Unable to remove', { variant: 'error' });
        }
    }

    const HandelUpdateQuantity = (ProductID, Quantity) => {
        if (Quantity <= 0) {
            return;
        }
        dispatch(UpdateQuantity({ ProductID, Quantity }));
    }

    const IsProductInCart = (ProductID) => {
        return CartItems.some((item) => item.ProductID === ProductID);
    };

    const GetCartItems = async () => {
        dispatch(ClearCart());
        const response = await axios(`api/cart/items/${UserID}`);
        if (response.status == 200) {
            Object.keys(response.data).forEach(key => {
                const Product = {
                    ID: response.data[key].ProductID._id,
                    CartItemID: response.data[key]._id,
                    Title: response.data[key].ProductID.Name,
                    Price: response.data[key].ProductID.Price,
                    Discount: response.data[key].ProductID.Discount.Percentage,
                    ImageUrl: BASE_IMAGES_PATH + response.data[key].ProductID.Media.Images[0].Url,
                    Quantity: response.data[key].Quantity,
                    SlugUrl: response.data[key].ProductID.Slug,
                };
                HandleAddToCart(Product, true);
            });
        } else {
            ShowNotification('Something went wrong', { variant: 'error' });
        }
    }
    useEffect(() => {
        GetCartItems();
    }, []);

    return { GetCartItems, HandleAddToCart, HandelUpdateQuantity, HandelRemoveFromCart, IsProductInCart };
}

export default useCartActions;