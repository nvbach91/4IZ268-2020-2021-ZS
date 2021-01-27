<template>
    <div class="wrapper card">
        <form>
            <b-alert :show="alert.dismissCountDown" fade variant="success"
                     @dismiss-count-down="countDownChanged" class="alert-success">{{alert.notification}}
            </b-alert>
            <b-alert :show="alertDanger.dismissCountDown" fade variant="danger"
                     @dismiss-count-down="countDownChangedDanger" class="alert-danger multi-line pre-formatted">{{alertDanger.notification}}
            </b-alert>
            <div class='row'>
                <div class='form-group col-6'>
                    <label for="stopover-days">Stopover hours</label>
                    <input class="form-control" id="stopover-days" v-model="itineraryItem.stopoverHours" required>
                </div>
                <div class='form-group col-6'>
                    <label for="stopover-tolerance">Stopover tolerance</label>
                    <input class="form-control" id="stopover-tolerance" v-model="itineraryItem.stopoverTolerance" required>
                </div>
            </div>

            <div class='row'>
                <div class='form-group col-6'>
                    <label for="place-name-from">From</label>
                    <select type="" id="place-name-from" v-on:change="validateToCity" class="form-control" v-model="itineraryItem.placeTimeFrom.placeName" required>
                        <option v-for="city in citiesSorted" v-bind:key="city.id" :value="city.code">
                            {{ city.name }}
                        </option>
                    </select>
                </div>
                <div class='form-group col-6'>
                    <label for="depart-time">Departure</label>
                    <input id="depart-time" type="datetime-local" class="form-control datepicker" v-on:change="validateToDate" v-model="itineraryItem.placeTimeFrom.dateTime" :bootstrap-styling="true" required/>
                </div>
            </div>

            <div class='row'>
                <div class='form-group col-6'>
                    <label for="place-name-to">To</label>
                    <select id="place-name-to" v-on:change="validateFromCity" class="form-control" v-model="itineraryItem.placeTimeTo.placeName" required>
                        <option v-for="city in citiesSorted" v-bind:key="city.id" :value="city.code">
                            {{ city.name }}
                        </option>
                    </select>
                </div>
                <div class='form-group col-6'>
                    <label for="return-time">Arrival</label>
                    <input id="return-time" type="datetime-local" class="form-control datepicker" v-on:change="validateFromDate" v-model="itineraryItem.placeTimeTo.dateTime" :bootstrap-styling="true" required/>
                </div>
            </div>

            <div class='row'>
                <div class='form-group col-4'><b-button @click="search"  class="btn btn-success btn-block">Find routes</b-button></div>
            </div>

            <div style="margin-bottom: -20px;" v-for="route in this.routes" :key="route.id">
                <input :id="route.id" v-on:click="selectRoute(route.id)" class="radio" type="radio" :value="route.id" v-model="selectedRouteId">
                <label :for="route.id" class="route">
                    <div>
                        <div>
                            {{'From: ' + new Date(route.fromDate * 1000).toLocaleDateString() + ' ' + new Date(route.fromDate * 1000).toLocaleTimeString() + ' ' + route.fromPlace}}
                        </div>
                        <div class="transfers" v-if="route.transfers.length > 1">
                            <span>Transfers:</span>
                            <div>
                                <div style="margin-bottom: 10px" v-for="transfer in route.transfers" :key="transfer.id">
                                    <div v-if="transfer.type === 'flight'">
                                        {{'From: ' + new Date(transfer.dateFrom * 1000).toLocaleDateString() + ' ' + new Date(transfer.dateFrom * 1000).toLocaleTimeString() + ' ' + transfer.cityFrom}}
                                        <br/>
                                        {{'To: ' + new Date(transfer.dateTo * 1000).toLocaleDateString() + ' ' + new Date(transfer.dateTo * 1000).toLocaleTimeString() + ' ' + transfer.cityTo}}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div>
                            {{'To: ' + new Date(route.toDate * 1000).toLocaleDateString() + ' ' + new Date(route.toDate * 1000).toLocaleTimeString() + ' ' + route.toPlace}}
                        </div>
                    </div>
                </label><br/>
            </div>
        </form>

    </div>
