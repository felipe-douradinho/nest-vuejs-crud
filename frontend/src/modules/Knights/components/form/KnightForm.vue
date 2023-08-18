<template>
    <div class="container mt-5">
        <div class="row">
            <div class="col-md-4 mb-3">
                <label for="name">Nome</label>
                <input v-model="knight.name"
                       :disabled="isUpdating"
                       type="text"
                       class="form-control"
                       id="name"
                       required
                />
            </div>
            <div class="col-md-4 mb-3">
                <label for="nickname">Apelido</label>
                <input
                    v-model="knight.nickname"
                    type="text"
                    class="form-control"
                    id="nickname"
                />
            </div>
            <div class="col-md-4 mb-3">
                <label for="birthday">Data de Nascimento</label>
                <VueDatePicker
                    :disabled="isUpdating"
                    v-model="knight.birthday"
                    :model-type="knight.birthday ? null : 'yyyy-MM-dd'"
                    format="dd/MM/yyyy"
                />
            </div>
        </div>
        <div class="row">
            <div class="form-group mb-3">
                <label for="keyAttribute">Atributo Chave</label>
                <select
                    :disabled="isUpdating"
                    v-model="knight.keyAttribute"
                    class="form-control"
                    id="keyAttribute"
                >
                    <option :value="attribute" v-for="(attribute, value) in attributesListKeys">
                        {{ attributesListValues[value] }}
                    </option>
                </select>
            </div>
        </div>
        <div class="row">
            <div class="col-md-2 mb-3">
                <label for="name"><strong>Atributo:</strong> Força</label>
                <input v-model="knight.attributes.strength"
                       v-if="knight.attributes?.strength || !isUpdating"
                       :disabled="isUpdating"
                       type="number"
                       class="form-control"
                       id="attr_strength"
                       required
                />
            </div>
            <div class="col-md-2 mb-3">
                <label for="name"><strong>Atributo:</strong> Destreza</label>
                <input v-model="knight.attributes.dexterity"
                       v-if="knight.attributes?.dexterity || !isUpdating"
                       :disabled="isUpdating"
                       type="number"
                       class="form-control"
                       id="attr_dexterity"
                       required
                />
            </div>
            <div class="col-md-2 mb-3">
                <label for="name"><strong>Atributo:</strong> Constituição</label>
                <input v-model="knight.attributes.constitution"
                       v-if="knight.attributes?.constitution || !isUpdating"
                       :disabled="isUpdating"
                       type="number"
                       class="form-control"
                       id="attr_constitution"
                       required
                />
            </div>
            <div class="col-md-2 mb-3">
                <label for="name"><strong>Atributo:</strong> Inteligência</label>
                <input v-model="knight.attributes.intelligence"
                       v-if="knight.attributes?.intelligence || !isUpdating"
                       :disabled="isUpdating"
                       type="number"
                       class="form-control"
                       id="attr_intelligence"
                       required
                />
            </div>
            <div class="col-md-2 mb-3">
                <label for="name"><strong>Atributo:</strong> Sabedoria</label>
                <input v-model="knight.attributes.wisdom"
                       v-if="knight.attributes?.wisdom || !isUpdating"
                       :disabled="isUpdating"
                       type="number"
                       class="form-control"
                       id="attr_wisdom"
                       required
                />
            </div>
            <div class="col-md-2 mb-3">
                <label for="name"><strong>Atributo:</strong> Carisma</label>
                <input v-model="knight.attributes.charisma"
                       v-if="knight.attributes?.charisma || !isUpdating"
                       :disabled="isUpdating"
                       type="number"
                       class="form-control"
                       id="attr_charisma"
                       required
                />
            </div>
        </div>

        <div class="row">
            <div class="col-md-3 col-sm-7 col-lg-4 col-xl-3 mb-4">
                <div class="form-group d-flex justify-content-between">
                    <button type="button"
                            @click="isEditingWeapons = !isEditingWeapons"
                            class="btn btn-primary"
                            data-toggle="modal"
                            data-target="#weaponsModal"
                    >
                        Editar Armas
                    </button>
                </div>
            </div>
        </div>

        <div class="accordion mb-5"
             id="accordionWeapons" v-if="isEditingWeapons">
            <div v-for="(weapon, weapon_index) in knight?.weapons" :key="weapon_index">
                <WeaponEdit
                    :weapon="weapon"
                    :weaponIndex="weapon_index"
                    :isUpdating="isUpdating"
                    :attributesListValues="attributesListValues"
                    :attributesListKeys="attributesListKeys"
                    @removeWeapon="removeWeapon"
                    @weaponEquippedChange="handleWeaponEquippedChange"
                />
            </div>

            <div class="row">
                <div class="col-md-12">
                    <button
                        :disabled="isUpdating"
                        type="button"
                        @click="newWeapon"
                        class="btn btn-success btn-sm col-md-12"
                    >
                        + Nova Arma
                    </button>
                </div>
            </div>
        </div>

        <div class="row mb-4">&nbsp;</div>

    </div>
</template>

<script src="./KnightForm.ts" lang="ts" />
<style src="./KnightForm.css" scoped />