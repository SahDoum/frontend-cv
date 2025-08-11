<template>
    <div ref=text>
        <slot></slot>
    </div>
</template>

<script>
export default {
    props: {
        text: "",
    },
    data: function() {
        return {
            text: this.text,
            isLoaded: false,
        };
    },
    mounted: function() {
        this.$refs.text.style.fontFamily = "'Redaction 100',sans-serif";
    },
    methods: {
        load: async function() {
            if (this.isLoaded) return;

            var textDiv = this.$refs.text;

            //await new Promise(r => setTimeout(r, 100));
            textDiv.style.fontFamily = "'Redaction 70',sans-serif";
            await new Promise(r => setTimeout(r, 50));
            textDiv.style.fontFamily = "'Redaction 50',sans-serif";
            await new Promise(r => setTimeout(r, 50));
            textDiv.style.fontFamily = "'Redaction 35',sans-serif";
            await new Promise(r => setTimeout(r, 50));
            textDiv.style.fontFamily = "'Redaction 20',sans-serif";
            await new Promise(r => setTimeout(r, 50));
            textDiv.style.fontFamily = "'Redaction 10',sans-serif";
            await new Promise(r => setTimeout(r, 50));
            textDiv.style.fontFamily = "'Redaction',sans-serif";
            // await new Promise(r => setTimeout(r, 300));

            this.isLoaded = true;
        },

        revert: function() {
            var textDiv = this.$refs.text;
            textDiv.style.fontFamily = "'Redaction 70',sans-serif";
            this.isLoaded = false;
        },

    },
};
</script>

<style scoped>

</style>