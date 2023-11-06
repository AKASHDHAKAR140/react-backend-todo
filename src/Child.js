import React, { forwardRef, useImperativeHandle } from 'react'

export const Child = forwardRef(({ handleParentClick }, ref) => {
    console.log(handleParentClick)
    // const { handleParentClick } = props

    useImperativeHandle(ref, () => ({
        handleClick
    })

    )
    const handleClick = () => {
        console.log("Child ")
    }
    // console.log(props)

    // const handleParentClick =()=>{
    //     console.log("Parent Clikc")
    // }
    return (
        <div>Child
            <button onClick={handleParentClick}>Parent</button></div>
    )
})
