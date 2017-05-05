/**
 * Created by tonghema on 19/04/2017.
 */
var Gamble = require("../models").GambleModel;
var respondSuccess = require('../utils/respond_fileter').respondSuccess;
var respondFailure = require('../utils/respond_fileter').respondFailure;
var Q = require('q');
var CONSTANTS = require('../utils/constants');
var _ = require('lodash');
var request = require('request');
var qlimit = require('qlimit');
var limit = qlimit(10);
/**
 * 获取赌局列表
 * @param req
 * @param res
 */
exports.getGamblesByList = function (req, res) {
    var page =  parseInt(req.query.page) || CONSTANTS.PAGINATE.PAGE;
    var limit = parseInt(req.query.limit) || CONSTANTS.PAGINATE.LIMIT;
    var options = {
        searchOption: {
            gameType: parseInt(req.query.gameType) || 1,
            gambleStatus: {'$nin': parseInt(req.query.gambleStatus) || 3 },
            isExist: CONSTANTS.EXIST_PRODUCTION.NO_EXIST
        },
        limit: limit,
        page: page,
        sortOption: {
            createdAt: -1
        }
    };
    if(req.query.matchName){
        options.searchOption.match = req.query.matchName;
        if(req.query.matchName === 'all'){
            delete options.searchOption.match;
        }
    }
    if(req.query.startTime && req.query.startTime){
        options.searchOption.match = req.query.matchName;
        if(req.query.matchName === 'all'){
            delete options.searchOption.match;
        }
    }
    if(req.query.gambleName){
        options.searchOption.gambleName = req.query.gambleName;
    }
    Gamble.findAllAndCount(options).then(function (results) {
        if(!results)
            respondFailure(res, 404, '赌局不存在');
        else
            respondSuccess(res, {gambles: results[0], count: results[1]}, 200);

    });
};
/**
 * 获取赌局详情
 * @param req
 * @param res
 */
exports.getGamble = function (req, res) {
    var gambleId = req.params.gambleId;
    Gamble.findById(gambleId).then(function (gameble) {
        if(!gameble)
            respondFailure(res, 404, '赌局不存在');
        else
            respondSuccess(res, gameble, 200);
    })
};
/**
 * 更新赌局信息
 * @param req
 * @param res
 */
exports.updateGamble = function (req, res) {
    var gambleId = req.params.gambleId;
    var optionB = req.body.optionB;
    var optionA = req.body.optionA;
    Gamble.update({_id: gambleId}, {'$set': {
        'optionA.riskFund': parseInt(optionA.riskFund), 'optionA.payCeiling': parseInt(optionA.payCeiling),
        'optionB.riskFund': parseInt(optionB.riskFund), 'optionB.payCeiling': parseInt(optionB.payCeiling)
        }}).then(function (result) {
            if(result && result.n === 0 && result.ok === 1){
                respondFailure(res, 404, '赌局不存在');
            }else{
                respondSuccess(res, {}, 201, '更新赌局成功');
            }
    })

};
/**
 * 保存赌局信息到正服数据
 * @param req
 * @param res
 */
