<script setup>
import { ref, onMounted } from 'vue'
import { getInformation, getUser } from '../composable/getInformation'
import { addNewSlot } from '../composable/getEditInformation'
import { shuffle, testWin, countScore } from '../composable/functionForSlot.js'
import History from './History.vue'
import Vbox from './Vbox.vue'
import Popup from './Popup.vue'

// Variable -------------------------------------------------------------------------------------------------------------------------------

const items = [
    '❌',
    '🍓',
    '🍋',
    '🍉',
    '🍒',
    '💵',
    '🍊',
    '🍎',
    '7️⃣'
]
const buttonStatus = ref(false)
let scoreToShow = ref(0)
const information = ref([])
const status = ref('YOUR STATUS')
const historys = ref([])
const winCount = ref(0)
const total = ref(0)
const slot1 = ref('💰')
const slot2 = ref('💰')
const slot3 = ref('💰')
const score = ref(300)
var autoStatus = ref(false)
var Inter = undefined
const currentUser = ref()
const load = ref(0)
const perGame = 20

onMounted(async () => {
    currentUser.value = await getUser() //Who's play?
    information.value = await getInformation(currentUser.value.activateUser) //Player's info
    historys.value = information.value.historys
    total.value = information.value.total
    score.value = information.value.money
    winCount.value = information.value.winCount
})

// Method overall ---------------------------------------------------------------------------------------------------------------------

// 1. สำหรับปุ่ม clear ทำหน้าที่ refresh ค่า
const clearSlots = () => {
    slot1.value = '💰'
    slot2.value = '💰'
    slot3.value = '💰'
    status.value = 'YOUR STATUS'
    score.value = information.value.money
    historys.value = [] //clear fronend
    information.value.historys = historys.value //clear backend
    winCount.value = 0
    total.value = 0
    information.value.total = total.value
    information.value.winCount = winCount.value
    addNewSlot(information.value)
}

// 2. สำหรับปุ่ม spin ทำหน้าที่ play game
const doSlots = () => {
    if (score.value >= perGame) {
        buttonStatus.value = true
        score.value = score.value - perGame
        const slots = shuffle()
        let countTime = 30
        status.value = 'SPINNING!'
        const loading = setInterval(() =>{
            load.value += 10
            if(load.value === 100) {
                load.value = 0
                clearInterval(loading)
            }
        }, 150)
        const Timer = setInterval(() => {
            countTime = countTime - 1
            const slotsSpin = shuffle()
            slot1.value = items[slotsSpin[0]]
            slot2.value = items[slotsSpin[1]]
            slot3.value = items[slotsSpin[2]]
            if (countTime <= 0) {
                total.value++
                information.value.total = total.value
                if (testWin(slots) === 'YOU WIN!') {
                    winCount.value++
                }
                scoreToShow = countScore(slots)
                score.value = score.value + countScore(slots)
                slot1.value = items[slots[0]]
                slot2.value = items[slots[1]]
                slot3.value = items[slots[2]]
                status.value = testWin(slots)
                const scoreHistory = countScore(slots) === 0? '':` +${countScore(slots)}`
                historys.value.unshift(`${total.value}. ${slot1.value} ${slot2.value} ${slot3.value} : ${status.value}${scoreHistory}`) //edit frontend
                information.value.money = score.value
                information.value.historys = historys.value
                information.value.winCount = winCount.value
                addNewSlot(information.value) //edit backend
                clearInterval(Timer)
                buttonStatus.value = false
            }
        }, 50)
    }
}

// 3. สำหรับปุ่ม autospin ทำหน้าที่ play game (auto)
const runAutospin = () => {
    autoStatus.value ? stopAutospin() : Inter = setInterval(() => {
        score.value >= perGame ? doSlots() : stopAutospin()
    }, 2000)
}
const stopAutospin = () => {
    window.clearInterval(Inter)
    autoStatus.value = false
}
</script>
 
