<script setup>
import iconbutt from "./components/iconbutt.vue";
import flesh from "./components/flesh.vue";
import { ref, computed } from "vue";

const gLength = ref(0);
const password = ref("P4$5W0rD!");
const copyPass = ref(false);
const characters = ref([
  {
    name: "Include Uppercase Letters (A-Z)",
    value: "abcdefghijklmnopqrstuvwxyz",
    checked: false,
  },
  {
    name: "Include Lowercase Letters (a-z)",
    value: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    checked: false,
  },
  {
    name: "Include Numbers (0-9)",
    value: "0123456789",
    checked: false,
  },
  {
    name: "Include Symbols (!?*; etc..)",
    value: "_-+=*&^%$#@!`~",
    checked: false,
  },
]);
const setLength = (event) => {
  gLength.value = event.target.value;
};
const onGenerate = () => {
  let result = "";
  let charactersVal = "";
  for (var j = 0; j < characters.value.length; j++) {
    if (characters.value[j].checked) {
      charactersVal += characters.value[j].value;
    }
  }
  for (var i = 0; i < gLength.value; i++) {
    result += charactersVal.charAt(
      Math.floor(Math.random() * charactersVal.length)
    );
  }
  password.value = result;
};
const onCopyPass = () => {
  let textToCopy = password.value;
  try {
    navigator.clipboard.writeText(textToCopy);
    copyPass.value = true;
    setTimeout(() => {
      copyPass.value = false;
    }, 1500);
  } catch (err) {
    console.error("Failed to copy: ", err);
  }
};
const passwordStrength = computed(() => {
  const pass = characters.value.filter((item) => item.checked);
  if (!pass.length) return 0;
  if (gLength.value <= 4) return 1;

  let min = 0;

  if (gLength.value <= 8) {
    min = 1;
  } else if (gLength.value > 8 && gLength.value <= 12) {
    min = 2;
  } else if (gLength.value > 12 && gLength.value <= 16) {
    min = 3;
  } else {
    min = 4;
  }
  return Math.max(pass.length, min);
});

const setClass = (oass, i) =>
  oass === 1 && i <= 1
    ? "bg-red"
    : oass === 2 && i <= 2
    ? "bg-orange"
    : oass === 3 && i <= 3
    ? "bg-yellow"
    : oass === 4
    ? "bg-green"
    : "";

const setStrong = (oass) =>
  oass === 1
    ? "VERY WEAK"
    : oass === 2
    ? "WEAK"
    : oass === 3
    ? "MEDIUM"
    : oass === 4
    ? "STRONG"
    : "";
</script>

<template>
  <section class="flex items-center justify-center h-screen">
    <div class="container w-10/12 py-4 lg:w-1/3">
      <h1 class="text-2xl text-center text-gen">Password Generator</h1>
      <div
        class="flex items-center justify-between bg-dark px-6 py-4 mt-8 mb-4"
      >
        <span class="text-2xl text-white opacity-25">{{ password }}</span>
        <button @click="onCopyPass" class="text-green">
          <iconbutt />
        </button>
      </div>
      <div class="bg-dark px-6 py-4">
        <div class="flex items-center justify-between">
          <h2 class="text-white">Character Length</h2>
          <span class="text-green text-2xl">{{ gLength }}</span>
        </div>
        <div class="py-4">
          <input
            @change="setLength"
            type="range"
            :value="gLength"
            min="0"
            max="20"
            step="1"
            class="w-full bg-darker accent-white rounded-lg h-2 outline-none appearance-none cursor-pointer"
          />
        </div>
        <div class="flex flex-col gap-5 py-4">
          <div
            v-for="(type, index) in characters"
            :key="index"
            class="relative flex items-center gap-4"
          >
            <input
              @click="type.checked = !type.checked"
              :checked="type.checked"
              type="checkbox"
              :id="type.name"
            />
            <label
              :for="type.name"
              class="text-white relative cursor-pointer"
              >{{ type.name }}</label
            >
          </div>
        </div>
        <div class="flex items-center justify-between bg-darker px-6 py-4 my-8">
          <h2 class="text-xl text-gen">STRENGTH</h2>
          <div class="flex items-center gap-3">
            <h3 class="text-white text-2xl uppercase">
              {{ setStrong(passwordStrength) }}
            </h3>
            <div class="flex gap-1">
              <span
                v-for="i in 4"
                :key="i"
                class="border-2 w-3 h-8 border-white"
                :class="setClass(passwordStrength, i)"
              ></span>
            </div>
          </div>
        </div>
        <button
          @click="onGenerate"
          class="bg-green w-full py-4 flex justify-center items-center gap-4 text-darker hover:bg-darker hover:text-green transition-all border border-green"
        >
          <span class="font-bold uppercase">Generate</span>
          <flesh />
        </button>
        <p
          id="message"
          role="alert"
          :class="copyPass ? 'top-2' : '-top-16 '"
          class="fixed right-8 py-4 px-8 transition-all bg-green text-black"
        >
          copied
        </p>
      </div>
    </div>
  </section>
</template>

<style scoped></style>
