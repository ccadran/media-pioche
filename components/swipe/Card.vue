<script lang="ts" setup>
import type { Article } from '~/@types/api';
import gsap from 'gsap';
import { Draggable } from 'gsap/Draggable';
gsap.registerPlugin(Draggable);







const props = defineProps({
  card: {
    type: Object as () => Article,
    required: true,
  },
  onSkip: {
    type: Function,
    required: true,
  },
  onAddToStore: {
    type: Function,
    required: true,
  },
  index: {
    type: Number,
    required: true,
  },
});

let zIndex = props.index


onMounted(() => {
  Draggable.create('.card', {
    type: 'x',
    inertia: true, 
    onDragStart(){
      gsap.to(this.target, {
        duration: 0.5,
        scale: 0.8,
        zIndex: 1000,
      });

    },
    onDrag(){
      const tilt = this.x / 10;
      gsap.to(this.target, {
        rotationZ: tilt, 
        duration: 0.1,   
      });
    },
    onDragEnd() {
      console.log('Dragged:', this.target); 
      
      if(this.endX >100){
        console.log('right');
        gsap.to(this.target, {
          x: 600,
          duration: 0.5,
          ease: 'power2.out',

        });
        props.onAddToStore();
      }else if(this.endX < -100){
        console.log('left');
        gsap.to(this.target, {
          x: -600,
          duration: 0.5,
          ease: 'power2.out',

        });
        props.onSkip();
      }else{
        gsap.to(this.target, {
          x: 0,
          rotationZ: 0, 
          duration: 0.5,
          ease: 'power2.out',
          scale: 1,

        });
      }
      
    },
  });
});





</script>

<template>
  <div class="card" :key="index" :style="{ zIndex: 1000 - zIndex }" :data-index="index" >
    <div class="img-container">
      <img :src="card.cover" alt="" class="inner">
    </div>
    <div class="card-text">
      <h4>{{ card.title }}</h4>
      <p>{{ card.accroche }}</p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.card {
  height: 60svh;
  background-color: #34DF77;
  border-radius: 12px;
  padding: 6px 12px 24px;
  position: absolute;
  width: 100%;
  > .img-container {
    max-height: 240px;
    height: 60%;
    > .inner {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }
  > .card-text {
    margin-top: 22px;
    height: 40%;
    h4 {
      margin-bottom: 12px;
      font-family: Satoshi;
      font-weight: 700;
      font-size: 18px;
      line-height: 100%;
    }
    p {
      font-family: Satoshi;
      font-size: 16px;
      font-weight: 400;
    }
  }
  &.hidden {
    display: none;
  }
}
</style>
