// Write your code here
import {Component} from 'react'
import './index.css'
import {BarChart, Bar, XAxis, YAxis, Tooltip, Legend} from 'recharts'

class VaccinationCoverage extends Component {
  dataFormatter = number => {
    if (number >= 1000) {
      return `${(number / 1000).toString()}k`
    }
    return number.toString()
  }

  render() {
    const {last7DaysVaccination} = this.props

    return (
      <div className="vaccination-render-container">
        <h1>Vaccination Coverage</h1>
        <BarChart
          width={1000}
          height={300}
          data={last7DaysVaccination}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <XAxis dataKey="vaccineDate" />
          <YAxis tickFormatter={this.dataFormatter} />
          <Tooltip />
          <Legend />
          <Bar dataKey="dose1" fill="#2d87bb" />
          <Bar dataKey="dose2" fill="#f54394" />
        </BarChart>
      </div>
    )
  }
}

export default VaccinationCoverage
