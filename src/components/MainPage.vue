<script setup>
import PageItem from "./PageItem.vue";
import Project from "./Project.vue";
</script>

<template>
    <PageItem>
        <template #heading>Testing</template>

        <template #p1>Graduating May 2023.</template>
        <template #p2>
            Interested in building tools for tomorrow.
        </template>
    </PageItem>

    <PageItem>
        <template #heading>Projects</template>

        <template #p1>
            <Project>
                <template #projectName>AINote</template>

                <template #tooling>
                    Frictionless notetaking with deep learning.
                </template>

                <template #description>
                    Self-organizing notetaking web app designed to make notetaking and organization as simple as possible. { TODO: What else does it do? }
                </template>
            </Project>

            <Project>
                <template #projectName>Depth Estimation</template>

                <template #tooling>
                    Unsupervised monocular depth and egomotion estimation with deep learning.
                </template>

                <template #description>
                    TensorFlow 2.0 implementation of some of the latest methods in unsupervised depth estimation with a CNN. Trains using only monocular video. { TODO: Turn this into a camera filter? }
                </template>
            </Project>
                    
        </template>
    </PageItem>

    <div style="top: -3rem;">
        <PageItem>
            <template #heading>TODO</template>

            <template #p1>Add projects and writings to the website</template>
            <template #p2>Clean up source code</template>
        </PageItem>
    </div>
</template>
