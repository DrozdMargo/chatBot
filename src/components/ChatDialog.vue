<template>
    <v-card
            flat
            class="d-flex flex-column fill-height pa-3">
        <v-card-title>
            Let's talk
        </v-card-title>
        <v-card-text class="flex-grow-1 overflow-y-auto">
            <div v-if="messages.length">
                <template v-for="(msg, i) in messages.slice(0, next)">
                    <div :key="i"
                         class="d-flex"
                         :class="msg.owner === 'me' ? 'd-flex flex-row-reverse': ''"
                    >
                        <vue-typed-js :strings="[msg.text]" :showCursor="false">
                            <span class="typing" :class="msg.owner"></span>
                        </vue-typed-js>
                    </div>
                </template>
            </div>

        </v-card-text>
        <v-card-actions class="flex-shrink-1">
            <v-text-field
                    v-model="inputMsg"
                    label="Type your message"
                    type="text"
                    ref="text"
                    no-details
                    outlined
                    @keyup.enter="send"
                    hide-details
            />
            <v-btn @click="send" color="primary" :disabled="finishChat" class="ma-3">
                {{btnText}}
            </v-btn>
        </v-card-actions>
    </v-card>
</template>

<script>
    import ChatMixin from './mixins/ChatMixin'

    export default {
        mixins: [ChatMixin],
        props: {
            messages: {
                type: Array,
                default: () => []
            }
        },
        computed: {
            finishChat() {
                return this.next >= this.messages.length
            },
            startChat() {
                return this.next === 0
            },
            btnText() {
                return this.startChat ? 'Start chat' : 'Send Message'
            }
        },

        data() {
            return {
                person: {
                    name: '',
                    age: 0,
                    location: '',
                    feeling: '',
                    hobby: '',
                },
                next: 0,
                inputMsg: ''
            }
        },
        methods: {
            send() {
                if (this.startChat) {
                    this.next++;
                } else {
                  this.addUserData()
                }
                this.resetInput()
                this.incCount()
            },
            addUserData() {
                const name = this.messages[this.next - 1].ask
                this.person[name] = this.inputMsg
                this.messages.splice(this.next, 0, {
                    text: this.inputMsg,
                    owner: 'me'
                })
            },
            incCount() {
                let active = true
                while (active) {
                    if (this.messages[this.next] && typeof this.messages[this.next].ask === 'undefined') {
                        this.next++
                    } else {
                        this.incCounterWithDelay()
                        active = false;
                    }
                }
            },
        }
    }
</script>

<style scoped>

    .him.typing {
        background: #eee;
    }

    .me.typing {
        background: #0084ff;
        color: #fff;
    }


    .him, .me {
        border-radius: 5px;
        padding: 10px;
        margin: 3px;
    }

</style>

