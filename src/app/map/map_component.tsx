'use client'
import { APIProvider, Map, Marker } from '@vis.gl/react-google-maps'

export default function GoogleMap() {
  //long and lat of Massachusetts 
    const position = {lat: 42.407211, lng: -71.382439}

    const apiKey = process.env.NEXT_PUBLIC_MAP_API_KEY;
    if (!apiKey) {
      throw new Error('NEXT_PUBLIC_MAP_API_KEY is not defined. Set it in your environment variables.');
    }

    return(
    //API for the map
    <APIProvider apiKey={apiKey}>
      <div style={{ height: '500px', width: '100%' }}>
        {/*the default location and zoom of the map */}
        <Map
          defaultCenter={position}
          defaultZoom={12}
          >

          <Marker position={position} />

        </Map>
      </div>
    </APIProvider>
    )
    
}