<template>
    <div class="container mt-5">
        <div class="row">
            <div class="col-md-12">
                <h3>Criar novo Cavaleiro</h3>
            </div>
        </div>

        <KnightForm
            :knight="knight"
            :isUpdating="false"
        />

        <button
            @click="createKnigth"
            type="button"
            class="btn btn-success">
            Criar Cavaleiro
        </button>
    </div>
</template>

<script src="./KnightCreate.ts" lang="ts" />
<style src="./KnightCreate.css" scoped />