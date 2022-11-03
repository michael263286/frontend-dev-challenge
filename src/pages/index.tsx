import React, { useEffect,useState } from 'react'
import axios from 'axios';
import classNames from '../styles/Home.module.css';
import Image from 'next/image'
import Search from '../assets/search.svg'
import Logo from '../assets/logo.svg'





export default function Home() {
// Created State to filter school data
    const [search,setSearch] = useState("");
    const [schools, setSchool] = useState([])
    const [filteredData, setFilteredData] = useState([])

// Fetches API data and renders data in alphabetical order
    useEffect(()=>{
      axios.get('https://api.sendbeacon.com/team/schools')
      .then((res)=>{
        console.log(res.data)
        setSchool(res.data.schools.sort((a,b)=> a.name[0].localeCompare(b.name[0])))
      })
    },[])

// Filters and sorts data by school name
useEffect(()=>{
  setFilteredData(
    schools.filter((school)=> school.name.toLowerCase().includes(search.toLowerCase()))
  )
}, [search,schools])

// Create HTML template displaying search Bar and list of schools 
return (
  <div className={classNames.App}>
    {/* Created container for logo and logo name?\ */}
    <div className={classNames.logoContainer}>
      <Image className={classNames.beaconLogo} src={Logo} alt="search" width={100} height={100}/>
      <p className={classNames.logoName}>Beacon</p>
    </div>
    <h1 className={classNames.schoolHeader}>Pick Your School</h1>
    {/* Created container for search bar */}
    <div className={classNames.searchBarContainer}>
      <Image className={classNames.searchImage} src={Search} alt="search" width={100} height={100}/>
      <input className={classNames.searchBar} type="text" placeholder="Search for your school...." onChange={(e)=> {setSearch(e.target.value)}}/>
    </div>
    {filteredData.map((val)=>{
  return <div key={val.id}>
      {/* Created container for card */}
          <div className={classNames.cardContainer}>
            <div className={classNames.avatarContainer}>
              <p className={classNames.schoolAvatar}>{val.name[0]}</p>
            </div>
        {/* Created container for school name and county */}
            <div className={classNames.textBodyContainer}>
              <p className={classNames.schoolName}>{val.name.slice(0,39)}</p>
              <p className={classNames.schoolCounty}>{val.county.split(" ")[0]}</p>
            </div>
          </div>
        </div>
    })}
  </div>
)
}
