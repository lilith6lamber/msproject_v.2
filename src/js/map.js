'use strict';

import * as L from 'leaflet';
import 'leaflet.tilelayer.colorfilter';
import screenfull from 'screenfull';
import 'leaflet.fullscreen/Control.Fullscreen';
import 'leaflet.locatecontrol';
import 'leaflet.markercluster';

window.screenfull = screenfull;

async function drawMap() {
    let map = L.map('map', {
        scrollWheelZoom: false,
        fullscreenControl: true,
        fullscreenControlOptions: {
            position: 'topleft'
        }
    }).setView([57.729535, -106.420245], 2);

    let myFilter = [
        'grayscale:90%',
        'contrast:70%',
        'brightness:110%'
    ];

    L.tileLayer = L.tileLayer.colorFilter('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '',
        filter: myFilter
    }).addTo(map);

    map.dispMap = function () {
        map.plotMap();
        map.map.invalidateSize();
    };

    L.control.locate({
        strings: {
            title: "Your location"
        },
        icon: "icon-map-marker"
    }).addTo(map);

    let markers = L.markerClusterGroup({
        removeOutsideVisibleBounds: true,
        disableClusteringAtZoom: 16
    });


    let response = await fetch('data/data.json');
    if (response.ok) {
        let json = await response.json();
        for (let i = 0; i < json.stores.length; i++) {
            let popupData =
                `<div class="popup_general">
                            <p class="popup_general-city">${json.stores[i].city}</p>
                            <p class="popup_general-address">${json.stores[i].address}</p>
                            <p class="popup_general-location">${json.stores[i].location}</p>
                        </div>
                        <div class="popup_additional">
                            <p class="popup_additional-hours">${json.stores[i].ophours}</p>
                    `;
            if (json.stores[i].phone != null) {
                popupData += `<a href="tel:${json.stores[i].phone}" class="popup_additional-phone"><i class="icon-phone"></i>${json.stores[i].phone}</a>`
            }
            if (json.stores[i].web != null) {
                popupData += `<a href="${json.stores[i].web}" target="_blank" class="popup_additional-site"><i class="icon-web"></i>Website</a>`
            }
            markers.addLayer(L.marker([json.stores[i].lat, json.stores[i].lng])
                .bindPopup(popupData)
            )
        }
        map.addLayer(markers);
    } else {
        console.log("HTTP Error: " + response.status);
    }
}

drawMap();