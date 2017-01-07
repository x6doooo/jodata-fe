/**
 * Created by dx.yang on 2016/11/29.
 */



const apis = {
    stockList: {
        url: '/api/stock-list',
        method: 'get'
    }
    // stockList: {
    //     url: '/api/stock-list',
    //     method: 'post',
    //     defaultParams: {
    //         aggregate: [{
    //             $match: {
    //                 volume: {
    //                     $gt: 0
    //                 }
    //             }
    //         }, {
    //             $limit: 200
    //         }, {
    //             $sort: {
    //                 volume: -1
    //             }
    //         }]
    //     }
    // },
    // stockChart: {
    //     url: '/api/stock-chartData',
    //     method: 'get',
    //     defaultParams: {}
    // },
    // mongoExec: {
    //     url: '/api/mongo/exec',
    //     method: 'post',
    //     defaultParams: {}
    // },
    // mongoFind: {
    //     url: '/api/mongo/find',
    //     method: 'post',
    //     defaultParams: {}
    // },
    //
    // mongoInsert: {
    //     url: '/api/mongo/insert',
    //     method: 'post',
    //     defaultParams: {}
    // },
    // mongoListCollections: {
    //     url: '/api/mongo/listCollections',
    //     method: 'get',
    //     defaultParams: {}
    // },
    //
    // stockData: {
    //     url: '/api/stock/data',
    //     method: 'get'
    // },
    //
    // stockAlgorithm: {
    //     url: '/api/stock/algorithm',
    //     method: 'post'
    // }
};


var requester = {};
_.forEach(apis, (theApi, name) => {
    requester[name] = function (params) {
        params = params || {};
        let defaultParams = theApi.defaultParams || {};
        params = _.assign(defaultParams, params);
        let req;
        if (theApi.method === 'get') {
            let url = theApi.url;
            if (!_.isEmpty(params)) {
                params = $.param(params);
                url += '?' + params;
            }
            req = fetch(url)
        } else {
            req = fetch(theApi.url,  {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(params)
            })
        }
        return req.then(function checkStatus(response) {
            if (response.status >= 200 && response.status < 300) {
                return response
            } else {
                let error = new Error(response.statusText);
                error.response = response;
                throw error
            }
        }).then(resp => {
            return resp.json();
        });
    };
});


export default requester;