<template>
    <div class="project">
        <div class="header">
            <div class="name">
                <slot name="projectName" />
            </div>
            <span class="tooling"><slot name="tooling" /></span>
        </div>

        <div class="description">
            <slot name="description" />
        </div>
    </div>
</template>

<style scoped>
.project {
    margin-bottom: 4rem;
}

.header {
    display: flex;
    width: fit-content;
}

.name {
    font-weight: 500;
    font-size: 2.2rem;
    line-height: 2rem;
    display: flex;
    color: hsl(228, 32.5%, 30.2%);
}

.tooling {
    color: black;
    margin-left: 1rem;
    display: flex;
    padding-left: 1rem;
    border-left: 1px solid black;
}

.description {
    font-size: 1.1rem;
    margin-top: 1rem;
}

h3 {
    font-size: 1.2rem;
}

@media (min-width: 1024px) {
    .project h1,
    .project h3 {
        text-align: left;
    }
}
</style>
