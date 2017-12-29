var path = require("path");
var _ = require("lodash")
var adult = require(path.join(__dirname,'..','models','adult'));

var getError = function(code, message) {
  var toSend = new Error(message)
  toSend.statusCode = code;
  return toSend;
};

var alladult = function(req,res,next){
  adult.find({}).exec(function(err,data){
    if(!err){
      res.send(data);
      next();
    }else{
      return next(getError(500,err))
    }
  })
}

var alladultskiplimit = function(req,res,next){
  if(req.body.filter){
    var filterpayload = {};
    if(req.body.filter.race && req.body.filter.race.length >0){
      filterpayload["race"] = req.body.filter.race
    }
    if(req.body.filter.relationship && req.body.filter.relationship.length >0){
      filterpayload["relationship"] = req.body.filter.relationship
    }
    if(req.body.filter.sex && req.body.filter.sex.length >0){
      filterpayload["sex"] = req.body.filter.sex
    }
    adult.find(filterpayload).skip(req.body.skip).limit(req.body.limit).exec(function(err,data){
      if(!err){
        res.send(data);
        next();
      }else{
        return next(getError(500,err))
      }
    })
  }else{
    res.send([]);
    next();
  }
}

var count = function(req,res,next){
  if(req.body.type){
    var filter = "$"+req.body.type
    adult.aggregate([{
            $match: {
                source: { $not: { $size: 0 } }
            }
        },
        { $unwind: filter },
        {
            $group: {
                _id: { $toLower: filter },
                count: { $sum: 1 }
            }
        },
        {
            $match: {
                count: { $gte: 2 }
            }
        },
        { $sort: { count: -1 } },
        { $limit: 100 }
    ],function(err,data){
      var response = [];
      if(!err){
        _.each(data,function(d){
          var obj = []
          obj.push({v:d._id});
          obj.push({v:d.count});
          var temp = {
            c:obj
          }
          response.push(temp);
        })
        res.send(response);
        next();
      }else{
        return next(getError(500,err))
      }
    })
  }
}

exports.alladult = alladult;
exports.alladultskiplimit = alladultskiplimit;
exports.count = count;
