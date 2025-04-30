import { Link, useNavigate } from "react-router-dom";
import { CHECKOUT, HOME } from "../utils/const";
import { useCart } from "../context/CartContext";

function Cart () {

    const navigate = useNavigate();

    const {
        CartItems,
        RemoveFromCart,
        IncreaseQuantity,
        DecreaseQuantity,
        TotalPrice
    } = useCart();

    function HandleCheckout () {
        if (CartItems.length === 0) {
            alert("Корзина пуста! Добавтье товары перед оформлением заказа :/")
            return;
        }
        navigate(CHECKOUT);
    }
 
    return (
        <>
            {CartItems.length === 0 ? 
            <>
                <section className="block">
                    <div className="container">
                        <Link to={HOME} class="back-btn">Назад</Link>
                        <h1 class="title">Моя корзина</h1>
                        <p className="alert-danger">Ваша корзина пуста, добавтье товары :/</p>
                    </div>
                </section>
            </> 
            : 
            <>
                <section class="block">
                    <div class="container">
                        <Link to={HOME} class="back-btn">Назад</Link>
                        <h1 class="title">Моя корзина</h1>
                        <table class="cart-table">
                            <thead>
                                <tr>
                                    <th>Наименование продукта</th>
                                    <th>Фото</th>
                                    <th>Цена</th>
                                    <th>Количество</th>
                                    <th>Всего</th>
                                    <th>Действие</th>
                                </tr>
                            </thead>
                            <tbody>
                                {CartItems.map((item => (
                                    <tr>
                                        <td>{item.name}</td>
                                        <td>
                                            <img src={item.image} class="cart-img" alt="" />
                                        </td>
                                        <td>{item.price} &#8376;</td>
                                        <td>
                                            <div class="counter">
                                                <button class="circle" onClick={() => DecreaseQuantity(item.id)} disabled={item.quantity <= 1}>-</button>
                                                <span>{item.quantity}</span>
                                                <button class="circle" onClick={() => IncreaseQuantity(item.id)}>+</button>
                                            </div>
                                        </td>
                                        <td>{item.price * item.quantity} &#8376;</td>
                                        <td><button class="delete-btn" onClick={() => RemoveFromCart(item.id)}>Удалить</button></td>
                                    </tr>                                    
                                )))}
                            </tbody>
                        </table>
                        <h3 class="total-price">Итого: {TotalPrice} &#8376;</h3>
                        <div class="cart-action">
                            <button onClick={HandleCheckout} class="cart-action__btn">Оформление заказа</button>
                            <Link to={HOME} class="cart-action__btn">Продолжить покупку</Link>
                        </div>
                    </div>
                </section>
            </>}
        </>
    );
}

export default Cart;