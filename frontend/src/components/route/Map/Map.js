import { useEffect, useRef, useState } from 'react';
// import L from 'leaflet';
import * as ReactLeaflet from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

import styles from '@styles/Map.module.css';

import iconRetinaUrl from 'leaflet/dist/images/marker-icon-2x.png';
import iconUrl from 'leaflet/dist/images/marker-icon.png';
import shadowUrl from 'leaflet/dist/images/marker-shadow.png';
import axios from 'axios';


// import RoutingMachine from '../../RoutingMachine';
// import RoutingMachine from '../../../components/RoutingMachine';  

const { MapContainer } = ReactLeaflet;

const Map = ({ children, className, ...rest }) => {
  let mapClassName = styles.map;

  if ( className ) {
    mapClassName = `${mapClassName} ${className}`;
  }

  // Event click on map
  const handleClick = (e) => {
    console.log(e.latlng);
  }

  // No se que hacia ahi
  // useEffect(() => {
  //   (async function init() {
  //     delete L.Icon.Default.prototype._getIconUrl;

  //     L.Icon.Default.mergeOptions({
  //       iconRetinaUrl: iconRetinaUrl.src,
  //       iconUrl: iconUrl.src,
  //       shadowUrl: shadowUrl.src,
  //     });
  //   })();
  // }, []);

  // Consumir API de rutas
  const API = async (point1, point2, otherPoints = false) => {
    
    // Saber cuantos decimales tiene

    const points = [
      [point1.lng, point1.lat]
    ]

    if (otherPoints) {
      otherPoints.forEach(point => {
        points.push([point.route.lng, point.route.lat])
      });
    }

    points.push([point2.lng, point2.lat])

    let datos = {
      "points": points,
      "points_encoded": false,
    }
    console.log(`https://graphhopper.com/api/1/route?point=${point1.lat},${point1.lng}&point=${point2.lat},${point2.lng}&profile=car&points_encoded=false&key=0a02832d-981f-4ed7-8230-705a6b1cf83c`);
    // const respone = await fetch(`https://graphhopper.com/api/1/route?point=${point1.lat},${point2.lng}&point=${point2.lat},${point1.lng}&profile=car&points_encoded=false&key=0a02832d-981f-4ed7-8230-705a6b1cf83c`);
    // const respone = await fetch(`https://graphhopper.com/api/1/route?key=0a02832d-981f-4ed7-8230-705a6b1cf83c`, {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //     'access-control-allow-origin': '*',
    //   },
    //   body: {
    //     "points": [[point1.lng, point1.lat],[point2.lng,point2.lat]],
    //     "points_encoded": false,
    //   },
    // });

    const respone = await axios.post(`https://graphhopper.com/api/1/route?key=0a02832d-981f-4ed7-8230-705a6b1cf83c`, datos);

    // const response = await axios.get(`https://graphhopper.com/api/1/route?point=${point1[0],point1[1]}&point=${point2[0],point2[1]}&profile=car&locale=de&key=0a02832d-981f-4ed7-8230-705a6b1cf83c`)
    // const data = await respone.json();
    console.log(respone);

    let { data } = respone;

    return data;
  }

  useEffect(() => {

    if (rest.locateFinal) {
      API(rest.locateInitial, rest.locateFinal, ((rest.otherRoutes.length > 0 && rest.checkOtherRoutes) ? rest.otherRoutes : false))
        .then((data) => {
          console.log(data.paths[0].points.coordinates);
          let correct = data.paths[0].points.coordinates;
          let newData = [];
          rest.setDistance(data.paths[0].distance);
          let i = 0;
          for(i; i < correct.length; i++) {
            newData.push([correct[i][1], correct[i][0]]);
          }
          rest.setRoutes(newData);
        })
    }
  }, [rest.locateInitial, rest.locateFinal, rest.otherRoutes, rest.checkOtherRoutes]);

  

  let locate = [8.310071, -73.614364];


  function MyComponent() {
    const map = ReactLeaflet.useMapEvents({
      click: (e) => {
        if (rest.locateInitial == null) {
          rest.setLocateInitial(e.latlng);
          locate = e.latlng;
          console.log(locate);
        }else if (rest.locateFinal == null && rest.locateInitial != null) {
          rest.setLocateFinal(e.latlng);
          locate = e.latlng;
          console.log(locate);
        } else if (rest.locateFinal != null && rest.locateInitial != null && rest.checkOtherRoutes == true) {
          rest.setOtherRoutes([
            ...rest.otherRoutes,
            {
              id: rest.otherRoutes.length,
              route: {
                lat: e.latlng.lat,
                lng: e.latlng.lng,
              }
            }
          ]);
        }
          
        
        // map.flyTo(e.latlng, map.getZoom());
        // map.locate()
      },
      locationfound: (location) => {
        locate = [location.latitude, location.longitude];
        // map.flyTo(location.latlng, map.getZoom())
        // console.log('location found:', location)
      },
    })
    locate = map.locate()
    return null
  }

  const [isMapInit, setIsMapInit] = useState(false);
  const [map, setMap] = useState(null);

  const saveMap = (map) => {
    setMap(map);
    setIsMapInit(false);
  };

  

  return (
    <MapContainer center={locate} className={mapClassName} ref={saveMap}  {...rest}>
      {/* Event clic */}
      <MyComponent />
      {children(ReactLeaflet)}
      {/* { children } */}
      {/* { isMapInit && <RoutingMachine map={map} /> } */}
    </MapContainer>
  )
}

export default Map;