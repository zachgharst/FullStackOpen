import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { increment } from '../reducers/anecdoteReducer'

const AnecdoteList = () => {
  const anecdotes = useSelector(state => state)
    .sort((a, b) => a.votes < b.votes ? 1 : -1)
  const dispatch = useDispatch()
  const vote = (id) => dispatch(increment(id))

  return (
    <>
      <h2>Anecdotes</h2>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
    </>
  )
}

export default AnecdoteList