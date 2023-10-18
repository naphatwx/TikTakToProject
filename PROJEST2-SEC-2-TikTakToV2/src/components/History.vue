<script setup>
const props = defineProps({
    historys: Array,
    winCount: Number,
    total: Number
})
</script>
 
<template>
    <div class="flow-root w-full top-0 z-50 bg-black">
        <b class="p-2 text-2xl text-white">
            HISTORY : 
            <span class="float-right pr-3 text-xl">
                PLAYED: {{ total }} | JACKPOTS: {{ winCount }}
            </span></b>
        <hr style="border: 1px solid black">
    </div>
    <div class="w-full h-5/6 rounded-md overflow-auto font-mono text-black">
        <p v-for="(history, index) in historys" :key="index" class="p-2 text-xl">
            {{ history }}
        </p>
    </div>
</template>
 
<style scoped>
/* width */
::-webkit-scrollbar {
    width: 8px;
}

/* Track */
::-webkit-scrollbar-track {
    /* box-shadow: inset 0 0 5px grey;  */
    border-radius: 10px;
}

/* Handle */
::-webkit-scrollbar-thumb {
    background: gray;
    border-radius: 10px;
}
</style>
