import { compose, combineReducers, createStore, applyMiddleware } from 'redux'
import { middleWare, apiReducer, railsActions } from 'redux-rails'

const counterReducerStartingState = {
  value: 0
}

const counterReducer = (state = counterReducerStartingState, action) => {
  switch(action.type) {
    case 'increment': {
      return Object.assign({}, state, {
        value: state.value + 1
      })
    }
    case 'decrement': {
      return Object.assign({}, state, {
        value: state.value - 1
      })
    }
    default: {
      return state
    }
  }
}

// const apiConfig = {
//   domain: 'http://localhost:3000/v3/',
//   resources: {
//     Users: {
//       controller: 'addresses', // knows to do addresses/${idAttribute}
//       parse: {
//         collection: resp => resp.users,
//         memeber: resp => resp.user
//       },
//       idAttribute: '_id' // defaults to 'id'
//     },
//     Retailers: {
//       controller: 'retailers',
//       parse: {
//         collection: resp => resp.retailers,
//         memeber: resp => resp.retailers
//       },
//       idAttribute: 'id' // defaults to 'id'
//     },
//     Posts: {
//       controller: 'posts'
//     }
//     PaymentMethods: {
//       controller: 'payment_methods',
//       domain: 'https://api.instacart.com/v2/' // can override domain per resource
//     }
//   },
//   fetchParams: {
//
//   }
// }

const apiConfig = {
  domain: 'http://localhost:3000/',
  resources: {
    Posts: {
      controller: 'posts'
    }
  }
}

// redux store

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const siteApp = window.siteApp = createStore(
    combineReducers({
    counter: counterReducer,
    models: apiReducer(apiConfig)
  }),
  {},
  composeEnhancers(
    applyMiddleware(middleWare(apiConfig))
  )
);
//
// const siteApp = window.siteApp = createStore(
//   combineReducers({
//     counter: counterReducer,
//     models: apiReducer(apiConfig)
//   }),
//   applyMiddleware(middleWare(apiConfig))
// )

window.setTimeout(() => {
  console.log('starting state', siteApp.getState())

  siteApp.dispatch({
    type: 'increment'
  })
  siteApp.dispatch({
    type: 'increment'
  })
  siteApp.dispatch({
    type: 'Posts.SHOW',
    data: {id: 3}
  })

  siteApp.dispatch({
    type: 'Posts.CREATE',
    data: {
      title: 'foo',
      body: 'bar',
      userId: Math.floor(Math.random() * 100)
    }
  })
  // siteApp.dispatch(railsActions.show({
  //   resource: 'retailers',
  //   data: {
  //     id: 234
  //   }
  // }))

  console.log('ending state', siteApp.getState())
}, 1000)
