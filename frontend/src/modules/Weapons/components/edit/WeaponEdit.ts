import type WeaponInterface from '../../../Knights/interfaces/WeaponInterface';
import { defineComponent } from "vue";

export default defineComponent({
    name: 'WeaponEdit',
    props: {
        weapon: {
            type: Object as () => WeaponInterface,
            required: false,
            default: null,
        },
        weaponIndex: {
            type: Number,
            required: true
        },
        isUpdating: {
            type: Boolean,
            required: true
        },
        attributesListValues: {
            type: [],
            required: true
        },
        attributesListKeys: {
            type: [],
            required: true
        },
    },
    computed: {
        equipped: {
            get() {
                return this.weapon?.equipped;
            },
            set(equipedNewValue: boolean) {
                this.$emit('weaponEquippedChange', equipedNewValue, this.weaponIndex);
                this.weapon.equipped = equipedNewValue;
            }
        }
    },
    methods: {
        removeWeapon(weaponIndex: number) {
            this.$emit('removeWeapon', weaponIndex);
        }
    },
});