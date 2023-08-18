import { defineComponent } from "vue";
import type KnightInterface from "../../interfaces/KnightInterface";
import WeaponEdit from "../../../Weapons/components/edit/WeaponEdit.vue";
import type WeaponInterface from "../../interfaces/WeaponInterface";
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';
import { AttributesEnum } from "../../enums/AttributesEnum";

export default defineComponent({
    name: "KnightForm",
    components: {
        WeaponEdit,
        VueDatePicker,
    },
    props: {
        knight: {
            type: Object as () => KnightInterface,
            required: false,
            default: null,
        },
        isUpdating: {
            type: Boolean,
            required: true,
        },
    },
    data() {
        return {
            isEditingWeapons: false,
            attributesListValues: Object.values(AttributesEnum),
            attributesListKeys: Object.keys(AttributesEnum),
        }
    },
    methods: {
        newWeapon(): void {
           this.knight?.weapons.push({
               name: null,
               mod: null,
               attr: null,
               equipped: false,
           } as unknown as WeaponInterface)
        },
        removeWeapon(weaponIndex: number): void {
            this.knight?.weapons.splice(weaponIndex, 1);
        },
        handleWeaponEquippedChange(newEquippedValue: boolean, changedWeaponIndex: number) {
            // Disable "equipped" for all other weapons
            this.knight?.weapons.forEach((weapon: WeaponInterface, index: number) => {
                if (index !== changedWeaponIndex) {
                    weapon.equipped = false;
                }
            });
        }
    },
});