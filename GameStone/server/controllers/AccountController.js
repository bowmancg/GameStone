import { Auth0Provider } from '@bcwdev/auth0provider'
import { accountService } from '../services/AccountService'
import BaseController from '../utils/BaseController'
import { gatheringsService } from '../services/GatheringsService.js'
import { groupMemberService } from '../services/GroupMembersService'
import { accountGamesService } from '../services/AccountGamesService'
import { profileService } from '../services/ProfileService.js'

export class AccountController extends BaseController {
  constructor() {
    super('account')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      // .get('/profileGames', this.getProfileGames)
      .get('', this.getUserAccount)
      .get('/groupMembers', this.getMyGroups)
      .get('/players', this.getGatheringsPlayingIn)
      .get('/gatherings', this.getMyGatherings)
      .put('', this.updateAccount)
      // .put('/mode', this.changeMode)
      .delete("/accountGames/:id", this.deleteAccountGame)
  }
  // async changeMode(req, res, next) {
  //   try {
  //     let accountEdit = req.body
  //     const account = await profileService.changeMode(accountEdit)
  //     res.send(account)
  //   } catch (error) {
  //     next(error)
  //   }
  // }


  async updateAccount(req, res, next) {
    try {
      let user = req.userInfo
      let body = req.body
      const account = await accountService.updateAccount(user, body)
      res.send(account)
    } catch (error) {
      next(error)
    }
  }
  async getMyGatherings(req, res, next) {
    try {
      let accountId = req.userInfo.id
      const gatherings = await gatheringsService.getMyGatherings(accountId)
      res.send(gatherings)
    } catch (error) {
      next(error)
    }
  }

  async getUserAccount(req, res, next) {
    try {
      const account = await accountService.getAccount(req.userInfo)
      res.send(account)
    } catch (error) {
      next(error)
    }
  }

  async getGatheringsPlayingIn(req, res, next) {
    try {
      let accountId = req.userInfo.id
      let gatherings = await gatheringsService.getGatheringsPlayingIn(accountId)
      res.send(gatherings)
    } catch (error) {
      next(error)
    }
  }

  async getMyGroups(req, res, next) {
    try {
      let profileId = req.userInfo.id
      let groups = await groupMemberService.getMyGroups(profileId)
      res.send(groups)
    } catch (error) {
      next(error)
    }
  }

  // async getAccountGames(req, res, next) {
  //   try {
  //     let accountId = req.params.accountId
  //     let games = await accountGamesService.getAccountGames(accountId)
  //     res.send(games)
  //   } catch (error) {
  //     next(error)
  //   }
  // }

  // async getProfileGames(req, res, next) {
  //   try {
  //     let profileId = req.body.profileId
  //     let games = await accountGamesService.getProfileGames(profileId)
  //     res.send(games)
  //   } catch (error) {
  //     next(error)
  //   }
  // }

  async deleteAccountGame(req, res, next) {
    try {
      let accountGameId = req.params.id
      let userId = req.userInfo.id
      let message = await accountGamesService.deleteAccountGame(accountGameId, userId)
      res.send(message)
    } catch (error) {
      next(error)
    }
  }
}
