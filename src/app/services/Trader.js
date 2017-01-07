/**
 * Created by dx.yang on 2016/11/29.
 */


import lodash from 'lodash';
import moment from 'moment';

class Trader {
    constructor(data, money) {
        this.data = data;
        this.history = [];
        this.money = money;
        this.store = {
            num: 0,
            price: 0
        };
    }

    go() {
        lodash.forEach(this.data, (d, idx) => {
            let op = this.analysis(idx);
            if (!op) {
                return
            }

            if (op.buy && this.store.num === 0) {
                let price = d.y;
                let num = ~~(this.money / price);
                this.money = this.money - (price * num);
                this.store = {
                    num,
                    price
                };
                this.history.push({
                    op: 'buy',
                    num,
                    price,
                    money: this.money,
                    ts: moment(d.x).format('YYYY-MM-DD')
                });
            }
            if (op.sell && this.store.num != 0) {
                let price = d.y;
                let num = this.store.num;
                this.money = this.money + num * price;
                this.store = {
                    num: 0,
                    price: 0
                };
                this.history.push({
                    op: 'sell',
                    num: -num,
                    price,
                    money: this.money,
                    ts: moment(d.x).format('YYYY-MM-DD')
                });
            }
        });
    }

    analysis(pointIdx) {
        let data = this.data;

        if (pointIdx < 31) {
            return;
        }
        let point = data[pointIdx];
        let pointAvg5dSlope = point.avg_5 - data[pointIdx - 1].avg_5;
        let pointAvg30dSlope = point.avg_30 - data[pointIdx - 1].avg_30;

        let prevPointAvg5dSlope = data[pointIdx - 1].avg_5 - data[pointIdx - 2].avg_5;
        let prevPointAvg30dSlope = data[pointIdx - 1].avg_30 - data[pointIdx - 2].avg_30;

        let avg30dIsUp = pointAvg30dSlope > 0;
        let avg5dIsUpFastThen30d = pointAvg5dSlope > pointAvg30dSlope;
        let avgIsSpeedUp = (pointAvg5dSlope - pointAvg30dSlope) > (prevPointAvg5dSlope - prevPointAvg30dSlope);

        let buy = avg30dIsUp && avg5dIsUpFastThen30d && avgIsSpeedUp;

        let loss10percent = (this.store.price - data[pointIdx].close) / this.store.price > 0.1;

        let sell = !avg30dIsUp || loss10percent;
        if (sell) {
            buy = false;
        }

        return {
            sell,
            buy
        }
    }
}

export default Trader
