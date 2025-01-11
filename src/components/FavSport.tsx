import React, { Dispatch, SetStateAction, useState } from 'react'
import Select, { SingleValue } from 'react-select'
interface optionsTypes {
    label: string,
    value: string,
}

interface formprps { name: string, email: string, dateOfBirth: string, country: SingleValue<optionsTypes>, favSport: SingleValue<optionsTypes>, FavSportTeam: SingleValue<optionsTypes> }

const dummySport = [{ label: 'Soccer (Football)', value: 'Soccer (Football)' }, { label: 'Basketball', value: 'Basketball' }, { label: 'Rugby', value: 'Rugby' }, { label: 'Cricket', value: 'Cricket' }, { label: 'Volleyball', value: 'Volleyball' }]
const FavSport: React.FC<{ userData: formprps, setUserData: Dispatch<SetStateAction<formprps>> }> = ({ setUserData, userData }) => {

    const [setSelectedSport, setSelectedSportsetSelectedSport] = useState<SingleValue<optionsTypes> | null>(null)

    const handleChange = (selectedOptions: SingleValue<optionsTypes>) => {
        setSelectedSportsetSelectedSport(selectedOptions)
        setUserData({ ...userData, favSport: selectedOptions })
    }
    return <div className="w-full">
        <Select options={dummySport} placeholder="Favourite Sport" value={setSelectedSport} onChange={handleChange} />
    </div>
}

export default FavSport