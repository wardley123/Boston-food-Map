"use client"

import {
  APIProvider,
  Map,
  Marker,
  useMapsLibrary
} from '@vis.gl/react-google-maps'

import { useState } from 'react'
import type { KeyboardEvent } from 'react'


// This component is now INSIDE APIProvider
function MapContent() {

    const [searchInput, setSearchInput] = useState('')

    // Long and lat of Boston
    const [position, setPosition] = useState({
        lat: 42.361145,
        lng: -71.057083
    })

    // Places library can now be accessed because
    // MapContent is underneath APIProvider
    const places = useMapsLibrary('places')


    // Handles university search
    const handleSearch = async () => {

        // If the trimmed input is empty, stop executing
        if (!searchInput.trim()) return

        // Wait until Places library has loaded
        if (!places) {
            console.log("Places library is not loaded yet")
            return
        }

        try {

            const request = {
                textQuery: searchInput,

                fields: [
                    "displayName",
                    "location",
                    "formattedAddress"
                ],

                includedType: "university",

                maxResultCount: 1
            }

            // Search Google Places
            const { places: results } =
                await places.Place.searchByText(request)


            // Check if Google found anything
            if (results.length === 0) {
                console.log("University not found")
                return
            }


            // Get the first university result
            const university = results[0]

            console.log("University found:", university.displayName)
            console.log("Address:", university.formattedAddress)
            console.log("Location:", university.location)


            // Get university coordinates
            if (university.location) {

                setPosition({
                    lat: university.location.lat(),
                    lng: university.location.lng()
                })
            }

        } catch (error) {

            console.error("Error with university search:", error)

        }
    }


    // Function will eventually show restaurants
    // near the searched university
    const showRestaurants = async () => {

        // We'll implement this next

    }


    // When Enter is pressed, call handleSearch
    const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {

        if (e.key === 'Enter') {
            handleSearch()
        }

    }


    return (

        <div
            style={{
                position: 'relative',
                height: '500px',
                width: '100%'
            }}
        >

            {/* Search bar positioned over map */}

            <div
                style={{
                    position: 'absolute',
                    top: '10px',
                    left: '10px',
                    zIndex: 10,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '8px',
                    backgroundColor: 'white',
                    padding: '8px',
                    borderRadius: '4px',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                    color: 'black'
                }}
            >

                {/* Search bar */}

                <div>

                    <input
                        type="text"
                        placeholder="Enter your University"
                        style={{
                            width: "500px"
                        }}
                        value={searchInput}
                        onChange={(e) =>
                            setSearchInput(e.target.value)
                        }
                        onKeyDown={handleKeyPress}
                    />

                </div>


                {/* Button to view saved locations */}

                <button
                    style={{
                        padding: '8px 16px',
                        backgroundColor: '#4285F4',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        fontSize: '14px',
                        fontWeight: '500',
                    }}
                >
                    View saved restaurants
                </button>


                {/* Button to find restaurants */}

                <button
                    onClick={showRestaurants}
                    style={{
                        padding: '8px 16px',
                        backgroundColor: '#34A853',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        fontSize: '14px',
                        fontWeight: '500',
                    }}
                >
                    Show Restaurants
                </button>

            </div>


            {/* Google Map */}

            <Map
                center={position}
                defaultZoom={12}
            >

                <Marker position={position} />

            </Map>

        </div>
    )
}


// Main component
export default function GoogleMap() {

    const apiKey = process.env.NEXT_PUBLIC_MAP_API_KEY


    // Make sure API key exists
    if (!apiKey) {

        throw new Error(
            'NEXT_PUBLIC_MAP_API_KEY is not defined. Set it in your environment variables.'
        )

    }


    console.log("API key in use:", apiKey)


    return (

        <APIProvider apiKey={apiKey}>

            <MapContent />

        </APIProvider>

    )
}