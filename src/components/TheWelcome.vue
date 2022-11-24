<script setup>
import WelcomeItem from "./WelcomeItem.vue";
</script>

<template>
    <WelcomeItem>
        <template #heading>Testing</template>

        <template #p1>Graduating May 2023.</template>
        <template #p2>
            Interested in building cool and useful things.
        </template>
    </WelcomeItem>

    <WelcomeItem>
        <template #heading>TODO</template>

        <template #p1>Add projects and writings to the website</template>
        <template #p2>Clean up source code</template>
    </WelcomeItem>
</template>
