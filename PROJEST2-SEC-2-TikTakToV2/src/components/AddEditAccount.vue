<script setup>
import { ref, onMounted } from 'vue'

defineEmits(['add', 'edit', 'cancel'])

const props = defineProps({
    account: { type: Object }
})

const updateAccount = ref({})
const text = props.account === undefined ? "ADD NEW ACCOUNT" : "EDIT ACCOUNT"
const items = [
    '❌',
    '🍓',
    '🍋',
    '🍉',
    '🍒',
    '💵',
    '🍊',
    '🍎',
    '💣',
    '🏀',
    '🔥'
]

const shuffleIcon = () => {
    const num = Math.floor(Math.random() * (items.length - 1))
    return num
}

// all are loaded before new page
onMounted(() => {
    // account.value = await getAccount()
    if (props.account === undefined) {
        //add
        updateAccount.value = {
            name: '',
            icon: items[shuffleIcon()],
            money: 300,
            total: 0,
            winCount: 0,
            historys: []
        }
    } else {
        //edit
        updateAccount.value = props.account //set new value
    }
})

</script>
 
<template>
    <div class="w-full h-full p-2">
        <h1 class="font-extrabold text-5xl flex p-2 m-2 mt-10 w-full justify-center items-center text-white">{{ text }}</h1>
        <div class="justify-center items-center flex flex-row">
            <div class="m-10 text-9xl bg-black p-12 rounded-full border-4 border-black text-white">{{ updateAccount.icon }}
            </div>
            <!-- v-model 'updateAccount.name' = set name -->
            <div class="flex flex-col">
                <input maxlength="1" type="text" v-model="updateAccount.icon" placeholder="ENTER YOUR ICON"
                    class=" border-black rounded-lg h-12 p-2 text-xl border-4 mt-5 focus:bg-black focus:text-white" />
                <input maxlength="8" minlength="1" type="text" v-model="updateAccount.name" placeholder="ENTER YOUR NAME"
                    class=" border-black rounded-lg h-12 p-2 text-xl border-4 mt-5 focus:bg-black focus:text-white" />
                <input min="1" max="1000000" type="number" v-model="updateAccount.money" placeholder="ENTER YOUR MONEY"
                    class=" border-black rounded-lg h-12 p-2 text-xl border-4 mt-5 focus:bg-black focus:text-white" />
            </div>
        </div>
        <div class="justify-center items-center flex m-4">
            <!-- emit child send to parents(AccountManagement) -->
            <button @click="$emit('cancel')" 
            class="bg-red-500 p-2 border-2 border-black rounded-md m-4 font-bold text-3xl hover:bg-red-600 hover:font-bold hover:text-white hover:border-white">
                CANCEL
            </button>
            <button @click="$emit('add', updateAccount)" v-if="props.account === undefined" 
            class="bg-green-500 p-2 border-2 border-black rounded-md m-4 font-bold text-3xl hover:bg-green-500 hover:border-white hover:text-white hover:font-bold">
                ADD
            </button>
            <button @click="$emit('edit', updateAccount)" v-if="props.account !== undefined"
            class="bg-green-500 p-2 border-2 border-black rounded-md m-4 font-bold text-3xl hover:bg-green-500 hover:border-white hover:text-white hover:font-bold">
                DONE
            </button>
        </div>
    </div>
</template>
 
<style scoped></style>
