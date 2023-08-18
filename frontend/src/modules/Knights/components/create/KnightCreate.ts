import { defineComponent } from "vue";
import KnightApiService from "../../services/KnightApiService";
import type KnightInterface from "../../interfaces/KnightInterface";
import type ResponseDataInterface from "../../interfaces/ResponseDataInterface";
import KnightEdit from "../edit/KnightEdit.vue";
import KnightForm from "../form/KnightForm.vue";
import type AttributeInterface from "../../interfaces/AttributeInterface";
import type WeaponInterface from "../../interfaces/WeaponInterface";

export default defineComponent({
    name: "KnightCreate",
    components: {
        KnightForm,
        KnightEdit,
    },
    data() {
        return {
            knight: {
                _id: null,
                name: null,
                nickname: null,
                birthday: null,
                weapons: [] as WeaponInterface[],
                age: 0,
                attack: 0,
                exp: 0,
                attributes: {
                    _id: null,
                    strength: 0,
                    dexterity: 0,
                    constitution: 0,
                    intelligence: 0,
                    wisdom: 0,
                    charisma: 0,
                } as unknown as AttributeInterface,
                keyAttribute: null,
            } as unknown as KnightInterface,
        };
    },
    methods: {
        createKnigth() {
            KnightApiService.create(this.knight)
                .then((response: ResponseDataInterface) => {
                    this.$router.push('/knights');
                })
                .catch((e: Error) => {
                    console.log(e);
                });
        },
    },
});