<template>
    <div id="app">
        <nav class="navbar navbar-expand navbar-dark bg-dark">
            <router-link to="/" class="navbar-brand">Knights CRUD</router-link>
            <div class="navbar-nav mr-auto">
                <li class="nav-item">
                    <router-link to="/knights" class="nav-link">List Knights</router-link>
                </li>
                <li class="nav-item">
                    <router-link to="/heroes" class="nav-link">List Heroes</router-link>
                </li>
                <li class="nav-item">
                    <router-link to="/knights/create" class="nav-link">Create Knight</router-link>
                </li>
            </div>
        </nav>

        <div class="container mt-3">
            <router-view />
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
    name: "App",
});
</script>