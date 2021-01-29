<template>
    <div id="map" class="map card"></div>
</template>

<script>

    import { mapState } from 'vuex'

    export default {
        name: "Map",

        computed: {
            transfersSorted: function() {
                return this.sortTransfers();
            },

            ...mapState({
                currentTrip: 'currentTrip'
            })

        },

        mounted: function(){
            this.loadMap();
        },

        created: function(){
            this.unwatch = this.$store.watch(
                (state, getters) => getters.currentTrip,
                (newValue, oldValue) => {
                    console.log(`Updating from route: ${oldValue.id} to route:${newValue.id}`);
                    if (newValue.id !== oldValue.id) {
                        this.loadMap();
                    }
                },
            );
        },

        methods: {
            loadMap: function() {
                const center = SMap.Coords.fromWGS84(14.41790, 50.12655);
                const map = new SMap(JAK.gel('map'), center, 5);
                map.addDefaultLayer(SMap.DEF_OPHOTO);
                map.addDefaultLayer(SMap.DEF_OPHOTO0203);
                map.addDefaultLayer(SMap.DEF_OPHOTO0406);
                map.addDefaultLayer(SMap.DEF_TURIST);
                map.addDefaultLayer(SMap.DEF_TURIST_WINTER);
                map.addDefaultLayer(SMap.DEF_HISTORIC);
                map.addDefaultLayer(SMap.DEF_BASE).enable();

                let layerSwitch = new SMap.Control.Layer({
                    width: 65,
                    items: 4,
                    page: 4
                });

                layerSwitch.addDefaultLayer(SMap.DEF_BASE);
                layerSwitch.addDefaultLayer(SMap.DEF_OPHOTO);
                layerSwitch.addDefaultLayer(SMap.DEF_TURIST);
                layerSwitch.addDefaultLayer(SMap.DEF_TURIST_WINTER);
                layerSwitch.addDefaultLayer(SMap.DEF_OPHOTO0406);
                layerSwitch.addDefaultLayer(SMap.DEF_OPHOTO0203);
                layerSwitch.addDefaultLayer(SMap.DEF_HISTORIC);

                map.addDefaultControls();
                let controls = map.getControls();
                map.removeControl(controls[2]);
                let mouse = new SMap.Control.Mouse(SMap.MOUSE_PAN | SMap.MOUSE_ZOOM);
                map.addControl(mouse);
                map.addControl(layerSwitch, {left:"8px", top:"9px"});
                map.addDefaultContextMenu();

                if (this.$store.state.currentTrip.transfers) {
                    const markerLayer = new SMap.Layer.Marker();
                    const geometryLayer = new SMap.Layer.Geometry();
                    map.addLayer(markerLayer);
                    map.addLayer(geometryLayer);
                    markerLayer.enable();
                    geometryLayer.enable();

                    const markerOptions = {
                        title: ""
                    };

                    let points = [];
                    let coordinatesFrom = SMap.Coords.fromWGS84(this.$store.state.currentTrip.fromLongitude, this.$store.state.currentTrip.fromLatitude);
                    points.push(coordinatesFrom);
                    markerOptions.title = this.$store.state.currentTrip.fromPlace;
                    markerLayer.addMarker(new SMap.Marker(coordinatesFrom, this.$store.state.currentTrip.fromPlace, markerOptions));
                    let coordinatesTo = SMap.Coords.fromWGS84(this.$store.state.currentTrip.toLongitude, this.$store.state.currentTrip.toLatitude);
                    points.push(coordinatesTo);
                    markerOptions.title = this.$store.state.currentTrip.toPlace;
                    markerLayer.addMarker(new SMap.Marker(coordinatesTo, this.$store.state.currentTrip.toPlace, markerOptions));
                    this.drawLineOnMap(map, geometryLayer, points);
                    if (this.$store.state.currentTrip.transfers.length > 1) {
                        this.fillMap(points, markerOptions, markerLayer, map, geometryLayer);
                    } else {
                        this.centerMap(map, geometryLayer, points)
                    }
                }
            },


            sortTransfers: function() {
                return this.$store.state.currentTrip.transfers.sort((a, b) => {
                    if(a.dateFrom < b.dateFrom) return -1;
                    if(a.dateFrom > b.dateFrom) return 1;
                    return 0;
                });
            },

            fillMap: async function(points, markerOptions, markerLayer, map, geometryLayer) {
                if (this.$store.state.currentTrip.transfers.length !== 0) {
                    markerLayer.removeAll();
                    geometryLayer.removeAll();
                    points = [];

                    let transfersSorted = this.transfersSorted;
                    for (let i = 0; i < transfersSorted.length; i++) {
                        if (i === 0) {
                            let coordinatesFrom = SMap.Coords.fromWGS84(transfersSorted[i].longitudeFrom, transfersSorted[i].latitudeFrom);
                            points.push(coordinatesFrom);
                            markerOptions.title = transfersSorted[i].cityFrom;
                            markerLayer.addMarker(new SMap.Marker(coordinatesFrom, transfersSorted[i].cityFrom, markerOptions));
                        }
                        let coordinatesTo = SMap.Coords.fromWGS84(transfersSorted[i].longitudeTo, transfersSorted[i].latitudeTo);
                        points.push(coordinatesTo);
                        markerOptions.title = transfersSorted[i].cityTo;
                        markerLayer.addMarker(new SMap.Marker(coordinatesTo, transfersSorted[i].cityTo, markerOptions));
                    }
                    this.drawLineOnMap(map, geometryLayer, points)
                    this.centerMap(map, geometryLayer, points)
                }
            },

            drawLineOnMap: function (map, geometryLayer, points) {
                const lineOptions = {
                    color: "red",
                    width: 3
                };
                let polyline = new SMap.Geometry(SMap.GEOMETRY_POLYLINE, null, points, lineOptions);
                geometryLayer.addGeometry(polyline);
            },

            centerMap: function (map, geometryLayer, points) {
                let centerZoom = map.computeCenterZoom(points, true);
                map.setCenterZoom(centerZoom[0], centerZoom[1], true);
            },

        },

    }
</script>

<style scoped>

    .map {
        width: 700px;
        height: 700px;
        margin-left: auto;
    }

    @media screen and (max-width: 768px) {

        .map {
            width: 90%;
            margin: 0 auto;
        }
    }

</style>
