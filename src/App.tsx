import React, { HtmlHTMLAttributes, useState } from 'react'

export function App() {
  const [game, setGame] = useState({
    id: 1,
    board: [
      [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
      [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
      [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
      [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
      [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
      [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
      [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
      [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
    ],
    state: 'new',
    mines: 10,
  })

  async function handleNewGameButtonClick() {
    const response = fetch('https://minesweeper-api.herokuapp.com/games', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
    })

    if ((await response).ok) {
      const newGameState = (await response).json()

      setGame(await newGameState)
    }
  }

  async function handleCellClick(row: number, col: number) {
    const url = `https://minesweeper-api.herokuapp.com/games/${game.id}/check`

    const body = { row, col }

    const response = fetch(url, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(body),
    })

    if ((await response).ok) {
      const newGameState = (await response).json()

      setGame(await newGameState)
    }
  }

  async function handleCellRightClick(row: number, col: number) {
    const url = `https://minesweeper-api.herokuapp.com/games/${game.id}/flag`

    const body = { row, col }

    const response = fetch(url, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(body),
    })

    if ((await response).ok) {
      const newGameState = (await response).json()

      setGame(await newGameState)
    }
  }
  return (
    <div>
      <main>
        {game.board.map((boardRow, rowIndex) => {
          return (
            <ul key={rowIndex}>
              {boardRow.map((boardColumn, columnIndex) => {
                return (
                  <li
                    key={columnIndex}
                    onClick={() => handleCellClick(rowIndex, columnIndex)}
                    onContextMenu={(event) => {
                      console.log('test')
                      event.preventDefault()
                      event.stopPropagation()
                      handleCellRightClick(rowIndex, columnIndex)
                    }}
                  >
                    {boardColumn}
                  </li>
                )
              })}
            </ul>
          )
        })}
      </main>
      <button onClick={handleNewGameButtonClick}>New Game</button>
    </div>
  )
}
