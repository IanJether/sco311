



export const addToCart = (id,name,price,quantity,image,cartItems,setCartItems) => {

    const newItem = {
        id: id,
        name: name,
        price: price,
        quantity: quantity,
        imageUrl: image,
    };

    const existingItemIndex = cartItems.findIndex((item) => item.id === id);

    if (existingItemIndex !== -1) {
        const updatedCart = [...cartItems];
        updatedCart[existingItemIndex].quantity += 1;
        setCartItems(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
    } else {
        const updatedCart = [...cartItems, newItem];
        setCartItems(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
    }
};