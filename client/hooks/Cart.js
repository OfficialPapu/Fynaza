import { useDispatch, useSelector } from "react-redux";
import { AddToCart, RemoveFromCart, UpdateQuantity } from "@/Components/Website/Redux/Slices/CartSlice";
import { useSnackbar } from "notistack";
import { useRouter } from "next/navigation";
import axios from "@/lib/axios";

const useCartActions = () => {
    const { enqueueSnackbar: ShowNotification } = useSnackbar();
    const dispatch = useDispatch();
    const CartItems = useSelector((state) => state.Cart.CartItems);
    const isAuth = useSelector((state) => state.Login.isAuth);
    const router = useRouter();

    const AddToCartDB = (Product)=>{
        const response = axios.post("api/cart/add", Product);
    }

    const HandleAddToCart = (Product) => {
        const isAlreadyInCart = IsProductInCart(Product.ID);
        if (!isAuth) {
            router.push("/auth/login");
            return;
        }
        AddToCartDB(Product);

        
        if (isAlreadyInCart) {
            ShowNotification('Oops! Already in your cart', { variant: 'error' });
            return;
        }
        dispatch(AddToCart({
            ProductID: Product.ID,
            Name: Product.Title,
            Price: Product.Price,
            Discount: Product.Discount,
            Image: Product.ImageUrl,
            Quantity: Product.Quantity,
        }));
        ShowNotification('Success! Item added to cart', { variant: 'success' });
    }

    const HandelRemoveFromCart = (ProductID) => {
        dispatch(RemoveFromCart({ ProductID }));
    }

    const HandelUpdateQuantity = (ProductID, Quantity) => {
        if(Quantity <= 0){
            return;
        }
        dispatch(UpdateQuantity({ ProductID, Quantity }));
    }

    const IsProductInCart = (ProductID) => {
        return CartItems.some((item) => item.ProductID === ProductID);
    };

    return { HandleAddToCart, HandelUpdateQuantity, HandelRemoveFromCart, IsProductInCart };
}

export default useCartActions;