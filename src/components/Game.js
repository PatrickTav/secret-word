import { useState, useRef } from "react"
import "./Game.css"

const Game = ({ verifyLetter, score, guesses, wrongLetters, guessedLetters, pickedLetter, pickedCategory, pickedWord }) => {

  const [letter, setLetter] = useState('')
  const letterInputRef = useRef(null)

  const handleSubmit =(e)=>{
    e.preventDefault()
    verifyLetter(letter)    

    setLetter('')
    letterInputRef.current.focus()
  }

  return (
    <div className="game">
      <p className="points">
        <span>Pontuação: {score}</span>
      </p>
      <h1>Advinhe a Palavra</h1>
      <h3 className="tip">Dica sobre a palavra : <span>{pickedCategory}</span></h3>
      <p>Você ainda tem {guesses} tentativas </p>
      <div className="wordContainer">
        {pickedLetter.map((letter, id)=>(
          guessedLetters.includes(letter)? (
            <span className='letter' key={id}>{letter}</span>
          ):(
            <span  key={id} className='blankSquare'></span>
          )
        ))}
      </div>
      <div className="letterContainer">
        <p>Tente advinhar uma letra da palavra</p>
        <form onSubmit={handleSubmit}>
          <input 
            type="text" 
            name="letter" 
            maxLength='1' 
            required 
            onChange={(e) =>setLetter(e.target.value)} 
            value={letter}
            ref={letterInputRef}
            />
          <button>Jogar</button>
        </form>
      </div>
      <div className="wrongLettersContainer">
        <p>Letras erradas</p>
        {wrongLetters.map((letter, id)=>(
          <span key={id}> {letter}</span>
        ))}
      </div>
    </div>
  )
}

export default Game