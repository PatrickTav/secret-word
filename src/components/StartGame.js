
import './StartGame.css'

const StartGame = ({startGame}) => {
  return (
    <div className='start'>
      <h1>Advinhe a Palavra</h1>
      <p>Clique no botão e começe a jogar</p>
      <button onClick={startGame}>Começar jogo</button>
    </div>
  )
}

export default StartGame