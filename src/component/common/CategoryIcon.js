import React from 'react'
import CategoryGreen from '../../img/category-green.svg'
import CategoryOpen from '../../img/category-open.svg'
import CategoryCare from '../../img/category-care.svg'
import CategoryGreenBlue from '../../img/category-green-blue.svg'
import CategoryOpenBlue from '../../img/category-open-blue.svg'
import CategoryCareBlue from '../../img/category-care-blue.svg'

export default function CategoryIcon({ name, color = "white", size = 18 }) {
  if (color === "blue") {
    if (name === 'Egész Budapest') {
      return <img src={CategoryGreenBlue} width={size} height={size} alt={name} />
    } else if (name === 'Gondoskodó Budapest' || name === 'Esélyteremtő Budapest') {
      return <img src={CategoryCareBlue} width={size} height={size} alt={name} />
    }

    return <img src={CategoryOpenBlue} width={size} height={size} alt={name} />
  }

  if (name === 'Egész Budapest') {
    return <img src={CategoryGreen} width={size} height={size} alt={name} />
  } else if (name === 'Gondoskodó Budapest' || name === 'Esélyteremtő Budapest') {
    return <img src={CategoryCare} width={size} height={size} alt={name} />
  }

  return <img src={CategoryOpen} width={size} height={size} alt={name} />
}
