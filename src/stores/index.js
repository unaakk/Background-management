import { defineStore } from 'pinia';
import {ref} from "vue";

function initState() {
    return {
        
    }
}
export const useAllDataStore = defineStore('allData', () => {
    //ref state
    //computed getters
    //function actions
    const state = ref(initState());
    return { 
        state,
     }
  })