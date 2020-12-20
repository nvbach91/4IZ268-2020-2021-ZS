<template>
    <div>
        <h1>Home page</h1>
        <ItineraryForm/>
        <Map/>
    </div>
</template>

<script>
    import ItineraryForm from "@/components/ItineraryForm";
    import Map from "@/components/Map";
    export default {
        name: "HomePage",
        components: {
            ItineraryForm,
            Map,
        }
    }
</script>

<style scoped>

</style>