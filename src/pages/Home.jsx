import Products_List from "../components/Products/Products_List";
import slide_2 from "../assets/images/home/2.webp";
import slide_3 from "../assets/images/home/3.webp";
import slide_1 from "../assets/images/home/1.webp";
import slide_4 from "../assets/images/home/4.webp";
import slide_5 from "../assets/images/home/5.webp";

function Home () {
    return(
        <>
        <section class="block">
            <div class="container">
                <h1 class="title">Добро пожаловать в Pizzafy!</h1>
                <div class="stories-list">
                    <img src={slide_1} alt="1" />
                    <img src={slide_2} alt="1" />
                    <img src={slide_3} alt="1" />
                    <img src={slide_4} alt="1" />
                    <img src={slide_5} alt="1" />
                </div>
            </div>
        </section>
        <section class="block">
            <div class="container">
                <h1 class="title">Меню</h1>
                <Products_List />
            </div>
        </section>
        </>
    );  
}

export default Home;