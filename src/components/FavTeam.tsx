import React, { useState } from 'react'
import Select, { SingleValue } from 'react-select'
interface optionsTypes {
    label: string,
    value: string,
}
const dummySport = [{label: 'Liverpool', value: 'Liverpool'}, {label: 'Manchester city', value: 'Manchester city'}, {label: 'Manchester United', value: 'Manchester United'}, {label: 'Arsenal', value: 'Arsenal'}, {label: 'Barcelona', value: 'Barcelona'}, {label: 'Real Madrid', value: 'Real Madrid'}]

const FavTeam: React.FC = () => {

    const [selectedCountries, setSelectedCountries] = useState<SingleValue<optionsTypes> | null>(null)


    const handleChange = (selectedOptions: SingleValue<optionsTypes>) => {
        setSelectedCountries(selectedOptions)
    }
    return <div className="w-full">
        <Select options={dummySport} placeholder="Favourite Sport Team" value={selectedCountries} onChange={handleChange} styles={{}}/>
    </div>
}

export default FavTeam