<template>
    <Popup :score="score" :scoreToShow="scoreToShow" :status="status" />

    <div class="w-full h-full bg-purple-900">
        <div class="flex w-full rounded-md flex-col lg:flex-row mb-10">
            <div class="lg:w-3/5 lg:mt-10 lg:ml-10 lg:mb-0 lg:mr-0">
                <div class="w-full pb-9 lg:mb-0 mb-5 bg-purple-500 rounded border-solid border-2 text-white border-black">

                    <!-- แถบบอกสถานะซ้ายบน -->
                    <div class="w-full flex justify-between">
                            <b class="pt-0 p-2 text-2xl bg-black text-white">
                                {{ information.icon }} : {{ information.name }}
                            </b>
                            <b :class="status === 'YOU WIN!' ? 'text-green-500' : status === 'YOU LOSE!' ? 'text-red-500' : 'text-white'"
                                class="pt-0 p-2 text-2xl bg-black">
                                {{ status }}
                                <progress class="flex absolute pt-0 p-2 pr-5 text-sm" :value=load max="100" v-show="status === 'SPINNING!'"></progress>
                            </b>
                    </div>
                    <!-- /แถบบอกสถานะซ้ายบน -->

                    <!-- หน้าต่างแสดงผลลัพธิ์ -->
                    <div class="flex sm:flex-row flex-col justify-center items-center mt-10 text-black">
                        <div class="slott flex w-40 h-60 bg-white rounded mx-6 border-double border-4 border-black shadow-2xl justify-center items-center text-9xl">
                            {{ slot1 }}
                        </div>
                        <div class="slott flex w-40 h-60 bg-white rounded mx-6 border-double border-4 border-black shadow-2xl justify-center items-center text-9xl">
                            {{ slot2 }}
                        </div>
                        <div class="slott flex w-40 h-60 bg-white rounded mx-6 border-double border-4 border-black shadow-2xl justify-center items-center text-9xl">
                            {{ slot3 }}
                        </div>
                    </div>
                    <!-- /หน้าต่างแสดงผลลัพธิ์ -->
                </div>
            </div>
            <div class="flex lg:flex-col md:flex-row flex-col lg:w-2/5 justify-center items-center ">

                <!-- แถบแสดงคะแนนสีดำ SCORE: -->
                <div class="flex font-extrabold bg-black  text-3xl  p-4 mx-auto mt-10  mb-5 text-white rounded-md lg:flex-col xl:flex-row">
                    <h2 class="font-extrabold bg-black text-3xl p-4 mx-auto my-auto text-white p-auto rounded-md">
                        SCORE:
                    </h2>
                    <h2 class="font-extrabold bg-white text-3xl p-4 mx-auto my-auto text-black p-auto rounded-md">
                        {{ score }}💸
                    </h2>
                </div>
                <!-- /แถบแสดงคะแนนสีดำ SCORE: -->

                <!-- ปุ่มกด -->
                <div class="flex font-extrabold justify-center">
                    <button :disabled="buttonStatus || autoStatus" @click="doSlots()" class="font-extrabold bg-yellow-400 border-solid text-2xl border-2 p-4 mx-2 my-2 hover:bg-green-500 text-black p-auto px-6 border-b-4 border-purple-700 hover:border-yellow-400 hover:text-white rounded-2xl">
                        SPIN
                    </button>
                    <button @click="clearSlots()" class="font-extrabold bg-yellow-400 border-solid text-2xl border-2 p-4 mx-2 my-2 hover:bg-red-500 text-black p-auto border-b-4 border-purple-700 hover:border-yellow-400 hover:text-white rounded-2xl">
                        CLEAR
                    </button>
                </div>
                <div class="flex font-extrabold justify-center">
                    <span class="font-extrabold bg-yellow-400 border-solid text-2xl border-2 p-4 mx-2 my-2 text-black p-auto px-6 border-b-4 border-purple-700 rounded-2xl">
                        <input @click="runAutospin()" v-model="autoStatus"
                            class="checked:bg-green-500 mt-[0.3rem] mr-2 h-3.5 w-8 appearance-none rounded-[0.4375rem] bg-neutral-300 dark:bg-neutral-600 before:pointer-events-none before:absolute before:h-3.5 before:w-3.5 before:rounded-full before:bg-transparent before:content-[''] after:absolute after:z-[2] after:-mt-[0.1875rem] after:h-5 after:w-5 after:rounded-full after:border-none after:bg-neutral-100 dark:after:bg-neutral-400 after:shadow-[0_0px_3px_0_rgb(0_0_0_/_7%),_0_2px_2px_0_rgb(0_0_0_/_4%)] after:transition-[background-color_0.2s,transform_0.2s] after:content-[''] checked:bg-primary dark:checked:bg-primary checked:after:absolute checked:after:z-[2] checked:after:-mt-[3px] checked:after:ml-[1.0625rem] checked:after:h-5 checked:after:w-5 checked:after:rounded-full checked:after:border-none checked:after:bg-primary dark:checked:after:bg-primary checked:after:shadow-[0_3px_1px_-2px_rgba(0,0,0,0.2),_0_2px_2px_0_rgba(0,0,0,0.14),_0_1px_5px_0_rgba(0,0,0,0.12)] checked:after:transition-[background-color_0.2s,transform_0.2s] checked:after:content-[''] hover:cursor-pointer focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[3px_-1px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-5 focus:after:w-5 focus:after:rounded-full focus:after:content-[''] checked:focus:border-primary checked:focus:bg-primary checked:focus:before:ml-[1.0625rem] checked:focus:before:scale-100 checked:focus:before:shadow-[3px_-1px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s]"
                            type="checkbox" role="switch" id="flexSwitchChecked" checked />
                        AUTO SPIN
                    </span>
                </div>
                <!-- /ปุ่มกด -->
            </div>
        </div>

        <div class="mt-10 flex lg:mt-0 lg:flex-row items-center flex-col">
            <!-- กรอบสี่เหลี่ยม -->
            <Vbox>
                <History :historys="historys" :winCount="winCount" :total="total" />
            </Vbox>
            <!-- /กรอบสี่เหลี่ยม -->

            <!-- กรอบสี่เหลี่ยม -->
            <Vbox>
                <div class="w-full  top-0 z-50 bg-black">
                    <b class="p-2 text-2xl text-white">RULES :</b>
                    <hr style="border: 1px solid black">
                </div>
                <div class="w-full h-5/6 rounded-md overflow-auto font-mono text-black">
                    <p class="p-2 text-xl">❌ ❌ 7️⃣ = 10 points</p>
                    <p class="p-2 text-xl">🍓 🍓 7️⃣ = 20 points</p>
                    <p class="p-2 text-xl">🍋 🍋 7️⃣ = 30 points</p>
                    <p class="p-2 text-xl">🍉 🍉 7️⃣ = 40 points</p>
                    <p class="p-2 text-xl">🍒 🍒 7️⃣ = 50 points</p>
                    <p class="p-2 text-xl">💵 💵 7️⃣ = 60 points</p>
                    <p class="p-2 text-xl">🍊 🍊 7️⃣ = 70 points</p>
                    <p class="p-2 text-xl">🍎 🍎 7️⃣ = 80 points</p>
                    <p class="p-2 text-xl">❌ ❌ ❌ = 100 points</p>
                    <p class="p-2 text-xl">🍓 🍓 🍓 = 200 points</p>
                    <p class="p-2 text-xl">🍋 🍋 🍋 = 300 points</p>
                    <p class="p-2 text-xl">🍉 🍉 🍉 = 400 points</p>
                    <p class="p-2 text-xl">🍒 🍒 🍒 = 500 points</p>
                    <p class="p-2 text-xl">💵 💵 💵 = 600 points</p>
                    <p class="p-2 text-xl">🍊 🍊 🍊 = 700 points</p>
                    <p class="p-2 text-xl">🍎 🍎 🍎 = 800 points</p>
                    <p class="p-2 text-xl">7️⃣ 7️⃣ ❓ = 500 points</p>
                    <p class="p-2 text-xl">7️⃣ 7️⃣ 7️⃣ = 1,000 points</p>
                </div>
            </Vbox>
            <!-- /กรอบสี่เหลี่ยม -->
        </div>
    </div>
</template>
 
<style scoped>
/* width */

/* Handle on hover */
/* ::-webkit-scrollbar-thumb:hover {
  background: #b30000; 
} */

body {
    background-color: black;
}

.root {
    position: relative;
}

.modal {
    position: absolute;
    top: 0;
    left: 0;
    background-color: #0000;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}

.modal>div {
    background-color: rgb(250 204 21);
    padding: 50px;
    border-radius: 10px;
    width: 50%;
    height: 30%;
    border: solid black 2px;
}
</style>
