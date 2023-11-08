import {Component} from 'react'
import './index.css'

const initialState = {
  started: false,
  timeInSeconds: 0,
  timeInMinutes: 25,
}

class DigitalTimer extends Component {
  state = initialState

  componentWillUnmount() {
    this.clearTimeInterval()
  }

  clearTimeInterval = () => {
    clearInterval(this.intervalId)
  }

  decreaseMinutes = () => {
    const {timeInMinutes} = this.state
    if (timeInMinutes > 1) {
      this.setState(prevState => ({timeInMinutes: prevState.timeInMinutes - 1}))
    }
  }

  increaseMinutes = () => {
    this.setState(prevState => ({timeInMinutes: prevState.timeInMinutes + 1}))
  }

  renderTimeLimitController = () => {
    const {timeInMinutes, timeInSeconds} = this.state
    const isButtonDisabled = timeInSeconds > 0
    return (
      <div className="limit-time-card">
        <p>Set Timer Limit</p>
        <div className="limit-timer">
          <button
            type="button"
            onClick={this.decreaseMinutes}
            disabled={isButtonDisabled}
          >
            -
          </button>
          <div>
            <p className="time-minutes">{timeInMinutes}</p>
          </div>
          <button
            type="button"
            onClick={this.increaseMinutes}
            disabled={isButtonDisabled}
          >
            +
          </button>
        </div>
      </div>
    )
  }

  onReset = () => {
    this.clearTimeInterval()
    this.setState(initialState)
  }

  increaseTimeElapsedInSeconds = () => {
    const {timeInSeconds, timeInMinutes} = this.state
    const timerCompleted = timeInSeconds === timeInMinutes * 60

    if (timerCompleted) {
      this.clearTimeInterval()
      this.setState({started: false})
    } else {
      this.setState(prevState => ({
        timeInSeconds: prevState.timeInSeconds + 1,
      }))
    }
  }

  toggleButton = () => {
    const {started, timeInSeconds, timeInMinutes} = this.state
    const timerCompleted = timeInSeconds === timeInMinutes * 60

    if (timerCompleted) {
      this.setState({timeInSeconds: 0})
    }
    if (started) {
      this.clearTimeInterval()
    } else {
      this.intervalId = setInterval(this.increaseTimeElapsedInSeconds, 1000)
    }
    this.setState(prevState => ({started: !prevState.started}))
  }

  renderTimeController = () => {
    const {started} = this.state
    return (
      <div className="buttons-card">
        <button type="button" onClick={this.toggleButton}>
          {started ? (
            <div className="buttons-card">
              <img
                className="start-img"
                src="https://assets.ccbp.in/frontend/react-js/pause-icon-img.png"
                alt="pause icon"
              />
              <h1>Pause</h1>
            </div>
          ) : (
            <div className="buttons-card">
              <img
                className="start-img"
                src="https://assets.ccbp.in/frontend/react-js/play-icon-img.png"
                alt="play icon"
              />
              <h1>Start</h1>
            </div>
          )}
        </button>

        <button type="button" onClick={this.onReset}>
          <img
            className="reset-img"
            src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
            alt="reset icon"
          />
          <h1>Reset</h1>
        </button>
      </div>
    )
  }

  getElapsedSecondsInTimeFormat = () => {
    const {timeInSeconds, timeInMinutes} = this.state
    const totalRemainingSeconds = timeInMinutes * 60 - timeInSeconds
    const minutes = Math.floor(totalRemainingSeconds / 60)
    const seconds = Math.floor(totalRemainingSeconds % 60)
    const stringifiedMinutes = minutes > 9 ? minutes : `0${minutes}`
    const stringifiedSeconds = seconds > 9 ? seconds : `0${seconds}`
    return `${stringifiedMinutes}:${stringifiedSeconds}`
  }

  render() {
    const {started} = this.state
    const label = started ? 'Running' : 'Paused'
    return (
      <div className="background">
        <h1>Digital Timer</h1>
        <div className="digital-container">
          <div className="timer-display-card">
            <div className="elapsed-time-container">
              <h1>{this.getElapsedSecondsInTimeFormat()}</h1>
              <p>{label}</p>
            </div>
          </div>
          <div className="controls-container">
            {this.renderTimeController()}
            {this.renderTimeLimitController()}
          </div>
        </div>
      </div>
    )
  }
}
export default DigitalTimer
