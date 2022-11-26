<template>
    <div class="item">
        <div class="details">
            <h3 class="header">
                <slot name="heading"></slot>
                <div class="underline" />
            </h3>
            <p>
                <slot name="p1"></slot>
            </p>
            <p>
                <slot name="p2"></slot>
            </p>
        </div>
    </div>
</template>

<style scoped>
.item {
    margin: 2rem 2rem;
    display: flex;
    font-family: Courier New;
    font-size: 1.2em;
}

.details {
    flex: 1;
    margin-left: 1rem;
}

.underline {
    margin-top: -0.5rem;
    height: 0.25rem;
    background-color: hsl(159.8, 92.1%, 60.2%);
}

.header {
    width: fit-content;
    font-size: 2.8rem;
    margin-bottom: 1rem;
}

i {
    display: flex;
    place-items: center;
    place-content: center;
    width: 32px;
    height: 32px;

    color: var(--color-text);
}

h3 {
    font-size: 1.2rem;
    font-weight: 500;
    margin-bottom: 0.4rem;
    color: var(--color-heading);
}

p {
    margin: 1rem 0;
}

/*@media (min-width: 1024px) {
    .item {
        margin-top: 0;
        padding: 0.4rem 0 1rem calc(var(--section-gap) / 2);
    }

    i {
        top: calc(50% - 25px);
        left: -26px;
        position: absolute;
        border: 1px solid var(--color-border);
        background: var(--color-background);
        border-radius: 8px;
        width: 50px;
        height: 50px;
    }

    .item:before {
        content: " ";
        position: absolute;
        left: 0;
        bottom: calc(50% + 25px);
        height: calc(50% - 25px);
    }

    .item:after {
        content: " ";
        position: absolute;
        left: 0;
        top: calc(50% + 25px);
        height: calc(50% - 25px);
    }

    .item:first-of-type:before {
        display: none;
    }

    .item:last-of-type:after {
        display: none;
    }
}*/
</style>
