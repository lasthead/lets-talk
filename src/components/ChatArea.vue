<template>
  <div class="chat chat__wrapper">
    <div class="chat__items">
      <UserMessageBlock
        :message-object="message"
        :key="index"
        v-for="(message, index) in loadedMessages"
        :class="['chat__item-message', 'item-message__' + index]"
        @rendered="scrollToLastBlock"
      />
    </div>
    <TextInputArea
      v-model="messageText"
      class="chat__text-input"
      @send="sendMessage"
    />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import UserMessageBlock from "@/components/UserMessageBlock.vue";
import TextInputArea from "@/components/TextInputArea.vue";
import MessagesStore from "@/store/messagesStore";
import UserStore from "@/store/userStore";
import { User } from "@/models/user";
import { Message } from "@/models/message";

export default Vue.extend({
  name: "ChatArea",
  components: {
    UserMessageBlock,
    TextInputArea
  },
  data() {
    return {
      userMessageText: "",
      messages: [],
      messageText: ""
    };
  },
  computed: {
    ...MessagesStore.mapGetters(["loadedMessages"]),
    ...UserStore.mapGetters(["userData"])
  },
  mounted(): void {
    this.$socket.on("message", (data: Message) => {
      this.addMessageToList(data);
    });
    this.$socket.on("user_joined", (user: User) => {
      const message: Message = {
        action: 2,
        from: user,
        date: new Date()
      };
      this.addMessageToList(message);
    });
    this.$socket.on("user_disconnected", (user: User) => {
      const message: Message = {
        action: 3,
        from: user,
        date: new Date()
      };
      this.addMessageToList(message);
    });
  },
  methods: {
    ...MessagesStore.mapMutations(["addMessageToList"]),
    getRandomId(): number {
      return Math.floor(Math.random() * 1000000) + 1;
    },
    sendMessage() {
      const message: Message = {
        from: this.userData,
        date: new Date(),
        content: this.messageText
      };
      this.$socket.emit("message", message);
      this.messageText = "";
    },
    scrollToLastBlock() {
      const windowHeight = document.documentElement.clientHeight;
      const chatItemsBlock = document.querySelector(
        ".chat__items"
      ) as HTMLElement;
      const chatAreaHeight = chatItemsBlock.scrollHeight;
      if (windowHeight - 100 < chatAreaHeight) {
        document.documentElement.scrollTop = chatAreaHeight;
      }
    }
  }
});
</script>

<style lang="scss" scoped>
@import "../assets/mixins";

.chat {
  padding: 2rem;
  &__text-input {
    position: fixed;
    bottom: 0;
    padding: 0 1rem;
    @media #{$min768} {
      padding: 2rem;
    }
  }
  &__items {
    margin-bottom: 10rem;
  }
}
</style>
