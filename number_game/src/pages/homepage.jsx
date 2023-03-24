import { useState } from 'react'

import './homepage.css'

function HomePage(){
    const[num , setNum] = useState(0)
    function increaseHandler(){
        if(num<=9)
        {
            setNum(num+1)
        }
    }
    function decreaseHandler(){
        if(num>=-9)
        {
            setNum(num-1)
        }
    }
    return(
        <div className='main-ctn'>
            <h2> {num} </h2>
            <div className='main-btn'>
                <button className='increase' onClick={increaseHandler}>
                    Increase
                </button>
                <button className='decrease' onClick={decreaseHandler}>
                    Decrease
                </button>
            </div>
        </div>
    )
}

export default HomePage