'use client'
import { APIProvider, Map, Marker } from '@vis.gl/react-google-maps'
import { useState } from 'react'

//TODO: implement search bar to be able to enter university
//implement places API to go to university when searched
//resaerch on how to show food applications near the search university

export default function GoogleMap() {

    const [searchInput, setSearchInput] = useState('')
    
    //long and lat of Massachusetts 
    const [position, setPosition] = useState( {lat: 42.407211, lng: -71.382439})

    const apiKey = process.env.NEXT_PUBLIC_MAP_API_KEY;
    if (!apiKey) {
      throw new Error('NEXT_PUBLIC_MAP_API_KEY is not defined. Set it in your environment variables.');
    }

    const handleSearch = async () =>{
      //if the trimmed input is empty then stop executing and return early
      //this is mainly to prevent unnecessary requests to the googles API
      if(!searchInput.trim()) return 

      //code to run if we have a valid search input
      try{
        //pause the execution until we resolve or reject the promise
        const response = await fetch(
          `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(searchInput)}&key=${apiKey}`
        )
        const data = await response.json()

        if(data.results && data.results.length > 0){
          //destructure the lng and lat from the JSON we receive and then acess the first elements in the location array
          //this is the closets results to the search query above
          const { lat, lng } = data.results[0].geometry.location

          //set position to latitude and longitutde of then location entered and reset the search position
          setPosition({ lat, lng })
          setSearchInput('')
        } else{

          alert("University not found try Again")
        }

      } catch (error){
          console.error("Error with search ",error)
      }

    }

  //when entered is pressed we call the handle search function
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch()
    }
  }




    return(
    //API for the map + search bar integration

    <APIProvider apiKey={apiKey}>

      <div style={{position: 'relative', height: '500px', width: '100%' }}>
        {/*search bar position absolutely over map  */}
        <div
        style={{
          position: 'absolute',
          top: '10px',
          left: '10px',
          zIndex: 10,
          display: 'flex',
          gap: '8px',
          backgroundColor: 'white',
          padding: '8px',
          borderRadius: '4px',
          boxShadow: '0 2px 8px rgbga(0,0,0,0.15)',
          color: 'black'
        }}
        >

          <input
          type = "text"
          placeholder='Enter your Univerity'
          >
          
          </input>

        </div>
        {/*the default location and zoom of the map */}
        <Map
          defaultCenter={position}
          defaultZoom={12}>

          <Marker position={position} />

        </Map>
      </div>
    </APIProvider>
    )
    
}