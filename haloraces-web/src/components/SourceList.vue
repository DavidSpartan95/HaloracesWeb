<template>
    <div class="fullscreen-overlay" @click="handleOverlayClick">
        <div class="box" ref="box">
            <!-- Close button in top right -->
            <button class="close-button" @click="$emit('close')">✖</button>

            <!-- Title -->
            <div class="title-layer">
                <h2 class="text-xl font-bold mb-4">
                    {{ event.year }} {{ event.difficulty }}<br>Sources
                </h2>
            </div>

            <div v-for="source in sortedSources" :key="source.link.toString()" class="source-list">
                <img v-if="source.type === TypeOfSource.Video" src="../assets/video-icon.png" alt="Video" class="img" />
                <img v-else-if="source.type === TypeOfSource.Image" src="../assets/image-icon.png" alt="Video"
                    class="img" />
                <img v-else-if="source.type === TypeOfSource.Exel" src="../assets/sheets-icon.png" alt="Video"
                    class="img" />
                <img v-else src="../assets/vue.svg" alt="Other" class="img" />
                <a :href="source.link.toString()" target="_blank">
                    {{ source.name }}
                </a>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { RelayEvent } from '../data/relayEvents'
import { TypeOfSource } from '../data/relayEvents'
import { ref } from 'vue'


const box = ref<HTMLElement | null>(null)

function handleOverlayClick(event: MouseEvent) {
    if (box.value && !box.value.contains(event.target as Node)) {
        emit('close')
    }
}



const props = defineProps<{
    event: RelayEvent
}>()

console.log('SourceList mounted with event:', props.event);

const emit = defineEmits<{
    (e: 'close'): void
}>()

const sortOrder: TypeOfSource[] = [
    TypeOfSource.Video,
    TypeOfSource.Image,
    TypeOfSource.Exel,
    TypeOfSource.Other,
]

const sortedSources = computed(() => {
    if (!props.event.source) return []
    return [...props.event.source].sort((a, b) => {
        return sortOrder.indexOf(a.type) - sortOrder.indexOf(b.type)
    })
})

</script>

<style scoped>
.source-list {
    text-align: start;
    padding: 1rem;
    color: gold;

    display: flex;
    align-items: center;
    /* vertically centers img and a */
    gap: 10px;
    /* optional spacing between img and link */

}

.source-list a {
    color: #E08916;
}

.img {
    width: 30px;
    height: 30px;
}

.fullscreen-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.7);
    /* Shadow effect */
    z-index: 9999;
    /* Make sure it's on top of everything */
    display: flex;
    justify-content: center;
    align-items: center;
}

.box {
    position: relative;
    /* Needed for absolute positioning inside */
    color: #f1f1f1;
    padding: 1.5rem;
    border-radius: 20px;
    width: 100%;
    max-width: 500px;
    background: #0F1832;
    border: 1px solid rgba(161, 161, 161, 0.5);
    text-align: center;
    margin-bottom: 2rem;
}

.close-button {
    position: absolute;
    top: 10px;
    right: 10px;
    color: #ccc;
    background: none;
    border: none;
    font-size: 1.25rem;
    cursor: pointer;
}

.close-button:hover {
    color: #fff;
}
</style>