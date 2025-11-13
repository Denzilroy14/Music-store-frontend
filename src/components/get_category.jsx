import React,{useState,useEffect} from'react';
import axios from 'axios';
export default function GetCategory(){
    const [category,setCategory]=useState([]);
    useEffect(()=>{
        axios.get('http://localhost:5000/get_category')
        .then((res)=>{
            setCategory(res.data.data);
        })
        .catch((err)=>{
            console.error(err);
        })
    });
    return(
        <div>
            {category.length===0?(
                <p>No categories</p>
            ):(
                <div>
                    {category.map((item)=>(
                        <li>{item}</li>
                    ))}
                </div>
            )}
        </div>
    )
} 