import React, { useEffect, useRef } from 'react'
import { Child } from './Child'

export default function Parent() {
    const ref = useRef()
    // const ref2 = useRef(false)
    // const a = 1;
    console.log(ref)

    // useEffect(() => {
    //     if (!ref2.current) {
    //         if (a) {
    //             console.log(a)
    //         }
    //         ref2.current=true
    //     }
    // }, [])
    const handleParentClick= ()=>{
        console.log("Parent Clikc")
    }
    const handleChildClick =()=>{
        if(ref.current){
            ref.current.handleClick()
        }
    }
           
    return (
        <div>Parent
        <button onClick={handleChildClick}>Child Clikc</button>
            <Child ref={ref} handleParentClick={handleParentClick}/>
        </div>
    )
}
