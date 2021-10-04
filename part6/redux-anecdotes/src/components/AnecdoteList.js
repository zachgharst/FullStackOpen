import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { increment } from '../reducers/anecdoteReducer'
import { updateNotification, resetNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const anecdotes = useSelector(({ anecdotes, filter }) => {
    return anecdotes
      .filter(
        anecdote => anecdote.content.toLowerCase().indexOf(filter.toLowerCase()) > -1
      )
      .sort((a, b) => a.votes < b.votes ? 1 : -1)
  })

  const dispatch = useDispatch()
  const vote = (anecdote) => { 
    dispatch(increment(anecdote.id))
    dispatch(updateNotification(`You voted for the anecdote: ${anecdote.content}`))
    setTimeout(() => {
      dispatch(resetNotification())
    }, 5000)
  }

  return (
    <>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </>
  )
}

export default AnecdoteList