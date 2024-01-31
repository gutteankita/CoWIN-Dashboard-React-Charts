// Write your code here
import {Component} from 'react'
import Loader from 'react-loader-spinner'
import VaccinationCoverage from '../VaccinationCoverage'
import VaccinationByGender from '../VaccinationByGender'
import VaccinationByAge from '../VaccinationByAge'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class CowinDashboard extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    last7DaysVaccination: [],
    vaccinationByAge: [],
    vaccinationByGender: [],
  }

  componentDidMount() {
    this.getCovidVaccinationData()
  }

  getFormattedData = data => ({
    vaccineDate: data.vaccine_date,
    dose1: data.dose_1,
    dose2: data.dose_2,
    age: data.age,
    gender: data.gender,
    count: data.count,
  })

  getCovidVaccinationData = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    const url = 'https://apis.ccbp.in/covid-vaccination-data'
    const response = await fetch(url)
    if (response.ok) {
      const data = await response.json()
      const {
        last_7_days_vaccination,
        vaccination_by_age,
        vaccination_by_gender,
      } = data
      const updateLast7DaysVaccination = last_7_days_vaccination.map(each =>
        this.getFormattedData(each),
      )
      const updateVaccinationByAge = vaccination_by_age.map(each =>
        this.getFormattedData(each),
      )
      const updateVaccinationByGender = vaccination_by_gender.map(each =>
        this.getFormattedData(each),
      )

      this.setState({
        last7DaysVaccination: updateLast7DaysVaccination,
        vaccinationByAge: updateVaccinationByAge,
        vaccinationByGender: updateVaccinationByGender,
        apiStatus: apiStatusConstants.success,
      })
    }

    if (response.status === 404) {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  renderLoadingView = () => (
    <div data-testid="loader" className="loader-view">
      <Loader type="ThreeDots" color="#ffffff" height={80} width={80} />
    </div>
  )

  renderFailureView = () => (
    <div className="failure-view-container">
      <img
        alt="failure view"
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        className="failure-view-image"
      />
      <h1>Something went wrong</h1>
    </div>
  )

  renderVaccinationDetailsView = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return (
          <>
            {this.renderVaccinationCoverage()}
            {this.renderVaccinationByGender()}
            {this.renderVaccinationByAge()}
          </>
        )
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  renderVaccinationCoverage = () => (
    <>
      <VaccinationCoverage
        last7DaysVaccination={this.state.last7DaysVaccination}
      />
    </>
  )

  renderVaccinationByGender = () => (
    <>
      <VaccinationByGender
        vaccinationByGender={this.state.vaccinationByGender}
      />
    </>
  )

  renderVaccinationByAge = () => (
    <>
      <VaccinationByAge vaccinationByAge={this.state.vaccinationByAge} />
    </>
  )
  render() {
    return (
      <div className="cowin-dashboard-container">
        <div className="inner-container">
          <div className="logo-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/cowin-logo.png"
              alt="website logo"
              className="website-logo"
            />
            <h1 className="logo">Co-WIN</h1>
          </div>
          <h1 className="heading">CoWIN Vaccination in India</h1>
          <div className="product-item-details-container">
            {this.renderVaccinationDetailsView()}
          </div>
        </div>
      </div>
    )
  }
}

export default CowinDashboard
