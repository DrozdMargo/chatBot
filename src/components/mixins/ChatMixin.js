export default {
    methods: {
        resetInput() {
            this.inputMsg = ''
        },
        incCounterWithDelay() {
            setTimeout(() => {
                this.next++
                this.$refs.text.focus()
            }, 700);
        }
    }
}
