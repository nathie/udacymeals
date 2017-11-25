import React, { Component } from 'react'
import { connect } from 'react-redux'
import { addRecipe, removeFromCalendar } from '../actions'

//Redux Store
class App extends Component {  
  render() {
  	console.log('Props', this.props)
    return (
      <div>
        Hola mundo
      </div>
    )
  }
}

/*
Map our Redux state to our Component props
where calendar (state)
return will be passed to our component as long as we pass 
mapStateToProps as 1st argument to connect.
*/
function mapStateToProps(calendar) {
  const dayOrder = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday']

  return {
    calendar: dayOrder.map((day) => ({
      day,
      meals: Object.keys(calendar[day]).reduce((meals, meal) => {
        meals[meal] = calendar[day][meal]
          ? calendar[day][meal]
          : null

        return meals
      }, {})
    })),
  }
}

function mapDispatchToProps(dispatch) {
	return {
		selectRecipe: (data) => dispatch(addRecipe(data)),
		remove: (data) => dispatch(removeFromCalendar(data))
	}
}

/*
Connect Recap
connect() connects a React component to the Redux store. 
mapStateToProps() allows us to specify which state from the store you want passed to your React component. 
mapDispatchToProps() allows us to bind dispatch to your action creators before they ever hit your component.
*/

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(App)