import {Component} from 'react'
import {PieChart, Pie, Cell, Legend} from 'recharts'

import './index.css'

const COLORS = ['#2d87bb', '#a3df9f', '#64c2a6']

class VaccinationByAge extends Component {
  render() {
    const {vaccinationByAge} = this.props

    return (
      <div className="vaccination-age-container">
        <h1>Vaccination by Age</h1>
        <PieChart width={400} height={500}>
          <Pie
            data={vaccinationByAge}
            cx="50%"
            cy="50%"
            startAngle={0}
            endAngle={360}
            innerRadius="0%"
            outerRadius="60%"
            paddingAngle={0}
            dataKey="count"
            nameKey="age"
          >
            {vaccinationByAge.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Legend />
        </PieChart>
      </div>
    )
  }
}

export default VaccinationByAge
