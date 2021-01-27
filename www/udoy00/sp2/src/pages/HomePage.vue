<template class="body">
    <div>
        <h1 class="text-center">Trip Generator</h1>
        <div class="flex-container">
            <ItineraryForm/>
            <Map/>
        </div>
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

    .flex-container {
        margin: 0 auto;
        max-width: 1280px;
        display: flex;
    }

    h1 {
        margin-bottom: 30px;
    }

</style>