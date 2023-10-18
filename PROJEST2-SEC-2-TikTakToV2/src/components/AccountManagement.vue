<script setup>
import { ref, onMounted } from "vue"
import { getAccount } from "../composable/getAccount.js"
import { getUser } from '../composable/getInformation'
import { setCurrentUser } from '../composable/getEditInformation'
import { RouterLink } from "vue-router"
import AddEditAccount from "./AddEditAccount.vue"

const account = ref([])
const currentUser = ref()
const currentComponent = ref('AccountManagement') //control what component will work
const editAccount = ref(undefined)

onMounted(async () => {
    account.value = await getAccount()
    currentUser.value = await getUser()
})

// Who is current user?
const editCurrentUser = (user) => {
    currentUser.value.activateUser = user
    setCurrentUser(currentUser.value)
}

// What component we will use
const setCurrentComponent = (component) => {
    currentComponent.value = component
}

const cancelFromAddEdit = async () => {
    try {
        setCurrentComponent('AccountManagement')
        editAccount.value = undefined //clear text input
        account.value = await getAccount()
    } catch (err) {
        console.log(`ERROR: can't read data, ${err}`)
    }
}

const deleteAcc = async (playId) => {
    try {
        const res = await fetch(`http://localhost:5000/Player/${playId}`, { method: 'DELETE' }) //Delete backend
        if (res.ok) {
            account.value = account.value.filter((acc) => acc.id !== playId) //Delete frontend
        } else {
            throw new Error(`Cannot delete`)
        }
    } catch (err) {
        alert(`Error: ${err}`)
    }
}

const checkUpdateAccount = (account) => {
    if (account.name === undefined || account.name === '') {
        account.name = 'Unknown'
    }
    if (account.icon === undefined || account.icon === '') {
        account.icon = '💵'
    }
    if (account.money < 0 || account.money > 1000000 || account.money === '') {
        account.money = 300
    }
}

const addNewAccount = async (newAccount) => {
    try {
        checkUpdateAccount(newAccount)
        const res = await fetch('http://localhost:5000/Player', 
        {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(newAccount) //Object to json
        }) //Add account at backend
        // method post. if it success, it will return status 201 / other methods return status 200
        if (res.status === 201) {
            const addedAccount = await res.json() //keep info that added from backend
            account.value.push(addedAccount) //add account at frontend
            setCurrentComponent('AccountManagement')
        } else {
            throw new Error('Cannot add')
        }
    } catch (err) {
        console.log(err)
    }
}

const modifyAccount = async (updateAccount) => {
    try {
        checkUpdateAccount(updateAccount)
        const res = await fetch(`http://localhost:5000/Player/${updateAccount.id}`, 
        {
            method: 'PUT', // put = replace all record, all field // patch = edit some field
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(updateAccount) //edit backend
        })
        // method put. if it success. it will return status 200
        if (res.status === 200) {
            const modifyAccount = await res.json()
            account.value.map((acc) => { // map: change item in array
                if (acc.id === modifyAccount.id) {
                    acc.icon = modifyAccount.icon
                    acc.name = modifyAccount.name
                    acc.money = modifyAccount.money
                }
                return acc
            })
            setCurrentComponent('AccountManagement')
            editAccount.value = undefined //clear
        } else {
            throw new Error('Cannot edit')
        }
    } catch (err) {
        console.log(err)
    }
}

const setEditMode = (account) => {
    editAccount.value = account //change value(frontend)
    setCurrentComponent('AddEditAccount')
}
</script>
 
<template>
    <div class="w-full h-full p-2">
        <div v-if="currentComponent === 'AccountManagement'"
            class="font-extrabold text-5xl flex p-2 m-2 mt-10 w-full justify-center items-center text-white">
            WHO'S PLAYING ?
        </div>

        <div v-if="currentComponent === 'AddEditAccount'">
            <AddEditAccount @add="addNewAccount" @edit="modifyAccount" @cancel="cancelFromAddEdit" :account="editAccount" />
        </div>

        <div v-if="currentComponent === 'AccountManagement'"
            class="lg:flex-row flex-col flex mt-14 justify-start items-center overflow-auto">
            <div v-for="acc in account" :key="acc.id"
                class="m-5 flex items-center justify-center bg-black border-2 border-black w-2/3 rounded-xl opacity-85">
                <div class=" flex flex-col p-2">
                    <RouterLink :to="{ name: 'Slot' }" active-class="active" @click="editCurrentUser(acc.id)"
                        class="bg-yellow-400 p-12 my-6 rounded-full border-black border-4 text-6xl hover:bg-green-500 hover:border-white hover:text-white hover:font-bold">
                        {{ acc.icon }}
                    </RouterLink>
                    <p class="text-xl text-white">
                        <b>Name: </b>{{ acc.name }} <br>
                        <b>Played: </b>{{ acc.total }}<br> 
                        <b>Score: </b>{{ acc.money }}
                    </p>
                    <button @click="setEditMode(acc)" class="mt-5 rounded-md border-2 border-black bg-yellow-500 m-2 font-semibold
                    hover:bg-green-500 hover:border-white hover:text-white hover:font-bold">
                        EDIT
                    </button>
                    <button @click="deleteAcc(acc.id)" class="rounded-md border-2 border-black bg-red-500 m-3 font-semibold
                    hover:bg-red-600 hover:font-bold hover:text-white hover:border-white ">
                        DELETE
                    </button>
                </div>
            </div>
            <div v-if="currentComponent === 'AccountManagement'" @click="setCurrentComponent('AddEditAccount')"
                class="mt-7 justify-center items-center flex">
                <button class="rounded-full p-3 text-3xl font-extrabold opacity-70 hover:opacity-100 border-2 border-black bg-black hover:bg-black hover:border-white text-white">
                    +
                </button>
            </div>
        </div>
    </div>
</template>

<style scoped></style>