exports.synchroGambleToPro = function (req, res) {
    var gambleId = req.body.gambleId;
    Gamble.findById(gambleId).populate('league').then(function (gamble) {
        if(!gamble){
            return respondFailure(res, 404, '赌局不存在');
        }
            return gamble;
    }).then(function (gamble) {
        var createUrl = CONSTANTS.SERVER_URL + '/addgamble';
        delete gamble.gambleId;
        var newGamble = {
            leagueName: gamble.league.leagueName,
            teamA: gamble.optionA.teamA,
            teamB: gamble.optionB.teamB,
            gameType: gamble.gameType,
            optionARiskFund: gamble.optionA.riskFund,
            optionBRiskFund: gamble.optionB.riskFund,
            gambleSource: gamble.gambleSource,
            gambleSourceId: gamble.gambleSourceId,
            gambleStatus: gamble.gambleStatus,
            endTime: gamble.endTime,
            gambleName: gamble.gambleName,
            optionAPayCeiling: gamble.optionA.payCeiling,
            optionBPayCeiling: gamble.optionB.payCeiling,
            gambleOptionA: gamble.optionA.name,
            gambleOptionB: gamble.optionB.name,
            optionAOdds: gamble.optionA.odds,
            optionBOdds: gamble.optionB.odds,
            gambleSourceAndSourceId: gamble.gambleSourceAndSourceId
        };
        return Q.fcall(function () {
            /**
             * 创建赌局
             */
            request.post({url: createUrl, form: newGamble, json: true}, function (err, requestGamble, body) {
                if (!err && requestGamble.statusCode === 200) {
                    if (body.status) {
                        console.log('同步创建赌局 ' + newGamble.leagueName + ' 成功！');
                        return Gamble.update({_id: gambleId}, {'$set': { 'isExist': CONSTANTS.EXIST_PRODUCTION.EXIST, isRefreshed: true}}).then(function(){
                            console.log("=====================");
                             respondSuccess(res, {}, 201, '同步创建赌局成功');
                        })


                    } else {
                        console.log('同步创建赌局 ' + newGamble.leagueName + ' 失败！');
                        respondFailure(res, 500, '同步创建赌局失败', err, body);

                    }
                } else {
                    console.log('同步创建赌局 ' + newGamble.leagueName + ' 失败！');
                        respondFailure(res, 500, '同步创建赌局失败', err, body);

                }
            });
        })
    }).fail(function (err) {
        return respondFailure(res, 404, '同步创建赌局失败');
    })
};

exports.synchroGambles = function () {
    var updateUrl = CONSTANTS.SERVER_URL + '/gambleupdate';
    return Q.fcall(function () {
        return Gamble.find({ 'isExist': CONSTANTS.EXIST_PRODUCTION.NO_EXIST }).then(function (gambles) {

            return Q.all(gambles.map(limit(function (gamble) {
                var getUrl = CONSTANTS.SERVER_URL + '/gamblesource?gambleSourceAndSourceId='+ gamble.gambleSourceAndSourceId;

                /**
                 * 更新赌局
                 */
                return Q.fcall(function () {
                    request.get({url: getUrl, json: true}, function (err, res, body) {
                        if (!err && res.statusCode === 200) {
                            if (body.status) {
                                return Gamble.update({ gambleSourceAndSourceId: gamble.gambleSourceAndSourceId }, {'$set': { 'isExist': CONSTANTS.EXIST_PRODUCTION.EXIST }})
                            } else {
                                return ''
                            }
                        } else {
                            return ''
                        }
                    });
                })
            })))
        })
    }).then(function () {
        return Gamble.find({ 'isExist': CONSTANTS.EXIST_PRODUCTION.EXIST, isRefreshed: false }).populate('league').then(function (gambles) {
            return Q.all(gambles.map(limit(function (gamble) {

                var newGamble = {
                    leagueName: gamble.league.leagueName,
                    teamA: gamble.optionA.teamA,
                    teamB: gamble.optionB.teamB,
                    gameType: gamble.gameType,
                    gambleType: gamble.gambleType,
                    optionARiskFund: gamble.optionA.riskFund,
                    optionBRiskFund: gamble.optionB.riskFund,
                    gambleSource: gamble.gambleSource,
                    gambleSourceId: gamble.gambleSourceId,
                    gambleStatus: gamble.gambleStatus,
                    endTime: gamble.endTime,
                    gambleName: gamble.gambleName,
                    optionAPayCeiling: gamble.optionA.payCeiling,
                    optionBPayCeiling: gamble.optionB.payCeiling,
                    gambleOptionA: gamble.optionA.name,
                    gambleOptionB: gamble.optionB.name,
                    optionAOdds: gamble.optionA.odds,
                    optionBOdds: gamble.optionB.odds,
                    gambleSourceAndSourceId: gamble.gambleSourceAndSourceId

                };

                /**
                 * 更新赌局
                 */
                request.post({url: updateUrl, form: newGamble, json: true}, function (err, res, body) {
                    if (!err && res.statusCode === 200) {
                        if (body.status) {
                            return Gamble.update({ gambleSourceAndSourceId: gamble.gambleSourceAndSourceId }, {'$set': { 'isExist': CONSTANTS.EXIST_PRODUCTION.EXIST, isRefreshed: true}})
                        } else {
                            return ''
                        }
                    } else {
                        return ''
                    }
                });
            })))

        })
    })

};
