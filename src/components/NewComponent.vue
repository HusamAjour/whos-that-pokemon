<template>
   <p> {{msg}}</p>
</template>

<script>
export default {
  name: 'NewComponent',
  props: {
    msg: String
  }
}
</script>