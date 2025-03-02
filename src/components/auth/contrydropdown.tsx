import { countries } from 'countries-list'
import React, { Dispatch, SetStateAction, useState } from 'react'
import Select, { SingleValue } from 'react-select'
interface optionsTypes {
    label: string,
    value: string,
}
interface formprps { name: string, email: string, dateOfBirth: string, country: SingleValue<optionsTypes>, favSport: SingleValue<optionsTypes>, FavSportTeam: SingleValue<optionsTypes> }

const CountriesDropDown: React.FC<{ userData: formprps, setUserData: Dispatch<SetStateAction<formprps>> }> = ({ setUserData, userData }) => {
    const options: optionsTypes[] = Object.values(countries).map((c) => {
        return { label: c.name, value: c.name }
    }).sort((a, b) => a.label.localeCompare(b.label))


    const [selectedCountries, setSelectedCountries] = useState<SingleValue<optionsTypes> | null>(null)


    const handleChange = (selectedOptions: SingleValue<optionsTypes>) => {
        setSelectedCountries(selectedOptions)
        console.log(selectedCountries)
        setUserData({ ...userData, country: selectedOptions })
    }
    return <div className="w-full">
        <Select options={options} placeholder="Country" value={selectedCountries} onChange={handleChange} />
    </div>
}

export default CountriesDropDown