</template>

<script>
    import BackEndMockService from "@/service/BackEndMockService";
    import RouteService from "@/service/RouteService";
    import { required, numeric, minValue } from 'vuelidate/lib/validators';
    import store from "@/store/store.js";

    export default {
        name: "itineraryItem",

        data: function() {
            return {
                alert: {
                    dismissSecs: 4,
                    dismissCountDown: 0,
                    showDismissibleAlert: false,
                    notification: ''
                },
                alertDanger: {
                    dismissSecs: 2,
                    dismissCountDown: 0,
                    showDismissibleAlert: false,
                    notification: ''
                },
                routes: [],
                selectedRouteId: null,
                cities: BackEndMockService.getCities(),
                itineraryItem: {
                    id:null,
                    itemNumber:null,
                    stopoverHours:0,
                    stopoverTolerance:10,
                    placeTimeFrom: {
                        dateTime:null,
                        placeName:'',
                        location: {
                            latitude:null,
                            longitude:null
                        }
                    },
                    placeTimeTo: {
                        dateTime:null,
                        placeName:'',
                        location: {
                            latitude:null,
                            longitude:null
                        }
                    }
                },
            }
        },

        validations: {
            itineraryItem: {
                itemNumber: { numeric },
                stopoverTolerance: { required, numeric, minValue: minValue(0)},
                stopoverHours: { required, numeric, minValue: minValue(0)},
                airline: {String},
                placeTimeTo: {
                    placeName: { required },
                    dateTime: { required }
                },
                placeTimeFrom: {
                    placeName: { required },
                    dateTime: { required }
                }
            },
        },

        computed: {
            transfersSorted: function() {
                return this.sortTransfers();
            },

            citiesSorted: function () {
                return this.sortCities();
            }

        },

        watch: {
            selectedRouteId(newValue, oldValue) {
                if (oldValue !== newValue) {
                    store.commit('setCurrentTrip', this.routes[this.selectedRouteId]);
                }
            },
        },

        methods: {

            countDownChanged: function(dismissCountDown) {
                this.alert.dismissCountDown = dismissCountDown
            },

            countDownChangedDanger: function(dismissCountDown) {
                this.alertDanger.dismissCountDown = dismissCountDown
            },

            showAlert: function(notification) {
                this.alert.dismissCountDown = this.alert.dismissSecs;
                this.alert.notification = notification;
            },

            showAlertDanger: function(notification) {
                this.alertDanger.dismissCountDown = this.alertDanger.dismissSecs;
                this.alertDanger.notification = notification;
            },

            validateToCity: function(){
                if (this.itineraryItem.placeTimeFrom.placeName != null &&
                    this.itineraryItem.placeTimeFrom.placeName === this.itineraryItem.placeTimeTo.placeName) {
                    this.itineraryItem.placeTimeTo.placeName = null;
                }
            },

            validateFromCity: function(){
                if (this.itineraryItem.placeTimeTo.placeName != null &&
                    this.itineraryItem.placeTimeFrom.placeName === this.itineraryItem.placeTimeTo.placeName) {
                    this.itineraryItem.placeTimeFrom.placeName = null;
                }
            },

            validateToDate: function(){
                if (this.itineraryItem.placeTimeFrom.dateTime != null &&
                    this.itineraryItem.placeTimeFrom.dateTime > this.itineraryItem.placeTimeTo.dateTime) {
                    this.itineraryItem.placeTimeTo.dateTime = null;
                }
            },

            validateFromDate: function(){
                if (this.itineraryItem.placeTimeTo.dateTime != null &&
                    this.itineraryItem.placeTimeFrom.dateTime > this.itineraryItem.placeTimeTo.dateTime) {
                    this.itineraryItem.placeTimeFrom.dateTime = null;
                }
            },

            validateItineraryForm: function() {
                let errorMessage = '';
                let stopoverHoursError = "Stopover hours is a mandatory numeric field!\n\nIf not relevant, enter 0.\n\n";
                let stopoverToleranceError = "Stopover tolerance is a mandatory numeric field!\nIf not relevant, enter 0.\n\n";
                let placeError = "Place of departure, arrival, date and time are mandatory fields!";
                this.$v.itineraryItem.$touch();
                if(this.$v.itineraryItem.$error) {
                    if (this.$v.itineraryItem.stopoverHours.$error) {
                        this.alertDanger.dismissSecs += 3;
                        errorMessage += stopoverHoursError
                    }
                    if (this.$v.itineraryItem.stopoverTolerance.$error) {
                        this.alertDanger.dismissSecs += 3;
                        errorMessage += stopoverToleranceError
                    }
                    if (this.$v.itineraryItem.placeTimeTo.$error || this.$v.itineraryItem.placeTimeFrom.$error) {
                        this.alertDanger.dismissSecs += 3;
                        errorMessage += placeError
                    }
                    this.showAlertDanger(errorMessage);
                    return false;
                }
                return true;
            },

            search: async function() {
                if (!this.validateItineraryForm()) {
                    return
                }
                this.showAlert("Calling API...");
                this.routes = await RouteService.getFlights(
                    this.itineraryItem.placeTimeFrom.placeName,
                    this.itineraryItem.placeTimeTo.placeName,
                    this.itineraryItem.placeTimeFrom.dateTime,
                    this.itineraryItem.placeTimeTo.dateTime,
                    this.itineraryItem.stopoverTolerance,
                    this.itineraryItem.stopoverHours,
                );
                this.selectedRouteId = null;
            },

            selectRoute: function(value){
                this.itineraryItem.placeTimeFrom.dateTime = new Date((this.routes.filter(x => x.id === value)[0].fromDate * 1000) + 7200000).toISOString().slice(0,16);
                this.itineraryItem.placeTimeTo.dateTime = new Date((this.routes.filter(x => x.id === value)[0].toDate * 1000) + 7200000).toISOString().slice(0,16);
                this.itineraryItem.placeTimeFrom.location.longitude = this.routes.filter(x => x.id === value)[0].fromLongitude;
                this.itineraryItem.placeTimeFrom.location.latitude = this.routes.filter(x => x.id === value)[0].fromLatitude;
                this.itineraryItem.placeTimeTo.location.longitude = this.routes.filter(x => x.id === value)[0].toLongitude;
                this.itineraryItem.placeTimeTo.location.latitude = this.routes.filter(x => x.id === value)[0].toLatitude;
                this.scrollToTop();
            },

            sortTransfers: function() {
                return this.transfers.sort((a, b) => {
                    if(a.dateFrom < b.dateFrom) return -1;
                    if(a.dateFrom > b.dateFrom) return 1;
                    return 0;
                });
            },

            sortCities: function() {
                return this.cities.sort((a, b) => {
                    if(a.name < b.name) return -1;
                    if(a.name > b.name) return 1;
                    return 0;
                });
            },

            scrollToTop() {
                window.scrollTo(0,0);
            }

        },
    }
</script>

<style scoped>

    .route {
        display: flex;
        border-radius: 10px;
        padding: 10px;
        background: lightgray;
    }

    .radio{
        display: none;
    }

    input[type=radio]:checked + label{
        background: #b3ffb3;
    }

    input[type=datetime-local]{
        padding: 5px;
    }

    .transfers {
        display: flex; font-family: monospace;
    }

    .transfers span {
        margin-right: 3px;
    }

    .pre-formatted {
        white-space: pre;
    }

    .wrapper {
        margin-right: 30px;
        padding: 20px;
        background: cornsilk;
    }

</style>