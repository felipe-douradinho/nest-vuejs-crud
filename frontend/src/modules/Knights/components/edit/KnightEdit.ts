import { defineComponent } from "vue";
import KnightApiService from "../../services/KnightApiService";
import type ResponseDataInterface from "../../interfaces/ResponseDataInterface";
import type KnightInterface from "../../interfaces/KnightInterface";
import KnightForm from "../form/KnightForm.vue";

export default defineComponent({
    name: "KnightEdit",
    components: {
        KnightForm,
    },
    data() {
        return {
            knight: {} as KnightInterface,
        };
    },
    methods: {
        async getKnight(id: any): Promise<void> {
            await KnightApiService.get(id)
                .then((response: ResponseDataInterface) => {
                    this.knight = response.data;
                })
                .catch((e: Error) => {
                    console.log(e);
                });
        },

        updateKnight() {
            const data = {
                nickname: this.knight.nickname,
            }

            KnightApiService.update(this.knight._id, data)
                .then((response: ResponseDataInterface) => {
                    this.$router.push('/knights');
                })
                .catch((e: Error) => {
                    console.log(e);
                });
        },
    },
    mounted() {
        this.getKnight(this.$route.params.id);
    },
});