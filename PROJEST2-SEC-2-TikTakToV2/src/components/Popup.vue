<script setup>
import { RouterLink } from "vue-router"

const props = defineProps({
  score: Number,
  status: String,
  scoreToShow: Number
})
</script>

<template>
  <div class="popup">
  <Teleport to="body">

      <!-- LOSE -->
      <div class="modal align-middle justify-center items-center" v-if="score < 20">
        <RouterLink :to="{name:'AccountManagement'}" active-class="active" class="bg-black bg-opacity-50 w-full h-full text-xl font-bold align-middle justify-center items-center">
          <div class="align-middle w-full flex justify-center h-full items-center ">
            <h2 class="headertwo">
              YOU LOSE 🎌<br />
              <div class="mt-6">
                <span class="text-4xl text-red-500 bg-black rounded-2xl p-3">
                  RETURN
                </span>
              </div>
            </h2>
          </div>
        </RouterLink>
      </div>

      <!-- WIN -->
      <div class="modal align-middle justify-center items-center" v-if="status == 'YOU WIN!'">
        <button @click="status = 'YOUR STATUS'" class="bg-black bg-opacity-50 w-full h-full text-xl font-bold align-middle justify-center items-center">
          <div class="align-middle justify-center">
            <h2 class="headertwo">
              🎰:YOU WIN🎉<br />
              <div class="mt-6">
                <span class="text-4xl text-green-500 bg-black rounded-2xl py-3 pr-3 pl-10">
                  +{{ scoreToShow }} 💵
                </span>
              </div>
            </h2>
          </div>
        </button>
      </div>
    </Teleport>
  </div>
</template>

<style scoped>
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

.headertwo {
  background-color: yellow;
  --tw-bg-opacity: 0.9;
  border-width: 2px;
  border-color: rgb(0 0 0 / var(--tw-border-opacity));
  --tw-border-opacity: 0.9;
  border-radius: 1rem;
  width: 33.33%;
  font-size: 3.75rem;
  line-height: 1;
  margin: auto;
  padding-top: 4rem;
  padding-bottom: 4rem;
  text-align: center;
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
  font-weight: 700;
  vertical-align: middle;
  justify-content: center;
  align-items: center;
}
</style>
