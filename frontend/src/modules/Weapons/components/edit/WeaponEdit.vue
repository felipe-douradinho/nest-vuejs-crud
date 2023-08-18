<template>
    <div class="accordion-item mb-2">
        <h2 class="accordion-header">
            <button class="accordion-button"
                    type="button"
                    data-bs-toggle="collapse"
                    :data-bs-target="`#collapseWeapon_${weaponIndex}`"
                    aria-expanded="true"
                    :aria-controls="`collapseWeapon_${weaponIndex}`">
                Editar arma: &nbsp; <strong>{{ weapon.name }}</strong>
            </button>
        </h2>
        <div :id="`collapseWeapon_${weaponIndex}`"
             class="accordion-collapse collapse show"
             data-bs-parent="#accordionWeapons">
            <div class="accordion-body">

                <div class="row">
                    <div class="col-md-3 mb-3">
                        <label for="name">Nome</label>
                        <input
                            :disabled="isUpdating"
                            v-model="weapon.name"
                            type="text"
                            class="form-control"
                            id="name"
                            required
                        />
                    </div>
                    <div class="col-md-3 mb-3">
                        <label :for="`mod_${weaponIndex}`">Mod</label>
                        <input
                            :disabled="isUpdating"
                            v-model="weapon.mod"
                            type="number"
                            class="form-control"
                            :id="`mod_${weaponIndex}`"
                        />
                    </div>
                    <div class="col-md-3 mb-3">
                        <label :for="`attr_${weaponIndex}`">Atributo</label>
                        <select
                            :disabled="isUpdating"
                            v-model="weapon.attr"
                            class="form-control"
                            :id="`attr_${weaponIndex}`"
                        >
                            <option :value="attribute" v-for="(attribute, value) in attributesListKeys">
                                {{ attributesListValues[value] }}
                            </option>
                        </select>
                    </div>
                    <div class="col-md-3 mb-3">
                        <div class="form-check">
                            <label class="form-check-label" :for="`equipped_${weaponIndex}`">
                                Equipado?
                            </label>
                            <input
                                :disabled="isUpdating"
                                v-model="equipped"
                                class="form-check-input"
                                type="checkbox"
                                :id="`equipped_${weaponIndex}`"
                            />
                        </div>
                    </div>
                </div>

                <div class="row">
                    <div class="col-md-12">
                        <button
                            :disabled="isUpdating"
                            @click="removeWeapon(weaponIndex)"
                            type="button"
                            class="btn btn-danger btn-sm">
                            Excluir Arma
                        </button>
                    </div>
                </div>

            </div>
        </div>
    </div>
</template>

<script src="./WeaponEdit.ts" lang="ts" />
<style src="./WeaponEdit.css" scoped />