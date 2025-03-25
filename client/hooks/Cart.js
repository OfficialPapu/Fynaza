import { useDispatch, useSelector } from "react-redux";
import { AddToCart, RemoveFromCart, UpdateQuantity, ClearCart, UpdatePickup } from "@/Components/Website/Redux/Slices/CartSlice";
import { useSnackbar } from "notistack";
import { useRouter } from "next/navigation";
import axios from "@/lib/axios";
import { useEffect, useState } from "react";
import { Home, ShoppingCart, Store, Truck, UserRound, Zap } from "lucide-react";

const useCartActions = () => {
    const { enqueueSnackbar: ShowNotification } = useSnackbar();
    const dispatch = useDispatch();
    const CartItems = useSelector((state) => state.Cart.CartItems);
    const isAuth = useSelector((state) => state.Login.isAuth);
    const UserID = useSelector((state) => state.Login?.UserDetails?.UserID);
    const BASE_IMAGES_PATH = process.env.NEXT_PUBLIC_BASE_IMAGES_PATH;
    const PickupOptions = [
        {
            ID: "Instant-Delivery",
            Value: "Instant Delivery",
            Name: "Instant Delivery",
            Price: 0,
            Icon: <Zap className="h-4 w-4" />,
            Description: "Shipping cost payable by you",
        },
        {
            ID: "Inside-Valley",
            Value: "Inside Valley",
            Name: "Inside Valley",
            Price: 100,
            Icon: <Truck className="h-4 w-4" />,
            Description: "Delivery within 24 hours",
        },
        {
            ID: "Outside-Valley",
            Value: "Outside Valley",
            Name: "Outside Valley",
            Price: 200,
            Icon: <Truck className="h-4 w-4" />,
            Description: "Delivery within 3-5 days",
        },
        {
            ID: "Store-Pickup",
            Value: "Store Pickup",
            Name: "Store Pickup",
            Price: 0,
            Icon: <Store className="h-4 w-4" />,
            Description: "Pick up from our store",
        },
    ]
    const [BreadcrumbView, setBreadcrumbView] = useState([
        { label: "Home", href: "/", icon: <Home className="w-4 h-4" /> },
        { label: "Account", href: "/account", icon: <UserRound className="w-4 h-4" /> },
        { label: "Cart", href: "/account/cart", icon: <ShoppingCart className="w-4 h-4" /> },
    ])
    const [selectedPickupOption, setSelectedPickupOption] = useState(null)
    const PickupCost = useSelector((state) => state.Cart.Pickup.Cost) || 0;
    const PickupLocation = useSelector((state) => state.Cart.Pickup.Location) || 0;
    const router = useRouter();

    const StoreInDb = async (Product, UserID) => { return (await axios.post("api/cart/add", { Product, UserID })).status }
    const RemoveFromDB = async (CartItemID, UserID) => {
        return (await axios.delete(`api/cart/remove/${CartItemID}`, { params: { UserID } })).status
    }
    const UpdateQuantityDB = async (ProductID, CartItemID, UserID, Quantity) => {
        try {
            return (await axios.put(`api/cart/update/${CartItemID}`, { ProductID, UserID, Quantity })).status
        } catch (error) {
            return error.status;
        }
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

    const HandelUpdateQuantity = async (ProductID, Quantity, CartItemID) => {
        if (Quantity <= 0) {
            return;
        }
        const StatusCode = await UpdateQuantityDB(ProductID, CartItemID, UserID, Quantity);
        if (StatusCode == 200) {
            dispatch(UpdateQuantity({ ProductID, Quantity }));
        } else if (StatusCode == 450) {
            ShowNotification('Low in stock', { variant: 'error' });
        } else {
            ShowNotification('Unable to update', { variant: 'error' });
        }
    }

    const IsProductInCart = (ProductID) => {
        return CartItems.some((item) => item.ProductID === ProductID);
    };

    const GetCartItems = async () => {
        dispatch(ClearCart());
        const response = await axios.get(`api/cart/items/${UserID}`);
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


    const HandelCheckout = () => {
        if (selectedPickupOption) {
            router.push("/account/checkout")
        }
    }

    const handlePickupOptionChange = (Location) => {
        setSelectedPickupOption(Location);
        let Pickup = {
            Location: Location,
            Cost: PickupOptions.find((option) => option.Name === Location).Price,
        }
        dispatch(UpdatePickup(Pickup))
    }

    const Subtotal = useSelector((state) => state.Cart.OriginalTotal)
    const Discount = useSelector((state) => state.Cart.OriginalTotal - state.Cart.DiscountedTotal) || null
    const Total = Math.max(0, Subtotal + PickupCost - (Discount || 0))

    return { GetCartItems, HandleAddToCart, HandelUpdateQuantity, HandelRemoveFromCart, IsProductInCart, HandelCheckout, PickupOptions, BreadcrumbView, handlePickupOptionChange, selectedPickupOption, PickupCost, Subtotal, Discount, Total, PickupLocation, CartItems, UserID };
}

export default useCartActions;