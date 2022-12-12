<script setup>
import PageItem from "./PageItem.vue";
import Project from "./Project.vue";
import TechEcosystems from "./TechEcosystems.vue";
</script>

<template>
    <PageItem>
        <template #heading>Joey Tan</template>

        <template #p1>
            <a href="mailto:j.tan2231@gmail.com">j.tan2231@gmail.com</a> | 
            <a href="https://linkedin.com/in/joseph-tan-478aa5186">linkedIn</a> |
            <a href="https://github.com/JTan2231">github</a> |
        </template>
        <template #p2>
            Interested in making tomorrow easier.
            <br />
            Currently:
            <ul>
                <li>Working on <a href="https://joeytan.dev/" target="_blank" rel="noopener noreferrer">AINote</a> (including naming)</li>
                <li>Reading:
                    <ul>
                        <li>
                            <a href="https://www.amazon.com/Ancient-Greek-Athletics-Stephen-Miller/dp/0300115296" target="_blank" rel="noopener noreferrer">
                                Ancient Greek Athletics
                            </a> by Stephen Miller
                        </li>
                        <li>
                            <a href="https://thenetworkstate.com/" target="_blank" rel="noopener noreferrer">The Network State</a> by Balaji Srinivasan
                        </li>
                    </ul>
                </li>
                <li>Learning <a href="https://youtu.be/HI1ZlEdWWJg" target="_blank" rel="noopener noreferrer">how to skate like this</a></li>
            </ul>
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
                    Self-organizing notetaking web app designed to make notetaking and organization as simple as possible. Exploring connections between disparate bits of information.
                </template>
            </Project>

            <Project>
                <template #projectName>
                    <a href="https://github.com/JTan2231/depth-prediction/" target="_blank" rel="noopener noreferrer">Depth Estimation</a>
                </template>

                <template #tooling>
                    Unsupervised monocular depth and egomotion estimation with deep learning.
                </template>

                <template #description>
                    TensorFlow 2.0 implementation of some of the latest methods in unsupervised depth estimation with a CNN. Requires only monocular RGB video as training data. Weights provided.
                </template>
            </Project>
                    
        </template>
    </PageItem>

    <div style="top: -3rem;">
        <PageItem>
            <template #heading>Current Thoughts</template>

            <template #p1>
                <TechEcosystems />
            </template>
        </PageItem>
    </div>
</template>
