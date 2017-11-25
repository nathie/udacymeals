import React, { Component } from 'react'
import { connect } from 'react-redux'
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

export default connect(mapStateToProps)(App)