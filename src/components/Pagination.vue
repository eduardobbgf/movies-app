<template>
    <div class="w3-center">
        <div class="w3-bar w3-border w3-round">
            <button 
                class="w3-button"
                :disabled='isDisabled()'
                @click="decrementPage()"
                >&#10094; Previous</button>
            <button 
                href="#" 
                class="w3-button w3-right"
                @click="incrementPage()"
                >Next &#10095;</button>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class Pagination extends Vue {
  public parent: any = this.$parent;
  // public emit = this.$emit;
  public isDisabled() {
    const isDisabled = (this.parent.pageNumber === 1 && this.parent.part === 0) ? true : false;
    return isDisabled;
  }

  public incrementPage() {
    if (this.parent.part === 1) {
      this.parent.pageNumber++;
      this.parent.part = 0;
      this.parent.setMovies();
    } else {
      this.parent.part++;
    }
  }

  public decrementPage() {
    if (this.parent.part === 0) {
      if (this.parent.pageNumber > 1) {
        this.parent.pageNumber--;
        this.parent.part = 1;
        this.parent.setMovies();
      }
    } else if (this.parent.part === 1) {
      this.parent.part--;
    }
  }
}
</script>