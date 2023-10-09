import { useEffect, useState,memo } from "react";


const Card = ({
    // name = "",
    // height = 100,
    card={}
}) => {

    // const [count,setCount]  = useState(0);
    useEffect(()=>{
        console.log("case 1");
    },[])

    useEffect(()=>{
        console.log("case 3");
    },[JSON.stringify(card)])

    useEffect(()=>{
        console.log("case 2");
    })

    // const handleSetCount = ()=> {
    //     setCount(prev => prev+1);
    // }

    return (<>
       <div>
         <h1>{card?.name}</h1>
         <p>{card?.count}</p>
       </div>
    </>)
}
export default Card;
