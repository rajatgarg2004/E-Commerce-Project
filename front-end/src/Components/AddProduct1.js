import React from 'react';
import { useNavigate } from 'react-router-dom';

const AddProduct = () => {
    const [name, setName] = React.useState("");
    const [price, setPrice] = React.useState("");
    const [category, setCategory] = React.useState("");
    const [company, setCompany] = React.useState("");
    const [error, setError] = React.useState(false);
    const navigate= useNavigate();
    const AddProduct1 = async () => {
        
        console.log(name, price, category, company);
        if (!name || !price || !category || !company) {
            setError(true);
            return false;
        }
        else {
            const userId = JSON.parse(localStorage.getItem('user'))._id;
            console.log(userId);
            let result = await fetch('http://localhost:5000/add-product', {
                method: 'post',
                body: JSON.stringify({ name, price, category, company, userId }),
                headers: {
                    'Content-Type': 'application/json',
                    authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
                },
            })
            result = await result.json();
            console.log(result);
            navigate('/List');
        }
    }
    return (
        <div>
            <h1>ADD PRODUCT</h1>
            <input className="adding" type="text" placeholder='Enter product name' onChange={(e) => { setName(e.target.value) }} value={name} required />
            {error && !name && <span className="Help">Enter Valid Name</span>}
            <input className="adding" type="text" placeholder='Enter product price' onChange={(e) => { setPrice(e.target.value) }} value={price} required />
            {error && !price && <span className="Help">Enter Valid Price</span>}
            <input className="adding" type="text" placeholder='Enter product category' onChange={(e) => { setCategory(e.target.value) }} value={category} required />
            {error && !category && <span className="Help">Enter Valid Category</span>}
            <input className="adding" type="text" placeholder='Enter product company' onChange={(e) => { setCompany(e.target.value) }} value={company} required />
            {error && !company && <span className="Help">Enter Valid Company</span>}

            <button onClick={AddProduct1} className="button">add product</button>

        </div>
    )
}
export default AddProduct; 