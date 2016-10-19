import Todo from '../models/todo';
import User from '../models/user';
import Card from '../models/card';
import Set from '../models/set';
import DataLoader from 'dataloader';
import {canSee} from '../helpers'
import todoLoader from './todo';
import userLoader from './user';
import {join} from 'bluebird';

const getTodos = ({query, viewer}) => Todo.findAsync({title: query})
.then(todos => {
  return todos.map(todo => {
    return canSee(todo, viewer) ? todo : null;
  })
})

const getCards = ({query, viewer}) => Card.findAsync({name: query})
.then(cards => {
  return cards.map(card => {
    return canSee(card, viewer) ? card : null;
  })
})

const getSets = ({query, viewer}) => Set.findAsync({name: query})
.then(sets => {
  return sets.map(set => {
    return canSee(set, viewer) ? set : null;
  })
})

const getUsers = ({query}) => User.findAsync({name: query})

const getResults = ({query, viewer}) => {

  if(query.length > 1) {
    // NOTE: query with 0-2 characters between each letter
    query = new RegExp(query.split("").join('+.{0,2}'), "i")

    return join(
      getTodos({query, viewer}),
      getUsers({query}),
      getCards({query}),
      getSets({query})
    )
    .then(res => res.reduce((a, b) => a.concat(b)))
  } else {
    return null
  }
}

export default getResults;
