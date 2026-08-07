<style>
.homeitem {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding-bottom: 3%;
    width: 90%;
    height: 90%;
    border: 3px solid #FB1C2E;
    border-radius: 40px;
    background: radial-gradient(
        ellipse at top,
        #F0F0F0 25%,
        #BCBCBC 100%
    );
    gap: 5%;
    cursor: pointer;
}

.rutename {
    font-size: 2.5rem;
    line-height: 2rem;
    font-weight: 500;
    color: #130348;
}
</style>

<template>
    <head>
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    </head>
    <div class="homeitem" @click="$emit('click')">
        <span class="material-icons" style="font-size: 80px; color: #130348;">
                {{ icon }}
        </span>
        <text class="rutename">
            {{ name }}
        </text>
    </div>
</template>

<script setup>
defineProps({
    name: String,
    icon: String,
})

defineEmits(['click'])
</script>