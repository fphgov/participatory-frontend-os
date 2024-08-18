'use client'

import { LayerGroup, MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import { DivIcon, LatLngBoundsExpression, LatLngExpression } from 'leaflet'
import { FC} from "react"
import VotePopUp from "@/components/map/VotePopUp"
import styles from '../../styles/components/map/Map.module.scss'
import { IVoteStatus } from '@/models/voteableProject.model'

export interface MapProps {
  projectList: any
  token: any
  ready: boolean
  voteStatus: IVoteStatus
}

const Map: FC<MapProps> = ({ projectList, token, ready, voteStatus }) => {
  return (
    <>
      <MapContainer
        maxBounds={
          [
            [48.6238540716, 22.710531447],
            [45.7594811061, 16.2022982113],
          ] as LatLngBoundsExpression
        }
        center={{lat: 47.484, lng: window.innerWidth < 640 ? 19.130 : 19.123} as LatLngExpression}
        maxZoom={50}
        minZoom={9}
        zoom={window.innerWidth < 640 ? 10 : 11}
        style={{height: '50vh', width: '100%', margin: '0 0 24px 0'}}
        className={styles.map}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url={'https://osm.budapest.dev/tile/{z}/{x}/{y}.png'}
        />
        <LayerGroup>
          {projectList?._embedded?.projects.map((project: any, i: any) => {
            return (
              <Marker
                key={i}
                position={{lat: project.latitude, lng: project.longitude} as LatLngExpression}
                icon={
                  new DivIcon({
                    html: `<svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 36 36" stroke="transparent">
                      <path d="M18 31.9875C17.65 31.9875 17.3 31.925 16.95 31.8C16.6 31.675 16.2875 31.4875 16.0125 31.2375C14.3875 29.7375 12.95 28.275 11.7 26.85C10.45 25.425 9.40625 24.0438 8.56875 22.7063C7.73125 21.3688 7.09375 20.0813 6.65625 18.8438C6.21875 17.6063 6 16.425 6 15.3C6 11.55 7.20625 8.5625 9.61875 6.3375C12.0313 4.1125 14.825 3 18 3C21.175 3 23.9688 4.1125 26.3813 6.3375C28.7938 8.5625 30 11.55 30 15.3C30 16.425 29.7813 17.6063 29.3438 18.8438C28.9062 20.0813 28.2688 21.3688 27.4313 22.7063C26.5938 24.0438 25.55 25.425 24.3 26.85C23.05 28.275 21.6125 29.7375 19.9875 31.2375C19.7125 31.4875 19.4 31.675 19.05 31.8C18.7 31.925 18.35 31.9875 18 31.9875ZM18 18C18.825 18 19.5313 17.7063 20.1188 17.1188C20.7063 16.5313 21 15.825 21 15C21 14.175 20.7063 13.4688 20.1188 12.8813C19.5313 12.2938 18.825 12 18 12C17.175 12 16.4688 12.2938 15.8813 12.8813C15.2938 13.4688 15 14.175 15 15C15 15.825 15.2938 16.5313 15.8813 17.1188C16.4688 17.7063 17.175 18 18 18Z" fill="#12326E"/>
                    </svg>`,
                    iconSize: [36, 36],
                    className: styles.markerIcon,
                  })
                }
              >
                <Popup>
                  <VotePopUp
                    project={project}
                    token={token}
                    ready={ready}
                    voteStatus={voteStatus}
                  />
                </Popup>
              </Marker>
            )
          })}
        </LayerGroup>
      </MapContainer>
    </>
)};

export default Map;
