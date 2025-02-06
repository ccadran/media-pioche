<script lang="ts" setup></script>

<template>
  <div class="forced-width">
    <div class="modal">
      <div class="modal-content">
        <p>
          Ce site n’est pas conçu pour une utilisation sur ordinateur. <br />
          Pour une expérience optimale, veuillez utiliser un smartphone.
        </p>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
@media screen and (max-width: 540px) {
  .forced-width {
    display: none !important;
  }
}

.forced-width {
  width: 100%;
  top: 0;
  z-index: 10000;
  position: fixed;

  height: 100vh;
  display: block;
  background: transparent;
  .modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.6);
    display: flex;
    justify-content: center;
    align-items: center;

    > .modal-content {
      background: var(--white);
      padding: 24px;
      border-radius: 10px;
      text-align: center;
      max-width: 90vw;
      box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
      > p {
        font-family: Clash Grotesk;
        font-size: 24px;
        font-weight: 400;
      }
    }
  }
}

.page-enter-active,
.page-leave-active {
  transition: opacity 0.5s ease;
}

.page-enter-from,
.page-leave-to {
  opacity: 0;
}
</style>
