//Css
import './App.css';

//Hooks
import{useCallback, useEffect, useState} from 'react'


//Words
import {wordsList} from './data/words'

//Components
import StartGame from './components/StartGame';
import Game from './components/Game';
import GameOver from './components/GameOver';

const stages = [
  {id:1 , name:'start'},
  {id:2 , name:'game'},
  {id:1 , name:'end'},
]



function App() {
  const [words] = useState(wordsList)

  const [gameStage, setGameStage] = useState(stages[0].name)
  const [pickedWord, setPickedWord] = useState('')
  const [pickedCategory, setPickedCategory] = useState('')
  const [pickedLetter, setPickedLetter] = useState('')

  
  const [guessedLetters, setGuessedLetters] = useState([])
  const [wrongLetters, setWrongLetters] = useState([])
  const [guesses, setGuesses] = useState(5)
  const [score, setScore] = useState(0)
  

  const pickedWordAndCategory = useCallback(() =>{
    const categories = Object.keys(words)
    const category = 
      categories[Math.floor(Math.random() * Object.keys(categories).length )]

    const word = 
      words[category][Math.floor(Math.random() * words[category].length )]

    return {word, category}
  }, [words])
  

  const startGame = useCallback(()=>{
    clearLetterStates()
    const {word, category} = pickedWordAndCategory() 
    let wordLetter = word.split('')
    wordLetter = wordLetter.map(letter=> letter.toLowerCase())

    setPickedCategory(category)
    setPickedLetter(wordLetter)
    setPickedWord(word)

    setGameStage(stages[1].name)
  }, [pickedWordAndCategory])
  
  const verifyLetter = (letter)=>{
    
    const normalizeLetter = letter.toLowerCase()
    
    if(guessedLetters.includes(normalizeLetter) ||wrongLetters.includes(normalizeLetter)){
      
      return
    }

    if(pickedLetter.includes(normalizeLetter)){
      setGuessedLetters((actualGuessedLetter) => [
        ...actualGuessedLetter,
        normalizeLetter
      ])
    }else{
      setWrongLetters((actualWrongLetters) => [
        ...actualWrongLetters,
        normalizeLetter
      ])

      setGuesses(actualGuesses => actualGuesses - 1)
    }
  }
  const clearLetterStates = () =>{
    setGuessedLetters([])
    setWrongLetters([])
    setGuesses(5)
  }

  useEffect(()=>{
    if(guesses <= 0){
      
      clearLetterStates()
      setGameStage(stages[2].name)
    }
  }, [guesses])

  useEffect(() =>{
    const uniqueLetters = [...new Set(pickedLetter)]

    if(guessedLetters.length === uniqueLetters.length){
      setScore((actualScore)=> actualScore += 100)
      startGame()
    }
  }, [guessedLetters, pickedLetter, startGame])

  const retry = ()=>{
    setGameStage(stages[0].name)
    setScore(0)
    setGuesses(3)
  }


  
  return (
    <div className="App">
     {gameStage === 'start' && <StartGame startGame={startGame}/>}
     {gameStage === 'game' && <Game 
      verifyLetter={verifyLetter}
      pickedWord={pickedWord}
      pickedCategory={pickedCategory}
      pickedLetter={pickedLetter}
      guessedLetters={guessedLetters}
      wrongLetters={wrongLetters}
      guesses={guesses}
      score={score}
      />}
     {gameStage === 'end' && <GameOver retry={retry} score={score}/>}
    </div>
  );
}

export default App;
