<template>
  <v-card
          flat
          class="d-flex flex-column fill-height">
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
      <v-btn @click="send" color="primary" :disabled="finishChat">
        {{btnText}}
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
    export default {

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
                input: '',
                inputMsg: ''
            }
        },
      methods: {
        send() {
          if (this.startChat) {
            this.next++;
          } else {
            const name = this.messages[this.next - 1].ask
            this.person[name] = this.inputMsg
            this.messages.splice(this.next, 0, {
              text: this.inputMsg,
              owner: 'me'
            })
          }
          this.clearInput()
          this.incCount()
        },
        clearInput() {
          this.inputMsg = ''
        },
        incCount() {
          let active = true
          while (active) {
            if (typeof this.messages[this.next].ask === 'undefined') {
              this.next++
            } else {
              setTimeout(() => {
                this.next++
                this.$refs.text.focus()
              }, 700);
              active = false;
            }
          }
        },
      }
    }
</script>

<style scoped>
  ul {
    list-style: none;
    margin: 0;
    padding: 0;
    position: absolute;
    left: 0;
    right: 0;
    overflow-y: scroll;
    height: 600px;
    z-index: 0;
    padding-bottom: 100px;
  }

  ul li {
    display: inline-block;
    clear: both;
    padding: 20px;
    border-radius: 30px;
    margin-bottom: 2px;
    font-family: Helvetica, Arial, sans-serif;
  }

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

