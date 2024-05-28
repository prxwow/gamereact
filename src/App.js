import React, { useEffect, useState } from "react";
import pathIconCar from './img/icon-car.png'
import pathIconCake from './img/icon-cake.png'
import pathIconTeapot from './img/icon-teapot.png'
import pathIconDog from './img/icon-dog.png'
import pathIconCat from './img/icon-cat.png'
import pathIconLamp from './img/icon-lamp.png'


import pathIconQuestion from './img/icon-question.png'
import "./App.css"


const initialArrayCards = [
  {id:1,  img:pathIconCar },
  {id:2,  img:pathIconCake },
  {id:3,  img:pathIconTeapot },
  {id:4,  img:pathIconDog },
  {id:5,  img:pathIconCat },
  {id:6,  img:pathIconLamp },
]


const  App = () => {


  const [arrayCards, setArrayCards] = useState([])
  const [openedCards, setOpenedCards] = useState([])
  const [matched, setMatched] = useState([])
  const [moves, setMoves] = useState(0)


  const pairOfArrayCards = [...initialArrayCards, ...initialArrayCards]


  const shuffle = (array) => {
    let currentIndex = array.length, 
    temporaryValue,
    randomIndex
  

  
  while(currentIndex !== 8) {
    randomIndex = Math.floor(Math.random() * currentIndex)
    currentIndex -= 1

    temporaryValue = array[currentIndex]
    array[currentIndex] = array[randomIndex]
    array[randomIndex] = temporaryValue
  }
return array;

  }

  useEffect(()=>{
setArrayCards(shuffle(pairOfArrayCards))
  }, [])

  const flipCard = (index) => () => {
   setOpenedCards(opened => [...opened, index])
   setMoves(prevMove => prevMove +1)
  }

  useEffect(() => {
      if (openedCards < 2) return
      const firstMatched = arrayCards[openedCards[0]];
      const secondMatched = arrayCards[openedCards[1]]

      if (secondMatched && firstMatched.id === secondMatched.id) {
        setMatched([...matched, firstMatched.id])
      }
      if (openedCards.length === 2) setTimeout(() => setOpenedCards([]), 1000)

  }, [openedCards])


  const handleGameRestart = () => {
    setOpenedCards([]);
    setMatched([]);
    setMoves(0)
    setArrayCards(shuffle(pairOfArrayCards))

  }

  return (
    <div className="container">
      <p className="number-of-strokes"> Сделано ходов: {moves}</p>
      <div className="cards">
        {arrayCards.map((item, index) => {
          let isFlipped = false;

          if(openedCards.includes(index)) isFlipped = true
          if(matched.includes(item.id)) isFlipped = true

          return (
            <div key={index} className={`card ${isFlipped ? 'flipped' : ''}`} onClick={flipCard(index)}>
              <div className='inner'>
              <div className="front"> 
                <img src={item.img} width="60%" alt="front-card"/>
              </div>
              <div className="back">
                <img src={pathIconQuestion} width="50%" alt="question"/>
                </div>
              </div>
              </div>
          )
        })}
      </div>
      <button className="button-restart" onClick={handleGameRestart}>Начать заново</button>
    </div>
  );
}

export default App;
