import React, { Dispatch, SetStateAction, useState } from 'react'
import Select, { SingleValue } from 'react-select'
interface optionsTypes {
    label: string,
    value: string,
}
const dummySport = [{ label: 'Liverpool', value: 'Liverpool' }, { label: 'Manchester city', value: 'Manchester city' }, { label: 'Manchester United', value: 'Manchester United' }, { label: 'Arsenal', value: 'Arsenal' }, { label: 'Barcelona', value: 'Barcelona' }, { label: 'Real Madrid', value: 'Real Madrid' }]
interface formprps { name: string, email: string, dateOfBirth: string, country: SingleValue<optionsTypes>, favSport: SingleValue<optionsTypes>, FavSportTeam: SingleValue<optionsTypes> }

const FavTeam: React.FC<{ userData: formprps, setUserData: Dispatch<SetStateAction<formprps>> }> = ({ setUserData, userData }) => {

    const [selectedTeam, setSelectedTeam] = useState<SingleValue<optionsTypes> | null>(null)


    const handleChange = (selectedOptions: SingleValue<optionsTypes>) => {
        setSelectedTeam(selectedOptions)
        setUserData({ ...userData, FavSportTeam: selectedOptions })
    }
    return <div className="w-full">
        <Select options={dummySport} placeholder="Favourite Sport Team" value={selectedTeam} onChange={handleChange} styles={{}} />
    </div>
}

export default FavTeam