/**
 * Created by dx.yang on 2016/12/6.
 */


import apiService from './apis';

function list() {
    return new Promise((resolve, reject) => {
        apiService.mongoListCollections().then(data => {
            let list = [];
            _.forEach(data, d => {
                if (d.name === 'list') {
                    return
                }
                list.push({
                    value: d.name,
                    label: d.name.replace('stock_', '')
                });
            });
            resolve(list);
        });
    });
}

function load(stock) {
    return new Promise((resolve, reject) => {
        apiService.stockData({
            name: stock
        }).then(data => {
            resolve(data);
        });
    });
}

function algorithm(algorithm, stock, condition) {
    return new Promise((resolve, reject) => {
        apiService.stockAlgorithm({
            algorithm,
            stock,
            condition
        }).then(data => {
            resolve(data);
        })
    });
}

export default {
    list,
    load,
    algorithm
}