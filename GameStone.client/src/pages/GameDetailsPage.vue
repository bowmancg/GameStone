<template>
    <div class="container-fluid">
        <div class="row justify-content-center">
            <div class="col-xl-11 py-3">
                <div class="row">
                    <h2>{{ game.name }}</h2>
                    <div v-if="account.lightMode" class="text-secondary col-xl-7" v-html="game.description">
                    </div>
                    <div v-else class="text-white col-xl-7" v-html="game.description">
                    </div>
                    <div class="col-xl-5 text-center">
                        <img :src="game.image_url" class="imgContainer ms-4 mb-3">
                    </div>
                </div>
            </div>
        </div>
        <div class="row justify-content-center mt-4">
            <!-- SECTION REORGANIZING -->
            <div class="col-xl-11">
                <div class="row">
                <div class="col-xl-7">
                    <div class="row">
                        <div class="col-4">
                            <p v-if="account.lightMode">Players: <span class="text-secondary">{{ game.min_players }} - {{ game.max_players }}</span></p>
                                <p v-else>Players: <span class="text-white">{{ game.min_players }} - {{ game.max_players }}</span></p>

                            <p v-if="account.lightMode">Categories: <span class="text-secondary" id="gameCategories"
                                v-for="c in activeCategories" :key="c.id"><br />{{ c.name }}</span></p>
                                <p v-else>Categories: <span class="text-white" id="gameCategories" v-for="c in activeCategories"
                                :key="c.id"><br />{{
                                    c.name }}</span></p>
                        </div>
                        <div class="col-4">
                            <p v-if="account.lightMode">Playtime:<span class="text-secondary">{{ game.min_playtime }} - {{ game.max_playtime }}</span></p>
                                <p v-else>Playtime: <span class="text-white">{{ game.min_playtime }} - {{ game.max_playtime }}</span></p>

                            <p v-if="account.lightMode">Mechanics: <span class="text-secondary" id="gameMechanics"
                                v-for="m in activeMechanics" :key="m.id"><br />{{
                                    m.name }}</span></p>
                                <p v-else>Mechanics: <span class="text-white" id="gameMechanics" v-for="m in activeMechanics"
                                :key="m.id"><br />{{
                                    m.name }}</span></p>
                        </div>
                        <div class="col-md-4">
                            <button class="btn btn-info border rounded-pill selectable my-2" @click="searchGatherings()">Find Gatherings</button>
                            <button v-if="!profileGames && account.id" @click="addGame()" class="btn btn-info border rounded-pill selectable">Add Game to Collection</button>
                            
                        </div>
                        <div class="col-md-4">
                            
                        </div>
                    </div>
                </div>
                <div class="col-xl-5">
                    <div class="row text-center" v-if="gatherings.length > 0">
                        <h4>Gatherings Playing This Game</h4>
                    </div>
                    <div class="row" v-if="gatherings.length > 0">
                        <div class="col-12" v-for="g in gatherings" :key="g?.id">
                        <GatheringCard :gathering="g" />
                    </div>
                </div>
        </div>
                </div>
            </div>
            <!-- SECTION END -->
            
        </div>
        <div class="row">
            
            
        </div>
        <div class="row justify-content-center my-4">
            <!-- <div class="col-md-3">
                <button class="btn btn-info border rounded-pill selectable" @click="searchGatherings()">Find
                    Gatherings</button>
            </div> -->
            
        </div>
        
    </div>
    <Modal id="gatheringModal">

        <template #header>
            <h5>Create Gathering!</h5>
        </template>

        <template #modalBody>
            <CreateGatheringForm />
        </template>

    </Modal>
</template>


<script>
import { useRoute } from "vue-router";
import { AppState } from '../AppState';
import { gatheringsService } from '../services/GatheringsService'
import { computed, reactive, onMounted, watchEffect } from 'vue';
import { logger } from "../utils/Logger.js";
import Pop from "../utils/Pop.js";
import { gamesService } from "../services/GamesService.js"
import Modal from "../components/Modal.vue";
import { AccountGame } from "../models/AccountGame.js";
import GatheringCard from "../components/GatheringCard.vue";
export default {
    setup() {
        const route = useRoute();
        async function getGameById() {
            try {
                const gameId = route.params.gameId;
                await gamesService.getGameById(gameId);
            }
            catch (error) {
                logger.log(error);
                Pop.error(error.message);
            }
        }

        async function getProfileGames() {
            try {
                const accountId = AppState.account.id
                logger.log("is this stupid thing working? pls be", accountId)
                await gamesService.getProfileGames(accountId)
            } catch (error) {
                logger.error(error.message)
                Pop.error(error.message)
            }
        }

        onMounted(() => {
            getGameById();
            AppState.gatherings = []
        });

        watchEffect(() => {
            if (AppState.account.id) {
                getProfileGames()
            }
        })
        return {
            game: computed(() => AppState.activeGame),
            profileGames: computed(() => AppState.profileGames.find(g => g.gameId == AppState.activeGame.id)),
            account: computed(() => AppState.account),
            gatherings: computed(() => AppState.gatherings),


            activeCategories: computed(() => {
                const game = AppState.activeGame;
                const categories = [];
                game.categories?.forEach(c => {
                    let foundCategory = AppState.gameCategories.find(gc => gc.id == c.id);
                    categories.push(foundCategory);
                });
                return categories;
            }),
            activeMechanics: computed(() => {
                const game = AppState.activeGame;
                const mechanics = [];
                game.mechanics?.forEach(m => {
                    let foundMechanic = AppState.gameMechanics.find(gm => gm.id == m.id);
                    mechanics.push(foundMechanic);
                });
                return mechanics;
            }),
            // , activeMechanics: computed(() => AppState?.activeMechanics)
            // gameDescription: computed(() => AppState.activeGame.description?.replace(/<[^>]+>|&quot;/g, ' ')),
            // gameCategories: computed(() => AppState.gameCategories),
            async addGame() {
                try {
                    let game = { gameId: this.game.id, gameName: this.game.name, gameImg: this.game.image_url }
                    // logger.log(game)
                    await gamesService.addGame(game)
                    await Pop.toast('Added game to your collection', 'success', 'center')
                } catch (error) {
                    logger.log(error.message)
                    Pop.error(error.message)
                }
            },

            async searchGatherings() {
                try {
                    const query = AppState.activeGame.name
                    logger.log(query)
                    const gatherings = await gatheringsService.searchGatherings(query)
                    logger.log('game search page', gatherings)
                } catch (error) {
                    logger.log(error.message)
                    Pop.error(error.message)
                }
            }
        };
    },
    components: { Modal, GatheringCard }
};
</script>


<style lang="scss" scoped>
.imgContainer {
    width: auto;
    max-height: 40vh;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.3);
    transition: 0.3s;
    border-radius: 30px;
    background-color: #d9d9d9;
}

@media screen and (max-width: 700px) {
    .imgContainer {
        width: 80vw;
        max-height: 40vh;
    }
}

@media screen and (min-width: 1200px) {
    .imgContainer {
        max-width: 35vw;
    }
}
</style>