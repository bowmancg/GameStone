import { Auth0Provider } from "@bcwdev/auth0provider";
import BaseController from "../utils/BaseController.js";
import { gatheringsService } from "../services/GatheringsService.js";
import { playersService } from "../services/PlayersService.js";
import { chatsService } from "../services/ChatsService.js";
import { gatheringGamesService } from "../services/GatheringGamesService.js";
import { socketProvider } from "../SocketProvider.js";


export class GatheringsController extends BaseController {
    constructor() {
        super('api/gatherings')
        this.router
            .get("", this.getAllGatherings)
            .get("/:id", this.getGatheringById)
            .get("/:id/gatheringGames", this.getGatheringGames)
            .get("/:id/chats", this.getChats)
            .get("/:id", this.getOne)
            .get("/:id/players", this.getGatheringPlayers)
            .use(Auth0Provider.getAuthorizedUserInfo)
            .put("/:id", this.editGathering)
            .post("", this.createGathering)
            .delete("/:id", this.cancelGathering)
    }

    async getOne(req, res, next) {
        try {
            let chatId = req.params.id
            let chat = await chatsService.getOne(chatId)
            res.send(chat)
        } catch (error) {
            next(error)
        }
    }

    async getGatheringPlayers(req, res, next) {
        try {
            let gatheringId = req.params.id
            let players = await playersService.getGatheringPlayers(gatheringId)
            res.send(players)
        } catch (error) {
            next(error)
        }
    }



    //Get All Gatherings
    async getAllGatherings(req, res, next) {
        try {
            // let query = req.query
            let query = req.query.query
            let gatherings = await gatheringsService.getAllGatherings(query)
            res.send(gatherings)
        } catch (error) {
            next(error)
        }
    }



    // Get One Gathering
    async getGatheringById(req, res, next) {
        try {
            let gatheringId = req.params.id
            let gathering = await gatheringsService.getGatheringById(gatheringId)
            res.send(gathering)

        } catch (error) {
            next(error)
        }
    }

    // Edit Gathering
    async editGathering(req, res, next) {
        try {
            const gatheringEdits = req.body
            const gatheringId = req.params.id
            const userId = req.userInfo.id
            const editedGathering = await gatheringsService.editGathering(gatheringEdits, gatheringId, userId)
            res.send(editedGathering)
        } catch (error) {
            next(error)
        }
    }



    // Create Gathering
    async createGathering(req, res, next) {
        try {
            let gData = req.body
            let userId = req.userInfo.id
            gData.creatorId = userId
            let gathering = await gatheringsService.createGathering(gData)
            socketProvider.message("s:created:gathering", gathering)
            res.send(gathering)
        } catch (error) {
            next(error)
        }
    }

    //Cancel Gathering
    async cancelGathering(req, res, next) {
        try {
            let userId = req.userInfo.id
            let gatheringId = req.params.id
            let gathering = await gatheringsService.cancelGathering(gatheringId, userId)
            res.send(gathering)
        } catch (error) {
            next(error)
        }
    }

    async getChats(req, res, next) {
        try {
            let gatheringId = req.params.id
            let chats = await gatheringsService.getChats(gatheringId)
            return res.send(chats)
        } catch (error) {
            next(error)
        }
    }

    async getGatheringGames(req, res, next) {
        try {
            let gatheringId = req.params.id
            let games = await gatheringGamesService.getGatheringGames(gatheringId)
            return res.send(games)
        } catch (error) {
            next(error)
        }
    }
}