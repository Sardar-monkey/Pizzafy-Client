import { useEffect, useState } from "react";
import Product_Item from "./Product_Item";
import { a } from "../../services/axiosinstance";

function Products_List () {

    const [products, SetProducts] = useState([]);

    useEffect(() => {
        async function fetchProducts () {
            try {
                const res = await a.get('/products');
                SetProducts(res.data);
            } catch (error) {
                console.error("Error : ", error)
            }
        }

        fetchProducts();
        
    }, []);

    return( 
        <div class="products-list">
            {products.map((product) => (
                <Product_Item key={product.di} product={product} />
            ))}
        </div>
    );
}

export default Products_List;