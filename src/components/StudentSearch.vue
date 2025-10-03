<script setup>
import { computed, ref, watchEffect, watch } from "vue";
import "agnostic-vue/dist/index.css";
import "agnostic-vue/dist/common.min.css";
import { Input, Select, Button, Disclose, Tag } from "agnostic-vue";
import Pagination from "./Pagination.vue";

import StudentCard from "./StudentCard.vue";

// Load props
const props = defineProps({
    studentList: Object, 
    filter: Object
});

const students = props.studentList;
//basic search
const search_text = ref("");
// advance search = desc, graduationYear, projects, tags, skills
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
function removeAdvancedTag(index) {
advancedSearchTags.value.splice(index, 1);
}

// Keyword suggestions for advanced search (NOT including name)
const keywordOptions = computed(() => {
    const set = new Set();
    students.forEach(s => {
        const d = s?.data || {};
        if (d.graduationYear != null) {
            set.add(String(d.graduationYear).toLowerCase());
        }
        if (d.projects){
            d.projects.forEach(p => 
                set.add(String(p).toLowerCase())
            );
        }
        if (d.tags){
            d.tags.forEach(t => 
                set.add(String(t).toLowerCase())
            );
        }
        if (d.skills){
            d.skills.forEach(t => 
                set.add(String(t).toLowerCase())
            );
        }
    });
    return Array.from(set);
});

//Matching keyword
function basicMatches(student) {
    const q = search_text.value.trim().toLowerCase();
    if (!q) {
        return true;
    }
    const d = student?.data || {};
    return d.name && String(d.name).toLowerCase().includes(q);
}


function advancedMatches(student) {
    if (advancedSearchTags.value.length === 0) {
        return true;
    }
    const d = student?.data || {};
    const baskets = [
        d.desc ? [String(d.desc).toLowerCase()] : [],
        d.graduationYear != null ? [String(d.graduationYear).toLowerCase()] : [],
        Array.isArray(d.projects) ? d.projects.map(p => String(p).toLowerCase()) : [],
        Array.isArray(d.tags) ? d.tags.map(t => String(t).toLowerCase()) : [],
        Array.isArray(d.skills) ? d.skills.map(t => String(t).toLowerCase()) : []
    ];
    return advancedSearchTags.value.every(term => baskets.some(list => list.some(v => v.includes(term))));
}


function matches(student) {
    return basicMatches(student) && advancedMatches(student);
}
//Student pagination
const currentPage = ref(1);
const pageSize = ref(12);

// Sorting: name or graduationYear
const sortField = ref("name");
const sortAsc = ref(true);
const filteredAndSortedStudents = computed(() => {
    const filtered = students.filter(s => matches(s));
    return [...filtered].sort((a, b) => {
        let A = a?.data?.[sortField.value];
        let B = b?.data?.[sortField.value];
        if (typeof A === "string") A = A.toLowerCase();
        if (typeof B === "string") B = B.toLowerCase();
        if (A < B) return sortAsc.value ? -1 : 1;
        if (A > B) return sortAsc.value ? 1 : -1;
        return 0;
    });
});

function toggleSortDirection() { 
    sortAsc.value = !sortAsc.value; 
}

const paginatedStudents = ref([]);

watchEffect(() => {
  const start = (currentPage.value - 1) * pageSize.value;
  const end = start + pageSize.value;
  paginatedStudents.value = filteredAndSortedStudents.value.slice(start, end);
});

// Clamp current page when result size or pageSize changes
watch([filteredAndSortedStudents, pageSize], () => {
  if (currentPage.value > totalPages.value) {
    currentPage.value = totalPages.value;
  }
});

const totalPages = computed(() =>
  Math.max(1, Math.ceil((filteredAndSortedStudents.value.length || 0) / (pageSize.value || 1)))
);

// Reset to page 1 when search/sort change
watch([
    search_text,
    () => advancedSearchTags.value.length,
    sortField, sortAsc,
    () => props.studentList
], () => { currentPage.value = 1; }, { deep: true });

const base = import.meta.env.BASE_URL;
</script>

<template>
    <div>
        <section class="mbe40">

            <!-- Input for searching students -->
            <Input id="7" is-underlined is-underlined-with-background 
                placeholder="Enter student name ..." 
                label="Search for students" 
                type="text" 
                v-model="search_text" />

            <!-- ADVANCED SEARCH (tags) -->
            <Disclose :is-open="showAdvanced" title="🔍 Advanced Search">
                <Input
                    v-model="advancedTerm"
                    @keydown.enter.prevent="addAdvancedTag"
                    list="student-keyword-list"
                    placeholder="Type a keyword (description, graduation year, project, or skill), then press Enter"
                    class="w-full mb-2"
                />
                <datalist id="student-keyword-list">
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
            
            <!-- SORTING -->
            <div class="d-flex align-items-center mt-3 mb-3">
                <label class="me-2">Sort by:</label>
                <select v-model="sortField" class="form-select me-2" style="width: auto;">
                    <option value="name">Name</option>
                    <option value="graduationYear">Graduation Year</option>
                </select>
                <Button variant="ghost" @click="toggleSortDirection">{{ sortAsc ? "↑ Ascending" : "↓ Descending" }}</Button>
            </div>
        </section>            

        <!-- Display selected or all students -->
        <h3>{{ ((search_text || advancedSearchTags.length) ? `Filtered students` : 'All Students') }} ({{ filteredAndSortedStudents.length }})</h3>

        <!-- Display Student Cards for filtered students -->
        <section class="mbe40 project-cards-flex flex flex-row flex-grow-1 flex-shrink-1 flex-wrap flex-fill">
            <template v-for="student in paginatedStudents" :key="student.data.id">
                <StudentCard :item="student" />
            </template>
        </section>

        <Pagination
            v-model:currentPage="currentPage"
            :totalItems="filteredAndSortedStudents.length"
            :pageSize="pageSize"
        />
    </div>
</template>



<style scoped>
.student-cards {
    display: flex;
    flex-wrap: wrap;
    gap: 16px; /* Adjust gap between cards */
}

.student-filter-container {
    justify-content: space-around;
    display: flex;
    flex-flow: row wrap;
    /* align-items: flex-start; */ 
    justify-content: center;
    align-items: center;
}
.student-filter-dropdown {
    /* apply grid and flex here */
    min-width: 10rem !important;
    max-width: 15em;
    padding: 1em;
    flex: 1;
}
</style>
