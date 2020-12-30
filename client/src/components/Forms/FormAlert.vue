<template>
<div class="form-alert" :class='cssClass'>
  <p>error</p>
</div>
</template>

<script>
import Constants from "@/infraestructure/Constants";
export default {
  name: "FormAlert",
  props: {
    type: {
      type: String,
      required: false,
      validator: propType => {
        return Constants.WARNING_TYPES.includes(propType);
      }
    },
    show: {
      type: Boolean,
      required: true
    }
  },
  computed: {
    cssClass () {
      return {
        'hidden': !this.show,
        'rounded': true,
        'text-sm': true,
        'mb-4': true,
        'p-2': true,
        'bg-red-400': this.type === 'ERROR',
        'bg-green-400': this.type === 'SUCCESS',
        'bg-yellow-400': this.type === 'WARNING'
      }

    }
  }
}
</script>

<style lang="scss" scoped>

</style>