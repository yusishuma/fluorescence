/**
 * Created by matonghe on 21/03/2017.
 */
var request = require('request');
var CONSTANTS = require('../../utils/constants');
var models = require('../../models/index');
var BetModel = models.BetModel;
var MatchModel = models.MatchModel;
var Q = require('q');
var qlimit = require('qlimit');
var limit = qlimit(10);

/**
 * 同步赛程到Temp
 */
exports.synchroMatchesToTemp = function () {
    return BetModel.find({exist_production: { '$nin': CONSTANTS.EXIST_PRODUCTION.EXIST }, teamStatus: CONSTANTS.EXIST_PRODUCTION.EXIST }).then(function (bets) {
        if(bets.length == 0){
            console.log('success');
            return "success"
        }
        else
            return Q.all(bets.map(limit(function (bet) {
                var newMatch = {
                    gameType: CONSTANTS.translateGameType(bet.game),
                    matchName: CONSTANTS.generateMatchName(bet.gamer_1.nick, bet.gamer_2.nick),
                    endTime: bet.date * 1000,
                    matchSource: bet.source,
                    matchSourceId: bet.id,
                    teamA: bet.gamer_1.nick,
                    teamB: bet.gamer_2.nick,
                    // teamAScore: bet.gamer_1.points,
                    // teamBScore: bet.gamer_2.points,
                    league: bet.tourn
                };
                return MatchModel.findOne({ matchName: generateMatchName(bet.gamer_1.nick, bet.gamer_2.nick) }).then(function (match) {
                    if(match){
                        console.log('更新temp match');
                        return MatchModel.update({ _id: match._id }, {});
                    }else{
                        console.log('创建temp match');
                        return new MatchModel(newMatch).save();
                    }
                })
            })));
    })
};
