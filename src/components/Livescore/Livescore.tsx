import React, { useEffect, useState } from "react";
import { CalendarDays, ChevronRight } from "lucide-react";
import Score from "./Score";
import axios from "axios";
import baseUrl from "../../utils/baseUrl";
import CountryList from "./CountryList";
import LeagueList from "./LeagueList";

export type countrytype = {
  name: string;
  code: string;
  flag: string;
};

export type leagueType = {
  id: number;
  name: string;
  country: string;
  logo: string;
};

const Livescore: React.FC = () => {
  const [counntryList, setCountryList] = useState<countrytype[]>([]);
  const [leagueList, setLeagueList] = useState<leagueType[]>([]);
//   const [leagueList, setLeagueList] = useState<leagueType[]>([]);
  const url = baseUrl();
  useEffect(() => {
    (async () => {
      try {
        const country = await axios.get(`${url}/livescores/countries`);
        const league = await axios.get(`${url}/livescores/leagues`);

        setCountryList(country.data.countries);
        setLeagueList(league.data.leagues);
        
        // setLeagueList(league.data.leagues);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);
  return (
    <div className="flex gap-4 justify-between items-start px-16 py-8 bg-slate-200">
      <div className="w-[22%]">
        <CountryList data={counntryList} type="Country" showSearch={true} />
      </div>
      <div className="w-[56%]">
        <div className="flex justify-between items-center p-4 bg-white rounded-lg">
          <div className="flex gap-2 items-center">
            <p className="text-[16px] text-black font-bold">Today</p>
            <ChevronRight color="black" />
          </div>
          <div className="flex gap-3 items-center">
            <p className="text-[16px] text-black">Dec 20th, 2024</p>
            <CalendarDays color="black" />
          </div>
        </div>
        <Score />
        <Score />
      </div>
      <div className="w-[22%] flex flex-col gap-3">
        <LeagueList data={leagueList} type="League" />
        {/* <CountryList data={counntryList} type="Clubs" /> */}
      </div>
    </div>
  );
};

export default Livescore;
