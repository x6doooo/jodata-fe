/**
 * Created by dx.yang on 2016/11/23.
 */


export default {
    name: 'MainView',
    created() {
        console.log(this.$route);
    },
    methods: {
        handleSelect(idx) {
            this.$router.push({
                name: idx
            })
        }
    }
}
