import React from 'react'
import HogsPresentational from './HogsPresentational'
import Hogs from '../porkers_data'
// import HogImgs from '../hog-imgs'

class HogsContainer extends React.Component {

  constructor() {
    super()
    this.state = {
      pigData: []
    }
  }

  componentWillMount() {
    function importAll(r) {
      let images = {};
      r.keys().map((item, index) => {images[(item.replace('./', "")).replace('.jpg', "")] = r(item)})
      return images
    }

    const images = importAll(require.context('../hog-imgs', false, /\.(jpe?g)$/))

    let newHogs = Hogs.map((hog) => {
      for (var key in images) {
        if (hog["name"].toLowerCase().split(" ").join("_") === key) {
          hog["image"] = images[key]
          hog["show"] = false
          return hog
        }
      }
    })

    this.setState({
      pigData: newHogs
    })
  }


  render() {
    return (
      <div>
        <HogsPresentational
          pigData={this.state.pigData}/>
      </div>
    )
  }
}

export default HogsContainer;
