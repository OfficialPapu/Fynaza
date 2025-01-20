// "use client"

// import { useState } from "react"
// import { Minus, Plus, X } from "lucide-react"
// import { Button } from "@/Components/ui/button"

// interface CartItem {
//   id: number
//   name: string
//   price: number
//   quantity: number
//   image: string
// }

// const initialCartItems: CartItem[] = [
//   { id: 1, name: "Premium Headphones", price: 199.99, quantity: 1, image: "/placeholder.svg?height=100&width=100" },
//   { id: 2, name: "Wireless Mouse", price: 49.99, quantity: 2, image: "/placeholder.svg?height=100&width=100" },
//   { id: 3, name: "Mechanical Keyboard", price: 129.99, quantity: 1, image: "/placeholder.svg?height=100&width=100" },
// ]

// export default function CartPage() {
//   const [cartItems, setCartItems] = useState<CartItem[]>(initialCartItems)

//   const updateQuantity = (id: number, newQuantity: number) => {
//     setCartItems((items) =>
//       items.map((item) => (item.id === id ? { ...item, quantity: Math.max(0, newQuantity) } : item)),
//     )
//   }

//   const removeItem = (id: number) => {
//     setCartItems((items) => items.filter((item) => item.id !== id))
//   }

//   const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)

//   return (
//     <div className="min-h-screen bg-[#f3f7fa]">
//       <div className="container mx-auto px-4 py-8">
//         <h1 className="text-3xl font-bold mb-8 text-black">Your Cart</h1>
//         <div className="grid md:grid-cols-3 gap-8">
//           <div className="md:col-span-2">
//             {cartItems.map((item) => (
//               <div key={item.id} className="flex items-center justify-between bg-white p-4 rounded-lg shadow mb-4">
//                 <div className="flex items-center space-x-4">
//                   <img
//                     src={item.image || "/placeholder.svg"}
//                     alt={item.name}
//                     className="w-16 h-16 object-cover rounded"
//                   />
//                   <div>
//                     <h2 className="font-semibold text-black">{item.name}</h2>
//                     <p className="text-gray-600">${item.price.toFixed(2)}</p>
//                   </div>
//                 </div>
//                 <div className="flex items-center space-x-2">
//                   <Button
//                     variant="outline"
//                     size="icon"
//                     onClick={() => updateQuantity(item.id, item.quantity - 1)}
//                     className="h-8 w-8 rounded-full"
//                   >
//                     <Minus className="h-4 w-4" />
//                   </Button>
//                   <span className="w-8 text-center">{item.quantity}</span>
//                   <Button
//                     variant="outline"
//                     size="icon"
//                     onClick={() => updateQuantity(item.id, item.quantity + 1)}
//                     className="h-8 w-8 rounded-full"
//                   >
//                     <Plus className="h-4 w-4" />
//                   </Button>
//                   <Button
//                     variant="ghost"
//                     size="icon"
//                     onClick={() => removeItem(item.id)}
//                     className="h-8 w-8 rounded-full text-red-500 hover:text-red-700"
//                   >
//                     <X className="h-4 w-4" />
//                   </Button>
//                 </div>
//               </div>
//             ))}
//           </div>
//           <div className="md:col-span-1">
//             <div className="bg-white p-6 rounded-lg shadow">
//               <h2 className="text-xl font-semibold mb-4 text-black">Order Summary</h2>
//               <div className="flex justify-between mb-2">
//                 <span>Subtotal</span>
//                 <span>${total.toFixed(2)}</span>
//               </div>
//               <div className="flex justify-between mb-2">
//                 <span>Shipping</span>
//                 <span>Free</span>
//               </div>
//               <div className="border-t border-gray-200 my-4"></div>
//               <div className="flex justify-between mb-4">
//                 <span className="font-semibold">Total</span>
//                 <span className="font-semibold">${total.toFixed(2)}</span>
//               </div>
//               <Button className="w-full bg-black text-white hover:bg-gray-800">Proceed to Checkout</Button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

