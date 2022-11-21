import {Component} from 'react'

import './index.css'

class DigitalTimer extends Component {
  state = {
    timerLimitInMinutes: 25,
    timeElapsedInSeconds: 0,
    timerStarts: false,
  }

  componentWillUnmount() {
    this.clearTimerInterval()
  }

  clearTimerInterval = () => clearInterval(this.intervalId)

  onResetTimer = () => {
    this.clearTimerInterval()
    this.setState({
      timerLimitInMinutes: 25,
      timeElapsedInSeconds: 0,
      timerStarts: false,
    })
  }

  onDecrementMinutes = () => {
    const {timerLimitInMinutes, timerStarts} = this.state
    if (timerLimitInMinutes > 1 && timerStarts === false) {
      this.setState(prevState => ({
        timerLimitInMinutes: prevState.timerLimitInMinutes - 1,
      }))
    }
  }

  onIncrementMinutes = () => {
    this.setState(prevState => ({
      timerLimitInMinutes: prevState.timerLimitInMinutes + 1,
    }))
  }

  incrementTimeElapsedInSeconds = () => {
    const {timerLimitInMinutes, timeElapsedInSeconds} = this.state
    const isTimerCompleted = timeElapsedInSeconds === timerLimitInMinutes * 60

    if (isTimerCompleted) {
      this.clearTimerInterval()
      this.setState({timerStarts: false})
    } else {
      this.setState(prevState => ({
        timeElapsedInSeconds: prevState.timeElapsedInSeconds + 1,
      }))
    }
  }

  onStartTimer = () => {
    const {timerStarts, timeElapsedInSeconds, timerLimitInMinutes} = this.state
    const isTimerCompleted = timeElapsedInSeconds === timerLimitInMinutes * 60

    if (isTimerCompleted) {
      this.setState({timeElapsedInSeconds: 0})
    }
    if (timerStarts) {
      this.clearTimerInterval()
    } else {
      this.intervalId = setInterval(this.incrementTimeElapsedInSeconds, 1000)
    }
    this.setState(prevState => ({timerStarts: !prevState.timerStarts}))
  }

  getElapsedSecondsInTimeFormat = () => {
    const {timerLimitInMinutes, timeElapsedInSeconds} = this.state
    const totalRemainingSeconds =
      timerLimitInMinutes * 60 - timeElapsedInSeconds
    const minutes = Math.floor(totalRemainingSeconds / 60)
    const seconds = Math.floor(totalRemainingSeconds % 60)
    const stringifiedMinutes = minutes > 9 ? minutes : `0${minutes}`
    const stringifiedSeconds = seconds > 9 ? seconds : `0${seconds}`

    return `${stringifiedMinutes}:${stringifiedSeconds}`
  }

  render() {
    const {timerLimitInMinutes, timerStarts} = this.state
    const buttonUrls = timerStarts
      ? 'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png'
      : 'https://assets.ccbp.in/frontend/react-js/play-icon-img.png'

    const altTxt = timerStarts ? 'pause icon' : 'play icon'

    return (
      <div className="bg-container">
        <h1>Digital Timer</h1>
        <div className="timer-container">
          <div className="radial-image">
            <div className="sub-container">
              <h1 className="timer-head">
                {this.getElapsedSecondsInTimeFormat()}
              </h1>
              <p className="timer-para">{timerStarts ? 'Running' : 'Paused'}</p>
            </div>
          </div>
          <div className="total-container">
            <div className="buttons-container">
              <div className="elements-container">
                <button
                  type="button"
                  className="btn-el"
                  onClick={this.onStartTimer}
                >
                  <img className="icons" src={buttonUrls} alt={altTxt} />
                  <p className="timer-el-para">
                    {timerStarts ? 'Pause' : 'Start'}
                  </p>
                </button>
              </div>
              <div className="elements-container">
                <button
                  type="button"
                  className="btn-el"
                  onClick={this.onResetTimer}
                >
                  <img
                    className="icons"
                    src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
                    alt="reset icon"
                  />
                  <p className="timer-el-para">Reset</p>
                </button>
              </div>
            </div>
            <p className="timer-limit">Set Timer Limit</p>
            <div className="set-container">
              <button
                className="set-btn"
                type="button"
                onClick={this.onDecrementMinutes}
              >
                -
              </button>
              <p className="set-timer">{timerLimitInMinutes}</p>
              <button
                className="set-btn"
                type="button"
                onClick={this.onIncrementMinutes}
              >
                +
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default DigitalTimer
