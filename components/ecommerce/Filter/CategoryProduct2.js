import { useRouter } from "next/router";
import { connect } from "react-redux";
import { updateProductCategory } from "../../../redux/action/productFiltersAction";
import { imagePath } from "../../../config/index";
import React, { useEffect, useState } from "react";

const CategoryProduct2 = ({catData, updateProductCategory }) => {

    const [divideCat, setDivideCat] = useState([])

    const router = useRouter();

    useEffect(()=>{
        setDivideCat(splitToNChunks(catData,3))
    },[catData.length])

    const selectCategory = (e, category) => {
        e.preventDefault();
        // removeSearchTerm();
        updateProductCategory(category);
        router.push({
            pathname: "/products",
            query: {
                cat: category, //
            },
        });
    };


    function splitToNChunks(arr, n) {
        var rest = arr.length % n, // how much to divide
        restUsed = rest, // to keep track of the division over the elements
        partLength = Math.floor(arr.length / n),
        result = [];

    for(var i = 0; i < arr.length; i += partLength) {
        var end = partLength + i,
            add = false;

        if(rest !== 0 && restUsed) { // should add one element for the division
            end++;
            restUsed--; // we've used one division element now
            add = true;
        }

        result.push(arr.slice(i, end)); // part of the array

        if(add) {
            i++; // also increment i in the case we added an extra element for division
        }
    }

    return result;
    }

 
    return (
        <>
        {divideCat.map((catItem, i) => (
            <ul>
            {catItem.map((item, i) => (
                <li onClick={(e) => selectCategory(e, item.cat_slug)}>
                    <a>
                        <img
                            src={`${imagePath+item.icon}`}
                            alt=""
                        />
                        {item.cat_name}
                    </a>
                    
                </li>
            ))}    
            </ul>
        ))}    
        </>
    );
};

export default connect(null, { updateProductCategory })(CategoryProduct2);
