import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import Layout from "../components/layout/layout";
import { Link } from "react-router-dom";

export const Monetization = () => {
  return (
    <Layout>
      <div className="bg-gray-50 min-h-screen flex flex-col items-center p-6 text-black">
        <h1 className="text-3xl font-bold text-center text-secondary">
          Monetization
        </h1>
        <p className="text-center text-gray-600 mt-2">
          The first step to monetization is Upgrading to SportLaze Premium.
        </p>
        <button className="mt-4 bg-secondary text-white px-6 py-2 rounded-full text-lg font-semibold hover:bg-indigo-700 transition">
          Become a Premium Creator
        </button>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6 w-full max-w-4xl">
          <div className="border rounded-xl p-4 shadow-sm hover:shadow-md transition">
            <h2 className="font-semibold text-lg">Get paid to post</h2>
            <p className="text-gray-600 mt-1">
              Earn from sharing high quality content. The more you engage users
              on X, the more you earn.
            </p>
            
          </div>
          
          <div className="border rounded-xl p-4 shadow-sm hover:shadow-md transition">
            <h2 className="font-semibold text-lg">Build a fanbase</h2>
            <p className="text-gray-600 mt-1">
              Offer exclusive content to your biggest supporters and earn
              recurring income.
            </p>
            
          </div>

          <div className="border rounded-xl p-4 shadow-sm hover:shadow-md transition">
          <FormControl fullWidth variant="outlined" className="mt-2">
            <InputLabel>Creator revenue sharing eligibility</InputLabel>
            <Select>
              <MenuItem value={10}>Eligible</MenuItem>
              <MenuItem value={20}>Not Eligible</MenuItem>
            </Select>
          </FormControl>
            {/* <p className="text-secondary font-semibold mt-2 cursor-pointer">
              Creator revenue sharing eligibility &rarr;
            </p> */}
          </div>
          <div className="border rounded-xl p-4 shadow-sm hover:shadow-md transition">
            <p className="text-secondary font-semibold mt-2 cursor-pointer">
              Creator revenue sharing eligibility &rarr;
            </p>
          </div>

          <div className="border rounded-xl p-4 shadow-sm hover:shadow-md transition">
            <h2 className="font-semibold text-lg">
              Make better content with Premium tools
            </h2>
            <p className="text-gray-600 mt-1">
              Unlock longer posts, Media Studio, Analytics, and get priority
              support.
            </p>
          </div>
          <div className="border rounded-xl p-4 shadow-sm hover:shadow-md transition">
            <h2 className="font-semibold text-lg">
              More reach = more earnings
            </h2>
            <p className="text-gray-600 mt-1">
              Benefit from a Reply Boost, giving you the extra visibility to
              grow faster.
            </p>
          </div>
        </div>
        <p className="text-center justify-center mt-[2rem]">Learn more about our monetization programs and polices <Link to="#" className="text-secondary font-semibold">here</Link></p>
      </div>
    </Layout>
  );
};
