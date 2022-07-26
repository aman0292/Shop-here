import { useEffect,useState } from "react";
import { useParams } from "react-router-dom";
import BtnSpinner from '../../utils/BtnSpinner';
import axios from "axios";
import Toast from "../../utils/Toast";
import "./IndividualProductPage.css";
import { useCart } from "../../contexts/CartContext";
import { useWishlist } from "../../contexts/WishContext";

const IndividualProductPage = () => {
    const { productId } = useParams();
    const [ product,setProduct ] = useState({});
    const [loaderForCart,setLoaderForCart] = useState(false);
    const [loaderForWishlist,setLoaderForWishlist] = useState(false);
    const { wishlist ,handleWishlist} = useWishlist();
    const { cart,addToCart } = useCart();

    const [error,setError] = useState(false);

    useEffect(() => {
        ( async function(){
            try {
                const { data } = await axios.get(`https://shop-here1.herokuapp.com/api/products/${productId}`);
                setProduct(data.product)
             } catch (error) {
                setError(true);
             }
        })()
    },[productId])

    return (
            <div className="individual__product__container">
                 <Toast show={error} onClick={() => setError(false)} message="Something went wrong with server" error={true} background="red" color="white"/>
                 <div className="individual__product__card">
                     <img alt="product" className="individual__product__card__image" src={product?.image} />
                     <div className="individual__product__card__content">
                         <h2>{product?.name}</h2>
                         <div>
                            <h3 className="price">Rs. {product?.price}</h3>
                            <small className="taxes">inclusive of all taxes</small>
                         </div>
                         {product?.fastDelivery && (
                          <small className="card-content-details"><i className="fas fa-shipping-fast"></i> Fast Delivery</small>
                         )}
                         <p className="description">{product?.description}</p>

                         <div>
                            <button onClick={() => addToCart(product,setLoaderForCart,setError)}  className="primary-btn" disabled={(!product?.stock || loaderForCart)} >
                              { !loaderForCart && (product.stock ? (cart.find((i) => i?.product._id === product?._id) ? "Go to cart" : "Add to cart") : "Out of cart")}
                             <BtnSpinner show={loaderForCart}/>
                           </button>
                           {" "}
                           <button onClick={() => handleWishlist(product,setLoaderForWishlist,setError)}  className="secondary-btn" disabled={(!product?.stock || loaderForCart)} >
                             { !loaderForWishlist && (wishlist.find((i) => i?._id === product?._id) ? "Remove from wishlist" : "Add to wishlist")}
                             <BtnSpinner show={loaderForWishlist}/>
                           </button>
                         </div>
                     </div>
                 </div>
            </div>
    );
};

export default IndividualProductPage;
