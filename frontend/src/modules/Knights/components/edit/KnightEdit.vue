<template>
    <div class="container mt-5 mb-5">
        <div class="row">
            <div class="col-md-12">
                <h3>Editar "{{ knight.name }}"</h3>
            </div>
        </div>

        <KnightForm
            :knight="knight"
            :isUpdating="true"
        />

        <button
            @click="updateKnight"
            type="button"
            class="btn btn-success mb-5">
            Salvar Cavaleiro
        </button>
    </div>
</template>

<script src="./KnightEdit.ts" lang="ts" />
<style src="./KnightEdit.css" scoped />