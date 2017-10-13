import React from 'react'

import Hog from './Hog'

class HogsPresentational extends React.Component {

  constructor(props) {
    super(props)
      this.state = {
        pigData: props.pigData,
        originalData: props.pigData,
        sortType: []
      }
  }

  handleClick = (event) => {
    let name = event.target.dataset.name
    let newPigData = this.state.pigData.map((pig) => {
      if (pig.name === name) {
        pig.show = true
      } else {
        pig.show = false
      }
      return pig
    })
    console.log(newPigData);
    this.setState({
      pigData: newPigData
    })
  }


  handleChange = (event) => {
    if (event.target.value && !this.state.sortType.includes(event.target.value) && event.target.checked) {
      this.setState({
        sortType: [...this.state.sortType, event.target.value]
      }, this.renderBySortType)
    } else if (!event.target.checked) {
      this.setState({
        sortType: this.state.sortType.filter((type) => {
          return type != event.target.value
        })
      }, this.renderBySortType)
    }
  }

  renderBySortType = () => {
    let newState = [...this.state.pigData].map((pig) => {
      let weightKey = Object.keys(pig).find((key) => {
                        return key.includes("weight")
                      })
      pig.weight = pig[weightKey]
      delete pig.weightKey
      return pig
    })

    if (this.state.sortType.includes("greased")) {
      newState = newState.filter((pig) => {
        if (pig.greased === true) {
          return pig
        }
      })
    } else {
      newState = [...this.state.originalData].map((pig) => {
        let weightKey = Object.keys(pig).find((key) => {
                          return key.includes("weight")
                        })
        pig.weight = pig[weightKey]
        delete pig.weightKey
        return pig
      })
    }

    if (this.state.sortType.includes("name")) {
      newState = newState.sort((a, b) => {
        if (a.name > b.name) {
          return 1;
        }
        if (a.name < b.name) {
          return -1;
        }
        return 0;
      })
    }

    if (this.state.sortType.includes("weight")) {
      newState = newState.sort((a, b) => {

        if (a.weight > b.weight) {
          return 1;
        }
        if (a.weight < b.weight) {
          return -1;
        }
        return 0;
      })
    }
    console.log(newState);
    this.setState({
      pigData: newState
    })
  }

  render() {
    return (
      <div>
        <p>Sort by one of these:</p>
        <div className="ui grid" onClick={this.handleChange}>
          <div className="ui four wide column">
            <input type="checkbox" value="name"/>
            <label>Name</label>
          </div>
          <div className="ui four wide column">
            <input type="checkbox" value="weight"/>
            <label>Weight</label>
          </div>
          <div className="ui four wide column">
            <input type="checkbox" value="greased"/>
            <label>Greased</label>
          </div>
        </div>
        <div className="ui grid container">
          {this.state.pigData.map(pig => {
            return <Hog
                      key={pig.name}
                      name={pig.name}
                      image={pig.image}
                      specialty={pig.specialty}
                      handleClick={this.handleClick}
                      show={pig.show}
                      highestMedalAchieved={pig["highest medal achieved"]}
                      weight={pig["weight as a ratio of hog to LG - 24.7 Cu. Ft. French Door Refrigerator with Thru-the-Door Ice and Water"]}
                    />
          })}
        </div>
      </div>
    )
  }
}

export default HogsPresentational;

//
// {'name': "Mudblood",
//  'specialty': "Mediocre magic",
//  'greased': false,
//  'weight as a ratio of hog to LG - 24.7 Cu. Ft. French Door Refrigerator with Thru-the-Door Ice and Water': 2.0,
//  'highest medal achieved': 'bronze'
// },
