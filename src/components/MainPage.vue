<script setup>
import PageItem from "./PageItem.vue";
import Project from "./Project.vue";
</script>

<template>
    <PageItem>
        <template #heading>Joey Tan</template>

        <template #p1>
            <a href="mailto:j.tan2231@gmail.com">j.tan2231@gmail.com</a> | 
            <a href="https://linkedin.com/in/joseph-tan-478aa5186">LinkedIn</a> |
            <a href="https://jtan2231.github.io">CV</a>
        </template>
        <template #p2>
            Interested in making tomorrow easier.
        </template>
    </PageItem>

    <PageItem>
        <template #heading>Projects</template>

        <template #p1>
            <Project>
                <template #projectName>
                    <a href="https://joeytan.dev/" target="_blank" rel="noopener noreferrer">AINote</a>
                </template>

                <template #tooling>
                    Frictionless notetaking with deep learning.
                </template>

                <template #description>
                    Self-organizing notetaking web app designed to make notetaking and organization as simple as possible. { TODO: What else does it do? }
                </template>
            </Project>

            <Project>
                <template #projectName>
                    <a href="https://github.com/JTan2231/depth-estimation">Depth Estimation</a>
                </template>

                <template #tooling>
                    Unsupervised monocular depth and egomotion estimation with deep learning.
                </template>

                <template #description>
                    TensorFlow 2.0 implementation of some of the latest methods in unsupervised depth estimation with a CNN. Trains using only monocular video. { TODO: Turn this into a camera filter? } { TODO: Check link }
                </template>
            </Project>
                    
        </template>
    </PageItem>

    <div style="top: -3rem;">
        <PageItem>
            <template #heading>Writings</template>

            <template #p1>In progress.</template>
        </PageItem>
    </div>
</template>

<style scoped>
a {    
    color: hsl(228, 32.5%, 40.2%);
}
</style>
