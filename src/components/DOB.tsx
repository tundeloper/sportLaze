import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import Select, { SingleValue } from 'react-select'
interface optionsTypes {
    label: string,
    value: string,
}
interface formprps {name: string, email: string, dateOfBirth: string, country: SingleValue<optionsTypes>, favSport: SingleValue<optionsTypes>, FavSportTeam: SingleValue<optionsTypes>}

const date = new Date()
const monthData = [{label: 'January', value: 'January'}, {label: 'February', value: 'February'}, {label: 'March', value: 'March'}, {label: 'April', value: 'April'}, {label: 'May', value: 'May'}, {label: 'June', value: 'June'}, {label: 'July', value: 'July'}, {label: 'August', value: 'August'}, {label: 'September', value: 'September'}, {label: 'October', value: 'October'}, {label: 'November', value: 'November'}, {label: 'December', value: 'December'}]
const dayData: {label: string, value: number}[] = []
const yearData: {label: string, value: number}[] = []
for (let year = date.getFullYear(); year >= 1980; year--) {
    yearData.push({label: year.toString(), value: year})
}

for (let day = 0.; day <= 30; day++) {
    dayData.push({label: day.toString(), value: day})
}

const DOB: React.FC<{userData: formprps, setUserData: Dispatch<SetStateAction<formprps>>}> = ({setUserData, userData}) => {
    const [selectedMonth, setSelectedMonth] = useState<SingleValue<optionsTypes> | null>(null)
    const [selectedDay, setSelectedDay] = useState<SingleValue<{label: string, value: number}> | null>(null)
    const [selectedYear, setSelectedYear] = useState<SingleValue<{label: string, value: number}> | null>(null)

    useEffect(() => {
        setUserData({...userData, dateOfBirth: `${selectedYear?.value}-${selectedMonth?.value}-${selectedMonth?.value}`})
    }, [selectedDay, selectedMonth, selectedYear, setUserData, userData])

    const monthChange = (selectedOptions: SingleValue<optionsTypes>) => {
        setSelectedMonth(selectedOptions)
    }

    const dayChange = (selectedOptions: SingleValue<{label: string, value: number}>) => {
        setSelectedDay(selectedOptions)
    }

    const yearChange = (selectedOptions: SingleValue<{label: string, value: number}>) => {
        setSelectedYear(selectedOptions)
    }

    return <div className="flex justify-between gap-2 w-full mb-2">
        <div className='flex-1'>
            <Select options={monthData} placeholder="Month" value={selectedMonth} onChange={monthChange} styles={{}}/>
        </div>
        <div className='flex-2'>
            <Select options={dayData} placeholder="Day" value={selectedDay} onChange={dayChange} styles={{}}/>
        </div>
        <div className='flex-1'>
            <Select options={yearData} placeholder="Year" value={selectedYear} onChange={yearChange} styles={{}}/>
        </div>
    </div>
}

export default DOB