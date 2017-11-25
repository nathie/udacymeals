import React, { Component } from 'react'
import { connect } from 'react-redux'
import { addRecipe, removeFromCalendar } from '../actions'

//Closing project
import { capitalize } from '../utils/helpers'
import CalendarIcon from 'react-icons/lib/fa/calendar-plus-o'

//Redux Store
class App extends Component {  
  render() {
  	const { calendar, remove } = this.props
  	const mealOrder = ['breakfast', 'lunch', 'dinner']

    return (
      <div className='container'>

        <ul className='meal-types'>
          {mealOrder.map((mealType) => (
            <li key={mealType} className='subheader'>
              {capitalize(mealType)}
            </li>
          ))}
        </ul>

        <div className='calendar'>
          <div className='days'>
            {calendar.map(({ day }) => <h3 key={day} className='subheader'>{capitalize(day)}</h3>)}
          </div>
          <div className='icon-grid'>
            {calendar.map(({ day, meals }) => (
              <ul key={day}>
                {mealOrder.map((meal) => (
                  <li key={meal} className='meal'>
                    {meals[meal]
                      ? <div className='food-item'>
                          <img src={meals[meal].image} alt={meals[meal].label}/>
                          <button onClick={() => remove({meal, day})}>Clear</button>
                        </div>
                      : <button className='icon-btn'>
                          <CalendarIcon size={30}/>
                        </button>}
                  </li>
                ))}
              </ul>
            ))}
          </div>
        </div>

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
function mapStateToProps({ calendar, food }) {
  const dayOrder = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday']

  return {
    calendar: dayOrder.map((day) => ({
      day,
      meals: Object.keys(calendar[day]).reduce((meals, meal) => {
        meals[meal] = calendar[day][meal]
          ? food[calendar[day][meal]]
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