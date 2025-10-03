<script setup>
import { computed, ref } from 'vue';
import { Input, Select, Button, Disclose, Tag} from 'agnostic-vue';
import "agnostic-vue/dist/index.css";
import "agnostic-vue/dist/common.min.css";

import FacultyCard from "./FacultyCard.vue";

// Props to receive the faculty collection data
const props = defineProps({
    instructorList: Object, 
    filter: Object
});

// Reactive references for search inputs
const instructors = props.instructorList; 
const search_text = ref("");
// advanced search for related projects (tag-based)
const showAdvanced = ref(false);
const advancedTerm = ref("");
const advancedSearchTags = ref([]);

function addAdvancedTag() {
    const term = advancedTerm.value.trim().toLowerCase();
    if (term && !advancedSearchTags.value.includes(term)) {
        advancedSearchTags.value.push(term);
    }
    advancedTerm.value = "";
}
function removeAdvancedTag(i) {
    advancedSearchTags.value.splice(i, 1);
}

// Suggestions for related projects
const keywordOptions = computed(() => {
    const set = new Set();
    instructors.forEach(s => {
        const projectList = Array.isArray(s.relatedProjects) ? s.relatedProjects : [];
        projectList.forEach(p => {
            const title = (p?.title ?? "").toString().trim();
            //const pid = (p?.id ?? "").toString().trim();
            if (title) set.add(title.toLowerCase());
            //if (pid) set.add(pid.toLowerCase()); 
        });
    });
    return Array.from(set);
});

function basicMatches(faculty) {
    const q = search_text.value.trim().toLowerCase();
    if (!q) return true;
    const d = faculty?.data || {};
    return !!(d.name && String(d.name).toLowerCase().includes(q));
}

function advancedMatches(faculty) {
    if (advancedSearchTags.value.length === 0) return true;
    const rel = Array.isArray(faculty.relatedProjects) ? faculty.relatedProjects : [];

    // Build candidate strings per project
    const baskets = rel.map(p => {
        const title = (p?.title ?? "").toString().toLowerCase();
        const pid = (p?.id ?? "").toString().toLowerCase();
        return [title, pid].filter(Boolean);
    });

    // Every tag must match at least one value in any basket
    return advancedSearchTags.value.every(term =>
        baskets.some(arr => arr.some(v => v.includes(term)))
    );
}

const filteredInstructors = computed(() =>
    instructors.filter(f => basicMatches(f) && advancedMatches(f))
);

const base = import.meta.env.BASE_URL;

</script>

<template>
    <div>
        <section class="mbe40">

            <!-- Input for searching faculty -->
            <Input id="faculty-search" is-underlined is-underlined-with-background 
                placeholder="Enter faculty name ..." 
                label="Search for faculty" 
                type="text" 
                v-model="search_text" />

            <!-- ADVANCED: projects taught -->
            <Disclose :is-open="showAdvanced" title="🔍 Advanced Search">
                <Input
                    v-model="advancedTerm"
                    @keydown.enter.prevent="addAdvancedTag"
                    list="faculty-keyword-list"
                    placeholder="Type a project keyword, then press Enter"
                    class="w-full mb-2"
                />
                <datalist id="faculty-keyword-list">
                    <option v-for="opt in keywordOptions" :key="opt" :value="opt" />
                </datalist>

                <div class="flex flex-wrap gap-2 mt-1">
                    <Tag
                        v-for="(tag, i) in advancedSearchTags"
                        :key="tag + i"
                        class="mie6"
                        shape="round"
                        type="success"
                        is-uppercase
                    >
                        {{ tag }}
                        <button @click="removeAdvancedTag(i)" class="delete">&#x2718;</button>
                    </Tag>
                </div>
            </Disclose>
        </section>

        <!-- Display selected or all faculty -->
        <h3>{{ ((search_text|| advancedSearchTags.length) ? 
            `Filtered instructors` : 'All instructors') }} ({{ filteredInstructors.length }})</h3>

        <!-- Display Faculty Cards for filtered faculty -->
        <section class="mbe40 project-cards-flex flex flex-row flex-grow-1 flex-shrink-1 flex-wrap flex-fill">
            <template v-for="faculty in filteredInstructors" :key="faculty.data.id">
                <FacultyCard :item="faculty" />
            </template>
        </section>
    </div>
</template>


<style scoped>
.faculty-cards-flex {
    display: flex;
    flex-wrap: wrap;
    gap: 16px; /* Adjust gap between cards */
}

.faculty-filter-container {
    justify-content: space-around;
    display: flex;
    flex-flow: row wrap;
    justify-content: center;
    align-items: center;
}
.faculty-filter-dropdown {
    min-width: 10rem !important;
    max-width: 15em;
    padding: 1em;
    flex: 1;
}
</style>