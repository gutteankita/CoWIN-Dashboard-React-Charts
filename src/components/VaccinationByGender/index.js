import {Component} from 'react'
import {PieChart, Pie, Cell, Legend} from 'recharts'

import './index.css'

const COLORS = ['#f54394', '#5a8dee', '#64c2a6']

class VaccinationByGender extends Component {
  render() {
    const {vaccinationByGender} = this.props
    console.log(vaccinationByGender, 'ggg')

    return (
      <div className="vaccination-gender-container">
        <h1>Vaccination by Gender</h1>
        <PieChart width={400} height={500}>
          <Pie
            data={vaccinationByGender}
            cx="50%"
            cy="50%"
            startAngle={180}
            endAngle={0}
            innerRadius="40%"
            outerRadius="60%"
            paddingAngle={0}
            dataKey="count"
            nameKey="gender"
          >
            {vaccinationByGender.map((entry, index) => (
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

export default VaccinationByGender
