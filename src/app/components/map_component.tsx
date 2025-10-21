'use client'
import { APIProvider, Map, Marker } from '@vis.gl/react-google-maps'

export default function GoogleMap() {
  //long and lat of Massachusetts 
    const position = {lat: 42.407211, lng: -71.382439}
    return(
        
    <APIProvider apiKey= {process.env.NEXT_PUBLIC_MAP_API_KEY}>
      <div style={{ height: '500px', width: '100%' }}>
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