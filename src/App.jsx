import { useEffect, useState } from "react"
import Prayer from "./component/Prayer"


function App() {

  const[prayerTimes,setPrayerTimes]=useState({})
   const[dateTime,setDateTime]=useState("")
    const[cityTime,setCityTime]=useState("Baghdad")


const cities = [
  { name: "بغداد", value: "Baghdad" },
  { name: "البصرة", value: "Basra" },
  { name: "أربيل", value: "Erbil" },
  { name: "السليمانية", value: "Sulaymaniyah" },
  { name: "النجف", value: "Najaf" },
  { name: "كربلاء", value: "Karbala" },
  { name: "نينوى", value: "Mosul" }, 
  { name: "واسط", value: "Kut" },
  { name: "بابل", value: "Hillah" },
  { name: "ميسان", value: "Amarah" },
  { name: "دهوك", value: "Duhok" },
  { name: "كركوك", value: "Kirkuk" }
];

useEffect(()=>{  

const fetchprayer=async()=>{
  try{

    const response=await fetch(`https://api.aladhan.com/v1/timingsByCity?city=${cityTime}&country=Iraq&date=${dateTime}
`)

    const data_pp=await response.json()
    setPrayerTimes(data_pp.data.timings)
    setDateTime(data_pp.data.date.gregorian.date)

    console.log(data_pp.data.date.gregorian.date)

  }catch(console)
{  console.error(console)}
}


fetchprayer()
},[cityTime])

const formatTime=(time)=>{
  if(!time)
  {  return"00:00";}
  let [hours,minutes]=time.split(":").map(Number)
  const perd=hours>=12?"PM":"AM";
  hours=hours % 12||12;
  return`${hours}:${minutes<10?"0"+minutes :minutes} ${perd}`
}

  return (
    <section>
      <div className="container">
        <div className="top">
          <div className="city">
            <h3> المدينه</h3>
            <select name="" id="" onChange={(e)=>setCityTime(e.target.value)}>
              {cities.map((city)=>(
                <option key={city.value} value={city.value}>{city.name}</option>
              )
              )}
            </select>
          </div>
          <div className="date">
            <h3>التاريخ</h3>
            <h4>{dateTime}</h4>
          </div>
        </div>

  <Prayer name="الفجر" time={formatTime(prayerTimes.Fajr)}/>
   <Prayer name="الظهر" time={formatTime(prayerTimes.Dhuhr)}/>
    <Prayer name="العصر" time={formatTime(prayerTimes.Asr)}/>
     <Prayer name="المغرب" time={formatTime(prayerTimes.Maghrib)}/>
      <Prayer name="العشاء" time={formatTime(prayerTimes.Isha)}/>
      </div>
    </section>
  )
}

export default App
