<template>
    <v-app>
        <Toolbar/>
        <v-container
                class="fill-height pa-0 ">
            <v-row class="no-gutters elevation-4">
                <v-col
                        cols="auto"
                        class="flex-grow-1 flex-shrink-0"
                >
                    <v-responsive
                            class="overflow-y-hidden fill-height"
                            height="500"
                    >

                        <ChatDialog :messages="messages"/>
                    </v-responsive>
                </v-col>
            </v-row>
        </v-container>
    </v-app>
</template>

<script>
    import axios from 'axios';
    import ChatDialog from './components/ChatDialog'
    import Toolbar from './components/Toolbar'

    export default {
        name: 'App',
        components: {ChatDialog, Toolbar},

        data: () => ({
            messages: [],
        }),
        created() {
            this.fetchData()
        },
        methods: {
            async fetchData() {
                axios.get('/messages.json').then(response => {
                    this.messages = response.data.messages
                })
            },
        }
    };
</script>


