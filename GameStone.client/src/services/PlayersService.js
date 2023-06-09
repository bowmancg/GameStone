import { AppState } from "../AppState.js"
import { Player } from "../models/Player.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"


class PlayersService {


    async becomePlayer(gatheringId) {
        const res = await api.post('api/players', gatheringId)
        logger.log(res.data, 'becoming a player')
        AppState.players.push(new Player(res.data))
        logger.log(AppState.players, 'new appstate player')
    }

    async getGatheringPlayers(gatheringId) {
        const res = await api.get(`api/gatherings/${gatheringId}/players`)
        logger.log("GETTING PLAYER", res.data)
        AppState.players = res.data.map(p => new Player(p))
        logger.log(AppState.players, 'all players')
    }

    async quit(playerId) {
        logger.log(playerId)
        const res = await api.delete(`api/players/${playerId}`)
        logger.log(res.data)
        AppState.players = AppState.players.filter(p => p.id != playerId)
    }
}

export const playersService = new PlayersService()