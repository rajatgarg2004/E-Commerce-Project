import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const UpdateProduct = () => {
    const [name, setName] = React.useState("");
    const [price, setPrice] = React.useState("");
    const [category, setCategory] = React.useState("");
    const [company, setCompany] = React.useState("");
    const params = useParams();
    const navigate = useNavigate();
    useEffect(()=>{
        console.log(params);
        getProductDetails();
    },[])
    const getProductDetails = async()=>{
        let result = await fetch(`http://localhost:5000/product/${params.id}`,{
            headers:{
                authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        });
        result  = await result.json();
        setName(result.name);
        setPrice(result.price);
        setCompany(result.company);
        setCategory(result.category);
    }
    const updateProduct = async () => {
        console.log(name,price,category,company);
        let result = await fetch(`http://localhost:5000/product/${params.id}`,{
            method:"PUT",
            body: JSON.stringify({name,price,category,company}),
            headers:{
                'Content-Type':"application/json",
                authorization :`bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        })
        result = await result.json();
        console.log(result);
        navigate('/List');
    }
    return (
        <div>
            <h1>Update PRODUCT</h1>
            <input className="adding" type="text" placeholder='Update product name' onChange={(e) => { setName(e.target.value) }} value={name} required />

            <input className="adding" type="text" placeholder='Update product price' onChange={(e) => { setPrice(e.target.value) }} value={price} required />

            <input className="adding" type="text" placeholder='Update product category' onChange={(e) => { setCategory(e.target.value) }} value={category} required />

            <input className="adding" type="text" placeholder='Update product company' onChange={(e) => { setCompany(e.target.value) }} value={company} required />


            <button onClick={updateProduct} className="button">Update product</button>

        </div>
    )
}
export default UpdateProduct; 