import React, { useState , useEffect } from 'react';
import { Link } from 'react-router-dom';

 
const ProductList=()=>{
    
    const [products,setProducts] = useState([]);
    let id1 = JSON.parse(localStorage.getItem('user'))._id;
    useEffect(()=>{
        getProducts();
    },[])
    const getProducts= async ()=>{
        let result = await fetch("http://localhost:5000/products/"+id1,{
            headers:{
                authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        })
        result = await result.json();
        if(!result)
        {
            <h1>The record is not there</h1>
        }
        setProducts(result);
    }
    const deleteProduct = async (id)=>{
        let result = await fetch("http://localhost:5000/product/"+id,{
            method:"Delete",
            headers:{
                authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        });
        result =  result.json();
        if(result)
        {
            getProducts();
        }
    }
    const collect = async (event) => {
        if(!event.target.value)
        {
            getProducts();
        }
        let key = event.target.value;
        let result = await fetch("http://localhost:5000/search/"+key)
        result = await result.json();
        if(result)
        {
            let list=[];
            for(let i=0;i<result.length;i++)
            {
                if(result[i].userId==id1)
                {
                    list.push(result[i]);
                }
            }
            console.log(list);
            if(!list)
            {
                getProducts();
            }
            setProducts(list);
        }
    }
    {
    return (
        <div  className="hehe">
            <h1 className="ProductList">Product List</h1>
            <input type="text" className = "search" placeholder='Product Name' onChange={collect}></input>
            
            <ul>
                <li>S. No</li>
                <li>Name</li>
                <li>Price</li>
                <li>Category</li>
                <li>Company</li>
                <li className = "hehe1">Operation</li>
            </ul>
            {
                products.length>0?
                products.map((item,index)=>
                    <ul className = "hehe1"key={item._id}>
                        <li>{index+1}</li>
                        <li>{item.name}</li>
                        <li>{item.price}</li>
                        <li>{item.category}</li>
                        <li>{item.company}</li>
                        <li><button className="okok" onClick={()=>{deleteProduct(item._id)}}>Delete</button>
                        <button className = "okok"><Link style={{'color':'lightyellow','textDecoration':'none'}} to ={"/Update/"+item._id}>Update</Link></button></li>
                        
                    </ul>
                ):<h1 className = "Noresult">No result found</h1>
            }
        </div>
    )
    }
    
}

export default ProductList;