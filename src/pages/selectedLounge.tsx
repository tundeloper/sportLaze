import React from "react"
import { useParams } from "react-router-dom"
const LoungeId = () => {
    const {lounge} = useParams()
    return <div>{lounge}</ div>
}

export default LoungeId