import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import {format} from 'date-fns'
import './index.css'
import Create from '../AppointmentItem/index'

const initialAppointmentsList = []

class Appointments extends Component {
  state = {title: '', date: '', appointmentsList: initialAppointmentsList}

  onAddAppointment = event => {
    event.preventDefault()
    const {title, date} = this.state

    const dateObj = date.split('-')
    const month = dateObj[1] - 1
    const formattedDate = format(
      new Date(dateObj[0], month, dateObj[2]),
      'dd MMMM yyyy, EEEE',
    )

    const newAppointment = {
      id: uuidv4(),
      title,
      formattedDate,
      isFavorite: false,
    }

    this.setState(prevState => ({
      appointmentsList: [...prevState.appointmentsList, newAppointment],
      title: '',
      date: '',
    }))
  }

  titleTyping = event => {
    this.setState({title: event.target.value})
  }

  toggledStar = id => {
    this.setState(prevState => ({
      appointmentsList: prevState.appointmentsList.map(each => {
        if (id === each.id) {
          return {...each, isFavorite: !each.isFavorite}
        }
        return each
      }),
    }))
  }

  searchFavorites = () => {
    const {appointmentsList} = this.state
    this.setState({
      appointmentsList: appointmentsList.filter(
        each => each.isFavorite === true,
      ),
    })
  }

  dateClicked = event => {
    this.setState({date: event.target.value})
  }

  render() {
    const {appointmentsList, title, date} = this.state

    return (
      <div className="bg">
        <div className="card">
          <div className="top-container">
            <div className="input-reading-container">
              <h1 className="title">Add Appointment</h1>
              <form
                className="appointment-form-container"
                onSubmit={this.onAddAppointment}
              >
                <label htmlFor="title" className="title-label">
                  Title
                </label>
                <input
                  type="text"
                  value={title}
                  placeholder="Title"
                  className="input"
                  id="title"
                  onChange={this.titleTyping}
                />
                <label htmlFor="date" className="title-label">
                  Date
                </label>
                <input
                  type="date"
                  className="date"
                  id="date"
                  value={date}
                  onChange={this.dateClicked}
                />
                <button
                  className="btn"
                  type="submit"
                  onClick={this.onAddAppointment}
                >
                  Add
                </button>
              </form>
            </div>
            <div className="img-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png "
                alt="appointments"
                className="img"
              />
            </div>
          </div>
          <hr
            style={{
              marginLeft: '50px',
              marginTop: '15px',
              marginRight: '50px',
              marginBottom: '15px',
            }}
          />
          <div className="below-container">
            <div className="star-button-container">
              <h1 className="appointment-title">Appointments</h1>
              <button
                className="stared"
                type="button"
                onClick={this.searchFavorites}
              >
                Starred
              </button>
            </div>

            <ul className="ul">
              {appointmentsList.map(each => (
                <Create
                  details={each}
                  key={each.id}
                  toggledStar={this.toggledStar}
                  onChange={this.onAddAppointment}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default Appointments
