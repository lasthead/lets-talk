<template>
  <div class="block block__input-message">
    <v-text-field
      @keydown.enter="$emit('send', inputText)"
      v-model="messageText"
    />
    <v-btn @click="$emit('send', inputText)" icon>
      <v-icon>mdi-send</v-icon>
    </v-btn>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
// import { Message } from "@/models/message";

export default Vue.extend({
  name: "TextInputArea",
  data() {
    return {
      inputText: ""
    };
  },
  computed: {
    messageText: {
      get(): string {
        return this.value;
      },
      set(value: string) {
        this.inputText = value;
        this.$emit("input", value);
      }
    }
  },
  props: {
    value: {
      type: String,
      default: ""
    }
  }
});
</script>

<style lang="scss" scoped>
@import "../../src/assets/mixins";
.block {
  width: 22rem;
  @media #{$min768} {
    width: 60rem;
  }
  &__input-message {
    display: flex;
    align-items: center;
  }
}
</style>
