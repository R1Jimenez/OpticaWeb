import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useAtributosStore = defineStore('valoresatributos', () => {
    const atributo_Id = ref(null)

    function setAtributo(id) {
        atributo_Id.value = id
    }

    function clearAtributo() {
        atributo_Id.value = null
    }

    return { atributo_Id, setAtributo, clearAtributo }
})