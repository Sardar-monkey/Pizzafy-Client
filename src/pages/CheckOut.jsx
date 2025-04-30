import { Link, useNavigate } from "react-router-dom";
import { CART, HOME } from "../utils/const";
import { useCart } from "../context/CartContext";
import { useState } from "react";
import { a } from "../services/axiosinstance";

function Checkout () {

    const {ClearCart, TotalPrice, CartItems} = useCart();
    const navigate = useNavigate();

    const [FormData, SetFormData] = useState({
        name:'',
        phone:'',
        address:'',
        city:'Алматы',
    });

    const [IsDisabled, SetIsDisabled] = useState(false);
    
    function HandleInputChange (event) {
        const {name, value} = event.target;
        SetFormData(function(prevData) {
            return {
                ...prevData,
                [name] : value
            }
        })
    }

    async function HandleSubmit (event) {
        event.preventDefault();
        if (!FormData.name || !FormData.phone || !FormData.address || !FormData.city) {
            alert("Заполните все поля!");
            return;
        }
        if (CartItems.length === 0) {
            alert("Ваша корзина пуста, наполните её для оформления заказа!");
            navigate(HOME);
            return;
        }

        SetIsDisabled(true);

        const OrderTimestamp = new Date().toISOString();
        const OrderData = {
            Customer: FormData,
            Items: CartItems,
            TotalPrice: TotalPrice,
            OrderTimestamp: OrderTimestamp
        };

        try {

            const res = await a.post("/orders", OrderData)
            alert(`Ваш заказ принять! итоговая сумма : ${TotalPrice} тенге, номер заказа ${res.data.id}`);
            ClearCart();
            navigate(HOME);
        } catch (error) {
            console.error("Error : ", error);
            alert("Error : ", error);
        } finally {
            SetIsDisabled(false);
        }

    }

    return (
        <section class="block">
            <div class="container">
                <Link to={CART} class="back-btn">Назад</Link>
                <h1 class="title">Оформление заказа</h1>
                <form class="form" onSubmit={HandleSubmit}>
                    <div class="form-control">
                        <label htmlFor="name" class="label">Ваше имя</label>
                        <input 
                            value={FormData.name}
                            onChange={HandleInputChange}
                            disabled={IsDisabled}
                            type="text" 
                            name="name" 
                            placeholder="Введите имя" 
                            required />
                    </div>
                    <div class="form-control">
                        <label htmlFor="phone" class="label">Номер телефона</label>
                        <input
                            value={FormData.phone}
                            onChange={HandleInputChange}
                            disabled={IsDisabled}
                            pattern="\+7\s?\d{3}\s?\d{3}\s?\d{4}" 
                            type="text" 
                            name="phone" 
                            placeholder="Введите номер телефона: +7 XXX XXX XXXX"
                            required />
                    </div>
                    <div class="form-control">
                        <label htmlFor="address" class="label">Напишите адрес</label>
                        <textarea
                            name="address"
                            value={FormData.address}
                            onChange={HandleInputChange}
                            disabled={IsDisabled} 
                            placeholder="Введите адрес, дом, квартиру, домофон" 
                            required/>
                    </div>
                    <div class="form-control">
                        <label htmlFor="city" class="label">Укажите город</label>
                        <select name="city" id="city" value={FormData.city} onChange={HandleInputChange} disabled={IsDisabled}>
                            <option value="Алматы">Алматы</option>
                            <option value="Астана">Астана</option>
                        </select>
                    </div>
                    <button class="send-btn" disabled={IsDisabled}>
                        {IsDisabled ? 'Оформляем ваш заказ...' : 'Оформить заказ'}
                    </button>
                </form>
            </div>
        </section>
    );
}

export default Checkout;
