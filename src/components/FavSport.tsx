import React, { useState } from 'react'
import Select, { SingleValue } from 'react-select'
interface optionsTypes {
    label: string,
    value: string,
}
const dummySport = [{label: 'Soccer (Football)', value: 'Soccer (Football)'}, {label: 'Basketball', value: 'Basketball'}, {label: 'Rugby', value: 'Rugby'}, {label: 'Cricket', value: 'Cricket'}, {label: 'Volleyball', value: 'Volleyball'}]
const FavSport: React.FC = () => {

    const [selectedCountries, setSelectedCountries] = useState<SingleValue<optionsTypes> | null>(null)


    const handleChange = (selectedOptions: SingleValue<optionsTypes>) => {
        setSelectedCountries(selectedOptions)
    }
    return <div className="w-full">
        <Select options={dummySport} placeholder="Favourite Sport" value={selectedCountries} onChange={handleChange}/>
    </div>
}

export default FavSport