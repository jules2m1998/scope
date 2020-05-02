new Vue({
    el: '#container',
    vuetify: new Vuetify(),
    data: ({
        name: 'Jules',
        search: '',
        cases: null,
        death: null,
        recored: null,
        all: null,

    }),
    mounted() {
        axios.get("https://disease.sh/v2/all")
            .then(response => {
                this.cases = this.numberWithCommas(response.data.cases);
                this.death = this.numberWithCommas(response.data.deaths);
                this.recored = this.numberWithCommas(response.data.recovered)
            });
        axios.get("https://disease.sh/v2/countries")
            .then(response => {
                this.all = response.data
            })
    },
    methods: {
        numberWithCommas(x) {
            return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        },
        getPourcent(cases, recovered){
            return Math.trunc( recovered/cases * 100);
        },
        getColor(pourcent){
            if(pourcent <= 100 && pourcent >= 60){
                return '#009688';
            } else if(pourcent < 60 && pourcent >= 40){
                return '#FF9800'
            } else {
                return '#F44336'
            }
        }
    }
});