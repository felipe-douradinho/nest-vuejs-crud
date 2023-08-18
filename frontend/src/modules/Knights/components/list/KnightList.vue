<template>
    <div class="container mt-5 mb-5">
        <div class="row mb-4">
            <div class="col-md-12">
                <h3>Lista de {{ title }}</h3>
            </div>
        </div>

        <table class="table">
            <thead>
            <tr>
                <th>Nome</th>
                <th>Idade</th>
                <th>Armas</th>
                <th>Atributo</th>
                <th>Ataque</th>
                <th>Exp</th>
                <th>Ações</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(knight, index) in knights" :key="knight._id">
                <td>{{ knight.name }}</td>
                <td>{{ knight.age }}</td>
                <td>{{ knight.weapons.length }}</td>
                <td>{{ knight.keyAttribute }}</td>
                <td>{{ knight.attack }}</td>
                <td>{{ knight.exp }}</td>
                <td>
                    <router-link
                        :to="`/knights/${ knight._id }/edit`"
                        class="badge badge-warning">
                        <button class="btn btn-warning">
                            Editar
                        </button>
                    </router-link>
                    <button
                        v-if="!filters?.is_hero"
                        @click="deleteKnight(knight._id)"
                        class="btn btn-danger">
                        Deletar
                    </button>
                </td>
            </tr>
            </tbody>
        </table>
    </div>
</template>

<script src="./KnightList.ts" lang="ts" />
<style src="./KnightList.css" scoped />