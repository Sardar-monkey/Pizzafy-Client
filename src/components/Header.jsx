import { Link } from "react-router-dom";
import Logo from "../assets/images/logo.svg"
import { CART } from "../utils/const";
import { useCart } from "../context/CartContext";

function Header () {

    const {TotalQuantity} = useCart();

    return(
        <header class="header">
            <div class="container header-flex">
                <div class="logo">
                    <img src={Logo} alt="Logo" />
                    <span class="logo-text">Pizzafy.</span>
                </div>
                <Link to={CART} class="cart-button">Корзина : {TotalQuantity}</Link>
            </div>
        </header>
    );
}

export default Header;