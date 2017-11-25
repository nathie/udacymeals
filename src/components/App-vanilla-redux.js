import React, { Component } from 'react'
import { addRecipe } from '../actions'

class App extends Component {
  state = {
    calendar: null
  }
  componentDidMount () {
    const { store } = this.props

    // 1 Subscribe to the store
    store.subscribe(() => {
      // 2 When it changes we update our component state
      // using the current state	
      this.setState(() => ({
        calendar: store.getState()
      }))
    })
  }

  // 3 When the submitFood method runs it dispatch an action
  // that goes to the reduce and update our store
  submitFood = () => {
    this.props.store.dispatch(addRecipe({
      day: 'monday',
      meal: 'breakfast',
      recipe: {
        label: this.input.value
      },
    }))

    this.input.value = ''
  }
  render() {
    return (
      <div>
        <input
          type='text'
          ref={(input) => this.input = input}
          placeholder="Monday's Breakfast"
        />
        <button onClick={this.submitFood}>Submit</button>

        <pre>
          Monday's Breakfast: {this.state.calendar && this.state.calendar.monday.breakfast}
        </pre>
      </div>
    )
  }
}
export default App