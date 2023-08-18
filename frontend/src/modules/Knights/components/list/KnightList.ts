import { defineComponent } from "vue";
import KnightApiService from "../../services/KnightApiService";
import type ResponseDataInterface from "../../interfaces/ResponseDataInterface";
import type KnightInterface from "../../interfaces/KnightInterface";
import type { KnightFiltersInterface } from "./interfaces/KnightFiltersInterface";

export default defineComponent({
    name: "KnightList",
    props: {
        filters: {
            type: Object,
            required: false,
        },
        title: {
            type: String,
            required: false,
            default: "Cavaleiros",
        },
    },
    data() {
        return {
            knights: [] as KnightInterface[],
        };
    },
    methods: {
        getAllKnights(filters: KnightFiltersInterface = {}): void {
            KnightApiService.getAll(filters)
                .then((response: ResponseDataInterface) => {
                    this.knights = response.data;
                })
                .catch((e: Error) => {
                    console.log(e);
                });
        },

        deleteKnight(id: string): void {
            if(confirm('Deseja mesmo remover este Cavaleiro? Ele entrará para o Hall de Heróis.')) {
                KnightApiService.delete(id)
                    .then((response: ResponseDataInterface) => {
                        this.getAllKnights()
                    })
                    .catch((e: Error) => {
                        console.log(e);
                    });
            }
        },
    },
    mounted() {
        this.getAllKnights(this.filters);
    },
});