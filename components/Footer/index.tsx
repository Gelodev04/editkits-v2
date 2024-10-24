import Button from "@/components/Button";
import Typography from "@/components/Typography";
import {FaChevronUp} from "react-icons/fa";
import {MdLanguage} from "react-icons/md";

export default function Footer() {
  return (
    <div className="p-16">
      <div className="flex space-x-6 justify-center pb-8">
        <Button label="Home" variant="primary"/>
        <Button label="Tools" variant="primary"/>
        <Button label="Pricing" variant="primary"/>
      </div>
      <div className="md:px-96">
        <Typography
          label="Lörem ipsum od ohet dilogi. Bell trabel, samuligt, ohöbel utom diska. Jinesade bel när feras redorade i belogi. FAR paratyp i muvåning, och pesask vyfisat. Viktiga poddradio har un mad och inde. "
          center
        />
      </div>
      <div className="grid grid-cols-3 w-full px-10 py-20">
        <Typography label="© 2024 Edikits. All rights reserved"/>
        <div className="flex space-x-6 justify-center">
          <Button label="Terms of Use" variant="primary"/>
          <Button label="Privacy Policy" variant="primary"/>
          <Button label="Help" variant="primary"/>
        </div>
        <div className="flex justify-center h-3 items-center space-x-2">
          <MdLanguage color="#262628"/>
          <Typography label="English" variant="secondary"/>
          <FaChevronUp color="#262628"/>
        </div>
      </div>
    </div>
  )
}