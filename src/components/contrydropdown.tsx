import { countries } from 'countries-list'
import React, { useState } from 'react'
import Select, { SingleValue } from 'react-select'
interface optionsTypes {
    label: string,
    value: string,
}
const CountriesDropDown: React.FC = () => {
    const options : optionsTypes[] = Object.values(countries).map((c) => {
        return {label: c.name, value: c.name}
    }).sort((a, b) =>a.label.localeCompare(b.label))

    // const customStyles = 

    const [selectedCountries, setSelectedCountries] = useState<SingleValue<optionsTypes> | null>(null)


    const handleChange = (selectedOptions: SingleValue<optionsTypes>) => {
        setSelectedCountries(selectedOptions)
    }
    return <div className="w-full">
        <Select options={options} placeholder="Country" value={selectedCountries} onChange={handleChange} />
    </div>
}

export default CountriesDropDown